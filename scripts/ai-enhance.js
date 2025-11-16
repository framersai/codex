#!/usr/bin/env node

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
 * Usage:
 *   node scripts/ai-enhance.js --files "file1.md,file2.md" --pr-number 123
 *   node scripts/ai-enhance.js --files "file1.md" --apply-safe-fixes
 * 
 * Environment variables:
 *   ANTHROPIC_API_KEY - Claude API key (preferred)
 *   OPENAI_API_KEY - OpenAI API key (fallback)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const yaml = require('js-yaml');

// AI client setup
let aiClient = null;
let aiProvider = null;

async function initializeAI() {
  // Check if AI is disabled
  if (process.env.AI_PROVIDER === 'disabled') {
    console.log('ℹ️ AI enhancement disabled via AI_PROVIDER=disabled');
    return false;
  }
  
  // Use OpenAI (we have startup credits from OpenAI for open source)
  if (process.env.OPENAI_API_KEY) {
    try {
      const OpenAI = require('openai');
      aiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      aiProvider = 'openai';
      console.log('✅ Using GPT-4 (OpenAI) for AI enhancement');
      return true;
    } catch (error) {
      console.warn('⚠️ OpenAI SDK not available:', error.message);
    }
  }
  
  console.error('❌ No OPENAI_API_KEY found');
  console.log('ℹ️ Set OPENAI_API_KEY to enable AI-powered quality analysis');
  console.log('ℹ️ Or set AI_PROVIDER=disabled to skip AI enhancement');
  return false;
}

/**
 * Call AI with a prompt
 */
async function callAI(prompt, systemPrompt = '') {
  if (!aiClient) {
    throw new Error('AI client not initialized');
  }
  
  try {
    if (aiProvider === 'anthropic') {
      const response = await aiClient.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }]
      });
      
      return response.content[0].text;
    } else if (aiProvider === 'openai') {
      const messages = [];
      if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
      messages.push({ role: 'user', content: prompt });
      
      const response = await aiClient.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        max_tokens: 4096,
        temperature: 0.3
      });
      
      return response.choices[0].message.content;
    }
  } catch (error) {
    console.error('AI API error:', error.message);
    throw error;
  }
}

/**
 * Analyze a single file and generate suggestions
 */
