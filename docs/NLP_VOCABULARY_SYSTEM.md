# NLP & Vocabulary System Documentation

## Overview

The Codex auto-indexer uses a sophisticated NLP pipeline for content classification, keyword extraction, and auto-tagging. This system combines:

1. **External Vocabulary Files** - Extensible text files with domain-specific terms
2. **Porter Stemmer** - Word normalization for better matching
3. **N-gram Analysis** - Trigram → Bigram → Unigram weighted matching
4. **Context-Aware Scoring** - Reduce false positives through contextual analysis
5. **LLM Assistance** (optional) - AI-powered enhancement via `ai-enhance.js`

## Architecture

```
vocab/
├── subjects/           # Domain categories (8 files)
│   ├── technology.txt  # Programming, frameworks, tools
│   ├── ai.txt          # Machine learning, LLMs, neural nets
│   ├── science.txt     # Research, physics, chemistry, biology
│   ├── philosophy.txt  # Ethics, metaphysics, epistemology
│   ├── knowledge.txt   # Documentation, learning, OpenStrand
│   ├── design.txt      # UX/UI, visual design, accessibility
│   ├── security.txt    # Encryption, auth, vulnerabilities
│   └── media.txt       # Images, video, audio, formats
├── topics/             # Content type categories (5 files)
│   ├── getting-started.txt
│   ├── architecture.txt
│   ├── api-reference.txt
│   ├── best-practices.txt
│   └── troubleshooting.txt
├── difficulty/         # Skill levels (4 files)
│   ├── beginner.txt
│   ├── intermediate.txt
│   ├── advanced.txt
│   └── expert.txt
└── stopwords.txt       # 500+ stop words for filtering
```

## N-gram Weighted Matching

The system prioritizes longer, more specific matches:

| N-gram Type | Weight | Example |
|-------------|--------|---------|
| **Trigram** (3 words) | 3.0x | "machine learning model" |
| **Bigram** (2 words) | 2.0x | "neural network" |
| **Unigram** (1 word) | 1.0x | "tensorflow" |

### Matching Logic

```javascript
// Trigrams checked first (highest specificity)
if (trigramSet.has("domain driven design")) → weight = 3.0

// Then bigrams
if (bigramSet.has("clean architecture")) → weight = 2.0

// Finally unigrams with stemming
if (unigramSet.has("microservic") || unigramSet.has("microservice")) → weight = 1.0

// Hyphenated compound terms get 1.5x unigram weight
if (allPartsMatch("event-driven")) → weight = 1.5
```

## Context-Aware Scoring

To avoid false positives (e.g., "library" matching programming when discussing a physical library), the system applies context adjustments:

### Negative Context (Score × 0.3)

| Term | Negative Context Words |
|------|----------------------|
| library | physical, book, public, municipal, lending |
| learning | curve, disability, difficulties, disorder |
| framework | legal, regulatory, policy, theoretical |
| model | fashion, role, scale, 3d, clay |
| platform | train, station, political, diving |
| cloud | weather, rain, storm, sky |

### Positive Context (Score × 1.5)

| Term | Positive Context Words |
|------|----------------------|
| library | code, import, npm, package, install, dependency |
| learning | machine, deep, model, neural, ai, training |
| framework | web, software, javascript, python, backend |
| model | machine, learning, neural, language, ai |
| platform | cloud, software, development, api, saas |

## Porter Stemmer

All terms are normalized using the Porter Stemming Algorithm:

| Original | Stemmed |
|----------|---------|
| programming | program |
| development | develop |
| configuration | configur |
| authentication | authent |
| microservices | microservic |

This allows matching word variants automatically.

## Adding Vocabulary Terms

Simply add terms to the appropriate `.txt` file:

```txt
# vocab/subjects/technology.txt
# One term per line. Lines starting with # are comments.

kubernetes
k8s
helm-chart
istio
service-mesh
```

### Best Practices

1. **Use hyphens** for compound terms: `machine-learning`, `event-driven`
2. **Include variations**: `k8s`, `kubernetes`, `kube`
3. **Add acronyms**: Both `API` and `application-programming-interface`
4. **Use lowercase**: Normalization handles case automatically
5. **Group related terms**: Keep related concepts together

## LLM Enhancement (Optional)

The `ai-enhance.js` script uses Claude/GPT-4 to:

1. **Auto-fill metadata** - Title, summary, tags
2. **Suggest categories** - Subject, topic, difficulty
3. **Detect quality issues** - Missing sections, unclear content
4. **Generate summaries** - Extractive and abstractive

### Usage

```bash
# Analyze specific files
node scripts/ai-enhance.js --files "file1.md,file2.md"

# Apply safe fixes automatically
node scripts/ai-enhance.js --files "file1.md" --apply-safe-fixes
```

### Environment Variables

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OPENROUTER_API_KEY=sk-or-...
AI_PROVIDER=anthropic  # or 'openai', 'openrouter', 'disabled'
```

## Classification Output

The classifier returns:

```javascript
{
  subjects: ['technology', 'ai'],
  topics: ['architecture', 'best-practices'],
  difficulty: 'intermediate',
  confidence: {
    'technology': 0.85,
    'ai': 0.72,
    'architecture': 0.68,
    'best-practices': 0.45
  },
  matches: {
    'technology': [
      { term: 'microservices', weight: 2.0 },
      { term: 'kubernetes', weight: 1.5 },
      { term: 'api', weight: 1.0 }
    ]
  }
}
```

## Performance

| Operation | Time |
|-----------|------|
| Vocabulary load | ~50ms |
| Single document classification | ~5ms |
| Full index (19 files, cached) | ~10s |
| Full index (19 files, fresh) | ~70s |

## Vocabulary Statistics

Current vocabulary coverage:

- **Stop words**: 534
- **Subject terms**: ~300 across 8 categories
- **Topic terms**: ~100 across 5 categories
- **Difficulty terms**: ~70 across 4 levels
- **Unique stems**: ~650
- **Total terms**: ~465 base + stemmed variants

## Integration with Frame Codex

The vocabulary system is used by:

1. **Auto-indexer** (`auto-index.js`) - Classification during indexing
2. **AI Enhancer** (`ai-enhance.js`) - LLM-assisted improvements
3. **Search Engine** - Semantic search matching
4. **Spiral Path** - Prerequisite mapping
5. **Q&A Oracle** - Question context understanding

## Future Improvements

- [ ] Word2Vec/FastText embeddings for semantic similarity
- [ ] TF-IDF document frequency weighting
- [ ] Custom vocabulary per weave/loom
- [ ] Learning from user corrections
- [ ] Multi-language support
