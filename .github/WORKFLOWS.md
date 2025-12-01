# Codex GitHub Actions Workflows

## Overview

The Codex repository uses several GitHub Actions workflows for automated content validation, AI enhancement, indexing, and deployment. All workflows are designed with async processing, caching, and graceful error handling.

## Workflow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   PR Created    │───▶│  Quick Validate │───▶│    AI Enhance   │
│   or Updated    │    │    (< 30s)      │    │    (async)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Schema Validate │    │  Post Feedback  │
                       └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │ Incremental     │
                       │ Index + Cache   │
                       └─────────────────┘
                              │
                              ▼ (on merge)
                       ┌─────────────────┐
                       │ Publish Index   │
                       │ + Notify        │
                       └─────────────────┘
```

## Workflows

### 1. `async-processing.yml` (Primary)

**Triggers:**
- Pull requests (opened, synchronized, ready_for_review)
- Push to main branch
- Manual dispatch with optional full reindex

**Features:**
- ⚡ Quick validation stage (< 30s)
- 🔄 Async AI enhancement (non-blocking)
- 📦 Incremental indexing with SQLite cache
- 🔔 Real-time status updates via commit statuses
- 🚀 Triggers frame.dev deployment on publish

**Optimizations:**
- Concurrency groups prevent duplicate runs
- Cache restoration for faster builds
- Parallel job execution where possible

### 2. `auto-index.yml`

**Triggers:**
- Push to `weaves/`, `scripts/`, `schema/`
- Manual dispatch
- Repository dispatch (frame-deploy-complete)

**Purpose:**
Builds and publishes the search index JSON files.

### 3. `ai-enhance-pr.yml`

**Triggers:**
- Pull requests (opened, synchronized)

**Purpose:**
AI-powered content analysis and suggestions:
- Quality scoring
- Auto-tag detection
- Readability analysis
- Safe auto-fixes (with `auto-enhance` label)

**Skipping:**
- Add `skip-ai` label to skip AI analysis
- Dependabot PRs are automatically skipped

### 4. `auto-merge-weavers.yml`

**Triggers:**
- Pull requests from trusted Weavers

**Purpose:**
Automatic approval and merge for trusted contributors:
- Checks `.github/WEAVERS.txt` for author
- Runs validation and duplicate checks
- Auto-approves and squash merges

### 5. `test.yml`

**Triggers:**
- Push and PR to main

**Purpose:**
- Unit tests with coverage
- SQL cache functionality tests
- Integration tests (full workflow)

### 6. `build-index.yml`

**Triggers:**
- Push to main
- Manual dispatch

**Purpose:**
Builds search index with SQL caching and pushes to `index` branch.

## Caching Strategy

### SQLite Cache
```
.cache/codex.db
```
- Stores file hashes and metadata
- Only re-processes changed files
- ~80% faster incremental builds

### Embedding Cache
```
.cache/embeddings/
```
- Pre-computed document embeddings
- Persists across runs
- ~60% faster search index builds

### Cache Keys
```yaml
key: codex-index-v2-${{ hashFiles('weaves/**/*.md') }}
restore-keys:
  - codex-index-v2-
  - codex-index-
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | AI only | Claude API key for AI enhancement |
| `OPENAI_API_KEY` | AI only | OpenAI API key (fallback) |
| `GH_PAT` | Yes | Personal access token for cross-repo triggers |

## Manual Triggers

### Force Full Reindex
```bash
gh workflow run async-processing.yml -f full_reindex=true
```

### Run Specific Workflow
```bash
gh workflow run auto-index.yml
gh workflow run ai-enhance-pr.yml
```

## Error Handling

1. **Validation Failures:**
   - Posts detailed error comments on PR
   - Updates commit status to failed
   - Does not block other jobs

2. **AI Enhancement Failures:**
   - Logs error but continues
   - Never blocks merging
   - Falls back gracefully

3. **Index Failures:**
   - Attempts to use cached index
   - Posts warning but allows manual merge

## Integration Points

### frame.dev Deployment
When index is published, triggers `repository_dispatch` to frame.dev:
```yaml
event-type: codex-index-updated
client-payload: '{"sha": "..."}'
```

### Webhook Notifications
The `finalize` job updates commit status with:
- Processing progress
- Final result (success/failure)
- Link to workflow run

## Best Practices

1. **For Contributors:**
   - Let workflows run before requesting review
   - Address AI suggestions when possible
   - Use `skip-ai` label sparingly

2. **For Maintainers:**
   - Monitor workflow run times
   - Clear cache if builds are stale
   - Review AI suggestions before auto-merge

3. **For Weavers:**
   - Ensure validation passes locally: `npm run validate`
   - Test indexing: `npm run index -- --validate`
   - Avoid large changes in single PRs (> 50 files)

## Troubleshooting

### Cache Issues
```bash
# Clear cache via workflow
gh workflow run async-processing.yml -f full_reindex=true

# Or manually delete cache
gh cache delete $(gh cache list | grep codex | awk '{print $1}')
```

### Stuck Workflows
```bash
# Cancel running workflows
gh run cancel $(gh run list --workflow=async-processing.yml --status=in_progress -q '.[0].databaseId')
```

### View Logs
```bash
gh run view --log
```

