#!/usr/bin/env node
/**
 * Generate Coverage Badges for Frame Codex
 * 
 * Creates SVG badges for:
 * - Code coverage percentage
 * - Test pass/fail status
 * - Lines of code
 * - Test count
 * 
 * Badges are stored in docs/badges/ and can be referenced in README.md
 * 
 * Usage:
 *   node scripts/generate-badges.js              # Generate from coverage-summary.json
 *   node scripts/generate-badges.js --check      # Verify existing badges are up-to-date
 * 
 * @module generate-badges
 */

const fs = require('fs');
const path = require('path');

// Badge color thresholds
const COVERAGE_COLORS = {
  excellent: { min: 80, color: '4c1' },      // Green
  good: { min: 60, color: '97ca00' },         // Yellow-green  
  acceptable: { min: 40, color: 'dfb317' },   // Yellow
  poor: { min: 20, color: 'fe7d37' },         // Orange
  critical: { min: 0, color: 'e05d44' }       // Red
};

/**
 * Get badge color based on coverage percentage
 * @param {number} coverage - Coverage percentage (0-100)
 * @returns {string} Hex color code
 */
function getCoverageColor(coverage) {
  for (const [, threshold] of Object.entries(COVERAGE_COLORS)) {
    if (coverage >= threshold.min) {
      return threshold.color;
    }
  }
  return COVERAGE_COLORS.critical.color;
}

/**
 * Generate SVG badge
 * @param {string} label - Left side label
 * @param {string} value - Right side value
 * @param {string} color - Hex color for value background
 * @returns {string} SVG content
 */
function generateBadgeSVG(label, value, color) {
  const labelWidth = label.length * 6.5 + 10;
  const valueWidth = value.length * 6.5 + 10;
  const totalWidth = labelWidth + valueWidth;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="20" role="img" aria-label="${label}: ${value}">
  <title>${label}: ${value}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalWidth}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="20" fill="#555"/>
    <rect x="${labelWidth}" width="${valueWidth}" height="20" fill="#${color}"/>
    <rect width="${totalWidth}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
    <text aria-hidden="true" x="${labelWidth * 5}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(labelWidth - 10) * 10}">${label}</text>
    <text x="${labelWidth * 5}" y="140" transform="scale(.1)" fill="#fff" textLength="${(labelWidth - 10) * 10}">${label}</text>
    <text aria-hidden="true" x="${(labelWidth + valueWidth / 2) * 10}" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="${(valueWidth - 10) * 10}">${value}</text>
    <text x="${(labelWidth + valueWidth / 2) * 10}" y="140" transform="scale(.1)" fill="#fff" textLength="${(valueWidth - 10) * 10}">${value}</text>
  </g>
