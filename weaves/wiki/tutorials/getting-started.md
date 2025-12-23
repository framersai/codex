# Getting Started with Frame Codex

Welcome to the **Frame Codex** — a revolutionary knowledge system that combines the elegance of Art Deco with the power of modern AI. This tutorial will guide you through the basics of navigating, reading, and contributing to the Codex.

## What is Frame Codex?

Frame Codex is a **four-tier hierarchical knowledge base** designed for both humans and AI to explore, learn, and grow together. Think of it as the **Hitchhiker's Guide to the Galaxy** meets the **Library of Alexandria**, wrapped in golden Art Deco splendor.

### The Four-Tier Architecture

1. **Fabric** — The entire knowledge universe (the whole Codex)
2. **Weave** — A thematic collection (e.g., "Wiki", "Tutorials", "Research")
3. **Loom** — A category within a weave (e.g., "Architecture", "Examples")
4. **Strand** — An individual document (like this one!)

```
Fabric (Frame Codex)
└── Weave (wiki)
    └── Loom (tutorials)
        └── Strand (getting-started.md)
```

## Navigation Basics

### The Sidebar

The left sidebar shows your current location in the hierarchy:

- **Weaves** are shown in bold with distinctive colors
- **Looms** are nested underneath weaves
- **Strands** appear as clickable items within looms
- Current selection is highlighted with a golden ring

### The Content Area

The center panel displays your selected strand in beautiful markdown rendering with:

- Syntax highlighting for code blocks
- Auto-generated galleries for multiple images
- Embedded media support (audio, video, drawings)
- Interactive elements

### The Metadata Panel

The right sidebar shows:

- **File info** — path, size, last modified
- **Tags** — auto-suggested or manual keywords
- **Readability** — Flesch-Kincaid score and estimated reading time
- **Vocabulary** — domain-specific terms found in the strand
- **Sentiment** — emotional tone analysis

## Your First Strand

Let's create your first knowledge strand!

### 1. Open the Editor

Press the **Edit** button in the toolbar (or press `E` on your keyboard).

### 2. Write Your Content

Use the split-pane editor to write in Markdown:

```markdown
# My First Strand

This is a paragraph of text.

## A Subheading

- Bullet point 1
- Bullet point 2

**Bold text** and *italic text* work too!
```

### 3. Add Media

Click the **sparkle icon** ✨ to open the radial media menu:

- 📷 **Camera** — Take a photo or upload an image
- 🎙️ **Voice** — Record audio notes
- 🎨 **Draw** — Open the infinite whiteboard canvas
- 💻 **Code** — Insert syntax-highlighted code blocks

### 4. Save Your Draft

Click **Save Draft** to store locally (auto-saves every 5 seconds).

### 5. Publish Your Changes

Click **Publish** to create a pull request on GitHub!

The system will:
1. Fork the repository (if needed)
2. Upload your media assets
3. Create a branch
4. Commit your changes
5. Open a PR for review

## Markdown Features

Frame Codex supports **GitHub Flavored Markdown** with special enhancements:

### Basic Formatting

```markdown
**Bold** 
*Italic* 
`Inline code` 
~~Strikethrough~~
```

### Links and References

```markdown
[External link](https://example.com)
[Internal strand](/wiki/architecture/overview)
```

### Images

```markdown
![Single image](./photo.jpg)
```

When you add 3+ images in a row, they automatically become a gallery!

```markdown
![Photo 1](./img1.jpg)
![Photo 2](./img2.jpg)
![Photo 3](./img3.jpg)
![Photo 4](./img4.jpg)
```

### Code Blocks

````markdown
```javascript exec
function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}
console.log("Fibonacci(10) =", fibonacci(10));
```
````

**Pro tip:** Add `exec` after the language to make code blocks **runnable**! See the [Executable Code Guide](./executable-code) for details.

### Tables

```markdown
| Feature | Status |
|---------|--------|
| Gallery | ✅ |
| Voice | ✅ |
| Whiteboard | ✅ |
```

### Math (Coming Soon)

```markdown
Inline: $E = mc^2$

Block:
$$
\phi = \frac{1 + \sqrt{5}}{2} \approx 1.618
$$
```

## Media as Strands

In Frame Codex, **everything is a strand** — including media files!

### Photos

When you capture a photo, it becomes a strand in `./assets/photos/` and is automatically:
- Timestamped
- Linked to the parent strand
- Indexed for search
- Added to the gallery if there are multiple

### Audio

Voice recordings are saved as `./assets/audio/*.webm` and can be:
- Played inline
- Transcribed (coming soon)
- Tagged with keywords
- Searched by content

### Drawings

Whiteboard sketches export as SVG to `./assets/drawings/` and retain:
- Full vector quality
- Infinite canvas context
- Golden ratio guides
- Layer information

## The Recursive Nature of Strands

Here's where it gets magical: **strands can contain strands**.

A single media collection can be treated as one logical strand with a `catalog.json` schema:

```json
{
  "type": "gallery",
  "title": "Art Deco Architecture Photos",
  "strands": [
    "./chrysler-building.jpg",
    "./empire-state.jpg",
    "./rockefeller-center.jpg"
  ],
  "metadata": {
    "location": "New York City",
    "period": "1920-1940",
    "style": "Art Deco"
  }
}
```

This catalog **itself becomes a traversable node** in the knowledge graph!

## Themes

Frame Codex supports four beautiful themes:

1. **Light** — Clean and modern
2. **Dark** — Easy on the eyes
3. **Sepia Light** — Vintage paper aesthetic
4. **Sepia Dark** — Warm evening reading

Toggle between them with the theme button in the header. Your preference syncs across the landing page and Codex viewer.

## Keyboard Shortcuts

Speed up your workflow with these hotkeys:

| Key | Action |
|-----|--------|
| `E` | Toggle editor |
| `S` | Toggle sidebar |
| `I` | Toggle info panel |
| `H` | Open help |
| `Ctrl+S` | Save draft |
| `/` | Focus search |
| `Esc` | Close modals |

## Next Steps

Now that you know the basics, explore these guides:

- [Markdown Features](/wiki/tutorials/markdown-features) — Deep dive into supported syntax
- [Media Guide](/wiki/tutorials/media-guide) — Photos, audio, drawings, and galleries
- [Search & Discovery](/wiki/tutorials/search-guide) — Find knowledge across the Fabric
- [Contributing](/wiki/tutorials/contributing) — How to propose changes and improvements

---

**Welcome to the Fabric.** Your journey through knowledge has just begun. 🌟

---

metadata:
title: Getting Started with Frame Codex
tags: [tutorial, beginner, introduction, guide]
level: beginner
created: 2024-01-15
updated: 2024-01-15
