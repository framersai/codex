# Frame Codex Automation & Enhancement Implementation

## Overview

This document summarizes the comprehensive automation and enhancement system implemented for Frame Codex, integrating OpenStrand's Educational Content Atom (ECA) specification and building a complete submission, validation, and quality assurance pipeline.

**Implementation Date:** 2025-01-15  
**Status:** ✅ Complete  
**Components:** 7 major systems

---

## 🎯 Implemented Systems

### 1. Trusted Weavers Auto-Merge System

**Files:**
- `apps/codex/.github/WEAVERS.txt`
- `apps/codex/.github/workflows/auto-merge-weavers.yml`

**Features:**
- Trusted contributor list management
- Automatic PR approval after validation
- Auto-merge for Weavers (5+ quality contributions)
- Bypass manual review for trusted users
- Welcome messages for new contributors

**How It Works:**
1. PR opened by user in `WEAVERS.txt`
2. Automated validation runs (schema, quality, duplicates)
3. If all checks pass → auto-approve + auto-merge
4. If not in WEAVERS → standard review process

**Benefits:**
- Faster iteration for trusted contributors
- Reduced maintainer burden
- Incentivizes high-quality contributions

---

### 2. AI-Powered PR Enhancement

**Files:**
- `apps/codex/.github/workflows/ai-enhance-pr.yml`
- `apps/codex/scripts/ai-enhance.js`

**Features:**
- Automatic content analysis using Claude 3.5 Sonnet or GPT-4
- Quality scoring (0-100)
- Metadata suggestions (tags, difficulty, categorization)
- Inline PR comments with improvement suggestions
- Optional auto-apply safe fixes (with `auto-enhance` label)
- Comprehensive quality reports

**AI Analysis Includes:**
- Content quality assessment
- Completeness percentage
- Readability analysis (Flesch-Kincaid)
- SEO optimization score
- Auto-detected tags and subjects
- Suggested difficulty level
- Missing field detection
- Structural improvement recommendations

**Environment Variables Required:**
- `ANTHROPIC_API_KEY` (preferred) or `OPENAI_API_KEY`
- `GH_PAT` (GitHub Personal Access Token with repo scope)

**Benefits:**
- Consistent quality across all contributions
- Reduced manual review time
- Educational feedback for contributors
- Automated metadata enhancement

---

### 3. Client-Side Submission UI

**Files:**
- `apps/frame.dev/components/codex-submit.tsx`

**Features:**
- **URL Scraping**: Extract content from any webpage using Readability.js
- **File Upload**: Drag-drop or select `.md`, `.txt`, `.json`, `.yaml` files
- **Paste Content**: Write or paste markdown directly
- **Auto-Metadata Generation**:
  - TF-IDF keyword extraction
  - Extractive summarization
  - Difficulty detection (heuristic)
  - Subject/topic matching
- **Rate Limiting**: 5 submissions/hour per user (localStorage + server)
- **GitHub PR Creation**: Direct API integration (no backend needed)
- **Toast Notifications**: Real-time feedback
- **Token Management**: Secure local storage of GitHub PAT

**User Flow:**
1. Click "Contribute" → "Submit Content"
2. Choose input method (URL/file/paste)
3. Review auto-generated metadata
4. Provide GitHub token (one-time)
5. Click "Create Pull Request"
6. PR created automatically with full metadata

**Benefits:**
- Zero-friction contribution process
- No local setup required
- Instant feedback
- Guided metadata creation

---

### 4. Comprehensive Onboarding Documentation

**Files:**
- `apps/codex/docs/contributing/how-to-submit.md`
- `apps/codex/docs/contributing/submission-schema.md`

**Content:**
- **How-to-Submit Guide**:
  - Quick start instructions
  - Three submission methods (UI, GitHub, web interface)
  - Content requirements and quality standards
  - Licensing guidelines
  - Review process explanation
  - Tips for success
  - Common issues and troubleshooting
  - Getting help resources

- **Schema Reference**:
  - Complete strand/loom/weave schema documentation
  - Full OpenStrand ECA integration spec
  - Field-by-field validation rules
  - Extensive examples (minimal to comprehensive)
  - Best practices
  - Schema evolution and versioning

**Benefits:**
- Clear contributor onboarding
- Reduced confusion and errors
- Self-service documentation
- Comprehensive technical reference

---

### 5. Extended Schema Validator (ECA Support)

**Files:**
- `apps/codex/scripts/validate.js` (extended)

