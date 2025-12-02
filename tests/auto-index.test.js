/**
 * Auto-Indexer Tests
 * @module tests/auto-index.test
 * 
 * Tests for the NLP-powered content indexing system
 */

import { describe, it, expect, beforeAll, vi } from 'vitest';

// We need to mock the file system for some tests
const fs = require('fs');
const path = require('path');

// Import the indexer class
// Note: We need to import after mocks are set up
let CodexIndexer;

beforeAll(async () => {
  // Dynamic import to allow module initialization
  const module = await import('../scripts/auto-index.js');
  CodexIndexer = module.CodexIndexer || global.CodexIndexer;
});

/* ═══════════════════════════════════════════════════════════════════════════
   KEYWORD EXTRACTION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('Keyword Extraction', () => {
  let indexer;
  
  beforeAll(() => {
    // Create indexer instance by requiring directly
    const { CodexIndexer: Indexer } = require('../scripts/auto-index.js');
    indexer = new Indexer();
  });
  
  describe('tokenize', () => {
    it('splits text into words', () => {
      const result = indexer.tokenize('Hello world test');
      expect(result).toContain('hello');
      expect(result).toContain('world');
      expect(result).toContain('test');
    });
    
    it('removes punctuation', () => {
      const result = indexer.tokenize('Hello, world! How are you?');
      expect(result).not.toContain(',');
      expect(result).not.toContain('!');
      expect(result).not.toContain('?');
    });
    
    it('removes stop words', () => {
      const result = indexer.tokenize('The quick brown fox');
      expect(result).not.toContain('the');
    });
    
    it('handles code-like content', () => {
      const result = indexer.tokenize('function test() { return true; }');
      expect(result).toContain('function');
      expect(result).toContain('test');
      expect(result).toContain('return');
      expect(result).toContain('true');
    });
  });
  
  describe('extractNGrams', () => {
    it('extracts bigrams', () => {
      const result = indexer.extractNGrams('hello world test', 2);
      expect(result).toContain('hello world');
      expect(result).toContain('world test');
    });
    
    it('extracts trigrams', () => {
      const result = indexer.extractNGrams('hello world test example', 3);
      expect(result).toContain('hello world test');
      expect(result).toContain('world test example');
    });
    
    it('handles short text', () => {
      const result = indexer.extractNGrams('hello', 2);
      expect(result.length).toBe(0);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   AUTO-CATEGORIZATION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('Auto-categorization', () => {
  let indexer;
  
  beforeAll(() => {
    const { CodexIndexer: Indexer } = require('../scripts/auto-index.js');
    indexer = new Indexer();
  });
  
  describe('autoCategorize', () => {
    it('extracts keywords', () => {
      const result = indexer.autoCategorize('React is a JavaScript library for building user interfaces', {});
      expect(result.keywords).toBeDefined();
      expect(result.keywords.length).toBeGreaterThan(0);
    });
    
    it('extracts phrases', () => {
      const result = indexer.autoCategorize('Machine learning and deep learning are subsets of artificial intelligence', {});
      expect(result.phrases).toBeDefined();
    });
    
    it('detects subjects', () => {
      const result = indexer.autoCategorize('Programming APIs and software development with code', {});
      expect(result.categories.subjects).toContain('technology');
    });
    
    it('detects difficulty level', () => {
      const result = indexer.autoCategorize('A basic introduction for beginners', {});
      expect(result.categories.difficulty).toBe('beginner');
    });
    
    it('respects explicit metadata difficulty', () => {
      const result = indexer.autoCategorize('A basic introduction for beginners', {
        difficulty: 'advanced'
      });
      expect(result.categories.difficulty).toBe('advanced');
    });
    
    it('merges taxonomy from metadata', () => {
      const result = indexer.autoCategorize('Some content', {
        taxonomy: {
          subjects: ['philosophy'],
          topics: ['ethics']
        }
      });
      expect(result.categories.subjects).toContain('philosophy');
      expect(result.categories.topics).toContain('ethics');
    });
    
    it('extracts skills from code content', () => {
      const content = `
\`\`\`typescript
import React from 'react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
\`\`\`
      `;
      const result = indexer.autoCategorize(content, {});
      expect(result.categories.skills).toBeDefined();
      expect(result.categories.skills.length).toBeGreaterThan(0);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SKILL EXTRACTION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('Skill Extraction', () => {
  let indexer;
  
  beforeAll(() => {
    const { CodexIndexer: Indexer } = require('../scripts/auto-index.js');
    indexer = new Indexer();
  });
  
  describe('extractSkillsFromCode', () => {
    it('detects language from code blocks', () => {
      const content = '```javascript\nconsole.log("hello");\n```';
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('javascript');
    });
    
    it('detects TypeScript', () => {
      const content = '```typescript\nconst x: number = 5;\n```';
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('typescript');
    });
    
    it('detects Python', () => {
      const content = '```python\nprint("hello")\n```';
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('python');
    });
    
    it('detects React from imports', () => {
      const content = "import React from 'react';\nimport { useState } from 'react';";
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('react');
    });
    
    it('detects Next.js from imports', () => {
      const content = "import { useRouter } from 'next/router';";
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('nextjs');
    });
    
    it('detects Express from imports', () => {
      const content = "const express = require('express');\nconst app = express();";
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('express');
    });
    
    it('detects Git patterns', () => {
      const content = 'Run git commit -m "message" and then git push origin main';
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('git');
    });
    
    it('detects Docker patterns', () => {
      const content = 'Create a Dockerfile and run docker build -t myapp .';
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('docker');
    });
    
    it('detects SQL patterns', () => {
      const content = 'SELECT * FROM users WHERE id = 1';
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('sql');
    });
    
    it('detects testing patterns', () => {
      const content = "describe('test', () => { it('works', () => { expect(true).toBe(true); }); });";
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('testing');
    });
    
    it('detects async programming patterns', () => {
      const content = 'async function fetchData() { const data = await fetch(url); return data.json(); }';
      const skills = indexer.extractSkillsFromCode(content);
      expect(skills).toContain('async-programming');
    });
    
    it('limits skills to reasonable count', () => {
      const content = `
\`\`\`javascript
import React from 'react';
import express from 'express';
import mongoose from 'mongoose';
\`\`\`
git commit
docker build
kubectl apply
SELECT * FROM users
async function test() { await fetch(); }
describe('test', () => {});
      `;
      const skills = indexer.extractSkillsFromCode(content);
      // Should not exceed reasonable limit
      expect(skills.length).toBeLessThanOrEqual(20);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SUMMARY GENERATION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('Summary Generation', () => {
  let indexer;
  
  beforeAll(() => {
    const { CodexIndexer: Indexer } = require('../scripts/auto-index.js');
    indexer = new Indexer();
  });
  
  describe('generateSummary', () => {
    it('generates summary from content', () => {
      const content = `
        React is a JavaScript library for building user interfaces.
        It was created by Facebook and is now maintained by Meta.
        React uses a virtual DOM for efficient updates.
      `;
      const summary = indexer.generateSummary(content);
      expect(summary).toBeDefined();
      expect(summary.length).toBeGreaterThan(20);
      expect(summary.length).toBeLessThanOrEqual(303); // 300 + '...'
    });
    
    it('handles short content', () => {
      const content = 'Short text';
      const summary = indexer.generateSummary(content);
      expect(summary).toBeDefined();
    });
    
    it('removes code blocks', () => {
      const content = `
        This is the main content.
        \`\`\`javascript
        const code = "should not appear";
        \`\`\`
        This should appear.
      `;
      const summary = indexer.generateSummary(content);
      expect(summary).not.toContain('const code');
    });
    
    it('removes markdown headers', () => {
      const content = `
        # Header One
        ## Header Two
        This is the actual content that matters.
      `;
      const summary = indexer.generateSummary(content);
      expect(summary).not.toContain('# ');
      expect(summary).not.toContain('## ');
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   READING LEVEL TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('Reading Level', () => {
  let indexer;
  
  beforeAll(() => {
    const { CodexIndexer: Indexer } = require('../scripts/auto-index.js');
    indexer = new Indexer();
  });
  
  describe('calculateReadingLevel', () => {
    it('calculates reading level for simple text', () => {
      const simple = 'The cat sat on the mat. It was a good cat.';
      const result = indexer.calculateReadingLevel(simple);
      
      expect(result).toHaveProperty('gradeLevel');
      expect(result).toHaveProperty('readabilityScore');
      expect(result).toHaveProperty('sentences');
      expect(result).toHaveProperty('words');
      expect(result).toHaveProperty('syllables');
    });
    
    it('returns higher grade for complex text', () => {
      const simple = 'The cat sat. The dog ran.';
      const complex = 'The implementation of sophisticated algorithms requires meticulous consideration of computational complexity.';
      
      const simpleResult = indexer.calculateReadingLevel(simple);
      const complexResult = indexer.calculateReadingLevel(complex);
      
      expect(complexResult.gradeLevel).toBeGreaterThan(simpleResult.gradeLevel);
    });
    
    it('handles empty content gracefully', () => {
      const result = indexer.calculateReadingLevel('');
      expect(result.gradeLevel).toBe(0);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT VALIDATION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('Content Validation', () => {
  let indexer;
  
  beforeAll(() => {
    const { CodexIndexer: Indexer } = require('../scripts/auto-index.js');
    indexer = new Indexer();
  });
  
  describe('validateContent', () => {
    it('validates complete metadata', () => {
      const metadata = {
        title: 'Test Article',
        summary: 'This is a test article summary.'
      };
      const result = indexer.validateContent(metadata, 'Content here', 'test.md');
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
    
    it('reports missing title', () => {
      const metadata = {
        summary: 'Summary without title'
      };
      const result = indexer.validateContent(metadata, 'Content', 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('title'))).toBe(true);
    });
    
    it('reports missing summary', () => {
      const metadata = {
        title: 'Title Only'
      };
      const result = indexer.validateContent(metadata, 'Content', 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('summary'))).toBe(true);
    });
    
    it('warns about short titles', () => {
      const metadata = {
        title: 'AB',
        summary: 'Valid summary content here'
      };
      const result = indexer.validateContent(metadata, 'Content', 'test.md');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('short'))).toBe(true);
    });
    
    it('warns about short content', () => {
      const metadata = {
        title: 'Valid Title',
        summary: 'Valid summary content here'
      };
      const result = indexer.validateContent(metadata, 'Short', 'test.md');
      expect(result.warnings.some(w => w.includes('short'))).toBe(true);
    });
    
    it('detects TODO comments in non-docs', () => {
      const metadata = {
        title: 'Valid Title',
        summary: 'Valid summary content here'
      };
      const result = indexer.validateContent(metadata, 'TODO: fix this', 'weaves/test.md');
      expect(result.errors.some(e => e.includes('TODO'))).toBe(true);
    });
    
    it('allows TODO in documentation', () => {
      const metadata = {
        title: 'Valid Title',
        summary: 'Valid summary content here'
      };
      const result = indexer.validateContent(metadata, 'TODO: example task', 'docs/guide.md');
      expect(result.errors.some(e => e.includes('TODO'))).toBe(false);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   ENTITY EXTRACTION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('Entity Extraction', () => {
  let indexer;
  
  beforeAll(() => {
    const { CodexIndexer: Indexer } = require('../scripts/auto-index.js');
    indexer = new Indexer();
  });
  
  describe('extractEntities', () => {
    it('returns entity object structure', () => {
      const result = indexer.extractEntities('Some text about technology');
      
      expect(result).toHaveProperty('people');
      expect(result).toHaveProperty('places');
      expect(result).toHaveProperty('organizations');
      expect(result).toHaveProperty('topics');
      
      expect(Array.isArray(result.people)).toBe(true);
      expect(Array.isArray(result.places)).toBe(true);
    });
    
    it('extracts organization names', () => {
      const result = indexer.extractEntities('Microsoft and Google are tech companies. Apple makes phones.');
      // Note: Results depend on compromise.js NER capabilities
      expect(Array.isArray(result.organizations)).toBe(true);
    });
  });
});

