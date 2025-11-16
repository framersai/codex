/**
 * @vitest-environment node
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import for CJS module
let CodexCacheDB;

describe('CodexCacheDB', () => {
  let cache;
  const testCacheDir = path.join(__dirname, '.test-cache');

  beforeEach(async () => {
    // Clean up test cache
    if (fs.existsSync(testCacheDir)) {
      fs.rmSync(testCacheDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testCacheDir, { recursive: true });

    // Change working directory for test
    process.chdir(path.join(__dirname, '..'));

    // Import module
    const module = await import('../scripts/cache-db.js');
    CodexCacheDB = module.default;

    // Create cache instance
    cache = await CodexCacheDB.create();
  });

  afterEach(async () => {
    if (cache) {
      await cache.close();
    }
    // Clean up
    if (fs.existsSync(testCacheDir)) {
      fs.rmSync(testCacheDir, { recursive: true, force: true });
    }
  });

  describe('initialization', () => {
    it('should initialize successfully', () => {
      expect(cache.isInitialized).toBe(true);
    });

    it('should create cache directory', () => {
      const cacheDir = path.join(process.cwd(), '.cache');
      expect(fs.existsSync(cacheDir)).toBe(true);
    });

    it('should create database file', () => {
      const dbFile = path.join(process.cwd(), '.cache', 'codex.db');
      expect(fs.existsSync(dbFile)).toBe(true);
    });
  });

  describe('file change detection', () => {
    it('should detect new files', async () => {
      const content = '# Test Content\n\nThis is a test.';
      const needsUpdate = await cache.checkFileChanged('test.md', content);
      expect(needsUpdate).toBe(true);
    });

    it('should detect unchanged files', async () => {
      const content = '# Test Content\n\nThis is a test.';
      const analysis = { keywords: ['test'], categories: {} };

      // Save to cache
      await cache.saveFileAnalysis('test.md', content, analysis);

      // Check again with same content
      const needsUpdate = await cache.checkFileChanged('test.md', content);
      expect(needsUpdate).toBe(false);
    });

    it('should detect modified files', async () => {
      const content1 = '# Test Content\n\nOriginal.';
      const content2 = '# Test Content\n\nModified.';
      const analysis = { keywords: ['test'], categories: {} };

      // Save original
      await cache.saveFileAnalysis('test.md', content1, analysis);

      // Check with modified content
      const needsUpdate = await cache.checkFileChanged('test.md', content2);
      expect(needsUpdate).toBe(true);
    });
  });

  describe('analysis caching', () => {
    it('should save and retrieve analysis', async () => {
      const content = '# Test\n\nContent here.';
      const analysis = {
        keywords: ['test', 'content'],
        categories: {
          subjects: ['technology'],
          topics: ['testing'],
          difficulty: 'beginner'
        },
        validation: {
          valid: true,
          errors: [],
          warnings: []
        }
      };

      await cache.saveFileAnalysis('test.md', content, analysis);
      const retrieved = await cache.getCachedAnalysis('test.md');

      expect(retrieved).toEqual(analysis);
    });

    it('should return null for non-existent files', async () => {
      const retrieved = await cache.getCachedAnalysis('nonexistent.md');
      expect(retrieved).toBeNull();
    });
  });

  describe('diff computation', () => {
    it('should compute diff correctly', async () => {
      // Create test files
      const file1 = path.join(testCacheDir, 'file1.md');
      const file2 = path.join(testCacheDir, 'file2.md');
      const file3 = path.join(testCacheDir, 'file3.md');

      fs.writeFileSync(file1, '# File 1');
      fs.writeFileSync(file2, '# File 2');

      // Cache file1 and file2
      await cache.saveFileAnalysis(file1, '# File 1', { keywords: [] });
      await cache.saveFileAnalysis(file2, '# File 2', { keywords: [] });

      // Now file3 is new, file2 is unchanged, file1 is deleted
      const currentFiles = [file2, file3];
      const diff = await cache.getDiff(currentFiles);

      expect(diff.added).toContain(file3);
      expect(diff.unchanged).toContain(file2);
      expect(diff.deleted).toContain(file1);
    });
  });

  describe('loom statistics', () => {
    it('should save and retrieve loom stats', async () => {
    const loomPath = 'weaves/tech/python';
      const stats = {
        totalFiles: 25,
        totalKeywords: 450,
        avgDifficulty: 'intermediate',
        subjects: ['technology', 'knowledge'],
        topics: ['programming', 'getting-started']
      };

      await cache.updateLoomStats(loomPath, stats);
      const retrieved = await cache.getLoomStats(loomPath);

      expect(retrieved.totalFiles).toBe(25);
      expect(retrieved.totalKeywords).toBe(450);
      expect(retrieved.avgDifficulty).toBe('intermediate');
      expect(retrieved.subjects).toEqual(['technology', 'knowledge']);
      expect(retrieved.topics).toEqual(['programming', 'getting-started']);
    });
  });

  describe('cache management', () => {
    it('should get cache statistics', async () => {
      // Add some test data
      await cache.saveFileAnalysis('test1.md', '# Test 1', { keywords: [] });
      await cache.saveFileAnalysis('test2.md', '# Test 2', { keywords: [] });

      const stats = await cache.getStats();

      expect(stats.totalFiles).toBe(2);
      expect(stats.cacheSize).toBeGreaterThan(0);
      expect(stats.oldestEntry).toBeInstanceOf(Date);
      expect(stats.newestEntry).toBeInstanceOf(Date);
    });

    it('should clear cache', async () => {
      // Add test data
      await cache.saveFileAnalysis('test.md', '# Test', { keywords: [] });

      // Clear
      await cache.clear();

      // Verify empty
      const stats = await cache.getStats();
      expect(stats.totalFiles).toBe(0);
    });
  });

  describe('performance', () => {
    it('should handle large number of files', async () => {
      const startTime = Date.now();

      // Simulate 100 files
      for (let i = 0; i < 100; i++) {
        await cache.saveFileAnalysis(`test${i}.md`, `# Test ${i}`, {
          keywords: [`keyword${i}`],
          categories: {}
        });
      }

      const elapsed = Date.now() - startTime;

      // Should complete in under 5 seconds
      expect(elapsed).toBeLessThan(5000);

      const stats = await cache.getStats();
      expect(stats.totalFiles).toBe(100);
    });
  });
});

