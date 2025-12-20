#!/usr/bin/env node
/**
 * Intelligent Strand Categorization with LLM-First Approach
 * 
 * Strategy:
 * 1. Try LLM analysis first (Claude/GPT) - most accurate
 * 2. Fallback to static NLP if LLM unavailable/fails
 * 3. Use vocab matching and TF-IDF for final fallback
 */

const fs = require('fs');
const path = require('path');

// LLM Analysis (primary method)
async function categorizewithLLM(content, metadata, filePath) {
  const Anthropic = require('@anthropic-ai/sdk').default;
  const OpenAI = require('openai').default;
  
  const forceLLM = process.env.FORCE_LLM === 'true';
  
  // Define category structure with proper AI/ML hierarchy
  const categories = {
    knowledge: {
      description: 'General knowledge - CS, AI/ML, math, science, programming (NOT Frame-specific)',
      subdirs: [
        'artificial-intelligence',                      // Main AI category
        'artificial-intelligence/machine-learning',     // ML is subset of AI
        'artificial-intelligence/generative-ai',        // GenAI under AI
        'artificial-intelligence/generative-ai/llms',   // LLMs under GenAI
        'computer-science', 
        'mathematics', 
        'science', 
        'programming', 
        'engineering'
      ]
    },
    wiki: {
      description: 'Frame wiki - ONLY high-level Frame management, architecture, how Frame itself works. NOT general knowledge.',
      subdirs: ['architecture', 'tutorials', 'examples', 'contributing']
    },
    frame: {
      description: 'Frame product content - announcements, roadmap, project-specific',
      subdirs: ['announcements', 'roadmap', 'projects']
    }
  };
  
  const prompt = `You are an expert knowledge curator analyzing content to categorize it into the correct folder structure.

CONTENT TO ANALYZE:
Title: ${metadata.title || 'Untitled'}
Summary: ${metadata.summary || 'No summary'}
Tags: ${metadata.tags?.join(', ') || 'None'}
Difficulty: ${metadata.difficulty || 'Not specified'}

CONTENT PREVIEW (first 2000 chars):
${content.substring(0, 2000)}

CATEGORY STRUCTURE:
${JSON.stringify(categories, null, 2)}

RULES:
1. **knowledge/** - General CS/AI/ML/science content NOT specific to Frame
   - Use 'artificial-intelligence' for AI content (NOT 'ai-ml')
   - Machine Learning goes in 'artificial-intelligence/machine-learning'
   - LLMs/GenAI go in 'artificial-intelligence/generative-ai/llms'
2. **wiki/** - ONLY high-level Frame management/architecture/how Frame itself works. NOT tutorials or general knowledge.
3. **frame/** - Frame product announcements, roadmap, internal projects

TASK:
Analyze the content and determine the best categorization path.

Respond with ONLY valid JSON (no markdown, no code blocks):
{
  "weave": "knowledge|wiki|frame",
  "subdir": "appropriate-subdirectory",
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation why this category fits",
  "alternatives": [
    {"path": "weaves/...", "confidence": 0.0-1.0, "reasoning": "why this could work"}
  ]
}

Example for LLM evaluation content:
{"weave":"knowledge","subdir":"artificial-intelligence/generative-ai/llms","confidence":0.95,"reasoning":"LLM/RAG evaluation is generative AI knowledge under artificial-intelligence, not Frame-specific","alternatives":[{"path":"weaves/wiki/tutorials","confidence":0.3,"reasoning":"Could be a Frame tutorial if it teaches Frame's eval system"}]}`;

  try {
    let response;
    
    // Try Anthropic first (Claude is best for analysis)
    if (process.env.ANTHROPIC_API_KEY) {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });
      
      const text = message.content[0].text.trim();
      // Remove markdown code blocks if present
      const jsonText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      response = JSON.parse(jsonText);
      response.method = 'llm-anthropic';
      
    } else if (process.env.OPENAI_API_KEY) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: prompt
        }],
        response_format: { type: 'json_object' }
      });
      
      response = JSON.parse(completion.choices[0].message.content);
      response.method = 'llm-openai';
      
    } else if (forceLLM) {
      throw new Error('LLM forced but no API keys available');
    } else {
      return null; // Fallback to static analysis
    }
    
    // Validate response structure
    if (!response.weave || !response.subdir || typeof response.confidence !== 'number') {
      throw new Error('Invalid LLM response structure');
    }
    
    // Build path
    const targetPath = `weaves/${response.weave}/${response.subdir}/${path.basename(filePath)}`;
    
    return {
      action: response.confidence >= 0.8 ? 'auto-move' : 'suggest',
      method: response.method,
      suggestion: {
        path: targetPath,
        confidence: response.confidence,
        reasoning: response.reasoning,
        details: `LLM-powered categorization into ${response.weave}/${response.subdir}`,
        alternatives: response.alternatives?.map(alt => ({
          ...alt,
          path: alt.path || `weaves/${response.weave}/${alt.subdir || response.subdir}/${path.basename(filePath)}`
        })) || []
      }
    };
    
  } catch (error) {
    console.error(`LLM analysis failed: ${error.message}`);
    if (forceLLM) {
      return {
        action: 'error',
        error: `LLM analysis required but failed: ${error.message}`
      };
    }
    return null; // Fallback to static
  }
}

