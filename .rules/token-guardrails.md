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

End of rules.
