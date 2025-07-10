# Datatable project

A table component powered by tanstack table.

## Contents

- [Customizing the table UI](#customizing-the-table-ui)

## Pending features

- Dynamic Filters (Date component needs update)
- Advanced Filters
  - For dates, keep start and end date
  - For everything else keep single text input
  - For either or options, use select input, refer to the priority and status columns of tablecn

## Completed features

- Column Hiding
- Dynamic Filters
- Pinning (w/ caveats)
- Row expansion
- Row level options
- Server side pagination
- Server side searching
- Server side sorting

## Customizing the table UI

You can adjust the table's appearance by declaring the following CSS variables on `:root` or `body`. These control fonts, colors, and basic styling:

| CSS custom property                     | Default value      | Description                                                      |
| --------------------------------------- | ------------------ | ---------------------------------------------------------------- |
| `--ts-dt-font-family`                   | `Inter, system-ui` | Font family for table                                            |
| `--ts-dt-font-size`                     | `14px`             | Font size for table                                              |
| `--ts-dt-th-bg`                         | `#ffffff`          | Background color of `<th>` elements'                             |
| `--ts-dt-td-bg`                         | `#ffffff`          | Background color of `<td>` elements'                             |
| `--ts-dt-checkbox-border-color`         | `#d5d5d5`          | Border color of checkboxes                                       |
| `--ts-dt-checkbox-checked-border-color` | `#d5d5d5`          | Border color of checkboxes when in checked state                 |
| `--ts-dt-checkbox-checked-bg`           | `#000000`          | Background color of checkbox when in checked state               |
| `--ts-dt-input-focus-border-color`      | `#a1a1a1`          | Border color of `<input>` elements in the table in focused state |
| `--ts-dt-input-focus-box-shadow-color`  | `#cfcfcf`          | Box shadow color of `<input>` elements in focused state          |
| `--ts-dt-btn-bg`                        | `#ffffff`          | Background color of `<button>` elements                          |
| `--ts-dt-btn-color`                     | `#565656`          | Color of `<button` elements with icons                           |
| `--ts-dt-btn-border-color`              | `#e5e5e5`          | Border color of `<button>` elements                              |
| `--ts-dt-btn-hover-border-color`        | `#e5e5e5`          | Border color of `<button>` elements in hover state               |
| `--ts-dt-btn-active-border-color`       | `#e5e5e5`          | Border color of `<button>` elements in active state              |
| `--ts-dt-btn-hover-bg`                  | `#f5f5f5`          | Background color of `<button>` elements in hover state           |
| `--ts-dt-btn-hover-color`               | `#565656`          | Color of `<button>` elements in hover state                      |
| `--ts-dt-btn-active-bg`                 | `#f5f5f5`          | Background color of `<button>` elements in active state          |
| `--ts-dt-btn-active-color`              | `#565656`          | Background color of `<button>` elements in active state          |
| `--ts-dt-dropdown-bg`                   | `#ffffff`          | Background color of dropdown elements                            |
| `--ts-dt-dropdown-item-active-bg`       | `#f5f5f5`          | Background color of dropdown item in active state                |
| `--ts-dt-dropdown-item-active-color`    | `#000000`          | Color of dropdown item in active state                           |
| `--ts-dt-dropdown-item-hover-bg`        | `#f5f5f5`          | Background color of dropdown item in hover state                 |
| `--ts-dt-dropdown-item-hover-color`     | `#000000`          | Color of dropdown item in hover state                            |

_Note: Overriding styles using these properties will affect the look of all table instances in the project._

For styling beyond the above variables, you can either:

- use the `cell` property in the `columnDef` objects to fully control individual cell rendering, or
- directly override styles via the table's CSS modules or MUI theme configuration.

This keeps the table's UI consistent across the project.
