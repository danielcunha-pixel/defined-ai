# AI Token & Context Safety Rules

Purpose:
Prevent accidental high-token usage when working with large design systems, Figma MCP integrations, and code generation.

These rules must be followed before fetching external data or large contexts.

---

## 🚨 High Token Risk Operations (ALWAYS warn before proceeding)

Before executing any of the following, explicitly warn the user about high token consumption and ask for confirmation:

- Fetching or analyzing a full Figma file or page
- Reading an entire design system or component library
- Importing all design tokens at once
- Generating a full Storybook-style documentation site from existing assets
- Scanning multiple components to infer patterns or props automatically
- Indexing large content bodies for search

Example warning format:

⚠️ This operation may consume a very large number of tokens because it involves loading a large context (design system / Figma file / multiple components).  
Do you want to proceed, or would you prefer to work in smaller batches?

---

## ✅ Default Behavior (Low Token Mode)

Unless explicitly requested by the user:

- Never fetch full design systems
- Never scan entire Figma documents
- Never import all components automatically
- Never analyze more than one component at a time
- Prefer manual or incremental workflows

---

## 📦 Recommended Incremental Workflow

Always suggest:

1. Start with design tokens only
2. Then work component by component
3. Then generate documentation or code in batches

---

## ❌ Forbidden Without Explicit Approval

Do NOT perform the following without clear user confirmation:

- “Analyze the whole design system”
- “Generate docs for all components”
- “Scan all Figma pages”
- “Auto-generate props for every component”

---

## 🧠 Optimization Principles

- Minimize context size
- Avoid redundant history
- Ask for specific nodes or components
- Prefer summaries over raw data dumps

---

## 📢 Mandatory Cost Transparency

Whenever a request is likely to exceed normal token usage, the AI must:

1. Warn clearly
2. Explain why it is expensive
3. Offer a cheaper alternative

---
description: Model routing policy for DS work (Haiku vs Sonnet vs Opus) to balance cost, context, and fidelity. Applies to all Design System tasks, especially token migrations and UI fidelity refactors.
globs:
  - "**/*"
alwaysApply: true
---

# Model Routing Policy (Haiku / Sonnet / Opus 4.6)

This policy chooses the model based on task size, risk, and required reasoning depth. The goal is to keep work accurate and UI-faithful while controlling cost.

## 1) Definitions

### Task types
- **Incremental fix**: small change in 1–3 files; limited scope; predictable diff.
- **Category sweep**: systematic replacement in one domain (spacing OR radius OR typography) across many files.
- **Full audit / migration**: building token inventory, mapping tables, multi-category refactor, or changing token application strategy.
- **High-risk UI fidelity**: anything that could shift layout/typography across many components, or changes foundational styling primitives.

### Signals
- **File count**: number of files expected to change.
- **Diff size**: rough estimate of how many lines will change.
- **Token inventory size**: number of tokens to inspect/reference.
- **Coupling**: how many layers are involved (tokens → components → docs/examples → theme/config).

---

## 2) Routing Rules

### Use **Haiku 4.5** when ALL are true
- ≤ 3 files changed
- Single category AND localized (e.g., fix one component’s padding/radius/typography)
- No need to build/understand full token inventory
- Low coupling (no config/theme refactor)

Examples:
- Fix token usage in one component
- Replace a couple hardcoded `px` values with existing spacing tokens
- Small UI fidelity patch after a screenshot comparison

### Use **Sonnet** (default) when ANY are true
- 4–25 files expected to change OR a category sweep across the DS
- You need a mapping table (value → token) for a single domain
- Typography refactors across multiple components
- You must do an audit first, then apply incremental commits per category

Examples:
- “Replace spacing across all components with Figma-derived tokens”
- “Normalize radius tokens across DS”
- “Update text styles to match Figma typography tokens”

### Use **Opus 4.6** only when ANY are true
- Full DS audit + multi-category migration in one initiative (spacing + radius + typography)
- > 25 files expected to change
- Token inventory is large and ambiguous (multiple token sources, multiple themes)
- High-risk: foundational refactor (token system, theme architecture, config strategy)
- One-pass cleanup requested (end-to-end) with minimal back-and-forth

Examples:
- “Rebuild token application strategy: CSS variables vs Tailwind theme vs TS tokens”
- “Unify tokens across packages and docs site”
- “Do a complete fidelity sweep for the entire DS in one go”

---

## 3) Execution Pattern (Mandatory)

Regardless of model:

### Always do this sequence
1) **Discover token sources** (paths + formats)  
2) **Build Token Inventory** (group by category)  
3) **Audit hardcoded + DS-local styles**  
4) **Create Replacement Table** (value → token, confidence, safe?)  
5) **Apply changes by category** (spacing → radius → typography → other)  
6) **Validate and report** (unmapped list + proposed missing tokens if repeated ≥ 3 times)

### Commit strategy
- Commit per category (do not mix)
- Each commit must include:
  - what changed
  - what was skipped and why
  - risk notes

---

## 4) Guardrails (Do Not Break These)

- Minimize visual diffs; if a replacement changes layout meaningfully, revert and mark as **non-safe**.
- Prefer **semantic tokens** over base tokens when available.
- Do not invent tokens unless the same non-token value appears **≥ 3 times** AND has clear semantic meaning.
- Avoid mixing token systems: pick the project’s canonical approach and apply consistently.

---

## 5) Model Choice Output (Required)

Before starting, print a one-line decision:

**Model Decision:** Haiku / Sonnet / Opus  
**Reason:** (file count + risk + category)  
**Plan:** (audit → replacement table → commits)

If the current model is not appropriate, stop and request switching to the recommended model.

---

End of rules.
