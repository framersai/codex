---
title: TypeScript Crash Course
summary: >-
  [Type System Fundamentals](#1-type-system-fundamentals) 2. [any vs unknown vs
  never vs void](#2-any-unknown-never-void) 3. [Type Guards &
  Narrowing](#3-type-guards-narrowing) 4.
difficulty: advanced
tags:
  - typescript
  - v
  - rust
  - r
  - sql
  - string
  - type
  - number
taxonomy:
  topics:
    - tutorial
    - api-reference
    - architecture
    - best-practices
  subjects:
    - technology
    - artificial-intelligence
source:
  type: manual
  creator: Anonymous Creator
  creatorType: session
  createdAt: '2025-12-20T00:30:37.574Z'
  sessionId: 204f13d9-11b6-4c1c-97c4-76b50be079aa
blocks:
  - id: typescript-crash-course
    line: 1
    endLine: 1
    type: heading
    headingLevel: 1
    headingText: TypeScript Crash Course
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: crash
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: course
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.9
      signals:
        topicShift: 0.5
        entityDensity: 1
        semanticNovelty: 1
        structuralImportance: 1
  - id: from-fundamentals-to-senior-level-mastery
    line: 2
    endLine: 2
    type: heading
    headingLevel: 2
    headingText: From Fundamentals to Senior-Level Mastery
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: from
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: fundamentals
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: senior-level
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.899
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.95
  - id: block-4
    line: 4
    endLine: 4
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.558
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.45
  - id: table-of-contents
    line: 6
    endLine: 6
    type: heading
    headingLevel: 2
    headingText: Table of Contents
    tags: []
    suggestedTags:
      - tag: table
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: contents
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.723
      signals:
        topicShift: 0.5
        entityDensity: 0.5
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: block-8
    line: 8
    endLine: 22
    type: list
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.787
      signals:
        topicShift: 1
        entityDensity: 0.709
        semanticNovelty: 1
        structuralImportance: 0.6
  - id: block-24
    line: 24
    endLine: 24
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 1-type-system-fundamentals-1-type-system-fundament
    line: 26
    endLine: 26
    type: heading
    headingLevel: 2
    headingText: '1. Type System Fundamentals {#1-type-system-fundamentals}'
    tags: []
    suggestedTags:
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: system
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: fundamentals
        confidence: 0.55
        source: existing
        reasoning: Consistent with prior block tags
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.764
      signals:
        topicShift: 0.5
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: primitive-types
    line: 28
    endLine: 28
    type: heading
    headingLevel: 3
    headingText: Primitive Types
    tags: []
    suggestedTags:
      - tag: primitive
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-30
    line: 30
    endLine: 56
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: number
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.706
      signals:
        topicShift: 0.962
        entityDensity: 0.275
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: object-types
    line: 58
    endLine: 58
    type: heading
    headingLevel: 3
    headingText: Object Types
    tags: []
    suggestedTags:
      - tag: object
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.804
      signals:
        topicShift: 0.962
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-60
    line: 60
    endLine: 98
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: number
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.71
      signals:
        topicShift: 0.96
        entityDensity: 0.293
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: function-types
    line: 100
    endLine: 100
    type: heading
    headingLevel: 3
    headingText: Function Types
    tags: []
    suggestedTags:
      - tag: function
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-102
    line: 102
    endLine: 154
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.675
      signals:
        topicShift: 0.711
        entityDensity: 0.35
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: literal-types
    line: 156
    endLine: 156
    type: heading
    headingLevel: 3
    headingText: Literal Types
    tags: []
    suggestedTags:
      - tag: literal
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.806
      signals:
        topicShift: 0.971
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-158
    line: 158
    endLine: 188
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.694
      signals:
        topicShift: 0.954
        entityDensity: 0.233
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-190
    line: 190
    endLine: 190
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 2-any-vs-unknown-vs-never-vs-void-2-any-unknown-ne
    line: 192
    endLine: 192
    type: heading
    headingLevel: 2
    headingText: '2. any vs unknown vs never vs void {#2-any-unknown-never-void}'
    tags: []
    suggestedTags:
      - tag: v
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: unknown
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: never
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: void
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.623
      signals:
        topicShift: 0.5
        entityDensity: 0.1
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: the-type-hierarchy
    line: 194
    endLine: 194
    type: heading
    headingLevel: 3
    headingText: The Type Hierarchy
    tags: []
    suggestedTags:
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: hierarchy
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.833
      signals:
        topicShift: 1
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-196
    line: 196
    endLine: 208
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: sql
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.7
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.628
      signals:
        topicShift: 0.739
        entityDensity: 0.14
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: any-the-escape-hatch-avoid
    line: 210
    endLine: 210
    type: heading
    headingLevel: 3
    headingText: 'any: The Escape Hatch (Avoid!)'
    tags: []
    suggestedTags:
      - tag: escape
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: hatch
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: avoid
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.785
      signals:
        topicShift: 0.865
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-212
    line: 212
    endLine: 238
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: number
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.677
      signals:
        topicShift: 0.768
        entityDensity: 0.312
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: unknown-the-type-safe-any
    line: 240
    endLine: 240
    type: heading
    headingLevel: 3
    headingText: 'unknown: The Type-Safe any'
    tags: []
    suggestedTags:
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: unknown
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: type-safe
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.704
      signals:
        topicShift: 0.669
        entityDensity: 0.5
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-242
    line: 242
    endLine: 298
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: sql
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.662
      signals:
        topicShift: 0.755
        entityDensity: 0.266
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: never-the-impossible-type
    line: 300
    endLine: 300
    type: heading
    headingLevel: 3
    headingText: 'never: The Impossible Type'
    tags: []
    suggestedTags:
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: never
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: impossible
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.795
      signals:
        topicShift: 0.873
        entityDensity: 0.7
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-302
    line: 302
    endLine: 356
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.601
      signals:
        topicShift: 0.433
        entityDensity: 0.278
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: void-no-return-value
    line: 358
    endLine: 358
    type: heading
    headingLevel: 3
    headingText: 'void: No Return Value'
    tags: []
    suggestedTags:
      - tag: v
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: void
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: return
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: value
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.791
      signals:
        topicShift: 0.857
        entityDensity: 0.7
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-360
    line: 360
    endLine: 397
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.583
      signals:
        topicShift: 0.406
        entityDensity: 0.228
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: comparison-table
    line: 399
    endLine: 399
    type: heading
    headingLevel: 3
    headingText: Comparison Table
    tags: []
    suggestedTags:
      - tag: comparison
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: table
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-401
    line: 401
    endLine: 432
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.699
      signals:
        topicShift: 0.96
        entityDensity: 0.249
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-434
    line: 434
    endLine: 434
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 3-type-guards-narrowing-3-type-guards-narrowing
    line: 436
    endLine: 436
    type: heading
    headingLevel: 2
    headingText: '3. Type Guards & Narrowing {#3-type-guards-narrowing}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: guards
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: narrowing
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.74
      signals:
        topicShift: 0.5
        entityDensity: 0.571
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: built-in-type-guards
    line: 438
    endLine: 438
    type: heading
    headingLevel: 3
    headingText: Built-in Type Guards
    tags: []
    suggestedTags:
      - tag: built-in
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: guards
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.699
      signals:
        topicShift: 0.333
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-440
    line: 440
    endLine: 515
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: sql
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.727
      signals:
        topicShift: 0.977
        entityDensity: 0.347
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: custom-type-guards-type-predicates
    line: 517
    endLine: 517
    type: heading
    headingLevel: 3
    headingText: Custom Type Guards (Type Predicates)
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: guards
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: custom
        confidence: 0.375
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.847
      signals:
        topicShift: 0.97
        entityDensity: 0.833
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-519
    line: 519
    endLine: 594
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.697
      signals:
        topicShift: 0.831
        entityDensity: 0.345
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: discriminated-unions-tagged-unions
    line: 596
    endLine: 596
    type: heading
    headingLevel: 3
    headingText: Discriminated Unions (Tagged Unions)
    tags: []
    suggestedTags:
      - tag: unions
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: discriminated
        confidence: 0.375
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: tagged
        confidence: 0.375
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.845
      signals:
        topicShift: 1
        entityDensity: 0.8
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-598
    line: 598
    endLine: 675
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.734
      signals:
        topicShift: 0.988
        entityDensity: 0.366
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-677
    line: 677
    endLine: 677
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 4-interfaces-vs-types-4-interfaces-vs-types
    line: 679
    endLine: 679
    type: heading
    headingLevel: 2
    headingText: '4. Interfaces vs Types {#4-interfaces-vs-types}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: interfaces
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 4-interfaces-vs-types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.723
      signals:
        topicShift: 0.5
        entityDensity: 0.5
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: key-differences
    line: 681
    endLine: 681
    type: heading
    headingLevel: 3
    headingText: Key Differences
    tags: []
    suggestedTags:
      - tag: differences
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-683
    line: 683
    endLine: 816
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.733
      signals:
        topicShift: 0.984
        entityDensity: 0.365
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: when-to-use-what
    line: 818
    endLine: 818
    type: heading
    headingLevel: 3
    headingText: When to Use What
    tags: []
    suggestedTags:
      - tag: when
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: what
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: rust
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.782
      signals:
        topicShift: 0.937
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-820
    line: 820
    endLine: 872
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.719
      signals:
        topicShift: 0.868
        entityDensity: 0.399
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-874
    line: 874
    endLine: 874
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 5-generics-deep-dive-5-generics
    line: 876
    endLine: 876
    type: heading
    headingLevel: 2
    headingText: '5. Generics Deep Dive {#5-generics}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: generics
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: deep
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: dive
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.764
      signals:
        topicShift: 0.5
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: generic-basics
    line: 878
    endLine: 878
    type: heading
    headingLevel: 3
    headingText: Generic Basics
    tags: []
    suggestedTags:
      - tag: generic
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: basics
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: generics
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-880
    line: 880
    endLine: 926
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.749
      signals:
        topicShift: 1
        entityDensity: 0.416
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: generic-constraints
    line: 928
    endLine: 928
    type: heading
    headingLevel: 3
    headingText: Generic Constraints
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: constraints
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: generics
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: generic
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-930
    line: 930
    endLine: 972
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.746
      signals:
        topicShift: 1
        entityDensity: 0.406
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: generic-inference-defaults
    line: 974
    endLine: 974
    type: heading
    headingLevel: 3
    headingText: Generic Inference & Defaults
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: inference
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: defaults
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: generics
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: generic
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.795
      signals:
        topicShift: 1
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-976
    line: 976
    endLine: 1015
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.743
      signals:
        topicShift: 0.959
        entityDensity: 0.423
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: advanced-generic-patterns
    line: 1017
    endLine: 1017
    type: heading
    headingLevel: 3
    headingText: Advanced Generic Patterns
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: advanced
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: patterns
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: generics
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.833
      signals:
        topicShift: 1
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1019
    line: 1019
    endLine: 1095
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: sql
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.723
      signals:
        topicShift: 0.934
        entityDensity: 0.365
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1097
    line: 1097
    endLine: 1097
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 6-utility-types-mastery-6-utility-types
    line: 1099
    endLine: 1099
    type: heading
    headingLevel: 2
    headingText: '6. Utility Types Mastery {#6-utility-types}'
    tags: []
    suggestedTags:
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: utility
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: mastery
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.764
      signals:
        topicShift: 0.5
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: built-in-utility-types
    line: 1101
    endLine: 1101
    type: heading
    headingLevel: 3
    headingText: Built-in Utility Types
    tags: []
    suggestedTags:
      - tag: built-in
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: utility
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.679
      signals:
        topicShift: 0.23
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1103
    line: 1103
    endLine: 1217
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.753
      signals:
        topicShift: 1
        entityDensity: 0.433
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: string-manipulation-types
    line: 1219
    endLine: 1219
    type: heading
    headingLevel: 3
    headingText: String Manipulation Types
    tags: []
    suggestedTags:
      - tag: manipulation
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.833
      signals:
        topicShift: 1
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1221
    line: 1221
    endLine: 1245
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.702
      signals:
        topicShift: 0.756
        entityDensity: 0.422
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: building-custom-utility-types
    line: 1247
    endLine: 1247
    type: heading
    headingLevel: 3
    headingText: Building Custom Utility Types
    tags: []
    suggestedTags:
      - tag: building
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: custom
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: utility
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.838
      signals:
        topicShift: 0.965
        entityDensity: 0.8
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1249
    line: 1249
    endLine: 1320
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.761
      signals:
        topicShift: 1
        entityDensity: 0.463
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1322
    line: 1322
    endLine: 1322
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 7-advanced-types-7-advanced-types
    line: 1324
    endLine: 1324
    type: heading
    headingLevel: 2
    headingText: '7. Advanced Types {#7-advanced-types}'
    tags: []
    suggestedTags:
      - tag: v
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: advanced
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 7-advanced-types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.748
      signals:
        topicShift: 0.5
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: index-types
    line: 1326
    endLine: 1326
    type: heading
    headingLevel: 3
    headingText: Index Types
    tags: []
    suggestedTags:
      - tag: index
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: 7-advanced-types
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.712
      signals:
        topicShift: 0.5
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1328
    line: 1328
    endLine: 1370
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.691
      signals:
        topicShift: 0.856
        entityDensity: 0.298
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: intersection-union-types
    line: 1372
    endLine: 1372
    type: heading
    headingLevel: 3
    headingText: Intersection & Union Types
    tags: []
    suggestedTags:
      - tag: intersection
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: union
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.783
      signals:
        topicShift: 0.941
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1374
    line: 1374
    endLine: 1422
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.705
      signals:
        topicShift: 0.87
        entityDensity: 0.346
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: type-assertions-casting
    line: 1424
    endLine: 1424
    type: heading
    headingLevel: 3
    headingText: Type Assertions & Casting
    tags: []
    suggestedTags:
      - tag: assertions
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: casting
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.73
      signals:
        topicShift: 0.675
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1426
    line: 1426
    endLine: 1471
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.71
      signals:
        topicShift: 0.949
        entityDensity: 0.302
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1473
    line: 1473
    endLine: 1473
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 8-conditional-types-8-conditional-types
    line: 1475
    endLine: 1475
    type: heading
    headingLevel: 2
    headingText: '8. Conditional Types {#8-conditional-types}'
    tags: []
    suggestedTags:
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: conditional
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 8-conditional-types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.748
      signals:
        topicShift: 0.5
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: basic-conditional-types
    line: 1477
    endLine: 1477
    type: heading
    headingLevel: 3
    headingText: Basic Conditional Types
    tags: []
    suggestedTags:
      - tag: basic
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 8-conditional-types
        confidence: 0.55
        source: existing
        reasoning: Consistent with prior block tags
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: conditional
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.669
      signals:
        topicShift: 0.184
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1479
    line: 1479
    endLine: 1509
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: number
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.746
      signals:
        topicShift: 1
        entityDensity: 0.403
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: infer-keyword
    line: 1511
    endLine: 1511
    type: heading
    headingLevel: 3
    headingText: Infer Keyword
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: infer
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: keyword
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.785
      signals:
        topicShift: 0.865
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1513
    line: 1513
    endLine: 1553
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.678
      signals:
        topicShift: 0.754
        entityDensity: 0.33
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: distributive-conditional-types
    line: 1555
    endLine: 1555
    type: heading
    headingLevel: 3
    headingText: Distributive Conditional Types
    tags: []
    suggestedTags:
      - tag: distributive
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.824
      signals:
        topicShift: 0.96
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1557
    line: 1557
    endLine: 1603
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.716
      signals:
        topicShift: 0.953
        entityDensity: 0.322
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: complex-conditional-patterns
    line: 1605
    endLine: 1605
    type: heading
    headingLevel: 3
    headingText: Complex Conditional Patterns
    tags: []
    suggestedTags:
      - tag: complex
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: conditional
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: patterns
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.828
      signals:
        topicShift: 0.976
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1607
    line: 1607
    endLine: 1651
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.715
      signals:
        topicShift: 0.94
        entityDensity: 0.328
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1653
    line: 1653
    endLine: 1653
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 9-mapped-types-9-mapped-types
    line: 1655
    endLine: 1655
    type: heading
    headingLevel: 2
    headingText: '9. Mapped Types {#9-mapped-types}'
    tags: []
    suggestedTags:
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: mapped
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 9-mapped-types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.748
      signals:
        topicShift: 0.5
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: basic-mapped-types
    line: 1657
    endLine: 1657
    type: heading
    headingLevel: 3
    headingText: Basic Mapped Types
    tags: []
    suggestedTags:
      - tag: basic
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 9-mapped-types
        confidence: 0.55
        source: existing
        reasoning: Consistent with prior block tags
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: mapped
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.669
      signals:
        topicShift: 0.184
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1659
    line: 1659
    endLine: 1690
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: types
        confidence: 0.7
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.723
      signals:
        topicShift: 0.915
        entityDensity: 0.381
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: modifiers-in-mapped-types
    line: 1692
    endLine: 1692
    type: heading
    headingLevel: 3
    headingText: Modifiers in Mapped Types
    tags: []
    suggestedTags:
      - tag: modifiers
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 9-mapped-types
        confidence: 0.55
        source: existing
        reasoning: Consistent with prior block tags
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.778
      signals:
        topicShift: 0.915
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1694
    line: 1694
    endLine: 1721
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: 9-mapped-types
        confidence: 0.7
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.741
      signals:
        topicShift: 1
        entityDensity: 0.385
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: key-remapping-as-clause
    line: 1723
    endLine: 1723
    type: heading
    headingLevel: 3
    headingText: Key Remapping (as clause)
    tags: []
    suggestedTags:
      - tag: remapping
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: clause
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.795
      signals:
        topicShift: 1
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1725
    line: 1725
    endLine: 1769
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.753
      signals:
        topicShift: 1
        entityDensity: 0.432
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: advanced-mapped-type-patterns
    line: 1771
    endLine: 1771
    type: heading
    headingLevel: 3
    headingText: Advanced Mapped Type Patterns
    tags: []
    suggestedTags:
      - tag: advanced
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: mapped
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 9-mapped-types
        confidence: 0.55
        source: existing
        reasoning: Consistent with prior block tags
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.793
      signals:
        topicShift: 0.742
        entityDensity: 0.8
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1773
    line: 1773
    endLine: 1838
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.694
      signals:
        topicShift: 0.723
        entityDensity: 0.417
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1840
    line: 1840
    endLine: 1840
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 10-template-literal-types-10-template-literal-type
    line: 1842
    endLine: 1842
    type: heading
    headingLevel: 2
    headingText: '10. Template Literal Types {#10-template-literal-types}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: template
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: literal
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.764
      signals:
        topicShift: 0.5
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: basic-template-literals
    line: 1844
    endLine: 1844
    type: heading
    headingLevel: 3
    headingText: Basic Template Literals
    tags: []
    suggestedTags:
      - tag: basic
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: literals
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: template
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: literal
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.766
      signals:
        topicShift: 0.667
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1846
    line: 1846
    endLine: 1873
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.718
      signals:
        topicShift: 0.971
        entityDensity: 0.315
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: pattern-matching-with-template-literals
    line: 1875
    endLine: 1875
    type: heading
    headingLevel: 3
    headingText: Pattern Matching with Template Literals
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: pattern
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: matching
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: with
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: template
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.798
      signals:
        topicShift: 0.933
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1877
    line: 1877
    endLine: 1928
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.736
      signals:
        topicShift: 1
        entityDensity: 0.364
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: practical-template-literal-patterns
    line: 1930
    endLine: 1930
    type: heading
    headingLevel: 3
    headingText: Practical Template Literal Patterns
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: practical
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: literal
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: pattern
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: template
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.845
      signals:
        topicShift: 1
        entityDensity: 0.8
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1932
    line: 1932
    endLine: 1975
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.749
      signals:
        topicShift: 1
        entityDensity: 0.417
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1977
    line: 1977
    endLine: 1977
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 11-declaration-merging-module-augmentation-11-decl
    line: 1979
    endLine: 1979
    type: heading
    headingLevel: 2
    headingText: '11. Declaration Merging & Module Augmentation {#11-declaration-merging}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: declaration
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: merging
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: module
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.754
      signals:
        topicShift: 0.5
        entityDensity: 0.625
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: interface-merging
    line: 1981
    endLine: 1981
    type: heading
    headingLevel: 3
    headingText: Interface Merging
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: interface
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: merging
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.722
      signals:
        topicShift: 0.553
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-1983
    line: 1983
    endLine: 2010
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: typescript
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: interface
        confidence: 0.7
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.676
      signals:
        topicShift: 0.734
        entityDensity: 0.336
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: namespace-merging
    line: 2012
    endLine: 2012
    type: heading
    headingLevel: 3
    headingText: Namespace Merging
    tags: []
    suggestedTags:
      - tag: namespace
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: merging
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2014
    line: 2014
    endLine: 2062
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: namespace
        confidence: 0.7
        source: existing
        reasoning: Consistent with prior block tags
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.76
      signals:
        topicShift: 1
        entityDensity: 0.461
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: module-augmentation
    line: 2064
    endLine: 2064
    type: heading
    headingLevel: 3
    headingText: Module Augmentation
    tags: []
    suggestedTags:
      - tag: module
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: augmentation
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2066
    line: 2066
    endLine: 2105
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: number
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: module
        confidence: 0.7
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.672
      signals:
        topicShift: 0.766
        entityDensity: 0.296
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: global-augmentation
    line: 2107
    endLine: 2107
    type: heading
    headingLevel: 3
    headingText: Global Augmentation
    tags: []
    suggestedTags:
      - tag: global
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: augmentation
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2109
    line: 2109
    endLine: 2152
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.674
      signals:
        topicShift: 0.662
        entityDensity: 0.384
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2154
    line: 2154
    endLine: 2154
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 12-strict-mode-compiler-options-12-strict-mode
    line: 2156
    endLine: 2156
    type: heading
    headingLevel: 2
    headingText: '12. Strict Mode & Compiler Options {#12-strict-mode}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: strict
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: mode
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: compiler
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: string
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.754
      signals:
        topicShift: 0.5
        entityDensity: 0.625
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: strict-mode-options
    line: 2158
    endLine: 2158
    type: heading
    headingLevel: 3
    headingText: Strict Mode Options
    tags: []
    suggestedTags:
      - tag: options
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: strict
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: mode
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.65
      signals:
        topicShift: 0.087
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2160
    line: 2160
    endLine: 2285
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.731
      signals:
        topicShift: 1
        entityDensity: 0.344
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: other-important-compiler-options
    line: 2287
    endLine: 2287
    type: heading
    headingLevel: 3
    headingText: Other Important Compiler Options
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: other
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: important
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: compiler
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: options
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.845
      signals:
        topicShift: 1
        entityDensity: 0.8
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2289
    line: 2289
    endLine: 2330
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.757
      signals:
        topicShift: 0.972
        entityDensity: 0.472
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2332
    line: 2332
    endLine: 2332
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 13-common-patterns-anti-patterns-13-patterns
    line: 2334
    endLine: 2334
    type: heading
    headingLevel: 2
    headingText: '13. Common Patterns & Anti-Patterns {#13-patterns}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: common
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: patterns
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: anti-patterns
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.74
      signals:
        topicShift: 0.5
        entityDensity: 0.571
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: anti-patterns-to-avoid
    line: 2336
    endLine: 2336
    type: heading
    headingLevel: 3
    headingText: Anti-Patterns to Avoid
    tags: []
    suggestedTags:
      - tag: avoid
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: v
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: patterns
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
      - tag: anti-patterns
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.631
      signals:
        topicShift: 0.304
        entityDensity: 0.5
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2338
    line: 2338
    endLine: 2443
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.705
      signals:
        topicShift: 0.882
        entityDensity: 0.333
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: best-practices
    line: 2445
    endLine: 2445
    type: heading
    headingLevel: 3
    headingText: Best Practices
    tags: []
    suggestedTags:
      - tag: best
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: practices
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: rust
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2447
    line: 2447
    endLine: 2542
    type: code
    tags: []
    suggestedTags:
      - tag: ff0000
        confidence: 1
        source: inline
        reasoning: Explicit inline hashtag in content
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.744
      signals:
        topicShift: 1
        entityDensity: 0.398
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2544
    line: 2544
    endLine: 2544
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 14-real-world-scenarios-14-real-world
    line: 2546
    endLine: 2546
    type: heading
    headingLevel: 2
    headingText: '14. Real-World Scenarios {#14-real-world}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: real-world
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: scenarios
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: 14-real-world
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.748
      signals:
        topicShift: 0.5
        entityDensity: 0.6
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: api-response-handling
    line: 2548
    endLine: 2548
    type: heading
    headingLevel: 3
    headingText: API Response Handling
    tags: []
    suggestedTags:
      - tag: response
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: handling
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.833
      signals:
        topicShift: 1
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2550
    line: 2550
    endLine: 2658
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: sql
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.758
      signals:
        topicShift: 1
        entityDensity: 0.453
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: react-component-patterns
    line: 2660
    endLine: 2660
    type: heading
    headingLevel: 3
    headingText: React Component Patterns
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: react
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: component
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: patterns
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.833
      signals:
        topicShift: 1
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2662
    line: 2662
    endLine: 2798
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.752
      signals:
        topicShift: 0.775
        entityDensity: 0.608
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: state-management-types
    line: 2800
    endLine: 2800
    type: heading
    headingLevel: 3
    headingText: State Management Types
    tags: []
    suggestedTags:
      - tag: state
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: management
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: types
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: typescript
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: type
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.833
      signals:
        topicShift: 1
        entityDensity: 0.75
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2802
    line: 2802
    endLine: 2891
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.708
      signals:
        topicShift: 0.69
        entityDensity: 0.5
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2893
    line: 2893
    endLine: 2893
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: 15-interview-questions-answers-15-interview-questi
    line: 2895
    endLine: 2895
    type: heading
    headingLevel: 2
    headingText: '15. Interview Questions & Answers {#15-interview-questions}'
    tags: []
    suggestedTags:
      - tag: r
        confidence: 0.7000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.6000000000000001
        source: existing
        reasoning: Propagated from document tags
      - tag: interview
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: questions
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: answers
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
    worthiness:
      score: 0.74
      signals:
        topicShift: 0.5
        entityDensity: 0.571
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: beginner-questions
    line: 2897
    endLine: 2897
    type: heading
    headingLevel: 3
    headingText: Beginner Questions
    tags: []
    suggestedTags:
      - tag: beginner
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: questions
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.717
      signals:
        topicShift: 0.529
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2899
    line: 2899
    endLine: 2950
    type: code
    tags: []
    suggestedTags:
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.716
      signals:
        topicShift: 1
        entityDensity: 0.284
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: intermediate-questions
    line: 2952
    endLine: 2952
    type: heading
    headingLevel: 3
    headingText: Intermediate Questions
    tags: []
    suggestedTags:
      - tag: intermediate
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: questions
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-2954
    line: 2954
    endLine: 3039
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: string
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.715
      signals:
        topicShift: 1
        entityDensity: 0.28
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: senior-questions
    line: 3041
    endLine: 3041
    type: heading
    headingLevel: 3
    headingText: Senior Questions
    tags: []
    suggestedTags:
      - tag: senior
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
      - tag: questions
        confidence: 0.44999999999999996
        source: existing
        reasoning: Consistent with prior block tags
    worthiness:
      score: 0.812
      signals:
        topicShift: 1
        entityDensity: 0.667
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-3043
    line: 3043
    endLine: 3172
    type: code
    tags: []
    suggestedTags:
      - tag: javascript
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.734
      signals:
        topicShift: 1
        entityDensity: 0.354
        semanticNovelty: 1
        structuralImportance: 0.7
  - id: block-3174
    line: 3174
    endLine: 3174
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.523
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.35
  - id: quick-reference-cheat-sheet
    line: 3176
    endLine: 3176
    type: heading
    headingLevel: 2
    headingText: Quick Reference Cheat Sheet
    tags: []
    suggestedTags:
      - tag: quick
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: reference
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: cheat
        confidence: 0.6
        source: nlp
        reasoning: TF-IDF keyword extraction
      - tag: r
        confidence: 0.5
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.798
      signals:
        topicShift: 0.5
        entityDensity: 0.8
        semanticNovelty: 1
        structuralImportance: 0.85
  - id: block-3178
    line: 3178
    endLine: 3221
    type: code
    tags: []
    suggestedTags:
      - tag: python
        confidence: 0.8
        source: nlp
        reasoning: Detected programming language
      - tag: typescript
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: v
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: rust
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
      - tag: r
        confidence: 0.75
        source: existing
        reasoning: Propagated from document tags
    worthiness:
      score: 0.757
      signals:
        topicShift: 1
        entityDensity: 0.377
        semanticNovelty: 1
        structuralImportance: 0.75
  - id: block-3223
    line: 3223
    endLine: 3223
    type: list
    tags: []
    suggestedTags: []
    worthiness:
      score: 0.54
      signals:
        topicShift: 1
        entityDensity: 0
        semanticNovelty: 1
        structuralImportance: 0.4
---
# TypeScript Crash Course
## From Fundamentals to Senior-Level Mastery

---

## Table of Contents

1. [Type System Fundamentals](#1-type-system-fundamentals)
2. [any vs unknown vs never vs void](#2-any-unknown-never-void)
3. [Type Guards & Narrowing](#3-type-guards-narrowing)
4. [Interfaces vs Types](#4-interfaces-vs-types)
5. [Generics Deep Dive](#5-generics)
6. [Utility Types Mastery](#6-utility-types)
7. [Advanced Types](#7-advanced-types)
8. [Conditional Types](#8-conditional-types)
9. [Mapped Types](#9-mapped-types)
10. [Template Literal Types](#10-template-literal-types)
11. [Declaration Merging & Module Augmentation](#11-declaration-merging)
12. [Strict Mode & Compiler Options](#12-strict-mode)
13. [Common Patterns & Anti-Patterns](#13-patterns)
14. [Real-World Scenarios](#14-real-world)
15. [Interview Questions & Answers](#15-interview-questions)

---

## 1. Type System Fundamentals {#1-type-system-fundamentals}

### Primitive Types

```typescript
// Basic primitives
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let big: bigint = 100n;
let sym: symbol = Symbol("id");

// null and undefined (different in strict mode!)
let n: null = null;
let u: undefined = undefined;

// Arrays
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ["a", "b", "c"];  // Generic syntax

// Tuples (fixed-length arrays with specific types)
let tuple: [string, number] = ["hello", 42];
let namedTuple: [name: string, age: number] = ["Alice", 30];

// Tuple with rest elements
let mixedTuple: [string, ...number[]] = ["hello", 1, 2, 3];

// readonly tuple
let readonlyTuple: readonly [string, number] = ["hello", 42];
// readonlyTuple[0] = "world"; // Error!
```

### Object Types

```typescript
// Object type annotation
let person: { name: string; age: number } = {
  name: "Alice",
  age: 30
};

// Optional properties
let config: { host: string; port?: number } = {
  host: "localhost"
  // port is optional
};

// Readonly properties
let point: { readonly x: number; readonly y: number } = {
  x: 10,
  y: 20
};
// point.x = 5; // Error!

// Index signatures
let dictionary: { [key: string]: number } = {
  apple: 1,
  banana: 2
};

// Index signature with specific keys
interface StringMap {
  [key: string]: string;
  length: number; // Error! Must be string (compatible with index)
}

// Mixed index signatures
interface MixedMap {
  [key: string]: string | number;
  length: number;  // OK - number is compatible
  name: string;    // OK - string is compatible
}
```

### Function Types

```typescript
// Function type annotation
let add: (a: number, b: number) => number;
add = (x, y) => x + y;  // Parameters inferred from type

// Function declaration with types
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

// Default parameters
function createUser(name: string, age: number = 18): User {
  return { name, age };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

// Function overloads
function parse(input: string): string[];
function parse(input: string, limit: number): string[];
function parse(input: string, limit?: number): string[] {
  // Implementation
  return limit ? input.split(",", limit) : input.split(",");
}

// Call signatures (for objects that are callable)
interface ClickHandler {
  (event: MouseEvent): void;
  description: string;
}

// Construct signatures
interface DateConstructor {
  new (value: number): Date;
  (value: number): string;  // Can also be called without new
}

// this parameter (explicit this type)
interface Button {
  label: string;
  onClick(this: Button): void;
}

const button: Button = {
  label: "Submit",
  onClick() {
    console.log(this.label);  // 'this' is typed as Button
  }
};
```

### Literal Types

```typescript
// String literals
let direction: "north" | "south" | "east" | "west";
direction = "north";  // OK
// direction = "up";  // Error!

// Numeric literals
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;

// Boolean literal (rarely used directly)
let trueOnly: true = true;

// const assertions (infer most specific type)
const config = {
  endpoint: "/api",
  method: "GET"
} as const;
// Type: { readonly endpoint: "/api"; readonly method: "GET" }

// Without as const:
const configMutable = {
  endpoint: "/api",
  method: "GET"
};
// Type: { endpoint: string; method: string }

// Array as const
const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]
type Color = typeof colors[number];  // "red" | "green" | "blue"
```

---

## 2. any vs unknown vs never vs void {#2-any-unknown-never-void}

### The Type Hierarchy

```
                    unknown (top type - all types assignable to it)
                        │
         ┌──────────────┼──────────────┐
         │              │              │
      string         number        object    ... (all other types)
         │              │              │
         └──────────────┼──────────────┘
                        │
                     never (bottom type - assignable to all types)

    any - OPTS OUT of type checking (avoid!)
```

### any: The Escape Hatch (Avoid!)

```typescript
/**
 * any: Disables ALL type checking
 * - Assignable TO anything
 * - Anything assignable FROM it
 * - Basically turns off TypeScript
 */

let anything: any = "hello";
anything = 42;
anything = { foo: "bar" };
anything.nonExistentMethod();  // No error! Runtime crash!

// any is contagious
let num: number = anything;  // No error!
num.toFixed();  // Might crash at runtime

// When any is (somewhat) acceptable:
// 1. Migrating JS to TS (temporary)
// 2. Working with truly dynamic data (prefer unknown)
// 3. Third-party library without types (use @ts-ignore or declare)

// ⚠️ ANTI-PATTERN: Using any to "fix" type errors
function processData(data: any) {  // BAD!
  return data.items.map((i: any) => i.value);
}
```

### unknown: The Type-Safe any

```typescript
/**
 * unknown: Type-safe counterpart to any
 * - Anything assignable TO it
 * - NOT assignable FROM it (without narrowing)
 * - Forces you to check types before using
 */

let value: unknown = "hello";
value = 42;
value = { foo: "bar" };

// CANNOT use unknown directly
// value.toString();  // Error!
// let str: string = value;  // Error!

// MUST narrow the type first
if (typeof value === "string") {
  console.log(value.toUpperCase());  // OK - narrowed to string
}

if (typeof value === "number") {
  console.log(value.toFixed(2));  // OK - narrowed to number
}

// Type assertion (when you know better than TS)
const str = value as string;  // OK but risky
const num = <number>value;    // Same thing, older syntax

// Real-world example: API response
async function fetchData(url: string): Promise<unknown> {
  const response = await fetch(url);
  return response.json();  // We don't know the shape
}

// Usage with type guard
interface User {
  id: number;
  name: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    typeof (obj as User).id === "number" &&
    typeof (obj as User).name === "string"
  );
}

async function getUser(url: string): Promise<User | null> {
  const data = await fetchData(url);
  return isUser(data) ? data : null;
}
```

### never: The Impossible Type

```typescript
/**
 * never: Represents values that NEVER occur
 * - Function that never returns
 * - Impossible type narrowing
 * - Empty union type
 */

// Function that never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // ...
  }
}

// Exhaustive checking (THE MOST IMPORTANT USE CASE)
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":
      return Math.PI * 10 * 10;
    case "square":
      return 10 * 10;
    case "triangle":
      return (10 * 10) / 2;
    default:
      // If we handled all cases, shape is never here
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// If someone adds "rectangle" to Shape but forgets this function:
// TypeScript ERROR: Type 'rectangle' is not assignable to type 'never'
// This is called "exhaustiveness checking"

// Helper function for exhaustive checks
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

// never in conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type Result = NonNullable<string | null>;  // string

// never is the empty union
type Empty = never;
type Union = string | never;  // string (never disappears)
type Intersection = string & never;  // never (absorbs everything)
```

### void: No Return Value

```typescript
/**
 * void: Function doesn't return anything meaningful
 * - Different from undefined (subtle but important)
 * - Callback return types
 */

// Function with no return
function logMessage(msg: string): void {
  console.log(msg);
  // Implicit return undefined
}

// void vs undefined
function returnsVoid(): void {
  // Can return undefined explicitly or implicitly
  return;
}

function returnsUndefined(): undefined {
  return undefined;  // MUST return undefined
}

// ⚠️ Important: void in callback types allows any return
type Callback = () => void;

const callback: Callback = () => {
  return 42;  // OK! Return value is ignored
};

// This is intentional - allows:
const arr = [1, 2, 3];
arr.forEach((n) => arr.push(n * 2));  // push returns number, but that's fine

// But void variables can only be undefined
let v: void = undefined;
// let v: void = null;  // Error in strict mode
```

### Comparison Table

```typescript
/**
 * COMPARISON: any vs unknown vs never vs void
 * 
 * ┌──────────┬─────────────────┬──────────────────┬─────────────────┐
 * │          │ Assign TO       │ Assign FROM      │ Use Case        │
 * ├──────────┼─────────────────┼──────────────────┼─────────────────┤
 * │ any      │ Anything        │ Anything         │ Escape hatch    │
 * │ unknown  │ Anything        │ Only after check │ Safe any        │
 * │ never    │ Nothing         │ Everything       │ Impossible      │
 * │ void     │ undefined       │ undefined        │ No return       │
 * └──────────┴─────────────────┴──────────────────┴─────────────────┘
 */

// Examples demonstrating the differences
declare const anyVal: any;
declare const unknownVal: unknown;
declare const neverVal: never;
declare const voidVal: void;

// Assigning TO these types
let a1: any = "hello";       // OK
let a2: unknown = "hello";   // OK
// let a3: never = "hello";  // Error - nothing assignable to never
let a4: void = undefined;    // OK

// Assigning FROM these types
let b1: string = anyVal;      // OK (dangerous!)
// let b2: string = unknownVal; // Error - must narrow first
let b3: string = neverVal;    // OK (never is assignable to everything)
// let b4: string = voidVal;    // Error
```

---

## 3. Type Guards & Narrowing {#3-type-guards-narrowing}

### Built-in Type Guards

```typescript
// typeof (primitives)
function processValue(value: string | number) {
  if (typeof value === "string") {
    // value is string here
    console.log(value.toUpperCase());
  } else {
    // value is number here
    console.log(value.toFixed(2));
  }
}

// instanceof (classes)
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();  // animal is Dog
  } else {
    animal.meow();  // animal is Cat
  }
}

// in operator (property checking)
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();  // animal is Fish
  } else {
    animal.fly();   // animal is Bird
  }
}

// Equality narrowing
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y are both string (only common type)
    console.log(x.toUpperCase());
    console.log(y.toLowerCase());
  }
}

// Truthiness narrowing
function printLength(str: string | null | undefined) {
  if (str) {
    // str is string (truthy)
    console.log(str.length);
  }
}

// ⚠️ Truthiness gotcha with numbers and strings
function processNumber(n: number | null) {
  if (n) {
    // Excludes 0! Might not be what you want
    console.log(n);
  }
  
  // Better:
  if (n !== null) {
    console.log(n);  // Includes 0
  }
}
```

### Custom Type Guards (Type Predicates)

```typescript
// User-defined type guard with "is" keyword
interface User {
  type: "user";
  name: string;
  email: string;
}

interface Admin {
  type: "admin";
  name: string;
  permissions: string[];
}

// Type predicate: "value is User"
function isUser(value: User | Admin): value is User {
  return value.type === "user";
}

function isAdmin(value: User | Admin): value is Admin {
  return value.type === "admin";
}

function processAccount(account: User | Admin) {
  if (isUser(account)) {
    console.log(account.email);  // TypeScript knows it's User
  } else {
    console.log(account.permissions);  // TypeScript knows it's Admin
  }
}

// Type guard for unknown
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isArrayOfStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

// Generic type guard
function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const maybeString: string | null = "hello";
if (isNotNull(maybeString)) {
  console.log(maybeString.toUpperCase());  // string, not null
}

// Type guard with assertion function (TS 3.7+)
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function processInput(input: unknown) {
  assertIsString(input);
  // input is string from here on
  console.log(input.toUpperCase());
}

// Assert non-null
function assertDefined<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message ?? "Value is not defined");
  }
}
```

### Discriminated Unions (Tagged Unions)

```typescript
/**
 * Discriminated Union: Union types with a common literal property
 * THE most important pattern for type-safe state management
 */

// Action types (Redux-style)
type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; data: string[] }
  | { type: "FETCH_ERROR"; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      // action.data is available here
      return { ...state, loading: false, data: action.data };
    case "FETCH_ERROR":
      // action.error is available here
      return { ...state, loading: false, error: action.error };
  }
}

// API Response pattern
type ApiResponse<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case "loading":
      return <Loading />;
    case "success":
      return <Data data={response.data} />;
    case "error":
      return <Error message={response.error} />;
  }
}

// Shape example
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number }
  | { kind: "rectangle"; width: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

// Result type (Rust-style)
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: "Division by zero" };
  }
  return { ok: true, value: a / b };
}

const result = divide(10, 2);
if (result.ok) {
  console.log(result.value);  // number
} else {
  console.log(result.error);  // string
}
```

---

## 4. Interfaces vs Types {#4-interfaces-vs-types}

### Key Differences

```typescript
/**
 * INTERFACE vs TYPE: When to use which?
 * 
 * General rule:
 * - Use INTERFACE for object shapes (can be extended/implemented)
 * - Use TYPE for unions, primitives, tuples, complex types
 */

// ============ DECLARATION MERGING (Interface only!) ============

// Interfaces merge automatically
interface User {
  name: string;
}

interface User {
  age: number;
}

// User now has both name and age
const user: User = { name: "Alice", age: 30 };

// Types CANNOT merge (error: Duplicate identifier)
type Person = { name: string };
// type Person = { age: number };  // Error!


// ============ EXTENDS vs INTERSECTION ============

// Interface extends (inheritance)
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type intersection (composition)
type AnimalType = { name: string };
type DogType = AnimalType & { breed: string };

// Interface can extend type
interface Cat extends AnimalType {
  meow(): void;
}

// Type can intersect interface
type Bird = Animal & { fly(): void };


// ============ IMPLEMENTS ============

// Both can be implemented by classes
interface Printable {
  print(): void;
}

type Serializable = {
  serialize(): string;
};

class Document implements Printable, Serializable {
  print() { console.log("Printing..."); }
  serialize() { return JSON.stringify(this); }
}


// ============ ONLY TYPE CAN DO ============

// Union types
type StringOrNumber = string | number;
// interface StringOrNumber = string | number;  // Impossible!

// Primitive aliases
type ID = string;
type Callback = () => void;

// Tuple types
type Point = [number, number];
type NamedPoint = [x: number, y: number];

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Template literal types
type EventName = `on${Capitalize<string>}`;


// ============ ONLY INTERFACE CAN DO ============

// Declaration merging (shown above)
// Useful for extending third-party types


// ============ COMPUTED PROPERTIES ============

// Type can use computed properties directly
type Keys = "name" | "age";
type Person = { [K in Keys]: string };

// Interface needs mapped type helper
type PersonInterface = { [K in Keys]: string };  // This is a type!


// ============ RECURSIVE TYPES ============

// Both work, but syntax differs

// Interface (more natural for objects)
interface TreeNode {
  value: number;
  children: TreeNode[];
}

// Type
type TreeNodeType = {
  value: number;
  children: TreeNodeType[];
};

// Type with union (more flexible)
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

### When to Use What

```typescript
/**
 * DECISION GUIDE:
 * 
 * Use INTERFACE when:
 * ✓ Defining object shapes
 * ✓ Creating public API contracts
 * ✓ Need declaration merging (library augmentation)
 * ✓ Will be implemented by classes
 * ✓ Want extends semantics
 * 
 * Use TYPE when:
 * ✓ Creating unions or intersections
 * ✓ Aliasing primitives
 * ✓ Creating tuple types
 * ✓ Using mapped/conditional types
 * ✓ Need computed properties
 * ✓ Creating complex type expressions
 */

// Example: API design
interface ApiClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, body: unknown): Promise<T>;
}

// Example: State management
type LoadingState = 
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: unknown }
  | { status: "error"; error: Error };

// Example: Utility types
type Nullable<T> = T | null;
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Example: Function types
type Handler<T> = (event: T) => void;
type AsyncHandler<T> = (event: T) => Promise<void>;

// Example: Object with specific keys
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

// Example: Object with dynamic keys
type FeatureFlags = {
  [key: string]: boolean;
};
```

---

## 5. Generics Deep Dive {#5-generics}

### Generic Basics

```typescript
// Generic function
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello");  // Type: string
const num = identity(42);       // Type: number

// Explicit type argument
const explicit = identity<string>("hello");

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair("hello", 42);  // Type: [string, number]

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

const strContainer: Container<string> = {
  value: "hello",
  getValue() { return this.value; }
};

// Generic class
class Box<T> {
  constructor(public contents: T) {}
  
  map<U>(fn: (value: T) => U): Box<U> {
    return new Box(fn(this.contents));
  }
}

const numBox = new Box(42);
const strBox = numBox.map(n => n.toString());  // Box<string>

// Generic type alias
type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };
```

### Generic Constraints

```typescript
// extends keyword for constraints
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello");    // OK - string has length
getLength([1, 2, 3]);  // OK - array has length
// getLength(42);      // Error - number has no length

// Constraining to object keys
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name");  // Type: string
const age = getProperty(person, "age");    // Type: number
// getProperty(person, "email");           // Error!

// Multiple constraints (intersection)
interface HasId { id: number; }
interface HasName { name: string; }

function process<T extends HasId & HasName>(item: T): string {
  return `${item.id}: ${item.name}`;
}

// Constraining to constructor
interface Constructor<T = {}> {
  new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructor<T>): T {
  return new ctor();
}

class MyClass {
  value = 42;
}

const instance = createInstance(MyClass);  // Type: MyClass
```

### Generic Inference & Defaults

```typescript
// Type inference in generics
function createArray<T>(item: T, count: number): T[] {
  return Array(count).fill(item);
}

const nums = createArray(0, 5);        // T inferred as number
const strs = createArray("", 5);       // T inferred as string

// Default type parameters
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

const response: ApiResponse = { data: {}, status: 200 };  // T is unknown
const userResponse: ApiResponse<User> = { data: user, status: 200 };

// Default with constraint
interface Cache<T extends object = Record<string, unknown>> {
  get(key: string): T | undefined;
  set(key: string, value: T): void;
}

// Contextual typing with generics
const handlers = {
  onClick: (e: MouseEvent) => {},
  onKeyDown: (e: KeyboardEvent) => {}
};

function on<K extends keyof typeof handlers>(
  event: K,
  handler: typeof handlers[K]
) {
  // ...
}

on("onClick", (e) => {});  // e is MouseEvent
on("onKeyDown", (e) => {});  // e is KeyboardEvent
```

### Advanced Generic Patterns

```typescript
// Generic with conditional return type
function processInput<T extends string | number>(
  input: T
): T extends string ? string[] : number {
  if (typeof input === "string") {
    return input.split("") as any;
  }
  return (input * 2) as any;
}

const strResult = processInput("hello");  // string[]
const numResult = processInput(42);       // number

// Factory pattern with generics
interface Factory<T> {
  create(): T;
}

function createFactory<T>(ctor: new () => T): Factory<T> {
  return {
    create: () => new ctor()
  };
}

// Builder pattern
class RequestBuilder<T = unknown> {
  private url = "";
  private method = "GET";
  
  setUrl(url: string): this {
    this.url = url;
    return this;
  }
  
  setMethod(method: string): this {
    this.method = method;
    return this;
  }
  
  // Change the generic type
  withResponse<R>(): RequestBuilder<R> {
    return this as unknown as RequestBuilder<R>;
  }
  
  async execute(): Promise<T> {
    const response = await fetch(this.url, { method: this.method });
    return response.json();
  }
}

const request = new RequestBuilder()
  .setUrl("/api/users")
  .withResponse<User[]>()
  .execute();  // Promise<User[]>

// Curried generic function
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a) => (b) => fn(a, b);
}

const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);
const addFive = curriedAdd(5);
const result = addFive(3);  // 8

// Variadic tuple types (rest elements in generics)
function concat<T extends unknown[], U extends unknown[]>(
  arr1: [...T],
  arr2: [...U]
): [...T, ...U] {
  return [...arr1, ...arr2];
}

const result2 = concat([1, 2] as const, ["a", "b"] as const);
// Type: [1, 2, "a", "b"]
```

---

## 6. Utility Types Mastery {#6-utility-types}

### Built-in Utility Types

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  readonly createdAt: Date;
}

// ============ PARTIAL: All properties optional ============
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; createdAt?: Date }

function updateUser(id: number, updates: Partial<User>) {
  // Can pass any subset of User properties
}

updateUser(1, { name: "New Name" });  // OK


// ============ REQUIRED: All properties required ============
type RequiredUser = Required<User>;
// { id: number; name: string; email: string; age: number; createdAt: Date }


// ============ READONLY: All properties readonly ============
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }

function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}


// ============ PICK: Select specific properties ============
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }


// ============ OMIT: Remove specific properties ============
type UserWithoutEmail = Omit<User, "email" | "createdAt">;
// { id: number; name: string; age?: number }


// ============ RECORD: Create object type with specific keys ============
type PageInfo = { title: string };
type Page = "home" | "about" | "contact";

type Pages = Record<Page, PageInfo>;
// { home: PageInfo; about: PageInfo; contact: PageInfo }

// Dynamic string keys
type StringMap = Record<string, unknown>;


// ============ EXCLUDE: Remove types from union ============
type T1 = "a" | "b" | "c";
type T2 = Exclude<T1, "a">;  // "b" | "c"
type T3 = Exclude<T1, "a" | "b">;  // "c"

type NonNullableString = Exclude<string | null | undefined, null | undefined>;
// string


// ============ EXTRACT: Keep only matching types ============
type T4 = Extract<T1, "a" | "f">;  // "a"
type T5 = Extract<string | number | boolean, string | boolean>;  // string | boolean


// ============ NONNULLABLE: Remove null and undefined ============
type T6 = NonNullable<string | null | undefined>;  // string


// ============ RETURNTYPE: Get function return type ============
function createUser(name: string, age: number) {
  return { id: Math.random(), name, age };
}

type CreateUserReturn = ReturnType<typeof createUser>;
// { id: number; name: string; age: number }


// ============ PARAMETERS: Get function parameter types ============
type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number]


// ============ AWAITED: Unwrap Promise type ============
type PromiseString = Promise<string>;
type AwaitedString = Awaited<PromiseString>;  // string

type NestedPromise = Promise<Promise<number>>;
type AwaitedNested = Awaited<NestedPromise>;  // number


// ============ CONSTRUCTORPARAMETERS ============
class Point {
  constructor(public x: number, public y: number) {}
}

type PointParams = ConstructorParameters<typeof Point>;  // [x: number, y: number]


// ============ INSTANCETYPE ============
type PointInstance = InstanceType<typeof Point>;  // Point


// ============ THISPARAMETERTYPE & OMITTHISPARAMETER ============
function toHex(this: number) {
  return this.toString(16);
}

type ThisType = ThisParameterType<typeof toHex>;  // number
type PureFunction = OmitThisParameter<typeof toHex>;  // () => string
```

### String Manipulation Types

```typescript
// Built-in string manipulation types (TS 4.1+)
type Upper = Uppercase<"hello">;        // "HELLO"
type Lower = Lowercase<"HELLO">;        // "hello"
type Cap = Capitalize<"hello">;         // "Hello"
type Uncap = Uncapitalize<"Hello">;     // "hello"

// Event handler pattern
type EventName = "click" | "scroll" | "mousemove";
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onScroll" | "onMousemove"

// Getter/setter pattern
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

### Building Custom Utility Types

```typescript
// Deep Partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface NestedConfig {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
}

type PartialConfig = DeepPartial<NestedConfig>;
// All nested properties are also optional

// Deep Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// Mutable (remove readonly)
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Optional to Required
type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Make specific keys optional
type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Nullable (allow null for all properties)
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Get optional keys
type OptionalKeysOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Get required keys
type RequiredKeysOf<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Filter keys by value type
type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

interface Example {
  name: string;
  age: number;
  active: boolean;
  count: number;
}

type StringKeys = KeysOfType<Example, string>;  // "name"
type NumberKeys = KeysOfType<Example, number>;  // "age" | "count"

// Pick by value type
type PickByType<T, V> = Pick<T, KeysOfType<T, V>>;

type OnlyNumbers = PickByType<Example, number>;
// { age: number; count: number }
```

---

## 7. Advanced Types {#7-advanced-types}

### Index Types

```typescript
// keyof - get all keys as union
interface Person {
  name: string;
  age: number;
  email: string;
}

type PersonKeys = keyof Person;  // "name" | "age" | "email"

// Indexed access types
type NameType = Person["name"];           // string
type AgeOrEmail = Person["age" | "email"];  // number | string
type AllValues = Person[keyof Person];    // string | number

// Array index access
const tuple = ["hello", 42, true] as const;
type TupleValues = (typeof tuple)[number];  // "hello" | 42 | true
type FirstElement = (typeof tuple)[0];      // "hello"

// Nested index access
interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
  };
}

type ServerHost = Config["server"]["host"];  // string

// typeof with index access
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact"
} as const;

type Route = typeof routes[keyof typeof routes];
// "/" | "/about" | "/contact"
```

### Intersection & Union Types

```typescript
// Union: A OR B
type StringOrNumber = string | number;

function process(value: StringOrNumber) {
  // Can only access common properties
  // value.length - Error! number has no length
  
  if (typeof value === "string") {
    console.log(value.length);  // OK
  }
}

// Intersection: A AND B
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;  // { name: string; age: number }

// Intersection with functions
type Logger = (msg: string) => void;
type ErrorHandler = (err: Error) => void;
type Combined = Logger & ErrorHandler;  // Never callable!
// Function intersections result in overloads

// Intersection with conflicting properties
type A = { x: number };
type B = { x: string };
type AB = A & B;  // { x: never } - number & string is never

// Union of object types
type Cat = { meow(): void };
type Dog = { bark(): void };
type Pet = Cat | Dog;

function handlePet(pet: Pet) {
  // pet.meow() - Error! Might be a dog
  // pet.bark() - Error! Might be a cat
  
  if ("meow" in pet) {
    pet.meow();  // OK
  }
}

// Distributive unions
type Wrap<T> = T extends any ? { value: T } : never;
type Distributed = Wrap<string | number>;
// { value: string } | { value: number }
// NOT { value: string | number }
```

### Type Assertions & Casting

```typescript
// as syntax (preferred)
const input = document.getElementById("my-input") as HTMLInputElement;
input.value = "hello";

// Angle bracket syntax (doesn't work in JSX)
const input2 = <HTMLInputElement>document.getElementById("my-input");

// const assertion
const config = {
  endpoint: "/api",
  retries: 3
} as const;
// Type: { readonly endpoint: "/api"; readonly retries: 3 }

// Non-null assertion (!)
function getValue(map: Map<string, string>, key: string): string {
  // We "know" the key exists
  return map.get(key)!;  // Asserts not undefined
}

// Double assertion (escape hatch)
const value = "hello" as unknown as number;  // Dangerous!

// Satisfies operator (TS 4.9+)
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255]
} satisfies Record<string, string | number[]>;

// Type is inferred precisely:
// { red: number[]; green: string; blue: number[] }
// But validated against Record<string, string | number[]>

palette.green.toUpperCase();  // OK - green is inferred as string
// palette.red.toUpperCase();  // Error - red is number[]

// vs 'as' which loses precision:
const palette2 = {
  red: [255, 0, 0],
  green: "#00ff00"
} as Record<string, string | number[]>;

// palette2.green.toUpperCase();  // Error - could be number[]
```

---

## 8. Conditional Types {#8-conditional-types}

### Basic Conditional Types

```typescript
// Syntax: T extends U ? X : Y
// "If T is assignable to U, then X, else Y"

type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false
type C = IsString<"hello">;  // true

// Practical example: Unwrap array type
type UnwrapArray<T> = T extends Array<infer U> ? U : T;

type D = UnwrapArray<string[]>;  // string
type E = UnwrapArray<number>;    // number (not an array)

// Unwrap Promise
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type F = UnwrapPromise<Promise<string>>;  // string
type G = UnwrapPromise<number>;           // number

// Nested unwrapping
type DeepUnwrap<T> = T extends Promise<infer U>
  ? DeepUnwrap<U>
  : T extends Array<infer V>
  ? DeepUnwrap<V>
  : T;

type H = DeepUnwrap<Promise<Promise<string[]>>>;  // string
```

### Infer Keyword

```typescript
// infer creates a type variable within conditional type
// Can only be used in extends clause

// Extract function return type
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

type I = ReturnOf<() => string>;        // string
type J = ReturnOf<(x: number) => void>; // void

// Extract function parameter types
type ParamsOf<T> = T extends (...args: infer P) => any ? P : never;

type K = ParamsOf<(a: string, b: number) => void>;  // [a: string, b: number]

// Extract array element type
type ElementOf<T> = T extends (infer E)[] ? E : never;

type L = ElementOf<string[]>;  // string

// Extract Promise value type
type PromiseValue<T> = T extends Promise<infer V> ? V : never;

type M = PromiseValue<Promise<number>>;  // number

// Multiple infer positions
type FirstAndLast<T> = T extends [infer F, ...any[], infer L]
  ? [F, L]
  : never;

type N = FirstAndLast<[1, 2, 3, 4]>;  // [1, 4]
type O = FirstAndLast<[1]>;           // never

// infer with constraints (TS 4.7+)
type GetStringValue<T> = T extends { value: infer V extends string }
  ? V
  : never;

type P = GetStringValue<{ value: "hello" }>;  // "hello"
type Q = GetStringValue<{ value: 42 }>;       // never
```

### Distributive Conditional Types

```typescript
// Conditional types distribute over unions
// T extends U ? X : Y distributes when T is a union

type ToArray<T> = T extends any ? T[] : never;

type R = ToArray<string | number>;
// Distributes: ToArray<string> | ToArray<number>
// Result: string[] | number[]

// Without distribution, it would be (string | number)[]

// Prevent distribution with tuple
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type S = ToArrayNonDist<string | number>;
// Result: (string | number)[]

// Practical example: Exclude
type MyExclude<T, U> = T extends U ? never : T;

type T1 = MyExclude<"a" | "b" | "c", "a">;
// "a" extends "a" ? never : "a" -> never
// "b" extends "a" ? never : "b" -> "b"
// "c" extends "a" ? never : "c" -> "c"
// Result: "b" | "c"

// Filter union by type
type FilterByType<T, U> = T extends U ? T : never;

type Strings = FilterByType<string | number | boolean, string | boolean>;
// string | boolean

// Get function properties
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Mixed {
  name: string;
  age: number;
  greet(): void;
  calculate(x: number): number;
}

type FnKeys = FunctionKeys<Mixed>;  // "greet" | "calculate"
```

### Complex Conditional Patterns

```typescript
// Recursive conditional types
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type Deep = number[][][][];
type Flat = Flatten<Deep>;  // number

// Conditional with mapped types
type OptionalByType<T, U> = {
  [K in keyof T]: T[K] extends U ? T[K] | undefined : T[K];
};

interface Config {
  name: string;
  count: number;
  active: boolean;
}

type OptionalNumbers = OptionalByType<Config, number>;
// { name: string; count: number | undefined; active: boolean }

// Overload extraction
type GetOverloadReturnType<T> = T extends {
  (...args: any[]): infer R1;
  (...args: any[]): infer R2;
}
  ? R1 | R2
  : never;

declare function overloaded(x: string): string;
declare function overloaded(x: number): number;

type Returns = GetOverloadReturnType<typeof overloaded>;  // string | number

// JSON serializable check
type IsJSONSerializable<T> = T extends string | number | boolean | null
  ? true
  : T extends Function
  ? false
  : T extends object
  ? { [K in keyof T]: IsJSONSerializable<T[K]> } extends { [K in keyof T]: true }
    ? true
    : false
  : false;
```

---

## 9. Mapped Types {#9-mapped-types}

### Basic Mapped Types

```typescript
// Mapped type: Transform every property
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Custom mapped type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }

// Mapping over union of strings
type OptionsFlags<T extends string> = {
  [K in T]: boolean;
};

type Features = "darkMode" | "notifications" | "analytics";
type FeatureFlags = OptionsFlags<Features>;
// { darkMode: boolean; notifications: boolean; analytics: boolean }
```

### Modifiers in Mapped Types

```typescript
// Add modifier: +readonly, +?
// Remove modifier: -readonly, -?

// Remove optional
type Required<T> = {
  [K in keyof T]-?: T[K];
};

// Remove readonly
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Add both
type ReadonlyPartial<T> = {
  +readonly [K in keyof T]+?: T[K];
};

// Example
interface Config {
  readonly host: string;
  port?: number;
}

type MutableRequired = Mutable<Required<Config>>;
// { host: string; port: number }
```

### Key Remapping (as clause)

```typescript
// Rename keys in mapped types (TS 4.1+)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }

type PersonSetters = Setters<Person>;
// { setName: (value: string) => void; setAge: (value: number) => void }

// Filter keys using never
type FilteredKeys<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type OnlyStrings = FilteredKeys<Person, string>;
// { name: string }

// Remove specific keys
type OmitByName<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type WithoutAge = OmitByName<Person, "age">;
// { name: string }

// Combine with template literals
type EventConfig<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

type PersonEvents = EventConfig<Person>;
// { onNameChange: (value: string) => void; onAgeChange: (value: number) => void }
```

### Advanced Mapped Type Patterns

```typescript
// Deep mapped types
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};

// Path-based type
type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? K | `${K}.${Path<T[K]>}`
    : K
  : never;

interface NestedObj {
  a: {
    b: {
      c: string;
    };
  };
  d: number;
}

type Paths = Path<NestedObj>;  // "a" | "a.b" | "a.b.c" | "d"

// Mapped type for event emitter
type EventMap = {
  click: { x: number; y: number };
  focus: { target: HTMLElement };
  blur: { target: HTMLElement };
};

type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]: (event: T[K]) => void;
};

