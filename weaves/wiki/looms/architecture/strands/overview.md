---
id: 8f4e7c3a-9b2d-4e1a-a5f6-1c8d9e0b2f3a
slug: codex-architecture-overview
title: "Frame Codex Architecture Overview"
summary: "High-level architecture of Frame Codex: three-tier knowledge organization, SQL caching, static NLP, and automation"
version: "1.0.0"
contentType: markdown
difficulty: intermediate
taxonomy:
  subjects: [technology, knowledge]
  topics: [architecture, getting-started]
tags: [architecture, weave, loom, strand, sql-cache, nlp]
relationships:
  references:
    - sql-cache-architecture
    - nlp-pipeline
    - automation-workflows
publishing:
  status: published
---

# Frame Codex Architecture Overview

Frame Codex is a structured, version-controlled knowledge repository designed as the canonical source of truth for AI systems and human learners.

## Core Concepts

### Three-Tier Knowledge Organization

```
Weave (Universe)
├── Loom (Collection)
│   ├── Strand (Content)
│   ├── Strand (Content)
│   └── ...
└── Loom (Collection)
    └── ...
```

**Weave**: Complete, isolated knowledge universe
- No cross-weave relationships
- Independent scope and taxonomy
- Examples: `wiki`, `technology`, `science`

**Loom**: Curated collection of related strands
- Organized by topic or module
- Sequential, hierarchical, or network ordering
- Metadata and aggregate statistics

**Strand**: Atomic knowledge unit
- Single markdown file with YAML frontmatter
- Self-contained, focused on one concept
- Rich metadata (tags, difficulty, relationships)

### Why This Structure?

1. **Modularity**: Each strand is independent and reusable
2. **Discoverability**: Looms provide curated learning paths
3. **Isolation**: Weaves prevent namespace collisions
4. **Scalability**: Can grow to millions of strands
5. **AI-Friendly**: Clear structure for LLM ingestion

## SQL Cache Layer

Frame Codex uses [@framers/sql-storage-adapter](https://github.com/framersai/sql-storage-adapter) for intelligent caching.

### Performance

- **First run**: ~30s for 100 files (full analysis)
- **Subsequent**: ~2-5s for 5 changed files (85-95% speedup)
- **Storage**: ~500KB-2MB for 100 files

### How It Works

1. **SHA-based change detection**: Only re-process modified files
2. **Loom-scoped caching**: Store aggregate stats per loom
3. **Keyword caching**: Pre-computed TF-IDF scores
4. **GitHub Actions cache**: Persistent across CI runs

### Cache Tables

```sql
files       -- File metadata, SHA, analysis JSON
keywords    -- Extracted keywords with TF-IDF scores
stats       -- Loom/weave aggregate statistics
```

## Static NLP Pipeline

**No LLM calls, $0 cost, runs in CI:**

1. **TF-IDF**: Keyword extraction and ranking
2. **N-grams**: Common phrase detection
3. **Vocabulary matching**: Auto-categorization
4. **Readability scoring**: Flesch-Kincaid grade level
5. **Sentiment heuristics**: Simple keyword patterns

### Output

- `codex-index.json`: Searchable index for frame.dev/codex
- `codex-report.json`: Analytics and validation results

## Automation Workflows

### On Every PR

1. **Schema validation**: Required fields, types, enums
2. **Content quality**: Length, forbidden patterns, duplicates
3. **Static NLP**: Auto-categorization and tagging
4. **Optional AI**: GPT-4 quality analysis (if `OPENAI_API_KEY` set)

### Auto-Merge (Trusted Weavers)

- Users in `.github/WEAVERS.txt` get auto-approved + merged
- Requires 5+ high-quality contributions
- Validation must pass

### Full Re-Catalog

- Triggered manually or on schedule
- Updates all metadata and statistics
- Creates PR (manual approval by default)
- Toggle: `AUTO_CATALOG_MERGE=true`

## OpenStrand Integration

Frame Codex implements the **Educational Content Atom (ECA)** specification:

- **Learning Design**: Objectives, outcomes, Bloom's taxonomy
- **Time Estimates**: Reading, exercises, projects
- **Modalities**: Text, visual, audio, video, kinesthetic
- **Assessments**: Formative and summative
- **Accessibility**: WCAG compliance, reading levels
- **Quality Metrics**: Peer review, evidence-based claims

### Frame Codex vs OpenStrand

- **Frame Codex**: Public markdown repository (this repo)
- **OpenStrand**: Full PKMS at openstrand.ai (all file types, AI analysis, private workspaces)

## Repository Structure

```
codex/
├── weaves/              # Knowledge universes
│   ├── wiki/           # Meta-documentation (this weave)
│   ├── frame/          # Frame ecosystem knowledge
│   └── technology/     # Tech & CS content
├── schema/             # Validation schemas
├── docs/               # Development guides
│   ├── logos/         # Brand assets
│   └── assets/        # Shared resources
├── scripts/            # Automation scripts
│   ├── auto-index.js  # NLP indexer with SQL cache
│   ├── cache-db.js    # SQL cache layer
│   ├── validate.js    # Schema validator
│   └── ai-enhance.js  # Optional AI analysis
├── tests/              # Test suite
└── .github/
    └── workflows/      # CI/CD automation
```

## Data Flow

```
PR Opened
  ↓
Schema Validation (instant)
  ↓
Static NLP Analysis (~2-5s with cache)
  ↓
[Optional] AI Quality Analysis (~30s, $0.01-0.20)
  ↓
Auto-Merge (if Weaver) OR Manual Review
  ↓
Merge to main
  ↓
Index Rebuild (~2-5s with cache)
  ↓
Push to index branch
  ↓
Live on frame.dev/codex (instant)
```

## Next Steps

- Read: [SQL Cache Architecture](./sql-cache-architecture.md)
- Read: [NLP Pipeline](./nlp-pipeline.md)
- Read: [Automation Workflows](./automation-workflows.md)
- Contribute: [How to Submit](../../contributing/how-to-submit.md)

