<h1 align="center">Frame Codex</h1>
<p align="center">Data-only knowledge corpus for the Frame ecosystem.</p>

---

## What this repo is

- **Data first**: This repo is the canonical home for the Frame Codex content (weaves, looms, strands, tags, schemas).
- **No public UI here**: There is **no** GitHub Pages / site viewer in this repo. The UI lives at `frame.dev`, which consumes this content as a data source.
- **LLM/RAG friendly**: Everything is structured so OpenStrand, Frame, or any other stack can ingest Markdown + YAML and build a knowledge graph.

The contract is:

- `framersai/codex` = **content + schemas + lightweight tooling**
- `framersai/frame.dev` = **viewer + interactive exploration of the Codex**

---

## Structure (high level)

- `schema/` – JSON-Schema/YAML schemas for validation
- `tags/` – controlled vocabulary (subjects, topics, subtopics)
- `weaves/` – top-level universes of content
- `assets/` – shared assets (e.g. Codex logo SVG)
- `scripts/` – utility scripts (e.g. `build-index.mjs`)

Key primitives:

- **Strand**: any atomic asset (Markdown doc, image, media, dataset).
- **Loom**: curated group of strands (topic/module).
- **Weave**: entire universe/collection; **no relationships across weaves**.

---

## How frame.dev uses this

`frame.dev` (and OpenStrand apps) can:

- Call the GitHub API or raw URLs to:
  - List folders under `weaves/*/looms/*/strands/`
  - Fetch Markdown content and frontmatter
  - Read `weave.yaml`, `loom.yaml`, and `tags/index.yaml`
- Optionally read a generated `index.json` (from `scripts/build-index.mjs`) if you want a pre-compiled index.

The Codex itself stays free of any UI; it’s just the source of truth.

---

## Tooling

- `scripts/build-index.mjs` – scans `weaves/` and emits `index.json` with:
  - `tree`: weaves → looms → strands
  - `flat`: flattened strand list with path, title, tags, difficulty
- `package.json` – only used to run the indexing script locally or in CI.

You can **wire this into any API or viewer** (including `frame.dev`) without turning this repo into a static site.