type Handlers = EventHandlers<EventMap>;
// {
//   onClick: (event: { x: number; y: number }) => void;
//   onFocus: (event: { target: HTMLElement }) => void;
//   onBlur: (event: { target: HTMLElement }) => void;
// }

// Make all functions async
type Async<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

interface SyncApi {
  getData(): string;
  setData(value: string): void;
  count: number;
}

type AsyncApi = Async<SyncApi>;
// {
//   getData: () => Promise<string>;
//   setData: (value: string) => Promise<void>;
//   count: number;  // Non-function unchanged
// }
```

---

## 10. Template Literal Types {#10-template-literal-types}

### Basic Template Literals

```typescript
// Template literal types (TS 4.1+)
type Greeting = `Hello, ${string}!`;

const g1: Greeting = "Hello, World!";  // OK
const g2: Greeting = "Hello, TypeScript!";  // OK
// const g3: Greeting = "Hi, World!";  // Error

// With union types
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ColorSize = `${Color}-${Size}`;
// "red-small" | "red-medium" | "red-large" |
// "green-small" | "green-medium" | "green-large" |
// "blue-small" | "blue-medium" | "blue-large"

// String manipulation
type Upper = Uppercase<"hello">;  // "HELLO"
type Lower = Lowercase<"HELLO">;  // "hello"
type Cap = Capitalize<"hello">;   // "Hello"
type Uncap = Uncapitalize<"Hello">;  // "hello"

