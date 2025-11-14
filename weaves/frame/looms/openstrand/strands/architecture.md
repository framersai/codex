---
id: 3c3ac6d5-8cc2-4106-9f4a-4f6134c3d0b2
slug: openstrand-architecture
title: OpenStrand Architecture – Condensed Overview
summary: A practical, implementation-focused overview of OpenStrand’s architecture for ingestion and RAG.
version: 1.0.0
contentType: reference
difficulty:
  overall: advanced
  cognitive: 8
  prerequisites: 5
  conceptual: 8
taxonomy:
  subject: [computing, knowledge-systems]
  topic: [openstrand, architecture]
  subtopic: [api, pipelines, metadata, search, embeddings]
  concepts:
    - { term: strands, weight: 0.8 }
    - { term: looms, weight: 0.6 }
    - { term: weaves, weight: 0.6 }
    - { term: knowledge-graph, weight: 0.8 }
    - { term: ingestion, weight: 0.7 }
relationships:
  - { targetSlug: openstrand-ingestion, type: follows, strength: 0.7, bidirectional: false }
publishing:
  status: published
  license: MIT
---

This strand condenses the OpenStrand Architecture into a short practitioner guide. For full details, see the comprehensive architecture document in the OpenStrand repo and related strands in this loom.

## Key Ideas
- Strands: atomic assets (docs, media, datasets); Looms: curated groups of strands; Weaves: entire universes of content. No cross-weave edges.
- Ingestion: parse frontmatter → validate → persist ECA → index (text + vector) → construct relations (within weave).
- Retrieval: combine lexical + semantic + graph edges; re-rank with pedagogical and structural signals.
- Pipelines: support multi-format content; normalize to Markdown + frontmatter; attach assets alongside strands.

## Ingestion Mapping
1. Read `weave.yaml` → create workspace scope  
2. Read `loom.yaml` → create grouping with tags + ordering  
3. For each strand MD:
   - Extract frontmatter (id, slug, title, taxonomy, relationships)
   - Store Markdown and assets
   - Create edges only to strands in the same weave
4. Build search index + embeddings

## RAG & Search
- Flat inverted index for fast client-side search (GitHub Pages).
- Vector store for semantic similarity (server-side or local).
- Graph traversal to suggest next-items within a loom.

## Governance & SEO
- Short executive summaries; single-topic strands; stable anchors; internal links between strands.
- Controlled vocabulary in `tags/index.yaml`; CI validates tag usage and relationships.


