# Q&A System Architecture

The Frame Codex Q&A system represents a paradigm shift in knowledge retrieval—combining the precision of semantic search with the intuition of natural language understanding. This document outlines the architecture, implementation, and philosophy behind our question-answering oracle.

## Philosophy: Questions as Knowledge Traversal

Traditional search treats queries as keyword matching exercises. The Frame Codex Q&A system treats **questions as journeys through the knowledge graph**. When you ask "How does authentication work?", you're not looking for documents containing "authentication"—you're seeking understanding of a concept's mechanics, relationships, and implications.

## Core Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Question   │  │   Suggested  │  │  Answer Cards   │  │
│  │    Input     │  │  Questions   │  │  (Contextual)   │  │
│  └──────┬──────┘  └──────────────┘  └─────────▲────────┘  │
└─────────┼────────────────────────────────────────┼──────────┘
          │                                         │
┌─────────▼─────────────────────────────────────────┼──────────┐
│                    Question Processor              │          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────▼────────┐ │
│  │   Intent     │  │   Entity     │  │  Answer Builder   │ │
│  │  Analyzer    │  │  Extractor   │  │  (Multi-source)   │ │
│  └──────┬──────┘  └──────┬──────┘  └─────────▲────────┘ │
└─────────┼─────────────────┼───────────────────┼──────────┘
          │                 │                   │
┌─────────▼─────────────────▼───────────────────┼──────────┐
│                  Semantic Search Engine         │          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────▼────────┐ │
│  │   ONNX       │  │  Embedding   │  │  Similarity    │ │
│  │  Runtime     │  │   Index      │  │   Scoring      │ │
│  └──────────────┘  └──────────────┘  └────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

## Components

### 1. Question Input Interface

The entry point for natural language queries with intelligent features:

- **Auto-complete** based on common questions and recent queries
- **Voice input** with real-time transcription
- **Question templates** for common patterns
- **Multi-language** support with automatic translation

### 2. Question Processor

Transforms natural language into structured queries:

#### Intent Analyzer
- Classifies question types: How, What, Where, Why, When
- Identifies action verbs: implement, configure, debug, optimize
- Detects scope: specific file, concept, or system-wide

#### Entity Extractor
- Identifies key concepts: authentication, React hooks, API endpoints
- Extracts constraints: "in TypeScript", "for production", "with examples"
- Recognizes relationships: "difference between X and Y"

### 3. Semantic Search Engine

The heart of intelligent retrieval:

#### ONNX Runtime Web
- Runs MiniLM-L6-v2 model entirely in the browser
- No server calls = complete privacy
- ~22MB model size with 384-dimensional embeddings
- Sub-100ms inference time

#### Embedding Index
- Pre-computed embeddings for all strands
- Stored in `codex-embeddings.json`
- Hierarchical indexing: strand → section → paragraph
- Incremental updates on new content

#### Similarity Scoring
- Cosine similarity for semantic matching
- BM25 for keyword relevance
- Hybrid scoring: 0.7 × semantic + 0.3 × keyword
- Context window expansion for better answers

### 4. Answer Builder

Constructs comprehensive, contextual responses:

- **Multi-source synthesis**: Combines relevant sections from multiple strands
- **Code extraction**: Highlights relevant code snippets
- **Visual aids**: Includes diagrams and images when helpful
- **Related links**: Suggests deeper reading
- **Confidence scoring**: Shows relevance percentage

## Data Flow

```
1. User asks: "How do I implement authentication with JWT?"
   ↓
2. Intent: HOW_TO + IMPLEMENT
   Entities: ["authentication", "JWT"]
   Constraints: ["implementation"]
   ↓
3. Query embedding: [0.23, -0.45, 0.67, ...] (384 dims)
   ↓
4. Search index for nearest neighbors
   - auth-jwt-guide.md (0.92 similarity)
   - security-best-practices.md (0.87 similarity)
   - api-design.md (0.76 similarity)
   ↓
5. Extract relevant sections + expand context
   ↓
6. Build answer with:
   - Summary paragraph
   - Step-by-step implementation
   - Code examples
   - Security considerations
   - Links to full strands
```

## Embedding Generation

### Pre-processing Pipeline

```typescript
interface EmbeddingEntry {
  id: string              // Unique identifier
  path: string           // Strand path
  content: string        // Text content
  embedding: number[]    // 384-dimensional vector
  metadata: {
    type: 'strand' | 'section' | 'code'
    title: string
    tags: string[]
    lastModified: string
  }
}
```

### Chunking Strategy

1. **Strand-level**: Entire document for overview matching
2. **Section-level**: Markdown headers create natural boundaries
3. **Semantic chunks**: ~500 tokens with 50-token overlap
4. **Code blocks**: Treated as atomic units with language tags

## User Experience Design

### Question Bar

