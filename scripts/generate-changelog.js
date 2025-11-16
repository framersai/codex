#!/usr/bin/env node
/**
 * Generate daily changelog from git commits
 * Parses conventional commits and writes JSON snapshots
 * 
 * Usage:
 *   node scripts/generate-changelog.js [--since YYYY-MM-DD] [--output-dir path]
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Parse CLI args
const args = process.argv.slice(2)
const sinceIndex = args.indexOf('--since')
const outputDirIndex = args.indexOf('--output-dir')

const sinceDate = sinceIndex >= 0 ? args[sinceIndex + 1] : null
const outputDir = outputDirIndex >= 0 
  ? path.resolve(args[outputDirIndex + 1])
  : path.resolve(__dirname, '../codex-history/git')

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true })

/**
 * Parse a conventional commit message
 * @param {string} message - Full commit message
 * @returns {object} Parsed commit
 */
function parseCommit(message) {
  const lines = message.split('\n')
  const firstLine = lines[0]
  
  // Match: type(scope): description
  const match = firstLine.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)$/)
  
  if (match) {
    return {
      type: match[1],
      scope: match[2] || null,
      description: match[3],
      body: lines.slice(1).join('\n').trim() || null
    }
  }
  
  // Fallback for non-conventional commits
  return {
    type: 'other',
    scope: null,
    description: firstLine,
    body: lines.slice(1).join('\n').trim() || null
  }
}

/**
 * Get git log for a date range
 * @param {string|null} since - ISO date string or null for all
 * @returns {Array} Array of commit objects
 */
function getGitLog(since) {
  const sinceArg = since ? `--since="${since}"` : '--all'
  const format = '%H%x00%an%x00%ae%x00%aI%x00%s%x00%b%x00'
  
  try {
    const output = execSync(
      `git log ${sinceArg} --pretty=format:"${format}" --no-merges`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    )
    
    if (!output.trim()) return []
    
    const commits = output.trim().split('\n').map(line => {
      const [sha, author, email, date, subject, body] = line.split('\x00')
      const parsed = parseCommit(subject + (body ? '\n' + body : ''))
      
      return {
        sha: sha.substring(0, 7),
        fullSha: sha,
        author,
        email,
        date,
        url: `https://github.com/framersai/codex/commit/${sha}`,
        ...parsed
      }
    })
    
    return commits
  } catch (error) {
    console.error('Error fetching git log:', error.message)
    return []
  }
}

/**
 * Group commits by date
 * @param {Array} commits - Array of commit objects
 * @returns {Object} Commits grouped by ISO date
 */
function groupByDate(commits) {
  const grouped = {}
  
  for (const commit of commits) {
    const date = commit.date.split('T')[0] // YYYY-MM-DD
    if (!grouped[date]) {
      grouped[date] = []
    }
    grouped[date].push(commit)
  }
  
  return grouped
}

/**
 * Write changelog JSON for a specific date
 * @param {string} date - ISO date string
 * @param {Array} commits - Commits for that date
 * @param {string} outputDir - Output directory
 */
function writeChangelog(date, commits, outputDir) {
  const filename = `${date}.json`
  const filepath = path.join(outputDir, filename)
  
  // Group by type
  const byType = {}
  for (const commit of commits) {
    if (!byType[commit.type]) {
      byType[commit.type] = []
    }
    byType[commit.type].push(commit)
  }
  
  const changelog = {
    date,
    totalCommits: commits.length,
    byType,
    commits
  }
  
  fs.writeFileSync(filepath, JSON.stringify(changelog, null, 2))
  console.log(`✅ Wrote ${commits.length} commits to ${filename}`)
}

// Main execution
console.log('📝 Generating changelog...\n')

const commits = getGitLog(sinceDate)

if (commits.length === 0) {
  console.log('No commits found for the specified period.')
  process.exit(0)
}

console.log(`Found ${commits.length} commits`)

const grouped = groupByDate(commits)
const dates = Object.keys(grouped).sort()

console.log(`Writing changelogs for ${dates.length} days...\n`)

for (const date of dates) {
  writeChangelog(date, grouped[date], outputDir)
}

console.log(`\n✨ Done! Changelogs written to ${outputDir}`)