// Combined with manipulation
type EventName = "click" | "scroll" | "mousedown";
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onScroll" | "onMousedown"
```

### Pattern Matching with Template Literals

```typescript
// Extract parts of string type
type ExtractRouteParams<T extends string> =
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | ExtractRouteParams<Rest>
    : T extends `${infer _Start}:${infer Param}`
    ? Param
    : never;

type RouteParams = ExtractRouteParams<"/users/:userId/posts/:postId">;
// "userId" | "postId"

// Parse dot notation
type Split<S extends string, D extends string> =
  S extends `${infer Head}${D}${infer Tail}`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Path = Split<"a.b.c.d", ".">;  // ["a", "b", "c", "d"]

// Get nested property type
type DeepValue<T, P extends string> =
  P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? DeepValue<T[Key], Rest>
      : never
    : P extends keyof T
    ? T[P]
    : never;

interface Obj {
  a: {
    b: {
      c: string;
    };
  };
}

type ValueType = DeepValue<Obj, "a.b.c">;  // string

// CSS property types
type CSSProperty = "margin" | "padding" | "border";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSPropertyWithDirection = `${CSSProperty}-${CSSDirection}`;
// "margin-top" | "margin-right" | ... | "border-left"

// HTTP methods
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "/users" | "/posts" | "/comments";
type ApiRoute = `${Method} ${Endpoint}`;
// "GET /users" | "POST /users" | ... | "DELETE /comments"
```

### Practical Template Literal Patterns

```typescript
// Type-safe event system
type ExtractEventName<T extends string> =
  T extends `on${infer Event}` ? Uncapitalize<Event> : never;

