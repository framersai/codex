/**
 * LLM Library Unit Tests
 * @module tests/llm.test
 * 
 * Run with: node --test tests/llm.test.js
 * Or: npm test (if configured)
 */

const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');

const {
  llm,
  LLMClient,
  schemas,
  validateSchema,
  extractJSON,
  backoff,
  DEFAULTS,
} = require('../lib/llm');

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY FUNCTION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('extractJSON', () => {
  it('extracts JSON from markdown code block', () => {
    const input = '```json\n{"foo": "bar"}\n```';
    const result = extractJSON(input);
    assert.strictEqual(result, '{"foo": "bar"}');
  });
  
  it('extracts JSON from plain code block', () => {
    const input = '```\n{"foo": "bar"}\n```';
    const result = extractJSON(input);
    assert.strictEqual(result, '{"foo": "bar"}');
  });
  
  it('extracts raw JSON object', () => {
    const input = 'Here is the result: {"foo": "bar"} and more text';
    const result = extractJSON(input);
    assert.strictEqual(result, '{"foo": "bar"}');
  });
  
  it('extracts JSON array', () => {
    const input = '[1, 2, 3]';
    const result = extractJSON(input);
    assert.strictEqual(result, '[1, 2, 3]');
  });
  
  it('handles nested JSON', () => {
    const input = '{"nested": {"deep": {"value": 123}}}';
    const result = extractJSON(input);
    assert.strictEqual(result, '{"nested": {"deep": {"value": 123}}}');
  });
  
  it('returns trimmed input if no JSON found', () => {
    const input = '  plain text  ';
    const result = extractJSON(input);
    assert.strictEqual(result, 'plain text');
  });
});

describe('validateSchema', () => {
  it('validates object type', () => {
    const schema = { type: 'object', required: ['name'] };
    
    assert.strictEqual(validateSchema({ name: 'test' }, schema).valid, true);
    assert.strictEqual(validateSchema('string', schema).valid, false);
    assert.strictEqual(validateSchema(null, schema).valid, false);
    assert.strictEqual(validateSchema([1, 2], schema).valid, false);
  });
  
  it('validates required fields', () => {
    const schema = { type: 'object', required: ['name', 'age'] };
    
    assert.strictEqual(validateSchema({ name: 'test', age: 25 }, schema).valid, true);
    assert.strictEqual(validateSchema({ name: 'test' }, schema).valid, false);
    assert.strictEqual(validateSchema({}, schema).valid, false);
  });
  
  it('validates property types', () => {
    const schema = {
      type: 'object',
      required: [],
      properties: {
        name: { type: 'string' },
        count: { type: 'number' },
        items: { type: 'array' },
      },
    };
    
    const result1 = validateSchema({ name: 'test', count: 5, items: [] }, schema);
    assert.strictEqual(result1.valid, true);
    
    const result2 = validateSchema({ name: 123 }, schema);
    assert.strictEqual(result2.valid, false);
    assert.ok(result2.errors.some(e => e.includes('name')));
  });
  
  it('validates enum values', () => {
    const schema = {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['active', 'inactive', 'pending'] },
      },
    };
    
    assert.strictEqual(validateSchema({ status: 'active' }, schema).valid, true);
    assert.strictEqual(validateSchema({ status: 'unknown' }, schema).valid, false);
  });
  
  it('validates numeric ranges', () => {
    const schema = {
      type: 'object',
      properties: {
        score: { type: 'number', minimum: 0, maximum: 100 },
      },
    };
    
    assert.strictEqual(validateSchema({ score: 50 }, schema).valid, true);
    assert.strictEqual(validateSchema({ score: 0 }, schema).valid, true);
    assert.strictEqual(validateSchema({ score: 100 }, schema).valid, true);
    assert.strictEqual(validateSchema({ score: -1 }, schema).valid, false);
    assert.strictEqual(validateSchema({ score: 101 }, schema).valid, false);
  });
  
  it('validates array type', () => {
    const schema = { type: 'array' };
    
    assert.strictEqual(validateSchema([], schema).valid, true);
    assert.strictEqual(validateSchema([1, 2, 3], schema).valid, true);
    assert.strictEqual(validateSchema({}, schema).valid, false);
    assert.strictEqual(validateSchema('string', schema).valid, false);
  });
  
  it('returns empty errors for null schema', () => {
    assert.deepStrictEqual(validateSchema({ any: 'data' }, null), { valid: true, errors: [] });
    assert.deepStrictEqual(validateSchema({}, undefined), { valid: true, errors: [] });
  });
});

