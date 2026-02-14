Initialize project session:

1. Load and enforce all files inside `.rules/`
2. Make all agents inside `.agents/` available for explicit activation
3. Apply naming normalization when reading Figma MCP data
4. Token-safe mode is mandatory (semantic tokens only, no raw values)

Rules are always active.
Agents run only when explicitly invoked (e.g., @uxAgent, @namingAgent).
If conflict occurs: Rules > Agent > Prompt.