---
id: openstrand-hierarchy
slug: openstrand-hierarchy
title: "Hierarchy & Vocabulary"
summary: "Complete guide to OpenStrand hierarchical organization: Fabric, Weave, Loom, and Strand."
version: 1.0.0
contentType: reference
difficulty: intermediate
tags: ["schema", "hierarchy", "architecture", "knowledge-graph"]
taxonomy:
  subjects: ["knowledge-management", "ai-infrastructure"]
  topics: ["openstrand", "schema", "hierarchy"]
relationships:
  - { targetSlug: openstrand-overview, type: extends, strength: 0.8 }
  - { targetSlug: openstrand-architecture, type: references, strength: 0.7 }
publishing:
  status: published
  license: MIT
---

# Hierarchy & Vocabulary

OpenStrand organizes knowledge into a four-tier hierarchy that mirrors how humans naturally think about information—from broad domains down to atomic concepts:

```
FABRIC (Knowledge Repository)
└── WEAVE (Knowledge Universe)
    └── LOOM (Topic Collection)
        └── STRAND (Atomic Knowledge Unit)
```

| Layer | Description | Example |
| ----- | ----------- | ------- |
| **Fabric** | Complete repository containing all weaves. The highest organizational level. | `weaves/` |
| **Weave** | Complete, self-contained universe of strands. No cross-weave dependencies. | `weaves/frame/` |
| **Loom** | Curated folder inside a weave. Groups strands by topic or workflow. | `weaves/frame/openstrand/` |
| **Strand** | Individual markdown file with YAML frontmatter metadata. | `weaves/frame/openstrand/overview.md` |

---

## Node Levels in the Viewer

The Codex viewer reads this hierarchy directly from GitHub and applies level-specific styling (fabric/weave/loom/strand) so humans can instantly see where they are. Metadata such as `tags`, `taxonomy`, or `publishing.status` flows into the sidebar and search filters.

### Schema Goals

1. **Nesting without magic** – folders on disk are the schema; no hidden database.
2. **Frontmatter as API** – every strand's YAML block becomes structured data for search, analytics, and embeddings.
3. **Machine-friendly URLs** – `https://frame.dev/codex?path=weaves/frame&file=openstrand/overview.md`

---

## Why This Hierarchy Matters

### For Semantic Search

Each layer provides different search scopes:
- **Fabric-level:** Search across all knowledge
- **Weave-level:** Search within a domain
- **Loom-level:** Search within a topic
- **Strand-level:** Search within a document

### For AI Traversal

The hierarchy tells AI agents how to navigate:
1. **Breadth-first:** Explore Looms in order
2. **Depth-first:** Dive into prerequisites before moving on
3. **Prerequisite-ordered:** Follow relationship chains

### For Knowledge Graphs

The hierarchy maps to graph structures:
- **Strands** → Nodes
- **Relationships** → Edges
- **Looms** → Clusters
- **Weaves** → Subgraphs

---

## The Value of Structured Knowledge

| Use Case | Benefit |
|----------|---------|
| **Personal notes** | Semantic search finds related content by meaning, not keywords |
| **Team documentation** | AI agents answer questions with sourced citations |
| **Learning paths** | Prerequisite relationships create guided curricula |
| **Knowledge bases** | Graph visualization reveals hidden connections |

---

## Hierarchical Topic Structure

**Folder depth determines topic specificity.** This is a fundamental OpenStrand principle:

> 📐 **Subfolders are SUBTOPICS of their parent folder. Topics MUST become more specific as you go deeper.**

### How It Works

```
weaves/technology/                     # Topic: technology (broad)
├── programming/                       # Topic: programming (more specific)
│   ├── python/                        # Topic: python (even more specific)
│   │   └── async/                     # Topic: async-python (most specific)
│   │       └── coroutines.md          # Strand about Python coroutines
│   └── rust/                          # Topic: rust (sibling to python)
│       └── memory-safety.md
└── infrastructure/                    # Topic: infrastructure (sibling to programming)
    └── kubernetes/
        └── networking.md
```

**The hierarchy implies:**
- `programming/` is a subtopic of `technology/`
- `python/` is a subtopic of `programming/`
- `async/` is a subtopic of `python/`
- Content in `async/` MUST be about async Python, not general async concepts

### Topics vs Tags

| Aspect | **Topics** (Hierarchical) | **Tags** (Independent) |
|--------|---------------------------|------------------------|
| Structure | Tree-like, parent-child | Flat, no hierarchy |
| Inheritance | Child topics MUST narrow parent scope | No inheritance |
| Sharing | Cannot share across unrelated branches | Can share across ANY level |
| Purpose | Determines WHERE content lives | Describes WHAT content covers |
| Example | `programming > python > async` | `best-practices`, `tutorial`, `advanced` |

---

## Next Steps

- **[../overview.md](../overview.md)** — OpenStrand overview and value proposition
- **[../architecture.md](../architecture.md)** — Condensed architecture overview
- **[frame.dev/codex](https://frame.dev/codex)** — Live Codex viewer
