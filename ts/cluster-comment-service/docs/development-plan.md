# Development Plan

## Biome Migration Follow-up

The current Biome configuration is a temporary compatibility configuration.
It keeps linting enabled, but disables formatting enforcement because the
existing source files are not consistently formatted with Biome yet. Several
recommended rules are also disabled to avoid changing existing application
code during the migration.

This configuration should be improved in a future cleanup task. It is not the
recommended long-term state.

### Current State

- `npm run check` passes without modifying source files.
- Biome linting remains enabled.
- Biome formatting is disabled in `biome.json`.
- Generated files and project metadata are excluded from checks.
- Some recommended lint rules are disabled for legacy code compatibility.

### Planned Steps

1. Define the target formatting rules and confirm them with the team.
2. Run Biome formatting in a dedicated change and review the complete diff.
3. Re-enable `formatter.enabled` in `biome.json`.
4. Re-enable the disabled lint rules one group at a time.
5. Fix or explicitly justify each remaining diagnostic.
6. Keep `npm run check` in CI after formatting enforcement is enabled.

### Completion Criteria

The migration follow-up is complete when:

- `formatter.enabled` is set to `true`.
- `npm run check` passes with formatting and linting enabled.
- The compatibility rule overrides are removed or documented individually.
- The formatting change has been reviewed as a separate, focused change.

Until then, changes to `biome.json` should preserve the compatibility notes in
this document and should not silently remove the migration follow-up work.