**New Validations:**
- **Learning Design**:
  - Objectives (with Bloom's taxonomy levels)
  - Outcomes and assessments
  - Pedagogical approaches
  - Instructional strategies

- **Time Estimates**:
  - Reading, exercises, projects, total
  - Automatic sum validation

- **Modalities**:
  - Text, visual, audio, video, kinesthetic
  - Count validation for diagrams, images, charts

- **Interactive Elements**:
  - Quiz, poll, simulation, code exercises
  - Type and requirement validation

- **Assessments**:
  - Formative and summative
  - Weight validation (0-1)
  - Passing score validation (0-100)

- **Accessibility**:
  - WCAG level compliance (A/AA/AAA)
  - Feature validation
  - Reading level (Flesch-Kincaid grade)

- **Cultural Adaptations**:
  - ISO 3166-1 alpha-2 country codes
  - Modification tracking

- **Quality Metrics**:
  - Peer review status and scores
  - Evidence-based claims with citations
  - Update frequency tracking

**Benefits:**
- Full OpenStrand ECA compliance
- Comprehensive quality assurance
- Learning analytics support
- Adaptive learning enablement

---

### 6. Live Stats Dashboard

**Files:**
- `apps/frame.dev/components/codex-stats.tsx`

**Features:**
- **Real-Time Metrics**:
  - Total strands indexed
  - Validation health percentage
  - Files with errors/warnings
  - Suggestions count

- **Categorization Breakdown**:
  - By subject (with bar charts)
  - By difficulty (color-coded)
  - By topic

- **Vocabulary Insights**:
  - Total unique terms
  - Suggested vocabulary additions
  - Frequency counts

- **Validation Issues**:
  - Common errors ranked
  - Common warnings
  - Link to full GitHub Actions report

- **Auto-Refresh**:
  - Updates every 5 minutes
  - Manual refresh button
  - Last updated timestamp

**Data Source:**
- `https://raw.githubusercontent.com/framersai/codex/index/codex-report.json`
- Generated by GitHub Actions on every commit
- Falls back to local `/codex-report.json`

**Benefits:**
- Transparency into Codex health
- Identify common issues
- Track vocabulary growth
- Monitor quality trends

---

### 7. Enhanced NLP Auto-Indexing

**Files:**
- `apps/codex/scripts/auto-index.js` (already existed, enhanced)
- `apps/codex/.github/workflows/build-index.yml` (already existed)

**Enhancements:**
- TF-IDF keyword extraction
- N-gram phrase detection
- Confidence scoring for categorization
- Vocabulary expansion suggestions
- Quality validation integration
- Comprehensive reporting

**Outputs:**
- `codex-index.json`: Full searchable index
- `codex-report.json`: Analytics and validation report

**Benefits:**
- Smarter auto-categorization
- Better search relevance
- Vocabulary evolution
- Quality insights

---

## 🔧 Setup Instructions

### GitHub Secrets Required

Add these secrets to the `framersai/codex` repository:

```
GH_PAT              # GitHub Personal Access Token (repo scope)
ANTHROPIC_API_KEY   # Claude API key (preferred)
OPENAI_API_KEY      # OpenAI API key (fallback)
```

### Adding a Trusted Weaver

Edit `apps/codex/.github/WEAVERS.txt`:

```txt
# Maintainers:
jddunn

# Trusted Weavers:
newcontributor
anotherweaver
```

Commit and push. The user will now get auto-merge privileges.

### Testing Locally

```bash
# Install dependencies
cd apps/codex
npm install

# Run validation
npm run validate

# Run indexer with validation
npm run index -- --validate

# Test AI enhancement (requires API keys)
export ANTHROPIC_API_KEY="your-key"
node scripts/ai-enhance.js --files "path/to/file.md"

# Generate template
npm run generate-template -- "My New Content"
```

---

## 📊 Metrics & Monitoring

### Key Performance Indicators

- **Submission Rate**: Track PRs/week from UI vs GitHub
- **Auto-Merge Rate**: % of PRs auto-merged (Weavers)
- **Quality Score**: Average AI quality score across all content
- **Validation Pass Rate**: % of PRs passing validation first try
- **Time to Merge**: Average hours from PR to merge
- **Vocabulary Growth**: New terms added per month

### Monitoring Dashboards

1. **GitHub Actions**: All workflow runs and logs
2. **Codex Stats Dashboard**: Live at `frame.dev/codex` (stats panel)
3. **AI Enhancement Reports**: Attached to each PR as artifacts

---

## 🚀 Future Enhancements

### Planned Features

1. **Smart Filename Heuristics**:
   - Detect hyphens-for-spaces in filenames
   - Auto-suggest title case replacements
   - Commit fixes automatically

2. **Advanced NLP**:
   - Entity recognition for concept extraction
   - Sentiment analysis for tone consistency
   - Readability optimization suggestions

3. **Docs Hub** (`/docs`):
   - Centralized documentation landing page
   - Category cards (Architecture, Guides, API, Tutorials)
   - Built-in search and tag cloud
   - GitHub comment embeds

4. **Interactive Visualizations**:
   - Knowledge tree view (hierarchical)
   - Intersection diagram (Venn-style for loom/weave relationships)
   - D3.js knowledge graph explorer

5. **Client-Side Enhancements**:
   - URL scraper with better content extraction
   - File upload with preview
   - Markdown editor with live preview
   - Metadata auto-complete from vocabulary

6. **Onboarding Tutorial**:
   - Interactive walkthrough modal
   - Step-by-step submission guide
   - Video tutorials
   - FAQ integration

---

## 📝 Integration with OpenStrand Architecture

This implementation fully integrates with the OpenStrand Educational Content Atom (ECA) specification, enabling:

### Learning Analytics
- Track learner progress through strands
- Measure mastery levels across Bloom's taxonomy
- Identify knowledge gaps and prerequisites
- Recommend personalized learning paths

### Adaptive Learning
- Adjust difficulty based on performance
- Suggest prerequisites when struggling
- Skip redundant content when mastered
- Optimize learning velocity per learner

### Multi-Modal Delivery
- Generate audio narration from text
- Create visual summaries and infographics
- Provide alternative representations
- Support diverse learning styles

### Assessment Integration
- Embed quizzes and interactive exercises
- Track completion and scores
- Provide instant feedback
- Generate certificates and badges

### Accessibility
- WCAG AAA compliance tracking
- Multi-language support (25+ languages planned)
- Screen reader optimization
- Cognitive load management

### Spiral Curriculum
- Revisit concepts at increasing complexity
- Track mastery progression over time
- Adapt representation modes (enactive → iconic → symbolic)
- Implement spaced repetition scheduling

---

## 🎓 Educational Foundations

The system implements research-backed pedagogical principles:

- **Bruner's Spiral Curriculum**: Concepts revisited at increasing complexity
- **Bloom's Taxonomy**: Learning objectives mapped to cognitive levels
- **Cognitive Load Theory**: Intrinsic, extraneous, and germane load management
- **Multiple Intelligence Theory**: Content adapted for 9 intelligence types
- **Zone of Proximal Development**: Adaptive scaffolding and difficulty
- **Constructivism**: Discovery-based learning and active construction
- **Social Learning Theory**: Peer collaboration and mentorship

---

## 🔐 Security & Privacy

### Data Handling
- GitHub tokens stored locally only (localStorage)
- Never transmitted to Frame servers
- API calls direct to GitHub (client-side)
- No user tracking or analytics collection

### Rate Limiting
- Client-side: 5 submissions/hour (localStorage)
- Server-side: GitHub API rate limits apply
- Prevents abuse and spam

### Content Licensing
- All content published under CC-BY-4.0
- Contributors must own rights or have permission
- Automatic license inclusion in PRs
- Attribution requirements enforced

---

## 📚 Documentation Index

### For Contributors
- [How to Submit](apps/codex/docs/contributing/how-to-submit.md)
- [Submission Schema](apps/codex/docs/contributing/submission-schema.md)
- [PR Template](apps/codex/.github/pull_request_template.md)

### For Developers
- [Auto-Index Script](apps/codex/scripts/auto-index.js)
- [Validation Script](apps/codex/scripts/validate.js)
- [AI Enhancement Script](apps/codex/scripts/ai-enhance.js)
- [Submission UI Component](apps/frame.dev/components/codex-submit.tsx)
- [Stats Dashboard Component](apps/frame.dev/components/codex-stats.tsx)

### For Maintainers
- [WEAVERS.txt](apps/codex/.github/WEAVERS.txt)
- [Auto-Merge Workflow](apps/codex/.github/workflows/auto-merge-weavers.yml)
- [AI Enhancement Workflow](apps/codex/.github/workflows/ai-enhance-pr.yml)
- [Build Index Workflow](apps/codex/.github/workflows/build-index.yml)

---

## 🎉 Summary

This implementation transforms Frame Codex from a static repository into an intelligent, self-improving knowledge system with:

✅ **Automated Quality Assurance**: AI-powered analysis and validation  
✅ **Frictionless Contribution**: Web UI with auto-metadata generation  
✅ **Trusted Contributor Fast-Track**: Auto-merge for proven contributors  
✅ **Comprehensive Documentation**: Complete guides and schema reference  
✅ **Full ECA Integration**: OpenStrand learning analytics support  
✅ **Live Monitoring**: Real-time stats and health dashboards  
✅ **Research-Backed Pedagogy**: Evidence-based learning design  

The system is production-ready, fully documented, and designed for multi-decade permanence as a public good for humanity.

---

*Built with ❤️ for Frame.dev and OpenStrand*  
*"The OS for humans, the codex of humanity."*

