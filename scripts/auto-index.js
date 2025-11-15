const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

// Controlled vocabulary for auto-tagging
const VOCABULARY = {
  subjects: {
    technology: ['api', 'code', 'software', 'programming', 'development', 'tech', 'system', 'architecture'],
    science: ['research', 'study', 'experiment', 'hypothesis', 'theory', 'scientific'],
    philosophy: ['ethics', 'morality', 'existence', 'consciousness', 'mind', 'thought'],
    ai: ['artificial intelligence', 'machine learning', 'neural', 'model', 'training', 'llm', 'agent'],
    knowledge: ['information', 'data', 'wisdom', 'understanding', 'learning', 'education']
  },
  topics: {
    'getting-started': ['tutorial', 'guide', 'introduction', 'beginner', 'start', 'first', 'hello'],
    'architecture': ['design', 'structure', 'pattern', 'system', 'component', 'module'],
    'api-reference': ['endpoint', 'method', 'parameter', 'response', 'request', 'rest', 'graphql'],
    'best-practices': ['recommendation', 'guideline', 'standard', 'convention', 'tip', 'advice'],
    'troubleshooting': ['error', 'issue', 'problem', 'fix', 'solution', 'debug', 'resolve']
  },
  difficulty: {
    beginner: ['basic', 'simple', 'intro', 'fundamental', 'easy', 'start'],
    intermediate: ['moderate', 'practical', 'hands-on', 'implement', 'build'],
    advanced: ['complex', 'expert', 'optimization', 'performance', 'architecture'],
    expert: ['deep-dive', 'internals', 'research', 'cutting-edge', 'novel']
  }
};

// Quality control rules
const QUALITY_RULES = {
  minTitleLength: 3,
  maxTitleLength: 100,
  minSummaryLength: 20,
  maxSummaryLength: 300,
  minContentLength: 100,
  requiredFields: ['title', 'summary'],
  forbiddenPatterns: [
    /lorem ipsum/i,
    /test test test/i,
    /todo:/i,
    /fixme:/i
  ]
};

class CodexIndexer {
  constructor() {
    this.index = [];
    this.stats = {
      totalFiles: 0,
      indexedFiles: 0,
      skippedFiles: 0,
      errors: []
    };
  }

  // Extract keywords using simple NLP
  extractKeywords(text) {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been']);
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
    
    // Count word frequency
    const wordFreq = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Return top keywords
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }

  // Auto-categorize based on content
  autoCategorizе(content, metadata = {}) {
    const text = `${metadata.title || ''} ${metadata.summary || ''} ${content}`.toLowerCase();
    const keywords = this.extractKeywords(text);
    
    const categories = {
      subjects: [],
      topics: [],
      difficulty: 'intermediate' // default
    };
    
    // Match subjects
    for (const [subject, terms] of Object.entries(VOCABULARY.subjects)) {
      if (terms.some(term => text.includes(term))) {
        categories.subjects.push(subject);
      }
    }
    
    // Match topics
    for (const [topic, terms] of Object.entries(VOCABULARY.topics)) {
      if (terms.some(term => text.includes(term))) {
        categories.topics.push(topic);
      }
    }
    
    // Determine difficulty
    for (const [level, terms] of Object.entries(VOCABULARY.difficulty)) {
      if (terms.some(term => text.includes(term))) {
        categories.difficulty = level;
        break;
      }
    }
    
    // Use existing metadata if available
    if (metadata.taxonomy?.subjects) {
      categories.subjects = [...new Set([...categories.subjects, ...metadata.taxonomy.subjects])];
    }
    if (metadata.taxonomy?.topics) {
      categories.topics = [...new Set([...categories.topics, ...metadata.taxonomy.topics])];
    }
    if (metadata.difficulty) {
      categories.difficulty = metadata.difficulty;
    }
    
    return { categories, keywords };
  }

