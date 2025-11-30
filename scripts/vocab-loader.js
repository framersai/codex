/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Vocabulary Loader with Stemming & Normalization
 * @module scripts/vocab-loader
 * 
 * Loads vocabulary from external text files with:
 * - Porter Stemmer for normalization
 * - Lemmatization fallbacks
 * - Synonym expansion
 * - Stop word filtering
 * 
 * Directory Structure:
 *   vocab/
 *   ├── subjects/       # Subject vocabularies (technology.txt, science.txt, etc.)
 *   ├── topics/         # Topic vocabularies (getting-started.txt, etc.)
 *   ├── difficulty/     # Difficulty indicators (beginner.txt, etc.)
 *   └── stopwords.txt   # Stop words list
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════════════════
// PORTER STEMMER IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Porter Stemmer - reduces words to their root form
 * Based on the Porter Stemming Algorithm (1980)
 */
class PorterStemmer {
  constructor() {
    this.step2list = {
      'ational': 'ate', 'tional': 'tion', 'enci': 'ence', 'anci': 'ance',
      'izer': 'ize', 'bli': 'ble', 'alli': 'al', 'entli': 'ent',
      'eli': 'e', 'ousli': 'ous', 'ization': 'ize', 'ation': 'ate',
      'ator': 'ate', 'alism': 'al', 'iveness': 'ive', 'fulness': 'ful',
      'ousness': 'ous', 'aliti': 'al', 'iviti': 'ive', 'biliti': 'ble',
      'logi': 'log'
    };

    this.step3list = {
      'icate': 'ic', 'ative': '', 'alize': 'al', 'iciti': 'ic',
      'ical': 'ic', 'ful': '', 'ness': ''
    };

    this.c = '[^aeiou]';          // consonant
    this.v = '[aeiouy]';          // vowel
    this.C = this.c + '[^aeiouy]*'; // consonant sequence
    this.V = this.v + '[aeiou]*';   // vowel sequence

    this.mgr0 = new RegExp('^(' + this.C + ')?' + this.V + this.C);
    this.meq1 = new RegExp('^(' + this.C + ')?' + this.V + this.C + '(' + this.V + ')?$');
    this.mgr1 = new RegExp('^(' + this.C + ')?' + this.V + this.C + this.V + this.C);
    this.s_v = new RegExp('^(' + this.C + ')?' + this.v);
  }

