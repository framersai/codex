---
title: "Executable Code Blocks"
summary: "Run code directly in the FABRIC Codex - JavaScript, TypeScript, Python, and more"
difficulty: intermediate
tags:
  - tutorial
  - code-execution
  - javascript
  - typescript
  - python
taxonomy:
  topics:
    - tutorial
    - how-to
  subjects:
    - technology
    - programming
source:
  type: manual
  creator: "FABRIC"
  createdAt: "2025-12-22T00:00:00.000Z"
---

# Executable Code Blocks

FABRIC Codex supports **executable code blocks** that can run directly in the browser or on the backend server. This transforms your documentation from static reference into interactive notebooks.

---

## Quick Start

Add `exec` after the language identifier in your code fence:

````markdown
```javascript exec
console.log("Hello, FABRIC!");
```
````

This renders a code block with a **Run** button that executes the code live.

---

## Supported Languages

### Client-Side Execution (Browser)

These languages run directly in your browser using Web Workers:

| Language | Execution | Notes |
|----------|-----------|-------|
| **JavaScript** | Web Worker | Full ES2022+ support |
| **TypeScript** | esbuild + Web Worker | Transpiled before execution |

```javascript exec
// JavaScript executes instantly in your browser
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
const avg = sum / numbers.length;

console.log(`Numbers: ${numbers.join(', ')}`);
console.log(`Sum: ${sum}`);
console.log(`Average: ${avg}`);
```

```typescript exec
// TypeScript is transpiled with esbuild before execution
interface User {
  name: string;
  role: 'admin' | 'user' | 'guest';
}

const user: User = {
  name: "FABRIC Developer",
  role: "admin"
};

console.log(`Welcome, ${user.name}!`);
console.log(`Your role: ${user.role}`);
```

### Backend Execution (Server)

These require a running FABRIC backend with execution enabled:

| Language | Requirement | Environment Variables |
|----------|-------------|----------------------|
| **Python** | Backend server | `ENABLE_PYTHON_EXECUTION=true` |
| **Bash** | Backend server | `ENABLE_BASH_EXECUTION=true` |

```python exec
# Python runs on the backend (requires server)
import json
from datetime import datetime

data = {
    "message": "Hello from Python!",
    "timestamp": datetime.now().isoformat(),
    "version": "3.x"
}

print(json.dumps(data, indent=2))
```

### External Playground APIs

These use external services (requires internet connection):

| Language | Service | Fallback |
|----------|---------|----------|
| **Go** | go.dev/play | Graceful offline warning |
| **Rust** | play.rust-lang.org | Graceful offline warning |

```go exec
// Go code runs via the official Go Playground
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go!")

    for i := 1; i <= 5; i++ {
        fmt.Printf("Count: %d\n", i)
    }
}
```

---

## Regular vs Executable Blocks

### Regular Code Block (No Execution)

```javascript
// This is a regular code block - no Run button
function example() {
  return "Static code for reference";
}
```

### Executable Code Block

```javascript exec
// This block has a Run button!
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
console.log(greet("FABRIC"));
```

---

## Features

### Execution Status

The code block shows real-time status:
- **Run** - Ready to execute
- **Running** - Execution in progress
- **Success** - Completed successfully
- **Error** - Execution failed

### Output Display

Execution output appears below the code block with:
- **ANSI color support** for styled terminal output
- **Collapsible output** for long results (20+ lines)
- **Copy button** to copy output
- **Clear button** to dismiss output

### Offline Support

- JavaScript/TypeScript: Always available (runs in browser)
- Python/Bash: Shows "Unavailable" when backend not running
- Go/Rust: Shows "Offline" when external APIs unreachable

---

## Best Practices

### Do

- Use `exec` for self-contained examples that demonstrate output
- Include `console.log()` statements to show results
- Keep examples short and focused

### Don't

- Don't use `exec` on code that requires external imports (for JS/TS)
- Don't use `exec` on code that modifies files or system state
- Don't use `exec` on code with infinite loops

### Example: Good Executable Block

```javascript exec
// Self-contained, produces output, demonstrates a concept
const fibonacci = (n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(`F(${i}) = ${fibonacci(i)}`);
}
```

---

## Security

### Client-Side (JavaScript/TypeScript)

- Runs in sandboxed Web Worker
- No DOM access
- No network access
- 10-15 second timeout

### Backend (Python/Bash)

- Feature-flagged (disabled by default)
- Process isolation
- 30 second timeout
- Dangerous command blocking (rm -rf, sudo, etc.)

### External APIs (Go/Rust)

- Uses official playground services
- 60 second timeout
- No local file access

---

## Enabling Backend Execution

To enable Python and Bash execution, set environment variables:

```bash
# In your .env or environment
ENABLE_CODE_EXECUTION=true
ENABLE_PYTHON_EXECUTION=true
ENABLE_BASH_EXECUTION=true
```

Then restart the FABRIC backend server.

---

## Output Persistence

Execution results can be saved back into the markdown file as output blocks. Click the save button in the output display to persist results.

Output blocks use this format:

````markdown
```output
Hello, FABRIC!
```
<!-- exec-meta: {"lang":"javascript","timestamp":"2025-01-01T00:00:00Z","duration":5,"success":true} -->
````

This allows you to:
- Share executed results with others
- Create reproducible documentation
- Cache expensive computations
