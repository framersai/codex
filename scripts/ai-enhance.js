#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Frame Codex AI Enhancement Script
 * 
 * Uses AI (Claude or GPT-4) to analyze PR content and suggest improvements:
 * - Auto-fill missing metadata
 * - Suggest tags and categorization
 * - Detect quality issues
 * - Recommend structural improvements
 * - Generate summaries
 * 
 * @see lib/llm.js for the LLM inference engine
 * 
 * Usage:
 *   node scripts/ai-enhance.js --files "file1.md,file2.md" --pr-number 123
 *   node scripts/ai-enhance.js --files "file1.md" --apply-safe-fixes
 * 
 * Environment variables:
 *   OPENAI_API_KEY - OpenAI API key
 *   ANTHROPIC_API_KEY - Anthropic Claude API key
 *   OPENROUTER_API_KEY - OpenRouter API key
 *   AI_PROVIDER - Force provider ('openai'|'anthropic'|'openrouter'|'disabled')
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

// Import LLM library
const { llm, schemas } = require('../lib/llm');

/* ═══════════════════════════════════════════════════════════════════════════
   SYSTEM PROMPTS
═══════════════════════════════════════════════════════════════════════════ */

/**
 * System prompt for content analysis
 * Includes OpenStrand schema context
 */
const ANALYSIS_SYSTEM_PROMPT = `You are an expert content curator for Frame Codex, a structured knowledge repository built on OpenStrand architecture.

Your role is to analyze content and suggest improvements for metadata, categorization, and quality.

## OpenStrand Schema Reference

- **Strand**: Individual knowledge unit
  - Required: id, slug, title, summary, version, contentType, difficulty, taxonomy, tags
  - Optional: prerequisites, learningDesign, timeEstimates, modalities
  
- **Loom**: Collection of related strands
  - Required: slug, title, summary, ordering
  - Represents a project or learning path
  
- **Weave**: Complete knowledge universe
  - Required: slug, title, description
  - Top-level organizational unit

## Taxonomy Guidelines

- **Subjects**: technology, science, philosophy, ai, knowledge, design, security
- **Topics**: getting-started, architecture, api-reference, best-practices, troubleshooting, deployment, testing, performance
- **Difficulty Levels**: beginner, intermediate, advanced, expert

## Critical Rules

1. **Subfolders are SUBTOPICS**: Folder depth = topic specificity
2. **Tags are INDEPENDENT**: Can be shared across any folder level
3. Content should have 3-10 tags, lowercase, hyphenated

## Quality Criteria

- Completeness: All required fields present
- Clarity: Clear language, good structure
- Discoverability: Appropriate tags and categorization
- Accuracy: Correct technical information`;

/* ═══════════════════════════════════════════════════════════════════════════
   FILE ANALYSIS
═══════════════════════════════════════════════════════════════════════════ */

/**
 * Analyze a single file and generate suggestions
 * 
 * @param {string} filePath - Path to file to analyze
 * @returns {Promise<Object|null>} Analysis result or null if failed
 */
