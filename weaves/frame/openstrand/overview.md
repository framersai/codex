---
id: openstrand-overview
slug: openstrand-overview
title: "OpenStrand Overview"
summary: "What OpenStrand is, why it exists, and how strands, looms, and weaves map to the analog OS."
version: 1.0.0
contentType: markdown
difficulty: beginner
tags: ["openstrand", "schema", "os-for-humans", "knowledge-graph", "ai-native"]
taxonomy:
  subjects: ["knowledge-management", "ai-infrastructure"]
  topics: ["openstrand", "fabric-codex", "semantic-web"]
relationships:
  - { targetSlug: openstrand-architecture, type: extends, strength: 0.8 }
  - { targetSlug: openstrand-hierarchy, type: references, strength: 0.7 }
publishing:
  status: published
  license: MIT
---

# OpenStrand Overview

OpenStrand is the shared schema that powers Fabric Codex—a hierarchy built for humans but optimized for machines. It treats knowledge as a fabric:

- **Fabric** – the entire repository (`weaves/`)
- **Weave** – a self-contained universe (for example, this `openstrand/` weave)
- **Loom** – curated topic folder inside a weave (`schema/`, `playbooks/`, etc.)
- **Strand** – atomic markdown file

The goal: ship knowledge that feels like a handcrafted book yet remains machine-readable, versioned, and searchable like Wikipedia.

---

## Why OpenStrand?

Traditional knowledge management tools force a choice: **human-friendly** or **machine-readable**. OpenStrand eliminates this trade-off.

### The Problem with Existing Solutions

| Approach | Human Experience | AI Experience | Limitation |
|----------|-----------------|---------------|------------|
| **Plain Markdown** | Easy to write | Hard to parse relationships | No semantic structure |
| **Database/CMS** | Locked in UI | API access only | No portability |
| **Wiki Systems** | Good navigation | Flat structure | Weak linking |
| **Note Apps** | Personal & fast | Proprietary format | Vendor lock-in |

### The OpenStrand Solution

OpenStrand adds an **invisible intelligence layer** to standard Markdown:

1. **YAML Frontmatter** → Structured metadata that AI agents can parse
2. **Typed Relationships** → Semantic links (`requires`, `extends`, `contradicts`)
3. **LLM Instructions** → Control how AI interprets and summarizes content
4. **Git-Native** → Version control, collaboration, and permanence built-in

```yaml
# Example: A strand that AI agents understand
---
id: "auth-patterns-jwt"
title: "JWT Authentication Patterns"
llm:
  tone: "technical"
  agentInstructions:
    traversal: "depth-first"
    citation: "always-source"
relationships:
  - target: "security-basics"
    type: "requires"
  - target: "oauth2-patterns"
    type: "extends"
---
```

---

## The Four-Tier Hierarchy

OpenStrand organizes knowledge into four nested layers. Each layer serves a specific purpose and maps to familiar concepts:

### Fabric → Your Entire Knowledge Base

The **Fabric** is the root container—your complete repository of knowledge. Think of it as:
- A library containing all your books
- A database encompassing all tables
- A universe containing all domains

**In practice:** The `weaves/` directory in your repository.

### Weave → Self-Contained Domains

A **Weave** is a complete, independent universe of knowledge. Key properties:
- **Self-contained** – No dependencies on other Weaves
- **Publishable** – Can be exported, forked, or shared independently
- **Themed** – Custom branding, icons, and styling

**Examples:**
- `weaves/openstrand/` – This documentation
- `weaves/machine-learning/` – ML curriculum
- `weaves/company-handbook/` – Internal docs

### Loom → Curated Topics

A **Loom** groups related Strands into navigable modules. Looms:
- Define learning paths and prerequisites
- Provide topic-level metadata
- Enable hierarchical navigation

**In this Weave:**
- `schema/` – Technical specifications
- `playbooks/` – Practical how-to guides

### Strand → Atomic Knowledge Units

The **Strand** is the smallest unit—a single Markdown file with:
- Rich YAML frontmatter
- Typed semantic relationships
- AI agent instructions
- Auto-generated embeddings

---

## How AI Agents Use OpenStrand

OpenStrand isn't just for humans. Every Strand carries instructions for AI systems:

### Traversal Patterns

```yaml
llm:
  agentInstructions:
    traversal: "depth-first"  # or "breadth-first", "prerequisite-ordered"
```

AI agents know **how to navigate** your knowledge graph—following prerequisites, exploring related concepts, or diving deep into specifics.

### Citation Behavior

```yaml
llm:
  agentInstructions:
    citation: "always-source"  # or "inline", "footnote", "none"
```

When answering questions, agents cite their sources with links back to the original Strands.

### Tone and Detail

```yaml
llm:
  tone: "educational"       # or "technical", "casual", "formal"
  detail: "comprehensive"   # or "summary", "bullet-points"
```

The same knowledge can be presented differently based on context—technical deep-dives for developers, summaries for executives.

### Semantic Search

Every Strand is automatically embedded into a vector space. This enables:
- **Meaning-based search** – Find related content even without keyword matches
- **Concept clustering** – Discover unexpected connections
- **Q&A over your knowledge** – Natural language queries with sourced answers

---

## The Value of Structured Knowledge

### For Individuals

- **Second Brain** – Build lasting knowledge with typed relationships
- **Spaced Repetition** – Auto-generated flashcards from your Strands
- **Offline Access** – Everything runs locally via WebAssembly

### For Teams

- **Shared Source of Truth** – Version-controlled documentation
- **Onboarding** – New members navigate learning paths
- **AI Assistants** – Train bots on your company knowledge

### For the AI Era

- **Future-Proof** – OpenStrand protocol works with any AI system
- **Portable** – Plain Markdown means no lock-in
- **Trustworthy** – AI citations link to verifiable sources

---

## Design Principles

1. **Deterministic structure** – predictable paths ensure every strand has a stable URL and metadata envelope.
2. **Frontmatter-first** – YAML metadata becomes API-friendly tags and surfaces in the Codex viewer.
3. **Privacy by default** – bookmarks/history live locally; analytics are optional and anonymized.
4. **Shared theming** – Frame.dev and the Codex viewer use the same Tailwind preset, so your knowledge base inherits the analog look instantly.
5. **AI-native** – Every Strand carries instructions for how AI agents should interpret, summarize, and present the content.
6. **Interoperability** – Standard Markdown with YAML ensures compatibility with any tool.

---

## Getting Started

### Quick Start (5 minutes)

1. **Fork the template:** `github.com/framersai/codex-template`
2. **Create a Weave:** `mkdir weaves/my-topic`
3. **Add a Loom:** `mkdir weaves/my-topic/basics && touch weaves/my-topic/basics/loom.yaml`
4. **Write a Strand:** Create `introduction.md` with frontmatter

### Example Strand

```markdown
---
id: "intro-to-react"
title: "Introduction to React"
summary: "Core concepts of React component architecture"
tags: ["react", "javascript", "frontend"]
difficulty: "beginner"
relationships:
  - target: "javascript-fundamentals"
    type: "requires"
---

# Introduction to React

React is a JavaScript library for building user interfaces...
```

---

## Next Steps

Want to go deeper? Explore these resources:

- **[schema/hierarchy.md](schema/hierarchy.md)** – Detailed hierarchy specifications
- **[architecture.md](architecture.md)** – Condensed architecture overview
- **[frame.dev/codex](https://frame.dev/codex)** – Live Codex viewer
- **[openstrand.ai](https://openstrand.ai)** – OpenStrand protocol home
