<div align="center">
  <img src="assets/codex-logo.svg" alt="Frame Codex" width="150">

# Frame Codex

**The codex of humanity for LLM knowledge retrieval**

*The OS for humans, the codex of humanity.*

[Browse](https://frame.dev/codex) • [Documentation](../../wiki/codex/README.md) • [Contribute](#contributing)

**AI Infrastructure for Superintelligence.**

</div>

---

## 📚 Overview

Frame Codex is a data-only knowledge repository designed to be the canonical source of structured information for AI systems. This repository contains:

- **Pure content** - Weaves, looms, strands, tags, and schemas
- **No UI** - The viewer interface lives at [frame.dev/codex](https://frame.dev/codex)
- **LLM-optimized** - Structured for knowledge graph ingestion by OpenStrand and other AI systems

## 🏗️ Architecture

The Codex uses a three-tier knowledge organization:

- **🧵 Strand** - Atomic knowledge unit (document, image, media, dataset)
- **🪡 Loom** - Curated collection of related strands (topic/module)
- **🌌 Weave** - Complete knowledge universe with no cross-weave relationships

## 📁 Repository Structure

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
├── assets/            # Shared assets (logos, etc.)
├── scripts/           # Build and utility scripts
│   └── build-index.mjs
└── index.json        # Generated search index
```

## 🚀 Usage

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

# Generate index.json
npm run build-index

# Validate schemas
npm run validate
```

## 🤝 Contributing

We welcome contributions! Please:

1. Follow the [schema specifications](../../wiki/codex/schema.md)
2. Ensure content quality and accuracy
3. Include proper citations
4. Submit via pull request

See [Contributing Guide](../../wiki/codex/contributing.md) for details.

## 📊 Current Statistics

- **3** Weaves (knowledge universes)
- **50+** Looms (topic collections)
- **10,000+** Strands (knowledge units)
- **100+** Contributors

## 🔗 Integration

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
  <p>
    <a href="https://frame.dev">Frame.dev</a> •
    <a href="https://frame.dev/codex">Frame Codex</a> •
    <a href="https://openstrand.ai">OpenStrand</a>
  </p>
  <p>
    <a href="https://github.com/framersai">GitHub</a> •
    <a href="https://twitter.com/framersai">Twitter</a>
  </p>
  <br/>
  <sub>Building humanity's knowledge repository for the AI age</sub>
</div>