// Static NLP Fallback
function categorizeWithStatic(content, metadata, filePath) {
  const natural = require('natural');
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  
  // Add document
  tfidf.addDocument(content.toLowerCase());
  
  // Category keywords (high-signal terms)
  const categorySignals = {
    'knowledge/artificial-intelligence/generative-ai/llms': [
      'llm', 'language model', 'gpt', 'claude', 'embedding', 'rag', 'retrieval',
      'prompt engineering', 'prompt', 'completion', 'chat', 'assistant'
    ],
    'knowledge/artificial-intelligence/machine-learning': [
      'machine learning', 'deep learning', 'neural network', 'transformer',
      'training', 'inference', 'model', 'dataset', 'supervised', 'unsupervised',
      'evaluation', 'benchmark', 'helm'
    ],
    'knowledge/artificial-intelligence': [
      'artificial intelligence', 'ai', 'intelligent agent', 'expert system',
      'knowledge representation', 'reasoning', 'planning'
    ],
    'knowledge/computer-science': [
      'algorithm', 'data structure', 'complexity', 'big-o', 'sorting',
      'graph', 'tree', 'hash', 'optimization', 'recursion'
    ],
    'knowledge/programming': [
      'python', 'javascript', 'typescript', 'code', 'function', 'class',
      'api', 'library', 'framework', 'test', 'debug'
    ],
    'wiki/architecture': [
      'frame architecture', 'frame design', 'frame system', 'frame component',
      'frame management', 'frame wiki', 'how frame works'
    ],
    'wiki/tutorials': [
      'frame tutorial', 'frame guide', 'using frame', 'frame walkthrough',
      'frame quickstart', 'frame getting started'
    ],
    'frame/announcements': [
      'announcing', 'release', 'launch', 'new feature', 'roadmap',
      'milestone', 'version', 'update'
    ]
  };
  
  // Calculate scores for each category
  const scores = {};
  for (const [category, keywords] of Object.entries(categorySignals)) {
    let score = 0;
    
    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase();
      const occurrences = (content.toLowerCase().match(new RegExp(keywordLower, 'g')) || []).length;
      
      if (occurrences > 0) {
        // TF-IDF-like scoring
        tfidf.tfidfs(keywordLower, (i, measure) => {
          score += measure * occurrences;
        });
        
        // Boost for title/tag matches
        if (metadata.title?.toLowerCase().includes(keywordLower)) score += 5;
        if (metadata.tags?.some(tag => tag.toLowerCase().includes(keywordLower))) score += 3;
      }
    });
    
    scores[category] = score;
  }
  
  // Find best match
  const sorted = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .filter(([,score]) => score > 0);
  
  if (sorted.length === 0) {
    return {
      action: 'suggest',
      method: 'static-fallback',
      suggestion: {
        path: `weaves/knowledge/general/${path.basename(filePath)}`,
        confidence: 0.3,
        reasoning: 'No strong category signals detected. Defaulting to general knowledge.',
        alternatives: []
      }
    };
  }

  const [bestCategory, bestScore] = sorted[0];
  const parts = bestCategory.split('/');
  const weave = parts[0];
  const subdir = parts.slice(1).join('/');
  const targetPath = `weaves/${weave}/${subdir}/${path.basename(filePath)}`;
  
  // Normalize confidence (cap at 0.75 for static analysis)
  const maxScore = Math.max(...Object.values(scores));
  const confidence = Math.min(0.75, bestScore / maxScore * 0.75);
  
  const alternatives = sorted.slice(1, 4).map(([cat, score]) => {
    const catParts = cat.split('/');
    const altWeave = catParts[0];
    const altSubdir = catParts.slice(1).join('/');
    return {
      path: `weaves/${altWeave}/${altSubdir}/${path.basename(filePath)}`,
      confidence: Math.min(0.75, score / maxScore * 0.75),
      reasoning: `Matched ${Math.round(score)} category keywords`
    };
  });
  
  return {
    action: confidence >= 0.8 ? 'auto-move' : 'suggest',
    method: 'static-nlp',
    suggestion: {
      path: targetPath,
      confidence,
      reasoning: `Static NLP analysis matched ${Math.round(bestScore)} signals for ${weave}/${subdir}`,
      details: `Top category signals detected. Using keyword matching and TF-IDF.`,
      alternatives
    }
  };
}

// Main function
async function main() {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error(JSON.stringify({
      action: 'error',
      error: 'No file path provided'
    }));
    process.exit(1);
  }
  
  if (!fs.existsSync(filePath)) {
    console.error(JSON.stringify({
      action: 'error',
      error: `File not found: ${filePath}`
    }));
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  let metadata = {};
  
  if (frontmatterMatch) {
    const yaml = require('js-yaml');
    try {
      metadata = yaml.load(frontmatterMatch[1]);
    } catch (e) {
      // Ignore YAML errors
    }
  }
  
  // Try LLM first
  let result = await categorizeWithLLM(content, metadata, filePath);
  
  // Fallback to static if LLM failed/unavailable
  if (!result) {
    result = categorizeWithStatic(content, metadata, filePath);
  }
  
  // Output result as JSON
  console.log(JSON.stringify(result, null, 2));
}

main().catch(error => {
  console.error(JSON.stringify({
    action: 'error',
    error: error.message,
    stack: error.stack
  }));
  process.exit(1);
});