  // Generate summary if missing
  generateSummary(content) {
    // Extract first paragraph or first 200 characters
    const paragraphs = content.trim().split(/\n\n+/);
    const firstPara = paragraphs[0] || '';
    
    if (firstPara.length <= 200) {
      return firstPara;
    }
    
    // Find sentence boundary
    const sentenceEnd = firstPara.search(/[.!?]\s/);
    if (sentenceEnd > 0 && sentenceEnd < 200) {
      return firstPara.substring(0, sentenceEnd + 1);
    }
    
    return firstPara.substring(0, 197) + '...';
  }

  // Validate content quality
  validateContent(metadata, content, filePath) {
    const errors = [];
    
    // Check required fields
    for (const field of QUALITY_RULES.requiredFields) {
      if (!metadata[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }
    
    // Check title length
    if (metadata.title) {
      if (metadata.title.length < QUALITY_RULES.minTitleLength) {
        errors.push('Title too short');
      }
      if (metadata.title.length > QUALITY_RULES.maxTitleLength) {
        errors.push('Title too long');
      }
    }
    
    // Check summary length
    if (metadata.summary) {
      if (metadata.summary.length < QUALITY_RULES.minSummaryLength) {
        errors.push('Summary too short');
      }
      if (metadata.summary.length > QUALITY_RULES.maxSummaryLength) {
        errors.push('Summary too long');
      }
    }
    
    // Check content length
    if (content.length < QUALITY_RULES.minContentLength) {
      errors.push('Content too short');
    }
    
    // Check for forbidden patterns
    for (const pattern of QUALITY_RULES.forbiddenPatterns) {
      if (pattern.test(content)) {
        errors.push(`Forbidden pattern found: ${pattern}`);
      }
    }
    
    return { valid: errors.length === 0, errors };
  }

  // Suggest improvements
  suggestImprovements(metadata, content) {
    const suggestions = [];
    
    // Missing fields
    if (!metadata.id) {
      suggestions.push('Add unique ID (UUID recommended)');
    }
    if (!metadata.version) {
      suggestions.push('Add version number (semver format)');
    }
    if (!metadata.tags || metadata.tags.length === 0) {
      const { keywords } = this.autoCategorizе(content, metadata);
      suggestions.push(`Consider adding tags: ${keywords.slice(0, 5).join(', ')}`);
    }
    if (!metadata.relationships) {
      suggestions.push('Consider adding relationships (requires, references, seeAlso)');
    }
    
    return suggestions;
  }

  // Process a single file
  processFile(filePath, basePath) {
    const relativePath = path.relative(basePath, filePath).replace(/\\/g, '/');
    const fileName = path.basename(filePath);
    const stat = fs.statSync(filePath);
    
    this.stats.totalFiles++;
    
    try {
      let metadata = {};
      let content = '';
      
      if (fileName.endsWith('.md')) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        metadata = parsed.data;
        content = parsed.content;
      } else if (fileName.endsWith('.yaml') || fileName.endsWith('.yml')) {
        content = fs.readFileSync(filePath, 'utf8');
        metadata = yaml.load(content);
      } else {
        this.stats.skippedFiles++;
        return null;
      }
      
      // Auto-fill missing metadata
      if (!metadata.title && fileName !== 'README.md') {
        metadata.title = fileName.replace(/\.(md|yaml|yml)$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      }
      
      if (!metadata.summary && content) {
        metadata.summary = this.generateSummary(content);
      }
      
      // Auto-categorize
      const { categories, keywords } = this.autoCategorizе(content, metadata);
      
      // Validate
      const { valid, errors } = this.validateContent(metadata, content, relativePath);
      
      // Generate suggestions
      const suggestions = this.suggestImprovements(metadata, content);
      
      const entry = {
        path: relativePath,
        name: fileName,
        type: 'file',
        metadata: {
          ...metadata,
          autoGenerated: {
            keywords,
            subjects: categories.subjects,
            topics: categories.topics,
            difficulty: categories.difficulty,
            lastIndexed: new Date().toISOString()
          }
        },
        validation: {
          valid,
          errors,
          suggestions
        },
        content: content.substring(0, 5000) // First 5KB for search
      };
      
      this.index.push(entry);
      this.stats.indexedFiles++;
      
      return entry;
      
    } catch (error) {
      this.stats.errors.push({
        file: relativePath,
        error: error.message
      });
      this.stats.skippedFiles++;
      return null;
    }
  }

  // Walk directory recursively
  walkDirectory(dir, basePath) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      if (file.startsWith('.')) return; // Skip hidden files
      
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.walkDirectory(filePath, basePath);
      } else {
        this.processFile(filePath, basePath);
      }
    });
  }

  // Generate index report
  generateReport() {
    const report = {
      summary: {
        totalFiles: this.stats.totalFiles,
        indexedFiles: this.stats.indexedFiles,
        skippedFiles: this.stats.skippedFiles,
        validFiles: this.index.filter(e => e.validation.valid).length,
        filesWithErrors: this.index.filter(e => !e.validation.valid).length,
        filesWithSuggestions: this.index.filter(e => e.validation.suggestions.length > 0).length
      },
      categorization: {
        bySubject: {},
        byTopic: {},
        byDifficulty: {}
      },
      validation: {
        commonErrors: {},
        fileErrors: []
      }
    };
    
    // Analyze categorization
    this.index.forEach(entry => {
      const auto = entry.metadata.autoGenerated;
      
      auto.subjects.forEach(subject => {
        report.categorization.bySubject[subject] = (report.categorization.bySubject[subject] || 0) + 1;
      });
      
      auto.topics.forEach(topic => {
        report.categorization.byTopic[topic] = (report.categorization.byTopic[topic] || 0) + 1;
      });
      
      report.categorization.byDifficulty[auto.difficulty] = (report.categorization.byDifficulty[auto.difficulty] || 0) + 1;
      
      // Track validation errors
      if (!entry.validation.valid) {
        report.validation.fileErrors.push({
          path: entry.path,
          errors: entry.validation.errors
        });
        
        entry.validation.errors.forEach(error => {
          report.validation.commonErrors[error] = (report.validation.commonErrors[error] || 0) + 1;
        });
      }
    });
    
    return report;
  }

  // Build and save index
  build(baseDir = '.') {
    console.log('Building Codex index...\n');
    
    // Walk directories
    const dirs = ['weaves', 'schema', 'docs', 'wiki'];
    dirs.forEach(dir => {
      const dirPath = path.join(baseDir, dir);
      if (fs.existsSync(dirPath)) {
        console.log(`Indexing ${dir}/...`);
        this.walkDirectory(dirPath, baseDir);
      }
    });
    
    // Generate report
    const report = this.generateReport();
    
    // Save index
    fs.writeFileSync(
      path.join(baseDir, 'codex-index.json'),
      JSON.stringify(this.index, null, 2)
    );
    
    // Save report
    fs.writeFileSync(
      path.join(baseDir, 'codex-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    // Print summary
    console.log('\nIndexing complete!');
    console.log(`Total files processed: ${report.summary.totalFiles}`);
    console.log(`Successfully indexed: ${report.summary.indexedFiles}`);
    console.log(`Valid files: ${report.summary.validFiles}`);
    console.log(`Files with errors: ${report.summary.filesWithErrors}`);
    console.log(`Files with suggestions: ${report.summary.filesWithSuggestions}`);
    
    if (report.validation.fileErrors.length > 0) {
      console.log('\nValidation errors found:');
      report.validation.fileErrors.slice(0, 5).forEach(({ path, errors }) => {
        console.log(`  ${path}:`);
        errors.forEach(error => console.log(`    - ${error}`));
      });
      if (report.validation.fileErrors.length > 5) {
        console.log(`  ... and ${report.validation.fileErrors.length - 5} more files with errors`);
      }
    }
    
    return report;
  }
}

// Run if called directly
if (require.main === module) {
  const indexer = new CodexIndexer();
  indexer.build();
}

module.exports = CodexIndexer;