type EventNames = ExtractEventName<"onClick" | "onMouseMove" | "onKeyDown">;
// "click" | "mouseMove" | "keyDown"

// SQL query builder types
type TableName = "users" | "posts" | "comments";
type SelectQuery = `SELECT * FROM ${TableName}`;
type WhereClause<T extends string> = ` WHERE ${T}`;
type OrderByClause<T extends string> = ` ORDER BY ${T}`;

type Query = `${SelectQuery}${WhereClause<string>}${OrderByClause<string>}`;

// Route parameter extraction
type ParseUrlParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ParseUrlParams<`/${Rest}`>]: string }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : {};

type Params = ParseUrlParams<"/users/:userId/posts/:postId">;
// { userId: string; postId: string }

// Type-safe i18n keys
type Locale = "en" | "es" | "fr";
type TranslationKey = "greeting" | "farewell" | "error";
type LocalizedKey = `${Locale}.${TranslationKey}`;
// "en.greeting" | "en.farewell" | ... | "fr.error"

// BEM-style class names
type Block = "button" | "card" | "modal";
type Element = "title" | "body" | "footer";
type Modifier = "active" | "disabled" | "large";

type BEMClass =
  | Block
  | `${Block}__${Element}`
  | `${Block}--${Modifier}`
  | `${Block}__${Element}--${Modifier}`;
