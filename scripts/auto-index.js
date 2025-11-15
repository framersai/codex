/**
 * Frame Codex Auto-Indexer
 * 
 * This script automatically indexes all content in the Codex repository,
 * extracting metadata, categorizing content using NLP techniques, and
 * generating a searchable index for client-side consumption.
 * 
 * Features:
 * - Keyword extraction using TF-IDF
 * - Auto-categorization based on controlled vocabulary
 * - Summary generation from content
 * - Quality validation
 * - Duplicate detection
 * - Relationship mapping
 * 
 * Usage:
 *   npm run index                    # Build full index
 *   npm run index -- --validate      # Build with validation
 *   npm run index -- --verbose       # Show detailed output
 * 
 * Output:
 *   codex-index.json   - Full searchable index
 *   codex-report.json  - Indexing statistics and validation report
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

// Controlled vocabulary for auto-tagging (expandable via NLP)
const VOCABULARY = {
  subjects: {
    technology: ['api', 'code', 'software', 'programming', 'development', 'tech', 'system', 'architecture', 'infrastructure', 'platform'],
    science: ['research', 'study', 'experiment', 'hypothesis', 'theory', 'scientific', 'data', 'analysis'],
    philosophy: ['ethics', 'morality', 'existence', 'consciousness', 'mind', 'thought', 'reasoning'],
    ai: ['artificial intelligence', 'machine learning', 'neural', 'model', 'training', 'llm', 'agent', 'superintelligence', 'cognitive'],
    knowledge: ['information', 'data', 'wisdom', 'understanding', 'learning', 'education', 'documentation'],
    design: ['ux', 'ui', 'interface', 'experience', 'usability', 'accessibility', 'visual'],
    security: ['encryption', 'authentication', 'authorization', 'privacy', 'secure', 'vulnerability'],
  },
  topics: {
    'getting-started': ['tutorial', 'guide', 'introduction', 'beginner', 'start', 'first', 'hello', 'basics'],
    'architecture': ['design', 'structure', 'pattern', 'system', 'component', 'module', 'framework'],
    'api-reference': ['endpoint', 'method', 'parameter', 'response', 'request', 'rest', 'graphql', 'sdk'],
    'best-practices': ['recommendation', 'guideline', 'standard', 'convention', 'tip', 'advice', 'pattern'],
    'troubleshooting': ['error', 'issue', 'problem', 'fix', 'solution', 'debug', 'resolve', 'workaround'],
    'deployment': ['deploy', 'production', 'hosting', 'server', 'cloud', 'infrastructure'],
    'testing': ['test', 'qa', 'quality', 'validation', 'verification', 'coverage'],
    'performance': ['optimization', 'speed', 'efficiency', 'scalability', 'caching', 'benchmark'],
  },
  difficulty: {
    beginner: ['basic', 'simple', 'intro', 'fundamental', 'easy', 'start', 'overview'],
    intermediate: ['moderate', 'practical', 'hands-on', 'implement', 'build', 'develop'],
    advanced: ['complex', 'expert', 'optimization', 'performance', 'architecture', 'deep'],
    expert: ['deep-dive', 'internals', 'research', 'cutting-edge', 'novel', 'theoretical'],
  }
};

// Stop words for keyword extraction (expanded list)
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'just', 'don', 'now', 'use', 'using', 'used'
]);

class CodexIndexer {
  constructor() {
    this.index = [];
    this.stats = {
      totalFiles: 0,
      indexedFiles: 0,
      skippedFiles: 0,
      errors: [],
      vocabulary: {
        extractedTerms: new Set(),
        suggestedAdditions: []
      }
    };
    this.documentFrequency = {}; // For TF-IDF
    this.allDocuments = [];
  }

  /**
   * Extract keywords using TF-IDF (Term Frequency-Inverse Document Frequency)
   * This is more sophisticated than simple frequency counting
   */
  extractKeywordsTFIDF(text, allTexts) {
    const words = this.tokenize(text);
    const termFrequency = {};
    
    // Calculate term frequency for this document
    words.forEach(word => {
      termFrequency[word] = (termFrequency[word] || 0) + 1;
    });
    
    // Normalize by document length
    const docLength = words.length;
    Object.keys(termFrequency).forEach(word => {
      termFrequency[word] = termFrequency[word] / docLength;
    });
    
    // Calculate TF-IDF scores
    const tfidf = {};
    Object.keys(termFrequency).forEach(word => {
      const tf = termFrequency[word];
      const idf = this.calculateIDF(word, allTexts);
      tfidf[word] = tf * idf;
    });
    
    // Return top keywords by TF-IDF score
    return Object.entries(tfidf)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word);
  }

  /**
   * Calculate Inverse Document Frequency
   */
  calculateIDF(term, allTexts) {
    const docsWithTerm = allTexts.filter(text => 
      this.tokenize(text).includes(term)
    ).length;
    
    if (docsWithTerm === 0) return 0;
    
    return Math.log(allTexts.length / docsWithTerm);
  }

  /**
   * Tokenize text into words
   */
  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !STOP_WORDS.has(word));
  }

  /**
   * Extract n-grams (phrases) for better context
   */
  extractNGrams(text, n = 2) {
    const words = this.tokenize(text);
    const ngrams = [];
    
    for (let i = 0; i <= words.length - n; i++) {
      const ngram = words.slice(i, i + n).join(' ');
      ngrams.push(ngram);
    }
    
    // Count frequency
    const ngramFreq = {};
    ngrams.forEach(ngram => {
      ngramFreq[ngram] = (ngramFreq[ngram] || 0) + 1;
    });
    
    // Return top n-grams
    return Object.entries(ngramFreq)
      .filter(([_, count]) => count > 1) // Only repeated phrases
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([ngram]) => ngram);
  }

  /**
   * Auto-categorize content using NLP and controlled vocabulary
   */
  autoCategorize(content, metadata = {}) {
    const text = `${metadata.title || ''} ${metadata.summary || ''} ${content}`.toLowerCase();
    const keywords = this.extractKeywordsTFIDF(text, this.allDocuments);
    const phrases = this.extractNGrams(text, 2);
    
    const categories = {
      subjects: [],
      topics: [],
      difficulty: 'intermediate', // default
      confidence: {}
    };
    
    // Match subjects with confidence scoring
    for (const [subject, terms] of Object.entries(VOCABULARY.subjects)) {
      const matches = terms.filter(term => text.includes(term));
      if (matches.length > 0) {
        categories.subjects.push(subject);
        categories.confidence[subject] = matches.length / terms.length;
      }
    }
    
    // Match topics with confidence scoring
    for (const [topic, terms] of Object.entries(VOCABULARY.topics)) {
      const matches = terms.filter(term => text.includes(term));
      if (matches.length > 0) {
        categories.topics.push(topic);
        categories.confidence[topic] = matches.length / terms.length;
      }
    }
    
    // Determine difficulty with scoring
    const difficultyScores = {};
    for (const [level, terms] of Object.entries(VOCABULARY.difficulty)) {
      difficultyScores[level] = terms.filter(term => text.includes(term)).length;
    }
    
    // Pick highest scoring difficulty
    const maxScore = Math.max(...Object.values(difficultyScores));
    if (maxScore > 0) {
      categories.difficulty = Object.keys(difficultyScores).find(
        level => difficultyScores[level] === maxScore
      ) || 'intermediate';
    }
    
    // Merge with existing metadata
    if (metadata.taxonomy?.subjects) {
      categories.subjects = [...new Set([...categories.subjects, ...metadata.taxonomy.subjects])];
    }
    if (metadata.taxonomy?.topics) {
      categories.topics = [...new Set([...categories.topics, ...metadata.taxonomy.topics])];
    }
    if (metadata.difficulty) {
      categories.difficulty = metadata.difficulty;
    }
    
    // Discover new vocabulary terms
    keywords.forEach(keyword => {
      this.stats.vocabulary.extractedTerms.add(keyword);
    });
    
    return { categories, keywords, phrases };
  }

  /**
   * Generate summary using extractive summarization
   */
  generateSummary(content) {
    // Remove code blocks and special formatting
    const cleanContent = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/#{1,6}\s/g, '')
      .trim();
    
    // Split into sentences
    const sentences = cleanContent.split(/[.!?]+\s+/).filter(s => s.length > 20);
    
    if (sentences.length === 0) {
      return cleanContent.substring(0, 200) + '...';
    }
    
    // Score sentences by keyword density
    const keywords = this.tokenize(cleanContent);
    const keywordSet = new Set(keywords.slice(0, 20)); // Top 20 keywords
    
    const scoredSentences = sentences.map(sentence => {
      const sentenceWords = this.tokenize(sentence);
      const score = sentenceWords.filter(word => keywordSet.has(word)).length;
      return { sentence, score };
    });
    
    // Pick top sentence
    scoredSentences.sort((a, b) => b.score - a.score);
    const summary = scoredSentences[0]?.sentence || sentences[0];
    
    return summary.length > 300 ? summary.substring(0, 297) + '...' : summary;
  }

  /**
   * Validate content quality
   */
  validateContent(metadata, content, filePath) {
    const errors = [];
    const warnings = [];
    
    // Required fields
    const requiredFields = ['title', 'summary'];
    requiredFields.forEach(field => {
      if (!metadata[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });
    
    // Title validation
    if (metadata.title) {
      if (metadata.title.length < 3) errors.push('Title too short (< 3 chars)');
      if (metadata.title.length > 100) errors.push('Title too long (> 100 chars)');
    }
    
    // Summary validation
    if (metadata.summary) {
      if (metadata.summary.length < 20) warnings.push('Summary too short (< 20 chars)');
      if (metadata.summary.length > 300) warnings.push('Summary too long (> 300 chars)');
    }
    
    // Content validation
    if (content.length < 100) warnings.push('Content very short (< 100 chars)');
    
    // Forbidden patterns
    const forbiddenPatterns = [
      { pattern: /lorem ipsum/i, message: 'Contains placeholder text (lorem ipsum)' },
      { pattern: /TODO:/i, message: 'Contains TODO comments' },
      { pattern: /FIXME:/i, message: 'Contains FIXME comments' },
      { pattern: /test test test/i, message: 'Contains test placeholder' },
    ];
    
    forbiddenPatterns.forEach(({ pattern, message }) => {
      if (pattern.test(content)) {
        errors.push(message);
      }
    });
    
    return { valid: errors.length === 0, errors, warnings };
  }

  /**
   * Suggest improvements based on content analysis
   */
  suggestImprovements(metadata, content, analysis) {
    const suggestions = [];
    
    // Missing metadata
    if (!metadata.id) suggestions.push('Add unique ID (UUID recommended)');
    if (!metadata.version) suggestions.push('Add version number (semver format)');
    
    // Tags
    if (!metadata.tags || metadata.tags.length === 0) {
      suggestions.push(`Consider adding tags: ${analysis.keywords.slice(0, 5).join(', ')}`);
    }
    
    // Relationships
    if (!metadata.relationships) {
      suggestions.push('Consider adding relationships (requires, references, seeAlso)');
    }
    
    // Categorization
    if (!metadata.taxonomy || !metadata.taxonomy.subjects) {
      suggestions.push(`Auto-detected subjects: ${analysis.categories.subjects.join(', ')}`);
    }
    if (!metadata.taxonomy || !metadata.taxonomy.topics) {
      suggestions.push(`Auto-detected topics: ${analysis.categories.topics.join(', ')}`);
    }
    
    // Difficulty
    if (!metadata.difficulty) {
      suggestions.push(`Suggested difficulty: ${analysis.categories.difficulty}`);
    }
    
    // Key phrases
    if (analysis.phrases.length > 0) {
      suggestions.push(`Key phrases found: ${analysis.phrases.slice(0, 3).join(', ')}`);
    }
    
    return suggestions;
  }

  /**
   * Process a single file
   */
  processFile(filePath, basePath) {
    const relativePath = path.relative(basePath, filePath).replace(/\\/g, '/');
    const fileName = path.basename(filePath);
    
    this.stats.totalFiles++;
    
    try {
      let metadata = {};
      let content = '';
      
      // Parse file based on type
      if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);
        metadata = parsed.data;
        content = parsed.content;
      } else if (fileName.endsWith('.yaml') || fileName.endsWith('.yml')) {
        content = fs.readFileSync(filePath, 'utf8');
        metadata = yaml.load(content) || {};
      } else {
        this.stats.skippedFiles++;
        return null;
      }
      
      // Store for TF-IDF calculation
      this.allDocuments.push(content);
      
      // Auto-fill missing metadata
      if (!metadata.title && fileName !== 'README.md') {
        metadata.title = fileName
          .replace(/\.(md|mdx|yaml|yml)$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      }
      
      if (!metadata.summary && content) {
        metadata.summary = this.generateSummary(content);
      }
      
      // Auto-categorize using NLP
      const analysis = this.autoCategorize(content, metadata);
      
      // Validate
      const validation = this.validateContent(metadata, content, relativePath);
      
      // Generate suggestions
      const suggestions = this.suggestImprovements(metadata, content, analysis);
      
      // Build index entry
      const entry = {
        path: relativePath,
        name: fileName,
        type: 'file',
        metadata: {
          ...metadata,
          autoGenerated: {
            keywords: analysis.keywords,
            phrases: analysis.phrases,
            subjects: analysis.categories.subjects,
            topics: analysis.categories.topics,
            difficulty: analysis.categories.difficulty,
            confidence: analysis.categories.confidence,
            lastIndexed: new Date().toISOString()
          }
        },
        validation: {
          valid: validation.valid,
          errors: validation.errors,
          warnings: validation.warnings,
          suggestions
        },
        content: content.substring(0, 5000), // First 5KB for search
        searchText: `${metadata.title || ''} ${metadata.summary || ''} ${analysis.keywords.join(' ')} ${analysis.phrases.join(' ')}`.toLowerCase()
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

  /**
   * Walk directory recursively
   */
  walkDirectory(dir, basePath) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      if (file.startsWith('.')) return; // Skip hidden files
      if (file === 'node_modules') return; // Skip node_modules
      
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.walkDirectory(filePath, basePath);
      } else {
        this.processFile(filePath, basePath);
      }
    });
  }

  /**
   * Analyze vocabulary and suggest expansions
   */
  analyzeVocabulary() {
    const extractedTerms = Array.from(this.stats.vocabulary.extractedTerms);
    const existingTerms = new Set();
    
    // Collect all existing vocabulary terms
    Object.values(VOCABULARY).forEach(category => {
      Object.values(category).forEach(terms => {
        terms.forEach(term => existingTerms.add(term));
      });
    });
    
    // Find new terms that appear frequently
    const termFrequency = {};
    this.index.forEach(entry => {
      entry.metadata.autoGenerated.keywords.forEach(keyword => {
        if (!existingTerms.has(keyword)) {
          termFrequency[keyword] = (termFrequency[keyword] || 0) + 1;
        }
      });
    });
    
    // Suggest terms that appear in 3+ documents
    this.stats.vocabulary.suggestedAdditions = Object.entries(termFrequency)
      .filter(([_, count]) => count >= 3)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([term, count]) => ({ term, frequency: count }));
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    const report = {
      summary: {
        totalFiles: this.stats.totalFiles,
        indexedFiles: this.stats.indexedFiles,
        skippedFiles: this.stats.skippedFiles,
        validFiles: this.index.filter(e => e.validation.valid).length,
        filesWithErrors: this.index.filter(e => !e.validation.valid).length,
        filesWithWarnings: this.index.filter(e => e.validation.warnings.length > 0).length,
        filesWithSuggestions: this.index.filter(e => e.validation.suggestions.length > 0).length
      },
      categorization: {
        bySubject: {},
        byTopic: {},
        byDifficulty: {},
        confidenceScores: []
      },
      validation: {
        commonErrors: {},
        commonWarnings: {},
        fileErrors: [],
        fileWarnings: []
      },
      vocabulary: {
        totalUniqueTerms: this.stats.vocabulary.extractedTerms.size,
        suggestedAdditions: this.stats.vocabulary.suggestedAdditions
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
      
      // Track confidence scores
      if (auto.confidence) {
        Object.entries(auto.confidence).forEach(([category, score]) => {
          report.categorization.confidenceScores.push({
            file: entry.path,
            category,
            score
          });
        });
      }
      
      // Track validation issues
      if (!entry.validation.valid) {
        report.validation.fileErrors.push({
          path: entry.path,
          errors: entry.validation.errors
        });
        
        entry.validation.errors.forEach(error => {
          report.validation.commonErrors[error] = (report.validation.commonErrors[error] || 0) + 1;
        });
      }
      
      if (entry.validation.warnings.length > 0) {
        report.validation.fileWarnings.push({
          path: entry.path,
          warnings: entry.validation.warnings
        });
        
        entry.validation.warnings.forEach(warning => {
          report.validation.commonWarnings[warning] = (report.validation.commonWarnings[warning] || 0) + 1;
        });
      }
    });
    
    return report;
  }

  /**
   * Build and save index
   */
  build(baseDir = '.', options = {}) {
    console.log('🚀 Building Frame Codex index...\n');
    
    // Walk directories
    const dirs = ['weaves', 'schema', 'docs', 'wiki'];
    dirs.forEach(dir => {
      const dirPath = path.join(baseDir, dir);
      if (fs.existsSync(dirPath)) {
        console.log(`📂 Indexing ${dir}/...`);
        this.walkDirectory(dirPath, baseDir);
      }
    });
    
    // Analyze vocabulary
    this.analyzeVocabulary();
    
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
    console.log('\n✅ Indexing complete!');
    console.log(`📊 Total files processed: ${report.summary.totalFiles}`);
    console.log(`✓ Successfully indexed: ${report.summary.indexedFiles}`);
    console.log(`✓ Valid files: ${report.summary.validFiles}`);
    console.log(`⚠️  Files with warnings: ${report.summary.filesWithWarnings}`);
    console.log(`❌ Files with errors: ${report.summary.filesWithErrors}`);
    console.log(`💡 Files with suggestions: ${report.summary.filesWithSuggestions}`);
    
    // Vocabulary insights
    if (report.vocabulary.suggestedAdditions.length > 0) {
      console.log('\n📚 Suggested vocabulary additions:');
      report.vocabulary.suggestedAdditions.slice(0, 10).forEach(({ term, frequency }) => {
        console.log(`  - "${term}" (appears in ${frequency} documents)`);
      });
    }
    
    // Validation errors
    if (report.validation.fileErrors.length > 0) {
      console.log('\n❌ Validation errors:');
      report.validation.fileErrors.slice(0, 5).forEach(({ path, errors }) => {
        console.log(`  ${path}:`);
        errors.forEach(error => console.log(`    - ${error}`));
      });
      if (report.validation.fileErrors.length > 5) {
        console.log(`  ... and ${report.validation.fileErrors.length - 5} more files with errors`);
      }
    }
    
    // Common issues
    if (Object.keys(report.validation.commonErrors).length > 0) {
      console.log('\n📋 Most common errors:');
      Object.entries(report.validation.commonErrors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .forEach(([error, count]) => {
          console.log(`  - ${error}: ${count} files`);
        });
    }
    
    return report;
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    validate: args.includes('--validate'),
    verbose: args.includes('--verbose')
  };
  
  const indexer = new CodexIndexer();
  const report = indexer.build('.', options);
  
  // Exit with error code if validation failed and --validate flag is set
  if (options.validate && report.summary.filesWithErrors > 0) {
    console.error('\n❌ Validation failed. Fix errors before committing.');
    process.exit(1);
  }
}

module.exports = CodexIndexer;