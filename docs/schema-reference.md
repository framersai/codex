---
id: schema-reference-guide
slug: schema-reference
title: Frame Codex Schema Reference
summary: Complete reference for Weave, Loom, and Strand schemas with examples and validation rules
version: 1.0.0
contentType: markdown
difficulty: intermediate
taxonomy:
  subjects:
    - technology
  topics:
    - api-reference
    - architecture
tags: [schema, yaml, validation, weave, loom, strand]
relationships:
  references:
    - openstrand-architecture
publishing:
  created: 2025-01-15T00:00:00Z
  updated: 2025-01-15T00:00:00Z
  status: published
---

# Frame Codex Schema Reference

This document provides the complete schema reference for all Frame Codex content types.

## Weave Schema

A Weave represents a complete, self-contained universe of knowledge.

### Required Fields

- `slug` (string): Unique identifier, lowercase with hyphens
- `title` (string): Human-readable name
- `description` (string): Comprehensive description

### Optional Fields

- `maintainedBy` (object): Maintainer information
  - `name` (string): Name of person or organization
  - `url` (string): Contact or website URL
- `license` (string): Content license (default: MIT)
- `tags` (array): Categorization tags from controlled vocabulary

### Example

```yaml
slug: frame
title: Frame.dev Ecosystem
description: Comprehensive knowledge base for Frame.dev products and infrastructure
maintainedBy:
  name: Frame.dev Team
  url: https://frame.dev
license: MIT
tags:
  - technology
  - ai-infrastructure
  - superintelligence
```

## Loom Schema

A Loom is a curated collection of related strands within a weave.

### Required Fields

- `slug` (string): Unique identifier within the weave
- `title` (string): Display title
- `summary` (string): Brief description

### Optional Fields

- `tags` (array): Subject tags for categorization
- `ordering` (object): How strands are organized
  - `type` (enum): `sequential`, `hierarchical`, or `network`
  - `items` (array): Ordered list of strand slugs

### Example

```yaml
slug: getting-started
title: Getting Started with Frame
summary: Essential guides and tutorials for new Frame developers
tags:
  - tutorial
  - beginner
ordering:
  type: sequential
  items:
    - installation
    - hello-world
    - core-concepts
    - first-project
```

## Strand Schema

A Strand is an atomic unit of knowledge - a document, image, or dataset.

### Required Fields

- `id` (string): Globally unique identifier (UUID)
- `slug` (string): URL-friendly identifier
- `title` (string): Display title

### Optional Fields

- `summary` (string): Brief abstract (recommended for search)
- `version` (string): Semantic version (default: 1.0.0)
- `contentType` (enum): `markdown`, `code`, `data`, or `media`
- `difficulty` (enum): `beginner`, `intermediate`, `advanced`, or `expert`
- `taxonomy` (object): Categorization
  - `subjects` (array): High-level categories
  - `topics` (array): Specific topics **⚠️ MUST match folder depth - see note below**
- `tags` (array): Freeform tags **✓ Independent - can be shared across any level**

> **⚠️ Topics vs Tags**: Topics are HIERARCHICAL and must become MORE SPECIFIC as folder depth increases. Tags are INDEPENDENT and can be freely shared. See [Hierarchical Topic Structure](./openstrand-architecture.md#hierarchical-topic-structure-critical-rule).
- `relationships` (object): Connections to other strands
  - `requires` (array): Prerequisites
  - `references` (array): Related strands
  - `seeAlso` (array): External URLs
- `publishing` (object): Publication metadata
  - `created` (string): ISO 8601 timestamp
  - `updated` (string): ISO 8601 timestamp
  - `status` (enum): `draft`, `published`, `archived`

### Example

```yaml
---
id: 550e8400-e29b-41d4-a716-446655440000
slug: openstrand-architecture
title: OpenStrand Architecture Overview
summary: Comprehensive guide to OpenStrand's system architecture and design principles
version: 1.2.0
contentType: markdown
difficulty: intermediate
taxonomy:
  subjects:
    - technology
    - ai
  topics:
    - architecture
    - getting-started
tags:
  - openstrand
  - architecture
  - knowledge-graph
relationships:
  requires:
    - core-concepts
  references:
    - frame-codex-intro
    - api-reference
  seeAlso:
    - https://openstrand.ai
    - https://frame.dev
publishing:
  created: 2025-01-15T00:00:00Z
  updated: 2025-01-15T00:00:00Z
  status: published
---

# Your content here...
```

## Validation Rules

### Slug Format

- Lowercase letters, numbers, and hyphens only
- No spaces or special characters
- Must be unique within scope (weave/loom)

### ID Format

- Must be a valid UUID v4
- Globally unique across all strands
- Generate using `npm run generate-template`

### Version Format

- Semantic versioning: `MAJOR.MINOR.PATCH`
- Example: `1.0.0`, `2.1.3`

### Content Requirements

- Minimum 100 characters of meaningful content
- No unfinished sections or test content
- Proper markdown formatting
- Valid YAML frontmatter

## Auto-Generated Metadata

The indexer automatically generates:

- **Keywords**: Extracted using TF-IDF algorithm
- **Phrases**: Common multi-word expressions
- **Subjects**: Matched from controlled vocabulary
- **Topics**: Detected from content analysis
- **Difficulty**: Inferred from language complexity
- **Summary**: Generated if missing

You can override any auto-generated values by specifying them explicitly in your frontmatter.

## Controlled Vocabulary

Tags should use terms from the controlled vocabulary when possible:

### Subjects
- technology, science, philosophy, ai, knowledge, design, security

### Topics
- getting-started, architecture, api-reference, best-practices, troubleshooting, deployment, testing, performance

### Difficulty
- beginner, intermediate, advanced, expert

The indexer will suggest additions to the vocabulary based on frequently occurring terms across documents.

## Validation Commands

```bash
# Validate all content
npm run validate

# Validate specific files
npm run validate -- --files weaves/frame/openstrand/architecture.md

# Check for duplicates
npm run check-duplicates

# Generate a new strand template
npm run generate-template -- "My New Document"
```

## Best Practices

1. **Always include metadata**: Title and summary are required
2. **Use UUIDs for IDs**: Generate with `uuidgen` or our template tool
3. **Tag appropriately**: Use controlled vocabulary when possible
4. **Link related content**: Build the knowledge graph
5. **Version your content**: Update version on significant changes
6. **Write for both humans and AI**: Clear, structured, comprehensive

## Schema Evolution

Schemas may evolve over time. When they do:

- Old content remains valid
- New fields are optional
- Migration guides are provided
- Validation warns about deprecated fields

## Learn More

- [OpenStrand Architecture](./openstrand-architecture.md)
- [Contributing Guide](../.github/pull_request_template.md)
- [Auto-Indexing Documentation](../scripts/auto-index.js)