```

---

## 11. Declaration Merging & Module Augmentation {#11-declaration-merging}

### Interface Merging

```typescript
// Interfaces with same name merge automatically
interface User {
  name: string;
}

interface User {
  age: number;
}

interface User {
  email: string;
}

// User now has all three properties
const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

// Useful for extending built-in types
interface Array<T> {
  customMethod(): T[];
}

// Now all arrays have customMethod (type only, not implementation!)
```

### Namespace Merging

```typescript
// Function + namespace
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let prefix = "Hello, ";
  export let suffix = "!";
}

buildLabel("World");  // "Hello, World!"
buildLabel.prefix = "Hi, ";
buildLabel("World");  // "Hi, World!"

// Class + namespace (add static members)
class Album {
  constructor(public name: string) {}
}

namespace Album {
  export class Track {
    constructor(public name: string, public duration: number) {}
  }
  
  export function create(name: string): Album {
    return new Album(name);
  }
}

const album = Album.create("Greatest Hits");
const track = new Album.Track("Song 1", 180);

// Enum + namespace
enum Color {
  Red,
  Green,
  Blue
}

namespace Color {
  export function mixColors(a: Color, b: Color): Color {
    // Implementation
    return Color.Red;
  }
}

Color.mixColors(Color.Red, Color.Blue);
```

### Module Augmentation

```typescript
// Extend third-party module types

