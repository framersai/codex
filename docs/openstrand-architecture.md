---
id: openstrand-architecture-overview
slug: openstrand-architecture
title: OpenStrand Architecture Overview
summary: Comprehensive guide to OpenStrand's knowledge infrastructure, explaining how Weaves, Looms, and Strands work together to create the foundation for Frame Codex
version: 1.0.0
contentType: markdown
difficulty: intermediate
taxonomy:
  subjects:
    - technology
    - ai
    - knowledge
  topics:
    - architecture
    - getting-started
tags: openstrand, architecture, knowledge-graph, weave, loom, strand
relationships:
  references:
    - frame-codex-intro
    - schema-reference
  seeAlso:
    - https://openstrand.ai
    - https://frame.dev
publishing:
  created: 2025-01-15T00:00:00Z
  updated: 2025-01-15T00:00:00Z
  status: published
---

# OpenStrand Architecture Overview

OpenStrand is the knowledge infrastructure that powers Frame.dev and Frame Codex. It provides a structured, AI-native way to organize, store, and retrieve humanity's knowledge.

## Core Concepts

### The Three-Tier Hierarchy

OpenStrand organizes knowledge using three fundamental primitives:

**Strand** - The atomic unit of knowledge
- A single document, image, dataset, or media file
- Contains rich metadata for categorization and discovery
- Can reference other strands within the same weave
- Immutable once published (new versions create new strands)

**Loom** - A curated collection of related strands
- Groups strands by topic, theme, or learning path
- Defines ordering (sequential, hierarchical, or network)
- Provides context and relationships between strands
- Acts as a module or chapter in the knowledge base

**Weave** - A complete universe of knowledge
- Self-contained collection with no external dependencies
- Represents a domain, project, or knowledge area
- No relationships exist between different weaves
- Think of it as a separate universe or dimension

### Why This Structure?

The Weave/Loom/Strand architecture solves several key problems:

1. **Isolation**: Weaves are completely independent, preventing knowledge pollution
2. **Scalability**: Each weave can grow infinitely without affecting others
3. **Clarity**: Clear boundaries make it obvious where knowledge belongs
4. **Versioning**: Strands are immutable, making version control natural
5. **AI-Friendly**: Structured metadata enables semantic search and RAG

## How It Works

### Knowledge Flow

```
Weave (Universe)
  └── Loom (Collection)
        ├── Strand (Document)
        ├── Strand (Image)
        └── Strand (Dataset)
```

### Example: Frame Ecosystem Weave

```yaml
# weaves/frame/weave.yaml
slug: frame
title: Frame.dev Ecosystem
description: Complete knowledge base for Frame products and infrastructure
```

This weave contains looms for:
- OpenStrand documentation
- AgentOS guides
- Frame API reference
- Architecture patterns

💡 **Physical layout**: Loosely structured folders — no `looms/` or `strands/` prefixes are required.

```
weaves/frame/
├── weave.yaml
├── overview.md
├── openstrand/
│   ├── loom.yaml
│   └── architecture.md
└── guides/agentos/deployment.md
```

Each folder inside `weaves/frame/` is treated as a loom, and every markdown file (at any depth) is a strand that can reference other strands.

### Metadata Schema

Every strand includes:
- **Identity**: UUID, slug, title
- **Content**: Summary, body, content type
- **Taxonomy**: Subjects, topics, tags
- **Relationships**: Prerequisites, references, related content
- **Publishing**: Dates, status, version

This rich metadata enables:
- Semantic search
- Knowledge graph visualization
- Prerequisite tracking
- Learning path generation
- AI-powered recommendations

## Integration with Frame Codex

Frame Codex is the public manifestation of OpenStrand's architecture:

1. **Data Layer**: Codex stores all weaves, looms, and strands as files
2. **Index Layer**: Auto-indexing creates searchable metadata
3. **API Layer**: Frame API exposes the knowledge graph
4. **UI Layer**: Frame.dev provides the browsing interface

### For LLMs

The structure is optimized for Large Language Model consumption:

- **Structured metadata** enables precise retrieval
- **Clear relationships** provide context
- **Immutable versions** ensure consistency
- **Rich tagging** improves relevance

LLMs can:
- Navigate the knowledge graph
- Understand prerequisites
- Find related content
- Extract specific information
- Generate summaries

### For Humans

The same structure benefits human users:

- **Browse by topic** through looms
- **Follow learning paths** with ordered strands
- **Discover connections** via relationships
- **Search semantically** using natural language
- **Track versions** to see evolution

## Technical Implementation

### Storage

- **GitHub**: Primary storage as markdown and YAML files
- **Git**: Version control for all content
- **Raw URLs**: Direct access to any strand

### Indexing

- **Auto-indexing**: NLP-powered categorization on every commit
- **TF-IDF**: Keyword extraction for search
- **Validation**: Quality checks before merging
- **Relationships**: Automatic link discovery

### Access

- **GitHub API**: Dynamic folder browsing
- **Raw Content**: Direct file fetching
- **Search Index**: Pre-built JSON for client-side search
- **Frame API**: Structured queries with relationships

## Roadmap

Future enhancements planned:

1. **LLM-Powered QC**: Automated quality control using our own models
2. **Smart Suggestions**: AI-generated metadata improvements
3. **Auto-Relationships**: Discover connections between strands
4. **Translation**: Multi-language support with auto-translation
5. **Embeddings**: Vector search for semantic similarity

These features will be powered by Frame's independent LLM service, not third-party APIs, ensuring privacy and control.

## Contributing

When you contribute to Frame Codex, you're adding to this knowledge infrastructure:

1. **Choose a weave** - Or create a new one
2. **Find or create a loom** - Group related content
3. **Add your strand** - Follow the schema
4. **Let automation help** - Auto-tagging and validation

The system will:
- Suggest appropriate tags
- Validate your metadata
- Check for duplicates
- Generate summaries if needed
- Ensure schema compliance

## Learn More

- [Schema Reference](./schema-reference.md)
- [Contributing Guide](../../.github/pull_request_template.md)
- [Frame Codex](https://frame.dev/codex)
- [OpenStrand](https://openstrand.ai)
