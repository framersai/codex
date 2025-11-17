# Media Guide: Photos, Audio, Drawings & More

Frame Codex treats **all media as first-class knowledge strands**. This guide shows you how to capture, upload, organize, and reference multimedia content in your Codex.

## Philosophy: Everything is a Strand

In traditional knowledge bases, media files are mere "attachments." In Frame Codex, they are **strands** — interconnected nodes in the knowledge graph.

A photo isn't just decoration—it's a semantic object with:
- **Context** (when, where, why it was taken)
- **Relationships** (linked to parent strand, related concepts)
- **Metadata** (tags, sentiment, visual features)
- **Discoverability** (searchable, indexed, recommended)

## The Radial Media Menu

To insert media, press the **sparkle icon** ✨ in the editor. This opens the **Art Deco Radial Menu** with options arranged in a circle:

### Available Options

| Icon | Type | Description |
|------|------|-------------|
| 📷 | **Camera** | Capture or upload photos |
| 🎙️ | **Voice** | Record audio notes |
| 🎨 | **Draw** | Open whiteboard canvas |
| 💻 | **Code** | Insert code blocks |
| 🖼️ | **Image** | Upload from file system |
| 🔗 | **Link** | Insert external links |
| #️⃣ | **Tag** | Add semantic tags |
| ✍️ | **Heading** | Insert section heading |

## 📷 Photos

### Capture with Camera

1. Click **Camera** in the radial menu
2. A Polaroid-style UI appears
3. Click **Capture** to take a photo
4. Apply retro filters:
   - **Sepia** — Vintage warmth
   - **Noir** — Black & white
   - **Vintage** — Faded 1970s look
5. Click **Use Photo** to insert

The photo is automatically:
- Saved to `./assets/photos/photo-{timestamp}.jpg`
- Linked in the markdown: `![Photo](./assets/photos/photo-xxx.jpg)`
- Uploaded when you publish (via PR workflow)

### Upload from File

1. Click **Image** in the radial menu
2. Select file from your device
3. Image is copied to `./assets/photos/`
4. Reference inserted in markdown

### Gallery Wall

When you add **3 or more photos** in sequence, they automatically transform into an **Art Deco gallery**:

```markdown
![Golden Gate](./assets/photos/golden-gate.jpg)
![Bay Bridge](./assets/photos/bay-bridge.jpg)
![Alcatraz](./assets/photos/alcatraz.jpg)
```

**Features:**
- Golden ratio layout (φ ≈ 1.618)
- Ornate golden frames
- Hover to zoom
- Click for lightbox (coming soon)
- Responsive grid

### Best Practices

✅ **Do:**
- Add descriptive alt text
- Optimize images (< 2MB recommended)
- Use consistent naming (lowercase, hyphens)
- Group related photos together

❌ **Don't:**
- Upload extremely large files (>10MB)
- Use generic names like `image1.jpg`
- Forget to publish your assets!

## 🎙️ Voice Recordings

### Record Audio

1. Click **Voice** in the radial menu
2. A retro cassette tape UI appears
3. Click **Record** to start
4. Watch the VU meter visualize your voice
5. Click **Pause** to pause (reels stop spinning)
6. Click **Stop** to finish
7. Review and **Use Recording**

The audio is automatically:
- Saved as `./assets/audio/voice-{timestamp}.webm`
- Inserted as `<audio controls src="./assets/audio/voice-xxx.webm"></audio>`
- Optimized for web playback

### Audio Notes Use Cases

**Personal Knowledge Management:**
- Quick voice memos while reading
- Reflections after completing a task
- Verbal explanations of complex ideas

**Collaboration:**
- Leave voice comments on a strand
- Narrate a tutorial or walkthrough
- Record interviews or conversations

**Learning:**
- Practice pronunciation
- Record lecture snippets
- Audio flashcards

### Transcription (Coming Soon)

Voice recordings will be transcribed using Whisper.js (client-side) so you can:
- Search audio content by words
- Generate captions automatically
- Convert speech to markdown

## 🎨 Drawings & Whiteboard

### The Infinite Canvas

1. Click **Draw** in the radial menu
2. The **Art Deco Whiteboard** opens fullscreen
3. Draw freely with pan & zoom
4. Toggle **Grid** for precision
5. Toggle **Golden Guides** for φ-ratio composition
6. Click **Export** to save

### Canvas Features