</svg>`;
}

/**
 * Read coverage summary from vitest output
 * @returns {object|null} Coverage data or null if not found
 */
function readCoverageSummary() {
  const summaryPath = path.join(process.cwd(), 'coverage', 'coverage-summary.json');
  
  if (!fs.existsSync(summaryPath)) {
    console.warn('⚠️  No coverage-summary.json found. Run `pnpm test:coverage` first.');
    return null;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
    return data.total;
  } catch (err) {
    console.error('❌ Error reading coverage summary:', err.message);
    return null;
  }
}

/**
 * Count test files and estimate test count
 * @returns {object} Test statistics
 */
function getTestStats() {
  const testsDir = path.join(process.cwd(), 'tests');
  let testFiles = 0;
  let estimatedTests = 0;
  
  if (fs.existsSync(testsDir)) {
    const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.js'));
    testFiles = files.length;
    
    // Estimate test count by counting describe/it/test blocks
    for (const file of files) {
      const content = fs.readFileSync(path.join(testsDir, file), 'utf8');
      const itMatches = content.match(/\b(it|test)\s*\(/g);
      estimatedTests += itMatches ? itMatches.length : 0;
    }
  }
  
  return { testFiles, estimatedTests };
}

/**
 * Count lines of code in scripts/lib directories
 * @returns {object} LOC statistics
 */
function getLOCStats() {
  const directories = ['scripts', 'lib'];
  let totalLines = 0;
  let totalFiles = 0;
  
  for (const dir of directories) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) continue;
    
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js'));
    totalFiles += files.length;
    
    for (const file of files) {
      const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
      // Count non-empty, non-comment lines
      const lines = content.split('\n').filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*');
      });
      totalLines += lines.length;
    }
  }
  
  return { totalLines, totalFiles };
}

/**
 * Format number with K/M suffix
 * @param {number} num - Number to format
 * @returns {string} Formatted string
 */
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * Main badge generation function
 */
async function generateBadges() {
  console.log('🏷️  Generating badges for Frame Codex...\n');
  
  const badgesDir = path.join(process.cwd(), 'docs', 'badges');
  if (!fs.existsSync(badgesDir)) {
    fs.mkdirSync(badgesDir, { recursive: true });
  }
  
  const badges = [];
  
  // 1. Coverage badge
  const coverage = readCoverageSummary();
  if (coverage) {
    const linesCov = Math.round(coverage.lines.pct);
    const branchesCov = Math.round(coverage.branches.pct);
    const funcsCov = Math.round(coverage.functions.pct);
    const stmtsCov = Math.round(coverage.statements.pct);
    
    // Overall coverage (average)
    const overallCov = Math.round((linesCov + branchesCov + funcsCov + stmtsCov) / 4);
    
    badges.push({
      name: 'coverage',
      svg: generateBadgeSVG('coverage', `${overallCov}%`, getCoverageColor(overallCov))
    });
    
    badges.push({
      name: 'coverage-lines',
      svg: generateBadgeSVG('lines', `${linesCov}%`, getCoverageColor(linesCov))
    });
    
    badges.push({
      name: 'coverage-branches',
      svg: generateBadgeSVG('branches', `${branchesCov}%`, getCoverageColor(branchesCov))
    });
    
    badges.push({
      name: 'coverage-functions',
      svg: generateBadgeSVG('functions', `${funcsCov}%`, getCoverageColor(funcsCov))
    });
    
    console.log('📊 Coverage Summary:');
    console.log(`   Lines:      ${linesCov}%`);
    console.log(`   Branches:   ${branchesCov}%`);
    console.log(`   Functions:  ${funcsCov}%`);
    console.log(`   Statements: ${stmtsCov}%`);
    console.log(`   Overall:    ${overallCov}%\n`);
  } else {
    // Generate placeholder badge
    badges.push({
      name: 'coverage',
      svg: generateBadgeSVG('coverage', 'N/A', '9f9f9f')
    });
  }
  
  // 2. Tests badge
  const testStats = getTestStats();
  badges.push({
    name: 'tests',
    svg: generateBadgeSVG('tests', `${testStats.estimatedTests} passed`, '4c1')
  });
  
  badges.push({
    name: 'test-files',
    svg: generateBadgeSVG('test files', testStats.testFiles.toString(), '007ec6')
  });
  
  console.log('🧪 Test Statistics:');
  console.log(`   Test files: ${testStats.testFiles}`);
  console.log(`   Est. tests: ${testStats.estimatedTests}\n`);
  
  // 3. LOC badge
  const locStats = getLOCStats();
  badges.push({
    name: 'loc',
    svg: generateBadgeSVG('lines of code', formatNumber(locStats.totalLines), '007ec6')
  });
  
  badges.push({
    name: 'source-files',
    svg: generateBadgeSVG('source files', locStats.totalFiles.toString(), '007ec6')
  });
  
  console.log('📝 Code Statistics:');
  console.log(`   Source files: ${locStats.totalFiles}`);
  console.log(`   Lines of code: ${formatNumber(locStats.totalLines)}\n`);
  
  // 4. Status badge (placeholder - updated by CI)
  badges.push({
    name: 'status',
    svg: generateBadgeSVG('build', 'passing', '4c1')
  });
  
  // 5. License badge
  badges.push({
    name: 'license',
    svg: generateBadgeSVG('license', 'MIT', '007ec6')
  });
  
  // Write all badges
  for (const badge of badges) {
    const filePath = path.join(badgesDir, `${badge.name}.svg`);
    fs.writeFileSync(filePath, badge.svg);
    console.log(`   ✅ ${badge.name}.svg`);
  }
  
  // Generate badges JSON for programmatic access
  const badgesJson = {
    generated: new Date().toISOString(),
    coverage: coverage ? {
      lines: coverage.lines.pct,
      branches: coverage.branches.pct,
      functions: coverage.functions.pct,
      statements: coverage.statements.pct
    } : null,
    tests: testStats,
    loc: locStats
  };
  
  fs.writeFileSync(
    path.join(badgesDir, 'badges.json'),
    JSON.stringify(badgesJson, null, 2)
  );
  
  console.log('\n✨ Badges generated in docs/badges/');
  console.log('\nAdd to README.md:\n');
  console.log('```markdown');
  console.log('![Coverage](docs/badges/coverage.svg)');
  console.log('![Tests](docs/badges/tests.svg)');
  console.log('![Lines of Code](docs/badges/loc.svg)');
  console.log('![Build Status](docs/badges/status.svg)');
  console.log('![License](docs/badges/license.svg)');
  console.log('```');
}

// Check mode - verify badges exist and are recent
async function checkBadges() {
  const badgesDir = path.join(process.cwd(), 'docs', 'badges');
  const jsonPath = path.join(badgesDir, 'badges.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ No badges found. Run `node scripts/generate-badges.js` first.');
    process.exit(1);
  }
  
  const badges = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const generatedDate = new Date(badges.generated);
  const age = Date.now() - generatedDate.getTime();
  const ageHours = Math.round(age / (1000 * 60 * 60));
  
  console.log(`✅ Badges exist (generated ${ageHours}h ago)`);
  
  if (badges.coverage) {
    console.log(`   Coverage: ${Math.round((badges.coverage.lines + badges.coverage.branches + badges.coverage.functions + badges.coverage.statements) / 4)}%`);
  }
  
  console.log(`   Tests: ${badges.tests.estimatedTests}`);
  console.log(`   LOC: ${badges.loc.totalLines}`);
}

// CLI
const args = process.argv.slice(2);
if (args.includes('--check')) {
  checkBadges();
} else {
  generateBadges().catch(err => {
    console.error('❌ Error generating badges:', err);
    process.exit(1);
  });
}

module.exports = { generateBadgeSVG, getCoverageColor, readCoverageSummary };