describe('backoff', () => {
  it('returns a promise', () => {
    const result = backoff(0, 1);
    assert.ok(result instanceof Promise);
  });
  
  it('delays execution', async () => {
    const start = Date.now();
    await backoff(0, 50); // 50ms initial
    const elapsed = Date.now() - start;
    
    // Should be at least 25ms (50ms * 0.5 jitter minimum)
    assert.ok(elapsed >= 25, `Expected at least 25ms, got ${elapsed}ms`);
  });
  
  it('increases delay exponentially', async () => {
    const start1 = Date.now();
    await backoff(0, 10);
    const elapsed1 = Date.now() - start1;
    
    const start2 = Date.now();
    await backoff(2, 10); // Should be ~40ms (10 * 2^2)
    const elapsed2 = Date.now() - start2;
    
    // Second delay should be longer (accounting for jitter)
    assert.ok(elapsed2 >= elapsed1 * 1.5, 'Expected exponential increase');
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   SCHEMA DEFINITION TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('schemas', () => {
  describe('tagSuggestion', () => {
    it('validates correct tag suggestion response', () => {
      const validData = {
        tags: [
          { value: 'react', confidence: 0.9, reason: 'Framework mentioned' },
          { value: 'typescript', confidence: 0.8 },
        ],
        suggestedDifficulty: 'intermediate',
        suggestedTopics: ['getting-started', 'best-practices'],
      };
      
      const result = validateSchema(validData, schemas.tagSuggestion);
      assert.strictEqual(result.valid, true);
    });
    
    it('requires tags array', () => {
      const invalidData = { suggestedDifficulty: 'beginner' };
      const result = validateSchema(invalidData, schemas.tagSuggestion);
      assert.strictEqual(result.valid, false);
    });
  });
  
  describe('contentAnalysis', () => {
    it('validates correct analysis response', () => {
      const validData = {
        qualityScore: 85,
        completeness: 90,
        readability: 'moderate',
        seoScore: 75,
        estimatedReadingTime: 5,
        suggestions: [
          {
            type: 'metadata',
            severity: 'warning',
            message: 'Missing summary field',
            confidence: 'high',
          },
        ],
        autoTags: ['react', 'hooks'],
        suggestedDifficulty: 'intermediate',
        recommendations: ['Add more examples'],
      };
      
      const result = validateSchema(validData, schemas.contentAnalysis);
      assert.strictEqual(result.valid, true);
    });
    
    it('requires qualityScore, completeness, and suggestions', () => {
      const invalidData = { readability: 'easy' };
      const result = validateSchema(invalidData, schemas.contentAnalysis);
      assert.strictEqual(result.valid, false);
      assert.ok(result.errors.some(e => e.includes('qualityScore')));
      assert.ok(result.errors.some(e => e.includes('completeness')));
      assert.ok(result.errors.some(e => e.includes('suggestions')));
    });
    
    it('validates qualityScore range', () => {
      const invalidData = {
        qualityScore: 150, // Out of range
        completeness: 50,
        suggestions: [],
      };
      const result = validateSchema(invalidData, schemas.contentAnalysis);
      assert.strictEqual(result.valid, false);
    });
  });
  
  describe('summaryGeneration', () => {
    it('validates correct summary response', () => {
      const validData = {
        summary: 'This is a guide about React hooks.',
        keyPoints: ['useState', 'useEffect', 'Custom hooks'],
        targetAudience: 'Intermediate React developers',
      };
      
      const result = validateSchema(validData, schemas.summaryGeneration);
      assert.strictEqual(result.valid, true);
    });
    
    it('requires summary field', () => {
      const invalidData = { keyPoints: ['point1'] };
      const result = validateSchema(invalidData, schemas.summaryGeneration);
      assert.strictEqual(result.valid, false);
    });
  });
  
  describe('questionGeneration', () => {
    it('validates correct question response', () => {
      const validData = {
        questions: [
          {
            question: 'What is useState?',
            answer: 'A React hook for managing state.',
            difficulty: 'easy',
            topic: 'hooks',
          },
        ],
      };
      
      const result = validateSchema(validData, schemas.questionGeneration);
      assert.strictEqual(result.valid, true);
    });
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   LLM CLIENT TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('LLMClient', () => {
  describe('constructor', () => {
    it('creates unconfigured client', () => {
      const client = new LLMClient();
      assert.strictEqual(client.isConfigured(), false);
      assert.deepStrictEqual(client.getProviders(), []);
    });
  });
  
  describe('configure', () => {
    it('detects disabled provider', () => {
      const originalEnv = process.env.AI_PROVIDER;
      process.env.AI_PROVIDER = 'disabled';
      
      const client = new LLMClient();
      client.configure();
      
      assert.strictEqual(client.isConfigured(), false);
      
      process.env.AI_PROVIDER = originalEnv;
    });
    
    it('configures from environment variables', () => {
      const originalKey = process.env.OPENAI_API_KEY;
      process.env.OPENAI_API_KEY = 'test-key';
      
      const client = new LLMClient();
      client.configure();
      
      assert.strictEqual(client.isConfigured(), true);
      assert.ok(client.getProviders().includes('openai'));
      
      process.env.OPENAI_API_KEY = originalKey;
    });
    
    it('returns this for chaining', () => {
      const client = new LLMClient();
      const result = client.configure();
      assert.strictEqual(result, client);
    });
  });
  
  describe('generate', () => {
    it('throws if not configured', async () => {
      const client = new LLMClient();
      
      await assert.rejects(
        () => client.generate({ prompt: 'test' }),
        { message: /not configured/i }
      );
    });
    
    // Integration tests require API keys - skip in CI
    if (process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY) {
      it('generates response with schema validation', async () => {
        const client = new LLMClient();
        client.configure();
        
        const result = await client.generate({
          prompt: 'Suggest 3 tags for: "React hooks tutorial for beginners"',
          schema: schemas.tagSuggestion,
        });
        
        assert.ok(result.data.tags);
        assert.ok(Array.isArray(result.data.tags));
        assert.ok(result.data.tags.length > 0);
        assert.ok(typeof result.latency === 'number');
        assert.ok(typeof result.model === 'string');
        assert.ok(typeof result.provider === 'string');
      });
    }
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   DEFAULTS TESTS
═══════════════════════════════════════════════════════════════════════════ */

describe('DEFAULTS', () => {
  it('has expected default values', () => {
    assert.strictEqual(DEFAULTS.maxTokens, 2048);
    assert.strictEqual(DEFAULTS.temperature, 0.3);
    assert.strictEqual(DEFAULTS.maxRetries, 3);
    assert.strictEqual(DEFAULTS.timeout, 60000);
    assert.strictEqual(DEFAULTS.initialBackoff, 1000);
    assert.strictEqual(DEFAULTS.maxBackoff, 16000);
  });
});

/* ═══════════════════════════════════════════════════════════════════════════
   INTEGRATION TESTS (require API keys)
═══════════════════════════════════════════════════════════════════════════ */

// Only run if API keys available
const hasApiKeys = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OPENROUTER_API_KEY;

if (hasApiKeys && process.env.RUN_INTEGRATION_TESTS) {
  describe('Integration Tests', () => {
    beforeEach(() => {
      llm.configure();
    });
    
    it('analyzes content with contentAnalysis schema', async () => {
      const result = await llm.generate({
        prompt: `Analyze this content:

# Getting Started with React

React is a JavaScript library for building user interfaces.

## Installation

Run: npm install react

## Usage

Create components using JSX.`,
        schema: schemas.contentAnalysis,
        maxRetries: 1,
      });
      
      assert.ok(typeof result.data.qualityScore === 'number');
      assert.ok(typeof result.data.completeness === 'number');
      assert.ok(Array.isArray(result.data.suggestions));
      assert.ok(result.data.qualityScore >= 0 && result.data.qualityScore <= 100);
    });
    
    it('generates summaries with summaryGeneration schema', async () => {
      const result = await llm.generate({
        prompt: 'Summarize: "React hooks provide a way to use state and lifecycle features in functional components. useState manages local state, useEffect handles side effects."',
        schema: schemas.summaryGeneration,
        maxRetries: 1,
      });
      
      assert.ok(typeof result.data.summary === 'string');
      assert.ok(result.data.summary.length > 0);
    });
    
    it('retries on parse error', async () => {
      // This should eventually succeed even if first attempts fail
      const result = await llm.generate({
        prompt: 'Return exactly: {"tags": [{"value": "test", "confidence": 0.9}]}',
        schema: schemas.tagSuggestion,
        maxRetries: 3,
        temperature: 0.1,
      });
      
      assert.ok(result.data.tags);
    });
  });
}

console.log('\n✅ LLM library tests loaded');
console.log(`   API keys available: ${hasApiKeys ? 'Yes' : 'No'}`);
console.log(`   Integration tests: ${hasApiKeys && process.env.RUN_INTEGRATION_TESTS ? 'Enabled' : 'Skipped'}`);