  stem(w) {
    let stem, suffix, re, re2, re3, re4;

    if (w.length < 3) return w;

    const firstch = w.charAt(0);
    if (firstch === 'y') {
      w = firstch.toUpperCase() + w.slice(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(w)) {
      w = w.replace(re, '$1$2');
    } else if (re2.test(w)) {
      w = w.replace(re2, '$1$2');
    }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;

    if (re.test(w)) {
      const fp = re.exec(w);
      re = this.mgr0;
      if (re.test(fp[1])) {
        re = /.$/;
        w = w.replace(re, '');
      }
    } else if (re2.test(w)) {
      const fp = re2.exec(w);
      stem = fp[1];
      re2 = this.s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = /(at|bl|iz)$/;
        re3 = new RegExp('([^aeiouylsz])\\1$');
        re4 = new RegExp('^' + this.C + this.v + '[^aeiouwxy]$');
        if (re2.test(w)) {
          w = w + 'e';
        } else if (re3.test(w)) {
          re = /.$/;
          w = w.replace(re, '');
        } else if (re4.test(w)) {
          w = w + 'e';
        }
      }
    }

    // Step 1c
    re = /^(.+?)y$/;
    if (re.test(w)) {
      const fp = re.exec(w);
      stem = fp[1];
      re = this.s_v;
      if (re.test(stem)) {
        w = stem + 'i';
      }
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      const fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = this.mgr0;
      if (re.test(stem)) {
        w = stem + this.step2list[suffix];
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      const fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = this.mgr0;
      if (re.test(stem)) {
        w = stem + this.step3list[suffix];
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      const fp = re.exec(w);
      stem = fp[1];
      re = this.mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      const fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = this.mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(w)) {
      const fp = re.exec(w);
      stem = fp[1];
      re = this.mgr1;
      re2 = this.meq1;
      re3 = new RegExp('^' + this.C + this.v + '[^aeiouwxy]$');
      if (re.test(stem) || (re2.test(stem) && !re3.test(stem))) {
        w = stem;
      }
    }

    re = /ll$/;
    re2 = this.mgr1;
    if (re.test(w) && re2.test(w)) {
      re = /.$/;
      w = w.replace(re, '');
    }

    if (firstch === 'y') {
      w = firstch.toLowerCase() + w.slice(1);
    }

    return w;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// VOCABULARY LOADER
// ═══════════════════════════════════════════════════════════════════════════

class VocabularyLoader {
  constructor(vocabDir = path.join(__dirname, '..', 'vocab')) {
    this.vocabDir = vocabDir;
    this.stemmer = new PorterStemmer();
    this.cache = new Map();
    this.stopWords = null;
    this.vocabularies = {
      subjects: new Map(),
      topics: new Map(),
      difficulty: new Map()
    };
    this.stemmedIndex = new Map(); // Maps stemmed words to original terms
  }

  /**
   * Normalize a term: lowercase, trim, remove special chars
   */
  normalize(term) {
    return term
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Stem a term using Porter Stemmer
   */
  stem(term) {
    const normalized = this.normalize(term);
    if (!normalized) return '';
    
    // Handle compound terms (split on hyphen, stem each part)
    if (normalized.includes('-')) {
      return normalized.split('-').map(p => this.stemmer.stem(p)).join('-');
    }
    
    return this.stemmer.stem(normalized);
  }

  /**
   * Load a vocabulary file
   * @param {string} filePath - Path to vocabulary file
   * @returns {Set<string>} Set of normalized terms
   */
  loadFile(filePath) {
    if (this.cache.has(filePath)) {
      return this.cache.get(filePath);
    }

    if (!fs.existsSync(filePath)) {
      console.warn(`[VocabLoader] File not found: ${filePath}`);
      return new Set();
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const terms = new Set();
    const stemmedTerms = new Set();

    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const normalized = this.normalize(trimmed);
      if (normalized) {
        terms.add(normalized);
        
        // Also add stemmed version
        const stemmed = this.stem(normalized);
        if (stemmed) {
          stemmedTerms.add(stemmed);
          
          // Track original term for stemmed lookup
          if (!this.stemmedIndex.has(stemmed)) {
            this.stemmedIndex.set(stemmed, new Set());
          }
          this.stemmedIndex.get(stemmed).add(normalized);
        }
      }
    }

    // Merge original and stemmed terms
    const allTerms = new Set([...terms, ...stemmedTerms]);
    this.cache.set(filePath, allTerms);
    
    return allTerms;
  }

  /**
   * Load stop words
   */
  loadStopWords() {
    if (this.stopWords) return this.stopWords;
    
    const stopWordsPath = path.join(this.vocabDir, 'stopwords.txt');
    this.stopWords = this.loadFile(stopWordsPath);
    
    // Add stemmed versions of stop words
    const stemmed = new Set();
    for (const word of this.stopWords) {
      stemmed.add(this.stem(word));
    }
    this.stopWords = new Set([...this.stopWords, ...stemmed]);
    
    return this.stopWords;
  }

  /**
   * Check if a word is a stop word
   */
  isStopWord(word) {
    const stopWords = this.loadStopWords();
    const normalized = this.normalize(word);
    const stemmed = this.stem(word);
    return stopWords.has(normalized) || stopWords.has(stemmed);
  }

  /**
   * Load all vocabularies for a category
   * @param {string} category - 'subjects', 'topics', or 'difficulty'
   */
  loadCategory(category) {
    if (this.vocabularies[category].size > 0) {
      return this.vocabularies[category];
    }

    const categoryDir = path.join(this.vocabDir, category);
    if (!fs.existsSync(categoryDir)) {
      console.warn(`[VocabLoader] Category directory not found: ${categoryDir}`);
      return new Map();
    }

    const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.txt'));
    
    for (const file of files) {
      const name = path.basename(file, '.txt');
      const filePath = path.join(categoryDir, file);
      const terms = this.loadFile(filePath);
      this.vocabularies[category].set(name, terms);
    }

    return this.vocabularies[category];
  }

  /**
   * Load all vocabularies
   */
  loadAll() {
    this.loadStopWords();
    this.loadCategory('subjects');
    this.loadCategory('topics');
    this.loadCategory('difficulty');
    return this;
  }

  /**
   * Classify text against all vocabularies
   * @param {string} text - Text to classify
   * @returns {Object} Classification results with confidence scores
   */
  classify(text) {
    const results = {
      subjects: [],
      topics: [],
      difficulty: 'intermediate',
      confidence: {}
    };

    // Tokenize and stem text
    const tokens = this.tokenize(text);
    const stemmedTokens = tokens.map(t => this.stem(t));
    const tokenSet = new Set([...tokens, ...stemmedTokens]);

    // Check subjects
    const subjects = this.loadCategory('subjects');
    for (const [subject, terms] of subjects) {
      const matches = [...terms].filter(t => tokenSet.has(t) || tokenSet.has(this.stem(t)));
      if (matches.length > 0) {
        const confidence = Math.min(matches.length / 5, 1); // Normalize to 0-1
        results.subjects.push(subject);
        results.confidence[subject] = confidence;
      }
    }

    // Check topics
    const topics = this.loadCategory('topics');
    for (const [topic, terms] of topics) {
      const matches = [...terms].filter(t => tokenSet.has(t) || tokenSet.has(this.stem(t)));
      if (matches.length > 0) {
        const confidence = Math.min(matches.length / 3, 1);
        results.topics.push(topic);
        results.confidence[topic] = confidence;
      }
    }

    // Check difficulty
    const difficulty = this.loadCategory('difficulty');
    let maxScore = 0;
    let detectedDifficulty = 'intermediate';
    
    for (const [level, terms] of difficulty) {
      const matches = [...terms].filter(t => tokenSet.has(t) || tokenSet.has(this.stem(t)));
      if (matches.length > maxScore) {
        maxScore = matches.length;
        detectedDifficulty = level;
      }
    }
    results.difficulty = detectedDifficulty;

    return results;
  }

  /**
   * Tokenize text into words
   */
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1 && !this.isStopWord(w));
  }

  /**
   * Extract keywords with TF-IDF-like scoring
   */
  extractKeywords(text, limit = 20) {
    const tokens = this.tokenize(text);
    const freq = new Map();

    for (const token of tokens) {
      const stemmed = this.stem(token);
      freq.set(stemmed, (freq.get(stemmed) || 0) + 1);
    }

    // Score by frequency * word length
    const scored = [...freq.entries()]
      .map(([word, count]) => ({
        word,
        original: this.stemmedIndex.get(word)?.values().next().value || word,
        score: count * Math.log(word.length + 1)
      }))
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit);
  }

  /**
   * Get vocabulary statistics
   */
  getStats() {
    return {
      stopWords: this.stopWords?.size || 0,
      subjects: Object.fromEntries(
        [...this.vocabularies.subjects.entries()].map(([k, v]) => [k, v.size])
      ),
      topics: Object.fromEntries(
        [...this.vocabularies.topics.entries()].map(([k, v]) => [k, v.size])
      ),
      difficulty: Object.fromEntries(
        [...this.vocabularies.difficulty.entries()].map(([k, v]) => [k, v.size])
      ),
      totalTerms: [...this.vocabularies.subjects.values()].reduce((a, b) => a + b.size, 0) +
                  [...this.vocabularies.topics.values()].reduce((a, b) => a + b.size, 0) +
                  [...this.vocabularies.difficulty.values()].reduce((a, b) => a + b.size, 0),
      stemmedIndex: this.stemmedIndex.size
    };
  }

  /**
   * Convert to legacy VOCABULARY format for backwards compatibility
   */
  toLegacyFormat() {
    const legacy = {
      subjects: {},
      topics: {},
      difficulty: {}
    };

    for (const [name, terms] of this.vocabularies.subjects) {
      legacy.subjects[name] = [...terms];
    }
    for (const [name, terms] of this.vocabularies.topics) {
      legacy.topics[name] = [...terms];
    }
    for (const [name, terms] of this.vocabularies.difficulty) {
      legacy.difficulty[name] = [...terms];
    }

    return legacy;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

// Singleton instance
let instance = null;

function getVocabularyLoader() {
  if (!instance) {
    instance = new VocabularyLoader();
    instance.loadAll();
  }
  return instance;
}

module.exports = {
  VocabularyLoader,
  PorterStemmer,
  getVocabularyLoader,
};