// Extend Express Request
declare module "express" {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}

// Now you can use req.user in Express handlers

// Extend Vue component options
declare module "vue" {
  interface ComponentCustomProperties {
    $http: typeof fetch;
  }
}

// Extend existing module
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// math-extensions.ts
import { add } from "./math";

declare module "./math" {
  export function multiply(a: number, b: number): number;
}

// Implementation (separate file)
export function multiply(a: number, b: number): number {
  return a * b;
}
```

### Global Augmentation

```typescript
// Add to global scope
declare global {
  interface Window {
    myApp: {
      version: string;
      config: Record<string, unknown>;
    };
  }
  
  // Global variable
  var DEBUG: boolean;
  
  // Global function
  function log(message: string): void;
}

// Usage
window.myApp = {
  version: "1.0.0",
  config: {}
};

// Extend global Array
declare global {
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
  }
}

// Implementation
Array.prototype.first = function() {
  return this[0];
};

Array.prototype.last = function() {
  return this[this.length - 1];
};

// Usage
[1, 2, 3].first();  // 1
[1, 2, 3].last();   // 3
```

---

## 12. Strict Mode & Compiler Options {#12-strict-mode}

### Strict Mode Options

```typescript
/**
 * tsconfig.json strict mode options
 * "strict": true enables ALL of these
 */