async function analyzeFile(filePath) {
  console.log(`\n📄 Analyzing ${filePath}...`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  let metadata = {};
  let body = content;
  
  // Parse frontmatter if markdown
  if (filePath.endsWith('.md')) {
    const parsed = matter(content);
    metadata = parsed.data;
    body = parsed.content;
  } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
    metadata = yaml.load(content);
    body = '';
  }
  
  // Build analysis prompt
  const systemPrompt = `You are an expert content curator for Frame Codex, a structured knowledge repository.
Your role is to analyze content and suggest improvements for metadata, categorization, and quality.

Frame Codex uses this schema:
- **Strand**: Individual knowledge unit (requires: id, slug, title, summary, version, contentType, difficulty, taxonomy, tags)
- **Loom**: Collection of related strands (requires: slug, title, summary, ordering)
- **Weave**: Complete knowledge universe (requires: slug, title, description)

Taxonomy includes:
- **Subjects**: technology, science, philosophy, ai, knowledge, design, security
- **Topics**: getting-started, architecture, api-reference, best-practices, troubleshooting, deployment, testing, performance
- **Difficulty**: beginner, intermediate, advanced, expert

Respond ONLY with valid JSON in this format:
{
  "qualityScore": 0-100,
  "completeness": 0-100,
  "readability": "easy|moderate|difficult",
  "seoScore": 0-100,
  "estimatedReadingTime": minutes,
  "suggestions": [
    {
      "type": "metadata|content|structure|quality",
      "severity": "error|warning|info",
      "message": "Brief description",
      "details": "Detailed explanation",
      "suggestedFix": "Exact fix to apply (YAML or markdown)",
      "confidence": "high|medium|low",
      "line": line_number
    }
  ],
  "autoTags": ["tag1", "tag2"],
  "suggestedDifficulty": "beginner|intermediate|advanced|expert",
  "suggestedSubjects": ["subject1", "subject2"],
  "suggestedTopics": ["topic1", "topic2"],
  "recommendations": ["recommendation1", "recommendation2"],
  "missingFields": ["field1", "field2"],
  "generatedSummary": "Auto-generated summary if missing"
}`;
  
  const analysisPrompt = `Analyze this Frame Codex content and provide suggestions:

**File:** ${filePath}

**Current Metadata:**
\`\`\`yaml
${yaml.dump(metadata)}
\`\`\`

**Content Preview (first 2000 chars):**
\`\`\`
${body.substring(0, 2000)}
\`\`\`

**Content Length:** ${body.length} characters

Provide a comprehensive analysis with actionable suggestions for improvement.`;
  
  try {
    const response = await callAI(analysisPrompt, systemPrompt);
    
    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('⚠️ Could not parse AI response as JSON');
      return null;
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    analysis.file = filePath;
    analysis.model = aiProvider === 'anthropic' ? 'Claude 3.5 Sonnet' : 'GPT-4 Turbo';
    
    console.log(`  Quality: ${analysis.qualityScore}/100`);
    console.log(`  Completeness: ${analysis.completeness}%`);
    console.log(`  Suggestions: ${analysis.suggestions?.length || 0}`);
    
    return analysis;
  } catch (error) {
    console.error(`❌ Failed to analyze ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Apply safe automatic fixes to a file
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
  
  if (safeFixes.length === 0) {
    console.log(`  No safe auto-fixes for ${filePath}`);
    return false;
  }
  
  if (filePath.endsWith('.md')) {
    const parsed = matter(content);
    let metadata = parsed.data;
    
    // Apply metadata fixes
    safeFixes.forEach(fix => {
      if (fix.message.includes('missing') || fix.message.includes('add')) {
        try {
          const fixData = yaml.load(fix.suggestedFix);
          metadata = { ...metadata, ...fixData };
          modified = true;
          console.log(`  ✅ Applied: ${fix.message}`);
        } catch (error) {
          console.warn(`  ⚠️ Could not apply fix: ${fix.message}`);
        }
      }
    });
    
    // Auto-fill from analysis
    if (!metadata.tags || metadata.tags.length === 0) {
      metadata.tags = analysis.autoTags || [];
      modified = true;
    }
    
    if (!metadata.difficulty) {
      metadata.difficulty = analysis.suggestedDifficulty || 'intermediate';
      modified = true;
    }
    
    if (!metadata.taxonomy) {
      metadata.taxonomy = {
        subjects: analysis.suggestedSubjects || [],
        topics: analysis.suggestedTopics || []
      };
      modified = true;
    }
    
    if (!metadata.summary && analysis.generatedSummary) {
      metadata.summary = analysis.generatedSummary;
      modified = true;
    }
    
    if (modified) {
      const newContent = matter.stringify(parsed.content, metadata);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  💾 Saved improvements to ${filePath}`);
    }
  }
  
  return modified;
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const filesArg = args.find(a => a.startsWith('--files='))?.split('=')[1] || 
                   args[args.indexOf('--files') + 1];
  const prNumber = args.find(a => a.startsWith('--pr-number='))?.split('=')[1] || 
                   args[args.indexOf('--pr-number') + 1];
  const outputFile = args.find(a => a.startsWith('--output='))?.split('=')[1] || 
                     args[args.indexOf('--output') + 1] || 
                     'enhancement-report.json';
  const applySafe = args.includes('--apply-safe-fixes');
  
  if (!filesArg) {
    console.error('Usage: node ai-enhance.js --files "file1.md,file2.md" [--pr-number 123] [--output report.json] [--apply-safe-fixes]');
    process.exit(1);
  }
  
  // Initialize AI
  const aiReady = await initializeAI();
  if (!aiReady) {
    console.error('❌ AI initialization failed');
    process.exit(1);
  }
  
  // Process files
  const files = filesArg.split(/[\n,]/).map(f => f.trim()).filter(Boolean);
  console.log(`\n🔍 Analyzing ${files.length} file(s)...\n`);
  
  const analyses = [];
  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.warn(`⚠️ File not found: ${file}`);
      continue;
    }
    
    const analysis = await analyzeFile(file);
    if (analysis) {
      analyses.push(analysis);
      
      if (applySafe) {
        applySafeFixes(file, analysis);
      }
    }
  }
  
  // Generate combined report
  const report = {
    prNumber: prNumber ? parseInt(prNumber) : null,
    timestamp: new Date().toISOString(),
    model: analyses[0]?.model || 'Unknown',
    filesAnalyzed: files.length,
    analyses: analyses,
    
    // Aggregate metrics
    qualityScore: Math.round(
      analyses.reduce((sum, a) => sum + (a.qualityScore || 0), 0) / analyses.length
    ),
    completeness: Math.round(
      analyses.reduce((sum, a) => sum + (a.completeness || 0), 0) / analyses.length
    ),
    
    // Flatten suggestions
    suggestions: analyses.flatMap(a => 
      (a.suggestions || []).map(s => ({ ...s, file: a.file }))
    ),
    
    // Aggregate tags
    autoTags: [...new Set(analyses.flatMap(a => a.autoTags || []))],
    suggestedDifficulty: analyses[0]?.suggestedDifficulty || 'intermediate',
    
    // Aggregate recommendations
    recommendations: [...new Set(analyses.flatMap(a => a.recommendations || []))],
    
    // Reading time
    estimatedReadingTime: analyses.reduce((sum, a) => sum + (a.estimatedReadingTime || 0), 0),
    
    // SEO score
    seoScore: Math.round(
      analyses.reduce((sum, a) => sum + (a.seoScore || 0), 0) / analyses.length
    ),
    
    // Readability
    readability: analyses[0]?.readability || 'moderate'
  };
  
  // Save report
  fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));
  console.log(`\n✅ Enhancement report saved to ${outputFile}`);
  
  // Print summary
  console.log('\n📊 Summary:');
  console.log(`  Overall Quality: ${report.qualityScore}/100`);
  console.log(`  Completeness: ${report.completeness}%`);
  console.log(`  Total Suggestions: ${report.suggestions.length}`);
  console.log(`  Auto-detected Tags: ${report.autoTags.slice(0, 10).join(', ')}`);
  console.log(`  Estimated Reading Time: ${report.estimatedReadingTime} min`);
  
  // Exit with appropriate code
  if (report.qualityScore < 60) {
    console.log('\n⚠️ Quality score below threshold (60)');
    process.exit(0); // Don't fail the workflow, just warn
  }
  
  console.log('\n✨ Analysis complete!');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { analyzeFile, applySafeFixes, callAI };