- **Infinite pan** — Never run out of space
- **Zoom** — Pinch or scroll to zoom in/out
- **Drawing tools** — Pen, shapes, text, arrows
- **Undo/Redo** — Never lose your work
- **Dark mode** — Auto-adapts to your theme
- **SVG export** — Perfect vector quality

### Golden Ratio Guides

Enable guides to see:
- **Vertical lines** at 38.2% and 61.8%
- **Horizontal lines** at 38.2% and 61.8%
- **Concentric circles** for focal points

These are based on φ (phi) and help create visually balanced compositions.

### Drawings as Strands

Exported drawings are saved as:
- `./assets/drawings/drawing-{timestamp}.svg`
- Inserted as `![Drawing](./assets/drawings/drawing-xxx.svg)`
- Fully scalable and editable (SVG format)

### Use Cases

**Brainstorming:**
- Mind maps
- Concept diagrams
- Flowcharts

**Teaching:**
- Annotate screenshots
- Sketch explanations
- Draw diagrams

**Design:**
- UI wireframes
- Architecture sketches
- Visual notes

## 📂 Asset Organization

All media is organized in three folders:

```
assets/
├── photos/      # JPG/PNG images
├── audio/       # WebM/MP3 audio
└── drawings/    # SVG vector graphics
```

**Naming Convention:**
```
{type}-{timestamp}.{ext}

Examples:
photo-2024-01-15T14-30-00.jpg
voice-2024-01-15T14-31-22.webm
drawing-2024-01-15T14-32-45.svg
```

### Asset as Strands

Each asset is a **strand** that can have its own metadata:

```markdown
---
title: Golden Gate Bridge at Sunset
location: San Francisco, CA
date: 2024-01-15
camera: iPhone 15 Pro
tags: [photography, architecture, bridges]
---
```

## 🗂️ Catalog Schema

Group related assets using a `catalog.json`:

```json
{
  "type": "gallery",
  "title": "San Francisco Architecture",
  "description": "Art Deco buildings from the 1920s-1940s",
  "strands": [
    "./assets/photos/golden-gate.jpg",
    "./assets/photos/transamerica.jpg",
    "./assets/photos/coit-tower.jpg"
  ],
  "metadata": {
    "location": "San Francisco, CA",
    "period": "1920-1940",
    "style": "Art Deco"
  }
}
```

Reference the catalog as a single unit:

```markdown
![SF Architecture](./assets/catalogs/sf-architecture/catalog.json)
```

The **entire collection** becomes a traversable knowledge node!

## 🎬 Video (Coming Soon)

Future support for:
- Screen recordings
- Video uploads
- Timestamped annotations
- Thumbnail generation

## 🎵 Music & Podcasts (Coming Soon)

Future support for:
- Waveform visualization
- Chapter markers
- Playlist creation
- Audio analysis (tempo, key, mood)

## Advanced: Media Metadata

### EXIF Data (Photos)

Photos automatically extract:
- Camera model
- GPS coordinates
- Timestamp
- Exposure settings

### Audio Waveform

Voice recordings generate:
- Amplitude visualization
- Duration
- Sample rate
- File size

### SVG Metadata

Drawings preserve:
- Canvas dimensions
- Layer structure
- Stroke data
- Fill colors

## Publishing Media

When you click **Publish** in the editor:

1. **Draft Saved** — Media saved to localStorage
2. **Assets Uploaded** — Blobs uploaded to GitHub
3. **References Updated** — Markdown paths finalized
4. **PR Created** — Pull request submitted for review
5. **Merge** — Assets become part of the Codex

## Best Practices Summary

### ✅ Do

- Use descriptive filenames and alt text
- Organize assets in appropriate folders
- Optimize file sizes before uploading
- Add metadata for better discovery
- Group related media with catalogs

### ❌ Don't

- Upload copyrighted material
- Use overly large files
- Forget to publish your drafts
- Mix unrelated media in one strand
- Skip accessibility (alt text, captions)

## See Also

- [Getting Started](/wiki/tutorials/getting-started)
- [Markdown Features](/wiki/tutorials/markdown-features)
- [Search Guide](/wiki/tutorials/search-guide)
- [Gallery Demo](/wiki/examples/gallery-demo)

---

**Your media is your knowledge.** Capture, organize, and share it beautifully. 🎨

---

metadata:
title: Media Guide - Photos, Audio, Drawings
tags: [tutorial, media, gallery, audio, whiteboard]
level: intermediate
created: 2024-01-15
