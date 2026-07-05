---
name: obsidian-bases
description: Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. Use when working with .base files, creating database-like views of notes, or when the user mentions Bases, table views, card views, filters, or formulas in Obsidian.
---

# Obsidian Bases Skill

## Workflow

1. **Create the file**: Create a `.base` file in the vault with valid YAML content
2. **Define scope**: Add `filters` to select which notes appear (by tag, folder, property, or date)
3. **Add formulas** (optional): Define computed properties in the `formulas` section
4. **Configure views**: Add one or more views (`table`, `cards`, `list`, or `map`) with `order` specifying which properties to display
5. **Validate**: Verify the file is valid YAML with no syntax errors. Check that all referenced properties and formulas exist. Common issues: unquoted strings containing special YAML characters, mismatched quotes in formula expressions, referencing `formula.X` without defining `X` in `formulas`
6. **Test in Obsidian**: Open the `.base` file in Obsidian to confirm the view renders correctly. If it shows a YAML error, check quoting rules below

## Schema

Base files use the `.base` extension and contain valid YAML.

```yaml
# Global filters apply to ALL views in the base
filters:
  and:
    - 'status == "active"'
    - not:
        - 'file.hasTag("archived")'

formulas:
  formula_name: 'expression'

properties:
  property_name:
    displayName: "Display Name"
  formula.formula_name:
    displayName: "Formula Display Name"

summaries:
  custom_summary_name: 'values.mean().round(3)'

views:
  - type: table | cards | list | map
    name: "View Name"
    limit: 10
    groupBy:
      property: property_name
      direction: ASC | DESC
    filters:
      and:
        - 'status == "active"'
    order:
      - file.name
      - property_name
      - formula.formula_name
    summaries:
      property_name: Average
```

## Filter Syntax

```yaml
# Single filter
filters: 'status == "done"'

# AND
filters:
  and:
    - 'status == "done"'
    - 'priority > 3'

# OR
filters:
  or:
    - 'file.hasTag("book")'
    - 'file.hasTag("article")'

# NOT
filters:
  not:
    - 'file.hasTag("archived")'
```

## File Properties Reference

| Property | Type | Description |
|----------|------|-------------|
| `file.name` | String | File name |
| `file.path` | String | Full path |
| `file.folder` | String | Parent folder |
| `file.size` | Number | Size in bytes |
| `file.ctime` | Date | Created time |
| `file.mtime` | Date | Modified time |
| `file.tags` | List | All tags |
| `file.links` | List | Internal links |
| `file.backlinks` | List | Files linking here |

## Formula Syntax

```yaml
formulas:
  total: "price * quantity"
  status_icon: 'if(done, "✅", "⏳")'
  days_old: '(now() - file.ctime).days'
  days_until_due: 'if(due_date, (date(due_date) - today()).days, "")'
```

**Duration note:** Subtracting dates returns a Duration. Always access `.days`, `.hours`, etc. before calling number functions.

## View Types

- `table` — grid with columns
- `cards` — gallery/card view
- `list` — simple list
- `map` — geographic (requires Maps plugin + lat/lng properties)

## YAML Quoting Rules

- Single quotes for formulas containing double quotes: `'if(done, "Yes", "No")'`
- Double quotes for simple strings: `"My View Name"`
- Strings with `:`, `{`, `}`, `[`, `]` must be quoted

## Complete Example — Clientes Ativos (Real Vision)

```yaml
filters:
  and:
    - file.hasTag("cliente")
    - 'status == "ativo"'

formulas:
  dias_cliente: '(now() - file.ctime).days.round(0)'

properties:
  status:
    displayName: Status
  formula.dias_cliente:
    displayName: "Dias como cliente"

views:
  - type: table
    name: "Clientes Ativos"
    order:
      - file.name
      - status
      - servicos
      - formula.dias_cliente
    groupBy:
      property: status
      direction: ASC

  - type: cards
    name: "Galeria"
    order:
      - file.name
      - servicos
      - status
```

## References

- [Bases Syntax](https://help.obsidian.md/bases/syntax)
- [Views](https://help.obsidian.md/bases/views)
- [Formulas](https://help.obsidian.md/formulas)
