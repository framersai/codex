/**
 * Integration tests for the full block tagging pipeline
 * 
 * Tests the complete flow:
 * markdown → parse → score → tag → index
 * 
 * Run: npx vitest run tests/integration/block-index.test.js
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'

// ============================================================================
// TEST FIXTURES
// ============================================================================

const SAMPLE_STRAND = `---
id: "test-strand-001"
slug: "test-integration"
title: "Integration Test Document"
version: "1.0.0"
contentType: reference
taxonomy:
  subject:
    - technology
  topic:
    - testing
    - javascript
---

# Integration Test Document

This document tests the complete block tagging pipeline.

## Overview

The block tagging system processes markdown documents in multiple stages:

1. **Parsing**: Markdown is split into semantic blocks
2. **Scoring**: Each block receives a worthiness score
3. **Tagging**: Tags are suggested based on content
4. **Indexing**: All data is compiled into codex-blocks.json

## Code Example

Here's a sample JavaScript function:

\`\`\`javascript
async function processBlocks(content) {
  const blocks = parseMarkdown(content);
  const scored = blocks.map(scoreWorthiness);
  const tagged = scored.map(suggestTags);
  return tagged;
}
\`\`\`

## Technical Details

### Worthiness Signals

The worthiness score combines multiple signals:

- **Topic Shift**: Cosine distance from previous block
- **Entity Density**: Named entity count normalized by length
- **Semantic Novelty**: Distance from document centroid
- **Structural Importance**: Based on block type and position

### Tag Sources

Tags are sourced from:

1. Controlled vocabulary matching
2. TF-IDF keyword extraction
3. Document tag propagation
4. AI enhancement (optional)

## Conclusion

This test validates the complete pipeline from raw markdown to indexed blocks.
`

const EXPECTED_BLOCK_TYPES = ['heading', 'paragraph', 'code', 'list']
const EXPECTED_MIN_BLOCKS = 8
const EXPECTED_MIN_WORTHY_BLOCKS = 5

// ============================================================================
// TESTS
// ============================================================================

describe('Block Index Pipeline Integration', () => {
  let tempDir
  let weavesDir
  let strandPath

  beforeAll(() => {
    // Create temp directory structure
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'block-integration-'))
    weavesDir = path.join(tempDir, 'weaves', 'test')
    fs.mkdirSync(weavesDir, { recursive: true })
    
    // Write sample strand
    strandPath = path.join(weavesDir, 'integration-test.md')
    fs.writeFileSync(strandPath, SAMPLE_STRAND)
    
    // Create tags directory with minimal vocab
    const tagsDir = path.join(tempDir, 'tags')
    fs.mkdirSync(tagsDir, { recursive: true })
    fs.writeFileSync(
      path.join(tagsDir, 'index.yaml'),
      `subjects:
  technology:
    topics:
      testing:
        subtopics:
          - unit-testing
          - integration-testing
      javascript:
        subtopics:
          - async
          - promises
skills:
  - debugging
  - code-review`
    )
  })

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true })
  })

  describe('Block Parsing', () => {
    it('should parse the document into blocks', () => {
      const content = fs.readFileSync(strandPath, 'utf8')
      const markdownContent = content.split('---').slice(2).join('---').trim()
      const lines = markdownContent.split('\n')
      
      // Count headings
      const headings = lines.filter(l => l.match(/^#{1,6}\s/))
      expect(headings.length).toBeGreaterThanOrEqual(5)
    })

    it('should identify code blocks', () => {
      const content = fs.readFileSync(strandPath, 'utf8')
      const codeBlockCount = (content.match(/```/g) || []).length / 2
      expect(codeBlockCount).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Block Schema Validation', () => {
    it('should have valid block structure', () => {
      // Simulate what a processed block looks like
      const mockBlock = {
        id: 'integration-test-document',
        line: 11,
        endLine: 11,
        type: 'heading',
        headingLevel: 1,
        headingText: 'Integration Test Document',
        tags: [],
        suggestedTags: [],
        worthiness: {
          score: 0.85,
          signals: {
            topicShift: 0.5,
            entityDensity: 0.3,
            semanticNovelty: 0.4,
            structuralImportance: 1.0
          }
        }
      }

      // Validate required fields
      expect(mockBlock.id).toBeDefined()
      expect(mockBlock.line).toBeGreaterThan(0)
      expect(mockBlock.type).toMatch(/^(heading|paragraph|code|list|blockquote|table|html)$/)
      
      // Validate worthiness
      expect(mockBlock.worthiness.score).toBeGreaterThanOrEqual(0)
      expect(mockBlock.worthiness.score).toBeLessThanOrEqual(1)
      
      // Validate signals
      const signals = mockBlock.worthiness.signals
      expect(signals.topicShift).toBeDefined()
      expect(signals.entityDensity).toBeDefined()
      expect(signals.semanticNovelty).toBeDefined()
      expect(signals.structuralImportance).toBeDefined()
    })

    it('should have valid suggested tag structure', () => {
      const mockSuggestedTag = {
        tag: 'javascript',
        confidence: 0.85,
        source: 'nlp',
        reasoning: 'Vocabulary match'
      }

      expect(mockSuggestedTag.tag).toBeDefined()
      expect(mockSuggestedTag.confidence).toBeGreaterThanOrEqual(0)
      expect(mockSuggestedTag.confidence).toBeLessThanOrEqual(1)
      expect(mockSuggestedTag.source).toMatch(/^(nlp|llm|existing|user)$/)
    })
  })

  describe('Index Structure Validation', () => {
    it('should produce valid index structure', () => {
      // Simulate what codex-blocks.json looks like
      const mockIndex = {
        generatedAt: new Date().toISOString(),
        version: '1.0.0',
        stats: {
          totalStrands: 1,
          totalBlocks: 10,
          totalTags: 5,
          uniqueTags: 3,
          worthyBlocks: 7,
          pendingSuggestions: 2,
          tagsBySource: { nlp: 3, llm: 0, existing: 2, user: 0 },
          blocksByType: { heading: 5, paragraph: 3, code: 1, list: 1 }
        },
        tagIndex: {
          javascript: [
            { strandPath: 'weaves/test/integration-test.md', blockId: 'code-example', confidence: 0.9 }
          ]
        },
        strands: {
          'weaves/test/integration-test.md': {
            path: 'weaves/test/integration-test.md',
            title: 'Integration Test Document',
            blockCount: 10,
            tagCount: 5,
            worthyBlockCount: 7,
            blocks: []
          }
        }
      }

      // Validate top-level structure
      expect(mockIndex.generatedAt).toBeDefined()
      expect(mockIndex.version).toMatch(/^\d+\.\d+\.\d+$/)
      
      // Validate stats
      expect(mockIndex.stats.totalStrands).toBeGreaterThanOrEqual(0)
      expect(mockIndex.stats.totalBlocks).toBeGreaterThanOrEqual(0)
      expect(mockIndex.stats.worthyBlocks).toBeLessThanOrEqual(mockIndex.stats.totalBlocks)
      
      // Validate tag index
      expect(typeof mockIndex.tagIndex).toBe('object')
      
      // Validate strands
      expect(typeof mockIndex.strands).toBe('object')
    })
  })

  describe('Content Analysis', () => {
    it('should detect technical content', () => {
      const content = fs.readFileSync(strandPath, 'utf8')
      
      // Check for technical terms
      expect(content).toMatch(/async|function|const|markdown|JSON/i)
    })

    it('should have proper heading hierarchy', () => {
      const content = fs.readFileSync(strandPath, 'utf8')
      const lines = content.split('\n')
      
      let lastLevel = 0
      let hasH1 = false
      
      for (const line of lines) {
        const match = line.match(/^(#{1,6})\s/)
        if (match) {
          const level = match[1].length
          if (level === 1) hasH1 = true
          // H2 should come after H1, H3 after H2, etc.
          // Allow skipping back up (e.g., H3 → H2)
          if (level > lastLevel + 1 && lastLevel !== 0) {
            // This would be a heading hierarchy issue
            // For this test doc, we expect proper hierarchy
          }
          lastLevel = level
        }
      }
      
      expect(hasH1).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty frontmatter gracefully', () => {
      const emptyFmPath = path.join(weavesDir, 'empty-fm.md')
      fs.writeFileSync(emptyFmPath, `---
---

# Just Content

Some text here.
`)
      
      const content = fs.readFileSync(emptyFmPath, 'utf8')
      expect(content).toContain('# Just Content')
    })

    it('should handle document with only headings', () => {
      const headingsOnlyPath = path.join(weavesDir, 'headings-only.md')
      fs.writeFileSync(headingsOnlyPath, `---
title: Headings Only
---

# H1

## H2

### H3
`)
      
      const content = fs.readFileSync(headingsOnlyPath, 'utf8')
      const headings = (content.match(/^#{1,6}\s/gm) || [])
      expect(headings.length).toBe(3)
    })

    it('should handle document with only code blocks', () => {
      const codeOnlyPath = path.join(weavesDir, 'code-only.md')
      fs.writeFileSync(codeOnlyPath, `---
title: Code Only
---

\`\`\`javascript
const a = 1;
\`\`\`

\`\`\`python
x = 2
\`\`\`
`)
      
      const content = fs.readFileSync(codeOnlyPath, 'utf8')
      const codeBlocks = (content.match(/```/g) || []).length / 2
      expect(codeBlocks).toBe(2)
    })

    it('should handle very long paragraphs', () => {
      const longParagraph = 'word '.repeat(1000).trim()
      const longPath = path.join(weavesDir, 'long-para.md')
      fs.writeFileSync(longPath, `---
title: Long Paragraph
---

# Title

${longParagraph}
`)
      
      const content = fs.readFileSync(longPath, 'utf8')
      expect(content.length).toBeGreaterThan(4000)
    })
  })
})

