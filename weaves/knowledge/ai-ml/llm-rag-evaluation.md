---
title: "EVALS.md — LLM & RAG Evaluation Playbook"
summary: "md — LLM & RAG Evaluation Playbook

A practical, research-grounded guide to model selection, regression testing, and production-grade evaluation. ---

## Table of Contents

1."
difficulty: expert
tags:
  - python
  - pytest
  - hugging-face
  - langchain
  - helm
  - evaluation
  - https
  - leaderboard
taxonomy:
  topics:
    - tutorial
    - api-reference
    - architecture
    - best-practices
  subjects:
    - technology
    - artificial-intelligence
---
# EVALS.md — LLM & RAG Evaluation Playbook

A practical, research-grounded guide to model selection, regression testing, and production-grade evaluation.

---

## Table of Contents

1. [Goals & Philosophy](#1-goals--philosophy)
2. [Understanding Leaderboards](#2-understanding-leaderboards)
3. [Public Benchmarks Reference](#3-public-benchmarks-reference)
4. [Evaluation Frameworks & Tooling](#4-evaluation-frameworks--tooling)
5. [Evaluation Design (What to Actually Do)](#5-evaluation-design-what-to-actually-do)
6. [Repo Structure & Test Case Schema](#6-repo-structure--test-case-schema)
7. [Metrics & Grading Strategy](#7-metrics--grading-strategy)
8. [CI/CD Policy & Release Gates](#8-cicd-policy--release-gates)
9. [RAG-Specific Evaluation](#9-rag-specific-evaluation)
10. [Tool Use & Agent Evaluation](#10-tool-use--agent-evaluation)
11. [Production Observability](#11-production-observability)
12. [Security & Adversarial Testing](#12-security--adversarial-testing)
13. [Quick-Start Blueprint](#13-quick-start-blueprint)
14. [References](#14-references)

---

## 1. Goals & Philosophy

### Goals

- **Catch regressions** before they reach users (prompt/chain/model changes)
- **Compare models/providers** using a consistent harness and versioned datasets
- **Measure product KPIs** that correlate with user success—not just benchmark scores
- **Produce decision-ready reports** covering quality, latency, cost, safety, and reliability

### Non-Goals

- "Win" public leaderboards at the expense of product requirements
- Rely on a single metric or judge model for high-stakes decisions
- Treat leaderboards as ground truth rather than screening signals

### Core Principle

> **Public leaderboards shortlist; your internal eval suite selects.**

Leaderboards help narrow candidates quickly, but they rarely match your product's distributions, constraints, failure costs, or toolchain [[1]](#ref-1). A recurring failure mode is *Goodharting*: once a metric becomes the target, it loses value as measurement—especially when models optimize for narrow benchmarks [[2]](#ref-2).

---

## 2. Understanding Leaderboards

### Interpretation Checklist

Before trusting any leaderboard, verify:

| Question | Why It Matters |
|----------|----------------|
| **Task distribution?** | Chatty assistants ≠ domain QA ≠ extraction ≠ tool-use [[1]](#ref-1) |
| **Scoring protocol?** | Pairwise preference, exact match, rubric, LLM-judge, human labelers [[3]](#ref-3) |
| **Prompts/formatting?** | Small formatting changes can shift results significantly [[4]](#ref-4) |
| **Known biases?** | Verbosity bias, position bias, contamination, data leakage [[3]](#ref-3)[[5]](#ref-5) |
| **Uncertainty published?** | Confidence intervals matter for meaningful rankings [[6]](#ref-6) |

### Common Pitfalls

- **Position bias**: Models prefer answers in certain positions (first/last)
- **Verbosity bias**: Longer responses often score higher regardless of quality
- **Self-enhancement bias**: LLM judges favor outputs from similar models
- **Contamination**: Test data leaked into training sets
- **Style gaming**: Models tuned to match evaluator preferences rather than actual quality

See "The Leaderboard Illusion" [[2]](#ref-2) for systematic analysis of these issues.

---

## 3. Public Benchmarks Reference

Use these for **screening candidates**—then validate on your own task suite.

### A. Human Preference & Chat Quality

**Use when:** You care about helpfulness, writing quality, and conversational coherence.

| Benchmark | Description | Key Caveat |
|-----------|-------------|------------|
| **Chatbot Arena** [[7]](#ref-7) | Crowd-sourced pairwise battles → Elo/Bradley-Terry rankings | Sensitive to style; can be gamed |
| **MT-Bench** [[3]](#ref-3) | Multi-turn questions + LLM-as-a-judge methodology | Documents judge biases and mitigations |
| **Arena-Hard** [[8]](#ref-8) | Harder subset derived from live arena data | Better signal but smaller sample |

### B. Instruction Following

**Use when:** You need quick win-rate signals for general instruction-following.

| Benchmark | Description | Key Caveat |
|-----------|-------------|------------|
| **AlpacaEval 2.0** [[9]](#ref-9)[[10]](#ref-10) | Automated pairwise eval with length-controlled variants | LLM-judge can inherit biases |

### C. Multi-Metric Transparency

**Use when:** You want breadth across scenarios (accuracy, robustness, fairness, calibration, efficiency).

| Benchmark | Description |
|-----------|-------------|
| **HELM** [[11]](#ref-11)[[12]](#ref-12) | Stanford CRFM taxonomy of scenarios + metrics; useful as a benchmarking mindset |

### D. Open-Model Standard Benchmarks

**Use when:** Comparing open-weights or self-hosted models on academic benchmarks.

| Resource | Description | Key Caveat |
|----------|-------------|------------|
| **HF Open LLM Leaderboard** [[4]](#ref-4)[[13]](#ref-13) | Fixed benchmark suite via EleutherAI harness | Scores can differ from papers due to prompts/versions |
| **EleutherAI LM Eval Harness** [[14]](#ref-14) | Standardized evaluation backend | De facto standard for reproducible runs |

### E. Embeddings & Retrieval (Critical for RAG)

**Use when:** Choosing embedding models, retrievers, or rerankers.

| Benchmark | Description |
|-----------|-------------|
| **MTEB** [[15]](#ref-15)[[16]](#ref-16) | Massive Text Embedding Benchmark spanning tasks/datasets/languages |

### F. Tool Use & Function Calling

**Use when:** Your system calls tools/APIs and correctness of structured invocation matters.

| Benchmark | Description |
|-----------|-------------|
| **BFCL** [[17]](#ref-17)[[18]](#ref-18) | Berkeley Function Calling Leaderboard; AST-based executable evaluation |

### G. Software Engineering & Coding Agents

**Use when:** You need realistic measures for "fix issues in a real repo."

| Benchmark | Description |
|-----------|-------------|
| **SWE-bench** [[19]](#ref-19) | Resolve real GitHub issues (patch generation + tests) |
| **SWE-bench Verified** [[20]](#ref-20) | Human-validated subset for higher reliability |
| **LiveCodeBench** [[21]](#ref-21) | Fresh contest problems; reduces contamination |
| **LiveBench** [[22]](#ref-22) | Evolving evaluation to mitigate contamination |

### H. Serving Performance & Systems

**Use when:** Latency/throughput/cost are first-class requirements.

| Benchmark | Description |
|-----------|-------------|
| **MLPerf Inference** [[23]](#ref-23)[[24]](#ref-24) | MLCommons standardized inference benchmarking |

---

## 4. Evaluation Frameworks & Tooling

### A. Standardized Benchmark Runners

| Tool | Use Case |
|------|----------|
| **EleutherAI LM Eval Harness** [[14]](#ref-14) | Backend for HF leaderboard; de facto standard |
| **HF LightEval** [[25]](#ref-25) | Modern all-in-one LLM evaluation library |
| **OpenCompass** [[26]](#ref-26) | Multi-dataset platform; "one umbrella" runner |
| **HELM Framework** [[27]](#ref-27) | Scenario/metric breadth and repeatability |

### B. Prompt & Chain Regression Testing (CI-Friendly)

"Unit tests for LLM behavior" you can wire into PR checks.

| Tool | Description |
|------|-------------|
| **OpenAI Evals** [[28]](#ref-28) | Framework + registry of eval patterns |
| **promptfoo** [[29]](#ref-29) | CLI/library for eval + red-teaming; CI-native |
| **DeepEval** [[30]](#ref-30) | pytest-like authoring; LLM-judge + deterministic checks |

**Recommendation:** Use one of these to create a stable "eval contract" (schemas, required citations, tool-call JSON, style constraints), then maintain a small set of high-value examples as a regression suite [[31]](#ref-31).

### C. RAG-Specific Evaluation & Observability

| Tool | Focus |
|------|-------|
| **RAGAS** [[32]](#ref-32)[[33]](#ref-33) | Component metrics: faithfulness, relevancy, context recall/precision |
| **TruLens** [[34]](#ref-34)[[35]](#ref-35) | RAG Triad: context relevance, groundedness, answer relevance |
| **Arize Phoenix** [[36]](#ref-36)[[37]](#ref-37) | Open-source tracing + evaluation for LLM/RAG apps |
| **LangSmith** [[38]](#ref-38)[[39]](#ref-39) | Offline eval on curated datasets + production monitoring |

For academic grounding, see the RAG evaluation survey [[40]](#ref-40).

### D. Vendor-Native Tooling

| Vendor | Resources |
|--------|-----------|
| **OpenAI** | Evals guide [[31]](#ref-31), Graders guide [[41]](#ref-41) |
| **Anthropic** | Claude Console Evaluation tool [[42]](#ref-42) |
| **Google Vertex AI** | Gen AI evaluation service [[43]](#ref-43)[[44]](#ref-44) |
| **Weights & Biases Weave** | Tracing + evaluation objects [[45]](#ref-45)[[46]](#ref-46) |

---

## 5. Evaluation Design (What to Actually Do)

### Step 1: Define Capability Slices

Write down what "good" means **per capability**—not just "overall quality."

| Capability | Example Metrics |
|------------|-----------------|
| **Grounded Q&A** | Must cite sources; must not hallucinate |
| **Extraction** | Structured JSON; fields must be correct |
| **Summarization** | Coverage + factuality + constraints |
| **Reasoning / Multi-step** | Consistency; intermediate step validity |
| **Tool Calling** | Schema validity + correct API selection |
| **Multi-turn** | State tracking; instruction adherence |

This "scenario + metric" framing aligns with HELM's conceptualization [[11]](#ref-11).

### Step 2: Build an Internal Golden Set (Version It)

Create a dataset with:

- **Inputs**: prompt + context
- **Expected**: outputs or properties (rubric)
- **Tags**: difficulty, domain, failure mode
- **Constraints**: "must-pass" rules (JSON schema, citations, safety)

Maintain three splits:

| Split | Purpose |
|-------|---------|
| `dev` | Fast iteration during development |
| `regression` | CI gates on every merge |
| `holdout` | Release candidates only (prevents overfitting) |

This mirrors LangSmith's offline evaluation framing [[38]](#ref-38).

### Step 3: Choose Metrics That Match Failure Cost

Combine **deterministic checks** + **model-based scoring** + **human calibration**.

---

## 6. Repo Structure & Test Case Schema

### Recommended Layout

```
evals/
├── datasets/
│   ├── golden.dev.jsonl        # fast iteration
│   ├── golden.regression.jsonl # CI gate
│   └── golden.holdout.jsonl    # release candidates only
├── rubrics/
│   ├── grounded_qa.yaml
│   ├── summarization.yaml
│   └── extraction.yaml
├── configs/
│   ├── promptfoo.yaml          # if using promptfoo
│   └── deepeval.yaml           # if using DeepEval
├── scripts/
│   ├── run_eval.py
│   └── score_reports.py
└── reports/
    └── YYYY-MM-DD/             # versioned artifacts
```

### Test Case Schema (JSONL)

Each line = one test case. Keep it **small, explicit, versionable**.

```json
{
  "id": "qa_legal_001",
  "capability": "grounded_qa",
  "input": {
    "question": "What are the eligibility requirements described in the document?",
    "context_refs": ["doc:policy_2024_07#p12-p16"]
  },
  "expected": {
    "must_cite": true,
    "must_not": ["make up sources", "invent statistics"],
    "format": "markdown",
    "rubric": "grounded_qa.yaml"
  },
  "tags": ["policy", "precision", "high_risk"]
}
```

---

## 7. Metrics & Grading Strategy

### Evaluation Pyramid

| Level | Runs When | Purpose |
|-------|-----------|---------|
| **1. Deterministic checks** | Every CI run | Hard gates; objective and cheap |
| **2. Offline golden set** | PRs + merges | Regression detection |
| **3. Human calibration** | Scheduled (monthly) | Validate automated metrics |
| **4. Online experiments** | Feature flags/A/B | Actual user success metrics |

### Deterministic Checks (CI Required)

These are **hard gates**—0 tolerance for failures.

- JSON/schema validity (JSON Schema, Pydantic, OpenAPI)
- Tool-call parseability (required fields present)
- Citation presence/format (if required)
- Forbidden content checks (PII, secrets, policy violations)
- Latency and token usage (p50/p95 thresholds)

Frameworks like promptfoo [[29]](#ref-29) and DeepEval [[30]](#ref-30) are designed for this test-suite approach.

### Model-Based Scoring (LLM-as-a-Judge)

Use carefully with these mitigations [[3]](#ref-3):

| Mitigation | Purpose |
|------------|---------|
| **Randomize A/B order** | Avoid position bias |
| **Control for verbosity** | Avoid "longer wins" |
| **Use pairwise comparisons** | Better for subjective tasks |
| **Fixed rubric + examples** | Consistent grading criteria |
| **Record judge version + prompt hash** | Reproducibility |
| **Track judge–human agreement** | Calibration over time |

For high-stakes releases: use multiple judges or an ensemble; review disagreements.

OpenAI's graders guide [[41]](#ref-41) provides modern rubric patterns.

### Human Review (Calibration & Audits)

Maintain a monthly calibration set:

- Human labels = "anchor truth"
- Rubrics evolve based on observed failure modes
- Required before major releases

---

## 8. CI/CD Policy & Release Gates

### PR Checks (Fast)

Run `eval-smoke`:
- 20–50 cases across core capabilities
- Deterministic checks + basic rubric score

**Fail PR if:**
- Any hard-gate fails
- Rubric score drops > X% from baseline
- p95 latency exceeds threshold

### Merge to Main (Full Regression)

Run `eval-regression` on full regression set.

**Publish report with:**
- Overall metrics
- Per-capability breakdown
- Top regressions with sample links

### Release Candidate (Holdout Only)

Run holdout evaluation once per RC.

**Human review required if:**
- Grounding/faithfulness drops
- New failure modes appear
- Safety constraints change

### Example Gate Configuration

```yaml
hard_gates:  # 0 tolerance
  - schema_validity == true
  - tool_call_parseable == true
  - citation_requirements_met == true
  - no_forbidden_content == true

soft_gates:  # threshold-based
  - rubric_score >= 0.85
  - win_rate >= baseline
  - faithfulness >= 0.90

monitoring:  # alerting
  - drift_in_judge_scores
  - grounding_metric_degradation
  - sample_failures_for_labeling
```

### Reporting Requirements

Every eval run must produce a versioned report containing:

- Git SHA + config hash + prompt hash
- Model/provider + parameters (temp, top_p, etc.)
- Dataset version + sample IDs
- Per-sample outputs + scores + judge rationale
- Aggregated metrics (overall + per tag)
- Latency + token usage summaries

Store under: `evals/reports/YYYY-MM-DD/<run_id>/`

---

## 9. RAG-Specific Evaluation

RAG systems fail in multiple places—evaluate components separately.

### Component Metrics

| Component | Metric | Question Answered |
|-----------|--------|-------------------|
| **Retrieval** | Recall@k, Precision@k | Did we get the right passages? |
| **Context Quality** | Context precision/recall [[32]](#ref-32) | How much retrieved text is useful? |
| **Grounding** | Faithfulness [[32]](#ref-32)[[34]](#ref-34) | Is the answer supported by context? |
| **Answer Quality** | Relevance + completeness | Does it address the question? |

### The RAG Triad [[34]](#ref-34)

```
┌─────────────────┐
│  Context        │
│  Relevance      │──── Is retrieved context relevant to query?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Groundedness   │──── Is answer supported by context?
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Answer         │
│  Relevance      │──── Does answer address the question?
└─────────────────┘
```

### Practical Approach

**If you can't label retrieval relevance at scale:**

1. Start with a small labeled set (20–100 queries)
2. Expand using active sampling from real failures
3. Use LLM-based metrics (RAGAS) with human calibration

**Tool recommendations:**
- RAGAS [[32]](#ref-32) for component-wise metrics
- TruLens [[34]](#ref-34) for triad-based debugging
- Phoenix [[36]](#ref-36) or LangSmith [[38]](#ref-38) for tracing + drill-down

---

## 10. Tool Use & Agent Evaluation

### Principle: Prefer Executable Evaluation

When outputs are meant to be run, "looks right" isn't enough.

| Approach | When to Use |
|----------|-------------|
| **AST-based validation** | Function calls, structured outputs |
| **Execution + test suites** | Code generation, patches |
| **Simulation** | Multi-step tool chains |

### Benchmarks

- **BFCL** [[17]](#ref-17): Tool/function-calling correctness including multi-step/parallel
- **SWE-bench** [[19]](#ref-19): Real repo issues → patch + test validation
- **SWE-bench Verified** [[20]](#ref-20): Human-validated for higher reliability

### What to Check

```yaml
tool_call_eval:
  hard_checks:
    - arguments_parseable: true
    - required_fields_present: true
    - schema_valid: true
    - api_exists: true
  
  execution_checks:
    - call_succeeds: true
    - result_matches_expected: true
    - no_side_effect_errors: true
```

---

## 11. Production Observability

Offline evals catch regressions, but production introduces drift (new doc types, question styles, changing tools).

### The Production Loop

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Tracing    │ ──▶ │   Sampling   │ ──▶ │   Eval Runs  │
│ (all calls)  │     │  (periodic)  │     │  (weekly)    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
                     ┌──────────────────────────────────────┐
                     │  Golden Set Refresh from Failures    │
                     └──────────────────────────────────────┘
```

### What to Instrument

- Inputs/outputs/tool calls (full traces)
- Latency per component
- Token usage
- Error rates and types
- User feedback signals

### Tool Options

| Tool | Capability |
|------|------------|
| **Phoenix** [[36]](#ref-36) | Open-source tracing + evaluation |
| **W&B Weave** [[45]](#ref-45) | Tracing + evaluation objects |
| **LangSmith** [[38]](#ref-38) | Pre-deploy + production monitoring |

### Alerting

Set alerts for:
- Drift in judge scores
- Grounding metric degradation
- Latency spikes
- Error rate increases
- New failure mode clusters

---

## 12. Security & Adversarial Testing

### Minimum Bar (Hard Stop for Release)

| Test Category | Examples |
|---------------|----------|
| **Prompt injection** | Instruction override attempts |
| **Data exfiltration** | Attempts to leak context/system prompts |
| **PII handling** | Leakage in outputs |
| **Tool abuse** | Calling restricted tools, untrusted URLs |
| **Jailbreaks** | Safety constraint bypasses |

**Any failure = hard stop for release.**

### Recommended Tools

- promptfoo red-teaming mode [[29]](#ref-29)
- Custom adversarial test sets
- Regular security review cycles

---

## 13. Quick-Start Blueprint

### Evaluation Stack (One Reasonable Default)

| Layer | Tool(s) |
|-------|---------|
| **Public screening** | Chatbot Arena [[7]](#ref-7), AlpacaEval [[9]](#ref-9), MTEB [[15]](#ref-15), BFCL [[17]](#ref-17), SWE-bench [[19]](#ref-19), MLPerf [[23]](#ref-23) |
| **Internal regression** | promptfoo [[29]](#ref-29) or DeepEval [[30]](#ref-30) + curated "must-pass" dataset |
| **RAG evaluation** | RAGAS [[32]](#ref-32) + Triad-style grounding rubric + periodic human review |
| **Production loop** | Phoenix [[36]](#ref-36) or Weave [[45]](#ref-45) or LangSmith [[38]](#ref-38) for tracing + weekly eval runs |

### Decision Rules

Choose the candidate that:

1. ✅ Passes all hard gates
2. ✅ Maximizes quality on core capabilities (weighted)
3. ✅ Meets latency/cost constraints
4. ✅ Is stable across judge seeds/runs
5. ✅ Has acceptable worst-case behavior (tail risk)

**Never ship a model change based on one run or one metric.**

### Adding New Tests (Developer Workflow)

1. Add 1–5 cases to `golden.dev.jsonl` while iterating
2. Once stable, promote to `golden.regression.jsonl`
3. Add tags for failure mode tracking (`hallucination`, `formatting`, `retrieval_miss`)
4. If critical but rare, add to `holdout` too

### Example Make Targets

```makefile
eval-smoke:
	python evals/scripts/run_eval.py \
		--dataset evals/datasets/golden.regression.jsonl \
		--limit 50

eval-regression:
	python evals/scripts/run_eval.py \
		--dataset evals/datasets/golden.regression.jsonl

eval-holdout:
	python evals/scripts/run_eval.py \
		--dataset evals/datasets/golden.holdout.jsonl \
		--no_cache

eval-report:
	python evals/scripts/score_reports.py \
		--input evals/reports/latest/
```

---

## 14. References

### Leaderboards & Benchmarks

<a id="ref-1"></a>**[1]** Chatbot Arena methodology and platform. LMSYS. https://lmsys.org/

<a id="ref-2"></a>**[2]** "The Leaderboard Illusion" — systematic analysis of leaderboard dynamics and distortions. arXiv.

<a id="ref-3"></a>**[3]** MT-Bench and LLM-as-a-judge methodology, including position/verbosity/self-enhancement bias analysis. arXiv.

<a id="ref-4"></a>**[4]** Hugging Face Open LLM Leaderboard documentation and harness differences discussion. https://huggingface.co/

<a id="ref-5"></a>**[5]** Analysis of benchmark contamination and data leakage issues. arXiv.

<a id="ref-6"></a>**[6]** Statistical methods and confidence intervals for leaderboard rankings. arXiv.

<a id="ref-7"></a>**[7]** Chatbot Arena: crowd-sourced pairwise evaluations with Elo/Bradley-Terry rankings. LMSYS. https://lmsys.org/

<a id="ref-8"></a>**[8]** Arena-Hard: pipeline for creating harder benchmark sets from live arena data. LMSYS.

<a id="ref-9"></a>**[9]** AlpacaEval leaderboard and methodology. Tatsu Lab. https://tatsu-lab.github.io/alpaca_eval/

<a id="ref-10"></a>**[10]** AlpacaEval 2.0 length-controlled win rates and debiasing methodology. arXiv / OpenReview.

<a id="ref-11"></a>**[11]** HELM: Holistic Evaluation of Language Models paper. arXiv.

<a id="ref-12"></a>**[12]** HELM benchmark suite and results. Stanford CRFM. https://crfm.stanford.edu/helm/

<a id="ref-13"></a>**[13]** Hugging Face Open LLM Leaderboard. https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard

<a id="ref-14"></a>**[14]** EleutherAI LM Evaluation Harness. GitHub. https://github.com/EleutherAI/lm-evaluation-harness

<a id="ref-15"></a>**[15]** MTEB: Massive Text Embedding Benchmark paper. arXiv / ACL Anthology.

<a id="ref-16"></a>**[16]** MTEB Leaderboard. Hugging Face. https://huggingface.co/spaces/mteb/leaderboard

<a id="ref-17"></a>**[17]** Berkeley Function Calling Leaderboard (BFCL) methodology. OpenReview.

<a id="ref-18"></a>**[18]** BFCL: AST-based evaluation and real-world function sets. OpenReview.

<a id="ref-19"></a>**[19]** SWE-bench: evaluating models on real GitHub issues. arXiv.

<a id="ref-20"></a>**[20]** SWE-bench Verified: human-validated subset. OpenAI.

<a id="ref-21"></a>**[21]** LiveCodeBench: continuously updated coding benchmark. arXiv.

<a id="ref-22"></a>**[22]** LiveBench: evolving evaluation for contamination mitigation. https://livebench.ai/

<a id="ref-23"></a>**[23]** MLPerf Inference benchmarks overview. MLCommons. https://mlcommons.org/

<a id="ref-24"></a>**[24]** MLPerf Inference documentation and metrics. MLCommons.

### Evaluation Frameworks & Tools

<a id="ref-25"></a>**[25]** Hugging Face LightEval: modern LLM evaluation toolkit. https://huggingface.co/docs/lighteval

<a id="ref-26"></a>**[26]** OpenCompass evaluation platform. GitHub. https://github.com/open-compass/opencompass

<a id="ref-27"></a>**[27]** HELM framework implementation. GitHub. https://github.com/stanford-crfm/helm

<a id="ref-28"></a>**[28]** OpenAI Evals framework. GitHub. https://github.com/openai/evals

<a id="ref-29"></a>**[29]** promptfoo: LLM app evaluation and red-teaming. https://promptfoo.dev/

<a id="ref-30"></a>**[30]** DeepEval: pytest-like LLM evaluation framework. GitHub. https://github.com/confident-ai/deepeval

<a id="ref-31"></a>**[31]** OpenAI Evaluation best practices guide. https://platform.openai.com/docs/guides/evaluation

### RAG Evaluation & Observability

<a id="ref-32"></a>**[32]** RAGAS: component-wise RAG evaluation metrics. https://docs.ragas.io/

<a id="ref-33"></a>**[33]** RAGAS metrics documentation (faithfulness, context precision/recall, answer relevancy).

<a id="ref-34"></a>**[34]** TruLens RAG Triad documentation. https://www.trulens.org/

<a id="ref-35"></a>**[35]** TruLens: context relevance, groundedness, and answer relevance metrics.

<a id="ref-36"></a>**[36]** Arize Phoenix: open-source LLM tracing and evaluation. GitHub. https://github.com/Arize-ai/phoenix

<a id="ref-37"></a>**[37]** Phoenix documentation. https://docs.arize.com/phoenix

<a id="ref-38"></a>**[38]** LangSmith evaluation documentation. https://docs.smith.langchain.com/

<a id="ref-39"></a>**[39]** LangSmith evaluation concepts and types (pre-deploy + production monitoring).

<a id="ref-40"></a>**[40]** "Evaluation of Retrieval-Augmented Generation: A Survey." arXiv.

### Vendor Documentation

<a id="ref-41"></a>**[41]** OpenAI Graders guide (rubric and grader types). https://platform.openai.com/docs/guides/graders

<a id="ref-42"></a>**[42]** Anthropic Claude Console Evaluation tool. https://docs.anthropic.com/

<a id="ref-43"></a>**[43]** Google Vertex AI Gen AI evaluation service overview. https://cloud.google.com/vertex-ai/docs

<a id="ref-44"></a>**[44]** Google Vertex AI "Run evaluation" documentation.

<a id="ref-45"></a>**[45]** Weights & Biases Weave tracing and evaluation. https://docs.wandb.ai/guides/weave

<a id="ref-46"></a>**[46]** W&B Weave evaluation objects and drill-down.

---

*Last updated: 2025*