// ============ strictNullChecks ============
// Variables cannot be null/undefined unless explicitly typed

// Without strictNullChecks:
let name: string = null;  // OK (but dangerous!)

// With strictNullChecks:
let name: string = null;  // Error!
let name: string | null = null;  // OK

function getLength(str: string | null): number {
  // return str.length;  // Error! str might be null
  return str?.length ?? 0;  // OK
}


// ============ noImplicitAny ============
// Must declare types when they can't be inferred

// Without noImplicitAny:
function process(data) {  // data is implicit any
  return data.value;
}

// With noImplicitAny:
function process(data) {  // Error! Parameter has implicit 'any'
  return data.value;
}

function process(data: unknown) {  // OK
  // Must narrow type
}


// ============ strictFunctionTypes ============
// Stricter checking for function parameter types

type Handler = (event: MouseEvent) => void;

// Without strictFunctionTypes:
const handler: Handler = (event: Event) => {};  // OK (contravariance ignored)

// With strictFunctionTypes:
const handler: Handler = (event: Event) => {};  // Error!
// MouseEvent is more specific than Event


// ============ strictBindCallApply ============
// Stricter checking for bind, call, apply

function greet(name: string, age: number) {
  return `${name} is ${age}`;
}

// Without:
greet.call(undefined, "Alice");  // OK (missing arg ignored)

// With:
greet.call(undefined, "Alice");  // Error! Expected 2 args


// ============ strictPropertyInitialization ============
// Class properties must be initialized

// Without:
class User {
  name: string;  // OK (but undefined at runtime!)
}

// With:
class User {
  name: string;  // Error! Not initialized
  
  // Solutions:
  name: string = "";  // Initialize
  name!: string;      // Definite assignment assertion
  name?: string;      // Make optional
  
  constructor(name: string) {
    this.name = name;  // Initialize in constructor
  }
}


// ============ noImplicitThis ============
// 'this' must have explicit type

// Without:
function onClick() {
  console.log(this.value);  // 'this' is any
}

// With:
function onClick(this: HTMLInputElement) {
  console.log(this.value);  // OK
}


// ============ alwaysStrict ============
// Emit "use strict" in all files


// ============ useUnknownInCatchVariables ============
// catch clause variables are unknown instead of any

// Without:
try {
} catch (e) {
  e.message;  // OK (e is any)
}

// With:
try {
} catch (e) {
  // e is unknown
  if (e instanceof Error) {
    e.message;  // OK
  }
}
```

### Other Important Compiler Options

```typescript
/**
 * Additional tsconfig.json options for production
 */