async function analyzeFile(filePath) {
  console.log(`\n📄 Analyzing ${filePath}...`);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let metadata = {};
  let body = content;
  
  // Parse frontmatter if markdown
  if (filePath.endsWith('.md')) {
    const parsed = matter(content);
    metadata = parsed.data;
    body = parsed.content;
  } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    try {
      metadata = yaml.load(content);
    } catch (e) {
      console.warn(`⚠️  Invalid YAML: ${e.message}`);
    }
    body = '';
  }
  
  // Build analysis prompt
  const prompt = `Analyze this Frame Codex content and provide improvement suggestions.

## File Information
- **Path:** ${filePath}
- **Content Length:** ${body.length} characters

## Current Metadata
\`\`\`yaml
${yaml.dump(metadata)}
\`\`\`

## Content Preview (first 3000 chars)
\`\`\`
${body.substring(0, 3000)}
\`\`\`

Analyze for:
1. Missing required metadata fields
2. Tag suggestions based on content
3. Appropriate difficulty level
4. Quality and completeness issues
5. Structural improvements
6. SEO and discoverability

Provide specific, actionable suggestions.`;

  try {
    const result = await llm.generate({
      prompt,
      system: ANALYSIS_SYSTEM_PROMPT,
      schema: schemas.contentAnalysis,
      maxRetries: 2,
    });
    
    const analysis = result.data;
    analysis.file = filePath;
    analysis.model = result.model;
    analysis.provider = result.provider;
    analysis.latency = result.latency;
    
    console.log(`  ✅ Quality: ${analysis.qualityScore}/100`);
    console.log(`  ✅ Completeness: ${analysis.completeness}%`);
    console.log(`  ✅ Suggestions: ${analysis.suggestions?.length || 0}`);
    console.log(`  ✅ Tags: ${analysis.autoTags?.slice(0, 5).join(', ') || 'none'}`);
    
    return analysis;
    
  } catch (error) {
    console.error(`❌ Failed to analyze ${filePath}:`, error.message);
    return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SAFE FIXES
═══════════════════════════════════════════════════════════════════════════ */

/**
 * Apply safe automatic fixes to a file
 * Only applies high-confidence metadata improvements
 * 
 * @param {string} filePath - Path to file
 * @param {Object} analysis - Analysis result from analyzeFile
 * @returns {boolean} True if modifications were made
 */
function applySafeFixes(filePath, analysis) {
  if (!analysis || !analysis.suggestions) return false;
  
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Only apply high-confidence, safe fixes
  const safeFixes = analysis.suggestions.filter(s => 
    s.confidence === 'high' &&
    s.type === 'metadata' &&
    s.suggestedFix
  );
  
  if (!filePath.endsWith('.md')) {
    console.log(`  ⏭️  Skipping non-markdown file: ${filePath}`);
    return false;
  }
  
  const parsed = matter(content);
  let metadata = parsed.data;
  
  // Apply individual fixes
  safeFixes.forEach(fix => {
    if (fix.message.includes('missing') || fix.message.includes('add')) {
      try {
        const fixData = yaml.load(fix.suggestedFix);
        if (typeof fixData === 'object' && fixData !== null) {
          metadata = { ...metadata, ...fixData };
          modified = true;
          console.log(`  ✅ Applied: ${fix.message}`);
        }
      } catch (error) {
        console.warn(`  ⚠️  Could not apply fix: ${fix.message}`);
      }
    }
  });
  
  // Auto-fill from analysis
  if (!metadata.tags || metadata.tags.length === 0) {
    if (analysis.autoTags && analysis.autoTags.length > 0) {
      metadata.tags = analysis.autoTags.slice(0, 10);
      modified = true;
      console.log(`  ✅ Auto-filled tags: ${metadata.tags.join(', ')}`);
    }
  }
  
  if (!metadata.difficulty && analysis.suggestedDifficulty) {
    metadata.difficulty = analysis.suggestedDifficulty;
    modified = true;
    console.log(`  ✅ Auto-filled difficulty: ${metadata.difficulty}`);
  }
  
  if (!metadata.taxonomy && (analysis.suggestedSubjects || analysis.suggestedTopics)) {
    metadata.taxonomy = {
      subjects: analysis.suggestedSubjects || [],
      topics: analysis.suggestedTopics || [],
    };
    modified = true;
    console.log(`  ✅ Auto-filled taxonomy`);
  }
  
  if (!metadata.summary && analysis.generatedSummary) {
    metadata.summary = analysis.generatedSummary;
    modified = true;
    console.log(`  ✅ Auto-generated summary`);
  }
  
  // Save if modified
  if (modified) {
    const newContent = matter.stringify(parsed.content, metadata);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  💾 Saved improvements to ${filePath}`);
  } else {
    console.log(`  ⏭️  No safe auto-fixes for ${filePath}`);
  }
  
  return modified;
}

/* ═══════════════════════════════════════════════════════════════════════════
   REPORT GENERATION
═══════════════════════════════════════════════════════════════════════════ */

/**
 * Generate combined report from multiple analyses
 * 
 * @param {Object[]} analyses - Array of analysis results
 * @param {Object} options - Report options
 * @returns {Object} Combined report
 */
function generateReport(analyses, options = {}) {
  const validAnalyses = analyses.filter(Boolean);
  
  if (validAnalyses.length === 0) {
    return {
      prNumber: options.prNumber || null,
      timestamp: new Date().toISOString(),
      filesAnalyzed: 0,
      analyses: [],
      qualityScore: 0,
      completeness: 0,
      suggestions: [],
      autoTags: [],
      recommendations: [],
    };
  }
  
  return {
    prNumber: options.prNumber || null,
    timestamp: new Date().toISOString(),
    model: validAnalyses[0]?.model || 'Unknown',
    provider: validAnalyses[0]?.provider || 'Unknown',
    filesAnalyzed: validAnalyses.length,
    analyses: validAnalyses,
    
    // Aggregate metrics
    qualityScore: Math.round(
      validAnalyses.reduce((sum, a) => sum + (a.qualityScore || 0), 0) / validAnalyses.length
    ),
    completeness: Math.round(
      validAnalyses.reduce((sum, a) => sum + (a.completeness || 0), 0) / validAnalyses.length
    ),
    
    // Flatten suggestions
    suggestions: validAnalyses.flatMap(a => 
      (a.suggestions || []).map(s => ({ ...s, file: a.file }))
    ),
    
    // Aggregate tags (deduplicated)
    autoTags: [...new Set(validAnalyses.flatMap(a => a.autoTags || []))],
    suggestedDifficulty: validAnalyses[0]?.suggestedDifficulty || 'intermediate',
    
    // Aggregate recommendations (deduplicated)
    recommendations: [...new Set(validAnalyses.flatMap(a => a.recommendations || []))],
    
    // Reading time
    estimatedReadingTime: validAnalyses.reduce((sum, a) => sum + (a.estimatedReadingTime || 0), 0),
    
    // SEO score
    seoScore: Math.round(
      validAnalyses.reduce((sum, a) => sum + (a.seoScore || 0), 0) / validAnalyses.length
    ),
    
    // Readability
    readability: validAnalyses[0]?.readability || 'moderate',
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXECUTION
═══════════════════════════════════════════════════════════════════════════ */

/**
 * Parse command line arguments
 * 
 * @param {string[]} args - Command line arguments
 * @returns {Object} Parsed options
 */
function parseArgs(args) {
  const options = {
    files: null,
    prNumber: null,
    outputFile: 'enhancement-report.json',
    applySafe: false,
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--files') {
      options.files = args[++i];
    } else if (arg.startsWith('--files=')) {
      options.files = arg.split('=')[1];
    } else if (arg === '--pr-number') {
      options.prNumber = parseInt(args[++i]);
    } else if (arg.startsWith('--pr-number=')) {
      options.prNumber = parseInt(arg.split('=')[1]);
    } else if (arg === '--output') {
      options.outputFile = args[++i];
    } else if (arg.startsWith('--output=')) {
      options.outputFile = arg.split('=')[1];
    } else if (arg === '--apply-safe-fixes') {
      options.applySafe = true;
    }
  }
  
  return options;
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);
  
  if (!options.files) {
    console.error(`
Usage: node ai-enhance.js --files "file1.md,file2.md" [options]

Options:
  --files FILE1,FILE2    Comma or newline separated list of files to analyze
  --pr-number N          PR number for report metadata
  --output FILE          Output file path (default: enhancement-report.json)
  --apply-safe-fixes     Apply high-confidence auto-fixes to files

Environment Variables:
  OPENAI_API_KEY         OpenAI API key
  ANTHROPIC_API_KEY      Anthropic Claude API key
  OPENROUTER_API_KEY     OpenRouter API key
  AI_PROVIDER            Force provider (openai, anthropic, openrouter, disabled)
  AI_MODEL               Override model
  AI_TEMPERATURE         Override temperature (0-1)
  AI_MAX_RETRIES         Override max retries

Examples:
  node ai-enhance.js --files "docs/guide.md" --pr-number 123
  node ai-enhance.js --files "file1.md,file2.md" --apply-safe-fixes
    `);
    process.exit(1);
  }
  
  // Initialize LLM
  llm.configure();
  
  if (!llm.isConfigured()) {
    console.error('❌ LLM initialization failed. Set API keys or AI_PROVIDER=disabled');
    process.exit(1);
  }
  
  // Parse files
  const files = options.files
    .split(/[\n,]/)
    .map(f => f.trim())
    .filter(Boolean);
  
  console.log(`\n🔍 Analyzing ${files.length} file(s)...\n`);
  console.log(`📡 Provider: ${llm.getProviders().join(', ')}`);
  
  // Analyze files
  const analyses = [];
  for (const file of files) {
    const analysis = await analyzeFile(file);
    if (analysis) {
      analyses.push(analysis);
      
      // Apply safe fixes if requested
      if (options.applySafe) {
        applySafeFixes(file, analysis);
      }
    }
  }
  
  // Generate report
  const report = generateReport(analyses, {
    prNumber: options.prNumber,
  });
  
  // Save report
  fs.writeFileSync(options.outputFile, JSON.stringify(report, null, 2));
  console.log(`\n✅ Enhancement report saved to ${options.outputFile}`);
  
  // Print summary
  console.log('\n📊 Summary:');
  console.log(`  Overall Quality: ${report.qualityScore}/100`);
  console.log(`  Completeness: ${report.completeness}%`);
  console.log(`  SEO Score: ${report.seoScore}/100`);
  console.log(`  Total Suggestions: ${report.suggestions.length}`);
  console.log(`  Auto-detected Tags: ${report.autoTags.slice(0, 10).join(', ') || 'none'}`);
  console.log(`  Estimated Reading Time: ${report.estimatedReadingTime} min`);
  
  // Exit with appropriate code
  if (report.qualityScore < 60) {
    console.log('\n⚠️  Quality score below threshold (60)');
    process.exit(0); // Don't fail the workflow, just warn
  }
  
  console.log('\n✨ Analysis complete!');
}

// Run
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { analyzeFile, applySafeFixes, generateReport };
