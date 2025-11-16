<div align="center">
  <a href="https://frame.dev" target="_blank" rel="noopener">
    <img src="https://raw.githubusercontent.com/framersai/frame.dev/refs/heads/master/public/frame-logo-transparent.png" alt="Frame.dev" width="200" style="border-radius: 12px;">
  </a>

# Frame Codex

**The codex of humanity for LLM knowledge retrieval**

*The OS for humans, the codex of humanity.*

[![GitHub](https://img.shields.io/badge/GitHub-framersai%2Fcodex-black?logo=github)](https://github.com/framersai/codex)
[![License](https://img.shields.io/badge/License-CC--BY--4.0-green.svg)](https://creativecommons.org/licenses/by/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/contributing/how-to-submit.md)

[Browse](https://frame.dev/codex) • [Documentation](docs/DEVELOPMENT.md) • [Contribute](docs/contributing/how-to-submit.md) • [Discord](https://discord.gg/VXXC4SJMKh)

**AI Infrastructure for Superintelligence.**

</div>

---

## Overview

Frame Codex is a data-only knowledge repository designed to be the canonical source of structured information for AI systems. This repository contains:

- **Pure content** - Weaves, looms, strands, tags, and schemas
- **Markdown-only** - The primary source of truth (OpenStrand ingests any file type and serializes to markdown)
- **No UI** - The viewer interface lives at [frame.dev/codex](https://frame.dev/codex)
- **LLM-optimized** - Structured for knowledge graph ingestion by OpenStrand and other AI systems

### Frame Codex vs OpenStrand

- **Frame Codex**: Public markdown knowledge repository (this repo) - read-only, curated, version-controlled
- **OpenStrand**: Full personal knowledge management platform at [openstrand.ai](https://openstrand.ai) - supports any file type (images, videos, PDFs, code), AI analysis, serialization to markdown, private workspaces, and advanced features

## Architecture

The Codex uses a three-tier knowledge organization:

- **Strand** - Atomic knowledge unit (document, image, media, dataset)
- **Loom** - Curated collection of related strands (topic/module)
- **Weave** - Complete knowledge universe with no cross-weave relationships

### SQL Cache Layer

Frame Codex uses [@framers/sql-storage-adapter](https://github.com/framersai/sql-storage-adapter) for intelligent caching:

**CI/GitHub Actions (better-sqlite3):**
- Stores file metadata, SHA hashes, and analysis results in `.cache/codex.db`
- Only re-processes files that have changed (SHA comparison)
- Reduces indexing time from ~30s to ~2-5s on typical PRs (85-95% speedup)
- Cache persists across workflow runs via GitHub Actions cache

**Browser (IndexedDB):**
- Caches fetched index data locally for offline access
- Progressive sync with ETag-based updates
- Instant repeat loads, no network requests for cached content
- Quota: 50MB-1GB+ depending on browser

**Performance:**
- First run: ~30s (full analysis, populates cache)
- Subsequent runs: ~2-5s (diff only, 85-95% cache hit rate)
- Storage: ~500KB-2MB for 100 files

**Configuration:**
```bash
SQL_CACHE_DISABLED=true  # Disable SQL caching (falls back to full indexing)
```

## Repository Structure

```
codex/
├── schema/              # JSON/YAML schemas for validation
│   ├── weave.schema.yaml
│   ├── loom.schema.yaml
│   └── strand.schema.yaml
├── tags/               # Controlled vocabulary
│   └── index.yaml     # Subjects, topics, subtopics
├── weaves/            # Knowledge universes
│   ├── frame/         # Frame ecosystem knowledge
│   ├── technology/    # Technology & CS
│   └── science/       # Scientific knowledge
├── docs/              # Documentation & static assets
│   ├── logos/         # Logos (codex.svg, openstrand.svg)
│   └── assets/        # Images and misc static files
├── scripts/           # Build and utility scripts
│   └── build-index.mjs
└── index.json        # Generated search index
```

## Usage

### For AI/LLM Integration

Frame.dev and OpenStrand consume this content via:

1. **GitHub API** - Dynamic folder browsing
2. **Raw URLs** - Direct content fetching
3. **Index File** - Pre-compiled `index.json` for search

```javascript
// Example: Fetch a strand
const response = await fetch(
  'https://raw.githubusercontent.com/framersai/codex/main/weaves/frame/looms/openstrand/strands/architecture.md'
);
const content = await response.text();
```

### Building the Index

```bash
# Install dependencies
npm install

# Generate search index with auto-categorization
npm run index

# Build lightweight index (original)
npm run build:index

# Validate all schemas and content
npm run validate

# Check for duplicate content
npm run check-duplicates
```

## Contributing

We welcome contributions! Our automated systems help ensure quality:

> Important: Only submit content you own or have permission to publish under a permissive license (CC-BY-4.0 or compatible). Do not submit proprietary or copyrighted material without explicit written permission.

### Quick Start
1. Fork this repository
2. Generate a template: `npm run generate-template -- "Your Title"`
3. Add your content following the schema
4. Validate: `npm run validate`
5. Submit a PR using our template

### Automated Features
- **Auto-Indexing**: NLP-powered categorization (TF-IDF, n-grams) - **No API keys needed**
- **Auto-Tagging**: Smart tag suggestions via vocabulary matching
- **Validation**: Quality assurance checks (schema, content, duplicates)
- **AI Enhancement** (Optional): GPT-4/Claude analysis with quality scoring
- **Auto-Merge**: Trusted Weavers (5+ contributions) get instant merge

### Quality Standards
- Minimum 100 characters of meaningful content  
- No placeholder text (lorem ipsum, TODO, FIXME)  
- Complete metadata (title, summary, tags)  
- Valid schema compliance  
- Proper categorization  

See [Contributing Guide](docs/contributing/how-to-submit.md) for details.

---

## GitHub Secrets (For Maintainers)

### Required Secrets

Add these to repository settings → Secrets and variables → Actions:

```bash
# Required for auto-merge workflow
GH_PAT=ghp_xxxxxxxxxxxxxxxxxxxx
# GitHub Personal Access Token with 'repo' scope
# Create at: https://github.com/settings/tokens/new?scopes=repo

# Optional: AI-powered PR enhancement
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
# OpenAI API key - supported by OpenAI for open source
# Get at: https://platform.openai.com/api-keys

# Auto-merge control for catalog updates (default: false)
AUTO_CATALOG_MERGE=false
# Set to 'true' to auto-merge full re-catalog PRs
# Recommended: keep false and manually review metadata changes

# Configuration (optional)
AI_PROVIDER=disabled
# Set to 'disabled' to skip AI enhancement entirely
# Leave unset or set to 'openai' to enable
```

### Secret Usage

- **GH_PAT**: Required for auto-merge workflow to approve and merge PRs
- **OPENAI_API_KEY**: Optional, enables AI quality analysis (cost varies by content length: ~$0.01-0.20/PR for 100-10K words)
- **AUTO_CATALOG_MERGE**: Set to `true` to auto-merge full re-catalog PRs (default: `false`, requires manual approval)
- **AI_PROVIDER**: Set to `disabled` to skip AI enhancement

**Note:** The indexer and validator work WITHOUT any API keys. AI enhancement is purely optional for advanced quality analysis.

### Supported by OpenAI

Frame Codex is supported by OpenAI's initiatives to help organizations integrate AI for public good. We use OpenAI API credits to power automated quality analysis and content enhancement. Learn more about OpenAI's programs at [openai.com](https://openai.com).

## Repository Structure

The Codex is organized hierarchically:
- **Weaves**: Complete knowledge universes
- **Looms**: Curated topic collections
- **Strands**: Individual knowledge units

## Integration

This repository is designed to be consumed by:

- **[Frame.dev](https://frame.dev)** - Web viewer interface
- **[OpenStrand](https://openstrand.ai)** - Personal knowledge management
- **Your Application** - Via API or direct access

## 📄 License

Frame Codex content is licensed under [CC-BY-4.0](LICENSE), making it free for:
- Commercial use
- Modification
- Distribution
- Private use

With attribution requirement.

---

<div align="center">
  <br/>
  
  ### Connect
  
  [Website](https://frame.dev) • [Frame Codex](https://frame.dev/codex) • [OpenStrand](https://openstrand.ai) • [Discord](https://discord.gg/VXXC4SJMKh) • [GitHub](https://github.com/framersai) • [Twitter](https://twitter.com/framersai)
  
  <br/>
  
  <sub>Building humanity's knowledge repository for the AI age</sub>
  
  <br/>
  
  <sub>Made with ❤️ by [Framers](https://frame.dev) • Supported by [OpenAI](https://openai.com)</sub>
</div>