```
┌─────────────────────────────────────────────────────────┐
│ 🔮  Ask anything about the Codex...                [🎤] │
│                                                          │
│ Suggested: How does the spiral curriculum work?         │
│           What is a strand in Frame Codex?              │
│           Show me authentication examples               │
└─────────────────────────────────────────────────────────┘
```

### Answer Cards

Each answer presents as a beautifully designed card:

```
┌─────────────────────────────────────────────────────────┐
│ ❓ How does authentication work in Frame Codex?         │
├─────────────────────────────────────────────────────────┤
│ 📊 Confidence: 94%  |  🔍 4 sources  |  ⏱️ 0.3s        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Frame Codex uses a GitHub-based authentication flow:    │
│                                                          │
│ 1. **Personal Access Tokens (PATs)** for API access    │
│ 2. **Encrypted client-side storage** for security      │
│ 3. **OAuth flow** for web authentication (coming soon) │
│                                                          │
│ ```typescript                                           │
│ // Example: Setting up authentication                   │
│ import { GitSync } from '@/lib/github/gitSync'         │
│                                                          │
│ const sync = new GitSync()                              │
│ await sync.initialize() // Uses stored PAT             │
│ ```                                                      │
│                                                          │
│ 📚 **Learn More:**                                      │
│ • [Security Architecture](/codex/security/overview)     │
│ • [API Authentication](/codex/api/auth)                 │
│ • [GitHub Integration](/codex/guides/github)            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Conversational Flow

The Q&A system maintains context for follow-up questions:

```
User: "What is a strand?"
Bot:  [Explains strand concept]

User: "How do I create one?"  // "one" understood as "strand"
Bot:  [Shows creation process with context from previous answer]
```

## Performance Optimization

### Client-Side Caching

- **Embedding cache**: Store computed embeddings in IndexedDB
- **Answer cache**: LRU cache for recent Q&A pairs
- **Prefetch strategy**: Load embeddings for visible strands

### Progressive Enhancement

1. **Instant**: Keyword search (BM25) returns immediately
2. **Fast**: Cached embeddings search (~50ms)
3. **Complete**: Fresh embedding computation (~200ms)

### Resource Management

```typescript
// Lazy loading of ONNX runtime
const loadSemanticSearch = async () => {
  const ort = await import('onnxruntime-web')
  const model = await fetch('/models/minilm-l6-v2.onnx')
  return new SemanticSearchEngine(ort, model)
}
```

## Implementation Phases

### Phase 1: Foundation (Current)
- [x] Basic keyword search
- [ ] ONNX runtime integration
- [ ] Embedding pre-computation
- [ ] Simple Q&A interface

### Phase 2: Intelligence
- [ ] Intent classification
- [ ] Multi-source answers
- [ ] Code extraction
- [ ] Conversational context

### Phase 3: Advanced
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Learning from feedback
- [ ] Personalization

## Privacy & Security

### Data Protection
- **No server calls**: All processing happens in-browser
- **No tracking**: Questions are never logged or sent externally
- **Local storage**: Embeddings cached with encryption
- **Opt-in sync**: Choose to share improved embeddings

### Model Security
- **Integrity check**: Verify model hash before loading
- **Sandboxed execution**: ONNX runs in isolated context
- **Resource limits**: Prevent DoS via computation

## API Design

### Question API

```typescript
interface Question {
  text: string
  context?: QuestionContext
  language?: string
  options?: QuestionOptions
}

interface QuestionContext {
  previousQuestions?: Question[]
  currentStrand?: string
  userIntent?: Intent
}

interface QuestionOptions {
  maxResults?: number
  minConfidence?: number
  includeCode?: boolean
  includeDiagrams?: boolean
}
```

### Answer API

```typescript
interface Answer {
  summary: string
  confidence: number
  sources: AnswerSource[]
  sections: AnswerSection[]
  relatedQuestions: string[]
  processingTime: number
}

interface AnswerSource {
  path: string
  title: string
  relevance: number
  excerpt: string
}

interface AnswerSection {
  type: 'text' | 'code' | 'list' | 'diagram'
  content: string
  language?: string
  metadata?: Record<string, any>
}
```

## Future Enhancements

### Multimodal Q&A
- Ask questions about images: "What does this diagram show?"
- Voice-first interaction: Complete hands-free experience
- Video segment search: Find specific moments in recordings

### Collaborative Intelligence
- Community-refined answers
- Expert annotations
- Crowd-sourced question templates

### Predictive Q&A
- Anticipate questions based on reading patterns
- Proactive knowledge suggestions
- Learning path generation

## Conclusion

The Frame Codex Q&A system transforms the act of questioning from mere retrieval into a journey of discovery. By combining semantic understanding with thoughtful UX design, we create an oracle that doesn't just find answers—it builds understanding.

Every question becomes a thread in the fabric of knowledge, weaving new connections and revealing hidden patterns. This is not just search. This is enlightenment.

---

metadata:
title: Q&A System Architecture
tags: [architecture, search, semantic, ONNX, NLP]
created: 2024-01-20
status: active
