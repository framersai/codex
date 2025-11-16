# Frame Codex History

Automated changelog and activity tracking for Frame Codex.

## Structure

```
codex-history/
├── git/              # Daily git commit snapshots
│   ├── 2025-01-15.json
│   ├── 2025-01-16.json
│   └── ...
├── issues/           # Daily GitHub issue/PR activity
│   ├── 2025-01-15.json
│   ├── 2025-01-16.json
│   └── ...
└── README.md         # This file
```

## Git Changelog Format

Each `git/YYYY-MM-DD.json` file contains:

```json
{
  "date": "2025-01-15",
  "totalCommits": 5,
  "byType": {
    "feat": [...],
    "fix": [...],
    "chore": [...]
  },
  "commits": [
    {
      "sha": "abc1234",
      "fullSha": "abc1234567890...",
      "author": "John Doe",
      "email": "john@example.com",
      "date": "2025-01-15T10:30:00Z",
      "url": "https://github.com/framersai/codex/commit/abc1234",
      "type": "feat",
      "scope": "indexer",
      "description": "add SQL caching",
      "body": "Detailed commit message..."
    }
  ]
}
```

## Issue Activity Format

Each `issues/YYYY-MM-DD.json` file contains:

```json
{
  "date": "2025-01-15",
  "repository": "framersai/codex",
  "summary": {
    "issuesCreated": 2,
    "issuesClosed": 1,
    "prsMerged": 3,
    "total": 6
  },
  "created": [
    {
      "number": 42,
      "title": "Add new feature",
      "url": "https://github.com/framersai/codex/issues/42",
      "createdAt": "2025-01-15T14:20:00Z",
      "author": "johndoe",
      "labels": ["enhancement", "good-first-issue"]
    }
  ],
  "closed": [...],
  "merged": [...]
}
```

## Automation

### Daily Generation

A GitHub Actions workflow runs daily at 00:00 UTC:

1. **Git Changelog**: Parses the last 7 days of commits
2. **Issue Activity**: Fetches yesterday's GitHub activity via GraphQL
3. **Commit**: Pushes new JSON files to `master`

### Manual Trigger

Generate history for a specific date range:

```bash
# Via GitHub Actions
gh workflow run changelog.yml --repo framersai/codex -f since=2025-01-01

# Or locally
cd apps/codex

# Git changelog
node scripts/generate-changelog.js --since 2025-01-01

# Issue activity (requires GH_PAT)
GH_PAT=ghp_xxx node scripts/fetch-issue-activity.js --since 2025-01-01
```

## Configuration

### Required Secrets

Add to `framersai/codex` repository settings:

- `GH_PAT`: GitHub Personal Access Token with `repo` scope
  - Required for issue/PR activity tracking
  - Git changelog works without it

### Conventional Commits

For best results, use conventional commit format:

```
type(scope): description

body (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `chore`: Maintenance
- `refactor`: Code refactoring
- `test`: Tests
- `ci`: CI/CD changes

## Querying History

### Find all features added in January 2025

```bash
jq '.commits[] | select(.type == "feat")' codex-history/git/2025-01-*.json
```

### Count PRs merged per day

```bash
jq '.summary.prsMerged' codex-history/issues/*.json
```

### Get all commits by a specific author

```bash
jq '.commits[] | select(.author == "John Doe")' codex-history/git/*.json
```

## AI Consumption

These JSON files are optimized for LLM ingestion:

- **Structured**: Consistent schema across all files
- **Timestamped**: ISO 8601 dates for easy filtering
- **Linked**: Direct URLs to commits, issues, PRs
- **Categorized**: Conventional commit types, labels

Example prompt:

> "Summarize the changes in Frame Codex for the week of January 15-21, 2025. Focus on new features and bug fixes."

The AI can read `git/2025-01-15.json` through `git/2025-01-21.json` and `issues/2025-01-15.json` through `issues/2025-01-21.json` to generate a comprehensive summary.

## Storage

- **Size**: ~10-50 KB per day (depends on activity)
- **Retention**: Indefinite (files are small and valuable)
- **Cleanup**: Not needed; history is the point

## Integration

### Frame.dev Codex Viewer

The Codex viewer can load history files:

```typescript
// Fetch last 7 days of activity
const dates = getLast7Days()
const history = await Promise.all(
  dates.map(date => 
    fetch(`https://raw.githubusercontent.com/framersai/codex/master/codex-history/git/${date}.json`)
      .then(r => r.json())
  )
)
```

### Weekly Summaries

Future enhancement: Auto-generate weekly markdown summaries:

```markdown
# Week of January 15-21, 2025

## Features
- feat(indexer): add SQL caching (#42)
- feat(ui): new submission form (#43)

## Bug Fixes
- fix(validator): handle missing fields (#44)

## Activity
- 15 commits
- 5 PRs merged
- 3 issues closed
```

## Learn More

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [Frame Codex Documentation](../docs/DEVELOPMENT.md)