{
  "compilerOptions": {
    // Type Checking
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,  // array[0] is T | undefined
    "exactOptionalPropertyTypes": true,  // undefined != missing
    
    // Modules
    "module": "ESNext",
    "moduleResolution": "bundler",  // or "node16" for Node.js
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    
    // Emit
    "target": "ES2022",
    "declaration": true,  // Generate .d.ts files
    "declarationMap": true,  // Source maps for .d.ts
    "sourceMap": true,
    "outDir": "./dist",
    
    // Environment
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["node"],  // Include @types/node
    
    // Advanced
    "skipLibCheck": true,  // Skip .d.ts checking (faster)
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 13. Common Patterns & Anti-Patterns {#13-patterns}

### Anti-Patterns to Avoid

```typescript
// ❌ ANTI-PATTERN: Using 'any' everywhere
function processData(data: any): any {
  return data.value;
}

// ✅ BETTER: Use proper types or unknown
function processData<T extends { value: unknown }>(data: T): T["value"] {
  return data.value;
}


// ❌ ANTI-PATTERN: Type assertion to silence errors
const element = document.getElementById("app") as HTMLDivElement;
element.innerText = "Hello";  // Might crash if element is null!

// ✅ BETTER: Handle null case
const element = document.getElementById("app");
if (element instanceof HTMLDivElement) {
  element.innerText = "Hello";
}


// ❌ ANTI-PATTERN: Non-null assertion abuse
function getUser(id: string): User | undefined {
  return users.get(id);
}

const user = getUser("123")!;  // Dangerous!
user.name;  // Might crash

// ✅ BETTER: Check for undefined
const user = getUser("123");
if (user) {
  user.name;  // Safe
}


// ❌ ANTI-PATTERN: Object type for "any object"
function process(obj: object) {
  console.log(obj.name);  // Error! 'object' has no properties
}

// ✅ BETTER: Use generic or specific type
function process<T extends { name: string }>(obj: T) {
  console.log(obj.name);
}


// ❌ ANTI-PATTERN: {} type (means any non-nullish value)
function log(value: {}) {
  console.log(value);  // Accepts string, number, etc.
}

// ✅ BETTER: Be specific
function log(value: Record<string, unknown>) {
  console.log(value);
}


// ❌ ANTI-PATTERN: String enum values
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

function process(status: string) {  // Loses type safety
  // ...
}

// ✅ BETTER: Use the enum type
function process(status: Status) {
  // ...
}


// ❌ ANTI-PATTERN: Callback hell with any
function fetchData(callback: Function) {
  // ...
}

// ✅ BETTER: Type the callback properly
function fetchData(callback: (error: Error | null, data: Data) => void) {
  // ...
}


// ❌ ANTI-PATTERN: instanceof for interfaces
interface User {
  name: string;
}

function isUser(value: unknown): value is User {
  return value instanceof User;  // Error! Interface has no runtime presence
}

// ✅ BETTER: Property checking
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    typeof (value as User).name === "string"
  );
}
```

### Best Practices

```typescript
// ✅ Use const assertions for immutable data
const config = {
  endpoint: "/api",
  retries: 3
} as const;


// ✅ Use discriminated unions for state management
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Data }
  | { status: "error"; error: Error };


// ✅ Use branded types for type-safe IDs
type UserId = string & { __brand: "UserId" };
type PostId = string & { __brand: "PostId" };

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId): User {
  // ...
}

const userId = createUserId("123");
const postId = "456" as PostId;

getUser(userId);   // OK
// getUser(postId);  // Error! PostId not assignable to UserId


// ✅ Use function overloads for different return types
function createElement(tag: "div"): HTMLDivElement;
function createElement(tag: "span"): HTMLSpanElement;
function createElement(tag: "input"): HTMLInputElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}

const div = createElement("div");  // HTMLDivElement


// ✅ Use satisfies for type checking without widening
const palette = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff"
} satisfies Record<string, string>;

// palette.red is inferred as "#ff0000", not string


// ✅ Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: Date;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return {
    data: await response.json(),
    status: response.status,
    timestamp: new Date()
  };
}


// ✅ Use type guards for runtime safety
function assertIsError(value: unknown): asserts value is Error {
  if (!(value instanceof Error)) {
    throw new Error("Value is not an Error");
  }
}


// ✅ Use never for exhaustive checking
type Action = { type: "A" } | { type: "B" };

function handleAction(action: Action) {
  switch (action.type) {
    case "A":
      return "Handling A";
    case "B":
      return "Handling B";
    default:
      const _exhaustive: never = action;
      return _exhaustive;
  }
}
```

---

## 14. Real-World Scenarios {#14-real-world}

### API Response Handling

```typescript
// Type-safe API client
interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestConfig<T = unknown> {
  method: HttpMethod;
  endpoint: string;
  body?: T;
  params?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

interface ApiError {
  message: string;
  code: string;
  status: number;
}

type Result<T, E = ApiError> =
  | { success: true; data: T }
  | { success: false; error: E };

class ApiClient {
  constructor(private config: ApiConfig) {}

  async request<TResponse, TBody = unknown>(
    config: RequestConfig<TBody>
  ): Promise<Result<TResponse>> {
    try {
      const url = new URL(config.endpoint, this.config.baseUrl);
      
      if (config.params) {
        Object.entries(config.params).forEach(([key, value]) => {
          url.searchParams.set(key, value);
        });
      }

      const response = await fetch(url.toString(), {
        method: config.method,
        headers: {
          "Content-Type": "application/json",
          ...this.config.headers
        },
        body: config.body ? JSON.stringify(config.body) : undefined
      });

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: response.statusText,
            code: "HTTP_ERROR",
            status: response.status
          }
        };
      }

      const data = await response.json() as TResponse;
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          code: "NETWORK_ERROR",
          status: 0
        }
      };
    }
  }

  get<T>(endpoint: string, params?: Record<string, string>) {
    return this.request<T>({ method: "GET", endpoint, params });
  }

  post<TResponse, TBody>(endpoint: string, body: TBody) {
    return this.request<TResponse, TBody>({ method: "POST", endpoint, body });
  }
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
}

const api = new ApiClient({ baseUrl: "https://api.example.com" });

async function getUser(id: string) {
  const result = await api.get<User>(`/users/${id}`);
  
  if (result.success) {
    console.log(result.data.name);  // Type-safe!
  } else {
    console.error(result.error.message);
  }
}
```

### React Component Patterns

```typescript
import { ReactNode, ComponentProps, forwardRef } from "react";

// Polymorphic component (as prop)
type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = Props &
  AsProp<C> &
  Omit<ComponentProps<C>, PropsToOmit<C, Props>>;

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  { variant?: "primary" | "secondary"; size?: "sm" | "md" | "lg" }
>;

function Button<C extends React.ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps<C>) {
  const Component = as || "button";
  return <Component {...props}>{children}</Component>;
}

// Usage
<Button>Click me</Button>  // Renders as button
<Button as="a" href="/home">Link</Button>  // Renders as anchor


// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  emptyMessage?: string;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage }: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage ?? "No items"}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: string;
  name: string;
}

<List<User>
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>


// Compound component pattern
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within Tabs");
  }
  return context;
}

interface TabsProps {
  children: ReactNode;
  defaultTab: string;
}

function Tabs({ children, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabProps {
  id: string;
  children: ReactNode;
}

Tabs.Tab = function Tab({ id, children }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <button
      className={activeTab === id ? "active" : ""}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ id, children }: TabProps) {
  const { activeTab } = useTabs();

  if (activeTab !== id) return null;
  return <div>{children}</div>;
};

// Usage
<Tabs defaultTab="tab1">
  <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
  <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
  <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
</Tabs>
```

### State Management Types

```typescript
// Redux-style typed actions
interface Action<T extends string = string, P = undefined> {
  type: T;
  payload: P;
}

// Action creators
function createAction<T extends string>(type: T): Action<T>;
function createAction<T extends string, P>(type: T, payload: P): Action<T, P>;
function createAction<T extends string, P>(type: T, payload?: P): Action<T, P> {
  return { type, payload: payload as P };
}

// Usage
const increment = createAction("INCREMENT");
const addTodo = createAction("ADD_TODO", { text: "Learn TypeScript" });

// Type-safe reducer
type TodoAction =
  | Action<"ADD_TODO", { text: string }>
  | Action<"REMOVE_TODO", { id: number }>
  | Action<"TOGGLE_TODO", { id: number }>;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  nextId: number;
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.nextId, text: action.payload.text, completed: false }
        ],
        nextId: state.nextId + 1
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload.id)
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? { ...t, completed: !t.completed } : t
        )
      };
    default:
      const _exhaustive: never = action;
      return state;
  }
}

// Zustand-style store
interface Store<T> {
  getState: () => T;
  setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
  subscribe: (listener: (state: T) => void) => () => void;
}

function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => state,
    setState: (partial) => {
      const nextState =
        typeof partial === "function" ? partial(state) : partial;
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
```

---

## 15. Interview Questions & Answers {#15-interview-questions}

### Beginner Questions

```typescript
/**
 * Q: What's the difference between 'interface' and 'type'?
 * 
 * A: Both can describe object shapes, but:
 * - Interface: Declaration merging, can be extended, better for OOP
 * - Type: Unions, mapped types, computed properties, more flexible
 * 
 * Use interface for object APIs, type for everything else.
 */


/**
 * Q: What is 'never' type used for?
 * 
 * A: 'never' represents values that never occur:
 * 1. Functions that never return (throw or infinite loop)
 * 2. Exhaustive checking in switch statements
 * 3. Impossible intersections (string & number)
 */


/**
 * Q: What's the difference between '==' and '===' in TypeScript?
 * 
 * A: Same as JavaScript! TypeScript doesn't change this.
 * - '==': Loose equality (type coercion)
 * - '===': Strict equality (no coercion)
 * Always use '==='. TypeScript helps but doesn't prevent '==' issues.
 */


/**
 * Q: How do you make a property optional?
 * 
 * A: Use the '?' modifier:
 */
interface User {
  name: string;
  age?: number;  // Optional
}


/**
 * Q: What's a tuple in TypeScript?
 * 
 * A: Fixed-length array with specific types at each position:
 */
type Point = [number, number];
type NameAge = [string, number];
const point: Point = [10, 20];
```

### Intermediate Questions

```typescript
/**
 * Q: Explain 'any' vs 'unknown'
 * 
 * A: 
 * - 'any': Disables type checking. Avoid!
 * - 'unknown': Type-safe any. Must narrow before using.
 * 
 * Use 'unknown' for values of truly unknown type, then narrow:
 */
function processUnknown(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase();  // Now TypeScript knows it's string
  }
  return String(value);
}


/**
 * Q: What are type guards?
 * 
 * A: Functions that narrow types at runtime:
 */
// typeof guard
function process(value: string | number) {
  if (typeof value === "string") {
    // value is string
  }
}

// Custom type guard with 'is'
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "name" in obj;
}


/**
 * Q: Explain generics with an example
 * 
 * A: Generics create reusable components that work with any type:
 */
function identity<T>(value: T): T {
  return value;
}

const str = identity("hello");  // Type: string
const num = identity(42);       // Type: number


/**
 * Q: What's the difference between 'extends' and 'implements'?
 * 
 * A:
 * - extends: Inherit implementation from class/interface
 * - implements: Fulfill contract without inheriting implementation
 */
interface Printable {
  print(): void;
}

class Base {
  log() { console.log("Base"); }
}

class Derived extends Base implements Printable {
  print() { console.log("Print"); }
}


/**
 * Q: What is a discriminated union?
 * 
 * A: Union types with a common literal property for narrowing:
 */
type Result =
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data);  // TypeScript knows data exists
  } else {
    console.error(result.error);  // TypeScript knows error exists
  }
}
```

### Senior Questions

```typescript
/**
 * Q: Explain covariance and contravariance
 * 
 * A: Variance describes how type relationships transform:
 * 
 * - Covariance: A<Child> assignable to A<Parent>
 *   (Same direction - arrays, return types)
 * 
 * - Contravariance: A<Parent> assignable to A<Child>
 *   (Opposite direction - function parameters)
 */
type Getter<T> = () => T;  // Covariant in T
type Setter<T> = (value: T) => void;  // Contravariant in T

// Covariance example
declare let getAnimal: Getter<Animal>;
declare let getDog: Getter<Dog>;
getAnimal = getDog;  // OK - Dog is Animal, so Getter<Dog> → Getter<Animal>

// Contravariance example (with strictFunctionTypes)
declare let setAnimal: Setter<Animal>;
declare let setDog: Setter<Dog>;
setDog = setAnimal;  // OK - Can pass Dog to Animal setter
// setAnimal = setDog;  // Error! Can't pass Cat to Dog setter


/**
 * Q: Implement a DeepPartial type
 * 
 * A: Recursively make all properties optional:
 */
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;


/**
 * Q: Implement a type that extracts function parameter types
 * 
 * A: Use conditional types with infer:
 */
type Parameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never;

type Params = Parameters<(a: string, b: number) => void>;
// [a: string, b: number]


/**
 * Q: What's the difference between {} and object?
 * 
 * A:
 * - {}: Any non-nullish value (string, number, object, etc.)
 * - object: Any non-primitive (object, array, function)
 * - Object: Wrapper type (avoid)
 * 
 * Use Record<string, unknown> for "any object"
 */


/**
 * Q: Explain module augmentation
 * 
 * A: Extend existing modules/libraries with additional types:
 */
// Extend Express Request
declare module "express" {
  interface Request {
    user?: User;
  }
}


/**
 * Q: What is a branded type and when would you use it?
 * 
 * A: Nominal typing via intersection with unique symbol:
 */
type UserId = string & { readonly __brand: unique symbol };
type PostId = string & { readonly __brand: unique symbol };

// Prevents mixing up IDs even though both are strings
function getUser(id: UserId): User { ... }
function getPost(id: PostId): Post { ... }

const userId = "123" as UserId;
const postId = "456" as PostId;

getUser(userId);  // OK
// getUser(postId);  // Error!


/**
 * Q: How would you type a function that takes an object and returns
 *    a new object with the same keys but different value types?
 * 
 * A: Use mapped types:
 */
type MapValues<T, V> = { [K in keyof T]: V };

function mapValues<T extends object, V>(
  obj: T,
  fn: (value: T[keyof T]) => V
): MapValues<T, V> {
  const result = {} as MapValues<T, V>;
  for (const key in obj) {
    result[key] = fn(obj[key]);
  }
  return result;
}

const lengths = mapValues({ a: "hello", b: "world" }, (s) => s.length);
// Type: { a: number; b: number }


/**
 * Q: Explain the 'infer' keyword
 * 
 * A: 'infer' creates a type variable within conditional types:
 */
// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

// Extract promise value
type UnwrapPromise<T> = T extends Promise<infer V> ? V : T;

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

---

## Quick Reference Cheat Sheet

```
TYPE COMPARISON:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
any        - Disables checking (avoid!)
unknown    - Type-safe any (must narrow)
never      - Impossible values (exhaustive check)
void       - No return value
null       - Intentional absence
undefined  - Uninitialized

UTILITY TYPES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Partial<T>      - All optional
Required<T>     - All required
Readonly<T>     - All readonly
Pick<T, K>      - Select keys
Omit<T, K>      - Remove keys
Record<K, V>    - Object with K keys and V values
Exclude<T, U>   - Remove from union
Extract<T, U>   - Keep in union
NonNullable<T>  - Remove null/undefined
ReturnType<T>   - Function return type
Parameters<T>   - Function params as tuple

TYPE GUARDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
typeof x === "string"  - Primitive check
x instanceof Class     - Instance check
"prop" in x           - Property check
isType(x): x is Type  - Custom guard

BEST PRACTICES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Enable strict mode
✓ Use unknown instead of any
✓ Prefer interface for objects
✓ Use discriminated unions
✓ Add exhaustive checking
✓ Use const assertions
✓ Use satisfies for validation
✗ Avoid type assertions
✗ Avoid non-null assertions
✗ Avoid {} type
```

---


