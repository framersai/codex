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
├── Loom (Folder)
│   ├── Strand (markdown file)
│   ├── Strand (markdown file)
│   └── ...
└── Loom (Folder)
    └── ...
```

**Weave**: Complete, isolated knowledge universe
- No cross-weave relationships
- Independent scope and taxonomy
- Examples: `wiki`, `frame`, `technology`

**Loom**: Any folder inside a weave
- Organized by topic or module
- No explicit `looms/` prefix needed
- Metadata in optional `loom.yaml`

**Strand**: Any markdown file inside a weave
- Self-contained, focused on one concept
- Rich metadata in YAML frontmatter
- No explicit `strands/` folder needed

### Why This Structure?

1. **Modularity**: Each strand is independent and reusable
2. **Discoverability**: Looms (folders) provide natural organization
3. **Isolation**: Weaves prevent namespace collisions
4. **Scalability**: Can grow to millions of strands
5. **AI-Friendly**: Clear structure for LLM ingestion
6. **Simple**: Folders = looms, markdown files = strands (auto-detected)

## SQL Cache Layer

Frame Codex uses [@framers/sql-storage-adapter](https://github.com/framersai/sql-storage-adapter) for intelligent caching.

### Performance

- **First run**: ~30s for 100 files (full analysis)
- **Subsequent**: ~2-5s for 5 changed files (85-95% speedup)
- **Storage**: ~500KB-2MB for 100 files

### How It Works

1. **SHA-based change detection**: Only re-process modified files
2. **Loom-scoped caching**: Store aggregate stats per loom (folder)
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
│   ├── wiki/           # Meta-documentation
│   │   ├── weave.yaml
│   │   ├── architecture/    # Loom (folder)
│   │   │   └── overview.md  # Strand (markdown file)
│   │   └── ...
│   ├── frame/          # Frame ecosystem knowledge
│   │   ├── weave.yaml
│   │   ├── openstrand/      # Loom (folder)
│   │   │   └── architecture.md  # Strand (markdown file)
│   │   └── ...
│   └── technology/     # Tech & CS content
├── schema/             # Validation schemas
├── docs/               # Development guides
├── scripts/            # Automation scripts
├── tests/              # Test suite
└── .github/
    └── workflows/      # CI/CD automation
```

**Note:** Looms and strands are auto-detected from folder structure. No explicit `looms/` or `strands/` folders needed.

## Learn More

- [Changelog System](../../docs/CHANGELOG_SYSTEM.md)
- [Development Guide](../../docs/DEVELOPMENT.md)
- [How to Submit](../../docs/contributing/how-to-submit.md)
