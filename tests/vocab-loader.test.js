/**
 * Vocabulary Loader Tests
 * @module tests/vocab-loader.test
 * 
 * Tests for the NLP vocabulary loading and classification system
 */

import { describe, it, expect, beforeAll } from 'vitest';
import path from 'path';

// Import the vocab loader
const { VocabularyLoader, PorterStemmer, getVocabularyLoader } = require('../scripts/vocab-loader');

/* ═══════════════════════════════════════════════════════════════════════════
   PORTER STEMMER TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('PorterStemmer', () => {
  let stemmer;
  
  beforeAll(() => {
    stemmer = new PorterStemmer();
  });
  
  it('stems plural words', () => {
    expect(stemmer.stem('cats')).toBe('cat');
    expect(stemmer.stem('dogs')).toBe('dog');
    expect(stemmer.stem('buses')).toBe('bus');
  });
  
  it('stems -ing words', () => {
    expect(stemmer.stem('running')).toBe('run');
    expect(stemmer.stem('coding')).toBe('code');
    expect(stemmer.stem('programming')).toBe('program');
  });
  
  it('stems -ed words', () => {
    expect(stemmer.stem('coded')).toBe('code');
    expect(stemmer.stem('jumped')).toBe('jump');
  });
  
  it('handles short words', () => {
    expect(stemmer.stem('a')).toBe('a');
    expect(stemmer.stem('an')).toBe('an');
    expect(stemmer.stem('the')).toBe('the');
  });
  
  it('handles already stemmed words', () => {
    expect(stemmer.stem('run')).toBe('run');
    expect(stemmer.stem('test')).toBe('test');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   VOCABULARY LOADER TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('VocabularyLoader', () => {
  let loader;
  
  beforeAll(() => {
    loader = getVocabularyLoader();
  });
  
  describe('initialization', () => {
    it('loads stop words', () => {
      const stopWords = loader.loadStopWords();
      expect(stopWords).toBeInstanceOf(Set);
      expect(stopWords.size).toBeGreaterThan(50);
      expect(stopWords.has('the')).toBe(true);
      expect(stopWords.has('and')).toBe(true);
    });
    
    it('loads subjects vocabulary', () => {
      const subjects = loader.loadCategory('subjects');
      expect(subjects).toBeInstanceOf(Map);
      expect(subjects.size).toBeGreaterThan(0);
      expect(subjects.has('technology')).toBe(true);
    });
    
    it('loads topics vocabulary', () => {
      const topics = loader.loadCategory('topics');
      expect(topics).toBeInstanceOf(Map);
      expect(topics.size).toBeGreaterThan(0);
    });
    
    it('loads difficulty vocabulary', () => {
      const difficulty = loader.loadCategory('difficulty');
      expect(difficulty).toBeInstanceOf(Map);
      expect(difficulty.has('beginner')).toBe(true);
      expect(difficulty.has('advanced')).toBe(true);
    });
    
    it('loads skills vocabulary', () => {
      const skills = loader.loadCategory('skills');
      expect(skills).toBeInstanceOf(Map);
      expect(skills.size).toBeGreaterThan(0);
    });
  });
  
  describe('normalize', () => {
    it('lowercases text', () => {
      expect(loader.normalize('HELLO')).toBe('hello');
      expect(loader.normalize('TypeScript')).toBe('typescript');
    });
    
    it('removes special characters', () => {
      expect(loader.normalize('test!')).toBe('test');
      expect(loader.normalize('hello@world')).toBe('helloworld');
    });
    
    it('handles hyphens correctly', () => {
      expect(loader.normalize('state-management')).toBe('state-management');
      expect(loader.normalize('--test--')).toBe('test');
    });
  });
  
  describe('isStopWord', () => {
    it('identifies common stop words', () => {
      expect(loader.isStopWord('the')).toBe(true);
      expect(loader.isStopWord('and')).toBe(true);
      expect(loader.isStopWord('is')).toBe(true);
    });
    
    it('does not flag content words', () => {
      expect(loader.isStopWord('react')).toBe(false);
      expect(loader.isStopWord('typescript')).toBe(false);
      expect(loader.isStopWord('programming')).toBe(false);
    });
  });
  
  describe('classify', () => {
    it('detects technology subjects', () => {
      const text = 'This is about programming software and APIs';
      const result = loader.classify(text);
      
      expect(result.subjects).toContain('technology');
    });
    
    it('detects AI subjects', () => {
      const text = 'Machine learning and neural networks for artificial intelligence';
      const result = loader.classify(text);
      
      expect(result.subjects).toContain('ai');
    });
    
    it('detects beginner difficulty', () => {
      const text = 'A basic introduction for beginners, simple and easy to understand';
      const result = loader.classify(text);
      
      expect(result.difficulty).toBe('beginner');
    });
    
    it('detects advanced difficulty', () => {
      const text = 'Advanced optimization techniques for expert developers';
      const result = loader.classify(text);
      
      expect(result.difficulty).toBe('advanced');
    });
    
    it('detects skills from programming content', () => {
      const text = 'Learn TypeScript and React for building modern web applications with JavaScript';
      const result = loader.classify(text);
      
      expect(result.skills.length).toBeGreaterThan(0);
    });
    
    it('returns confidence scores', () => {
      const text = 'Programming with JavaScript for web development';
      const result = loader.classify(text);
      
      expect(result.confidence).toBeDefined();
      expect(typeof result.confidence).toBe('object');
    });
  });
  
  describe('extractNgrams', () => {
    it('extracts unigrams', () => {
      const result = loader.extractNgrams('hello world test');
      
      expect(result.unigrams).toContain('hello');
      expect(result.unigrams).toContain('world');
      expect(result.unigrams).toContain('test');
    });
    
    it('extracts bigrams', () => {
      const result = loader.extractNgrams('hello world test');
      
      expect(result.bigrams).toContain('hello world');
    });
    
    it('extracts trigrams', () => {
      const result = loader.extractNgrams('hello world test example');
      
      expect(result.trigrams).toContain('hello world test');
    });
  });
  
  describe('getStats', () => {
    it('returns vocabulary statistics', () => {
      const stats = loader.getStats();
      
      expect(stats).toHaveProperty('stopWords');
      expect(stats).toHaveProperty('subjects');
      expect(stats).toHaveProperty('topics');
      expect(stats).toHaveProperty('difficulty');
      expect(stats).toHaveProperty('skills');
      expect(stats).toHaveProperty('totalTerms');
      expect(stats).toHaveProperty('stemmedIndex');
      
      expect(stats.stopWords).toBeGreaterThan(0);
      expect(stats.totalTerms).toBeGreaterThan(0);
    });
  });
  
  describe('toLegacyFormat', () => {
    it('converts to legacy object format', () => {
      const legacy = loader.toLegacyFormat();
      
      expect(legacy).toHaveProperty('subjects');
      expect(legacy).toHaveProperty('topics');
      expect(legacy).toHaveProperty('difficulty');
      expect(legacy).toHaveProperty('skills');
      
      expect(typeof legacy.subjects).toBe('object');
      expect(Array.isArray(legacy.subjects.technology)).toBe(true);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   N-GRAM WEIGHT TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('N-gram weighting', () => {
  let loader;
  
  beforeAll(() => {
    loader = getVocabularyLoader();
  });
  
  it('gives higher weight to trigram matches', () => {
    // Trigram should score higher than unigram
    const trigramText = 'machine learning model training';
    const unigramText = 'machine';
    
    const trigramResult = loader.classify(trigramText);
    const unigramResult = loader.classify(unigramText);
    
    // AI subject should have higher confidence with trigram
    const trigramAiConf = trigramResult.confidence['ai'] || 0;
    const unigramAiConf = unigramResult.confidence['ai'] || 0;
    
    expect(trigramAiConf).toBeGreaterThanOrEqual(unigramAiConf);
  });
});

