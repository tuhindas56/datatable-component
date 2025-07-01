# Datatable component

A reusable datatable component built with @tanstack/react-table, reactstrap, and Bootstrap 5.

## Table of Contents

- [Features](#features)
  - [Implemented](#implemented)
  - [Yet to implement](#yet-to-implement)
- [CSS variables for customizing styles](#css-variables-for-customizing-styles)
  - [CSS override example](#css-override-example)

## Features

### Implemented

- Row Selection

### Yet to implement

- Column hiding
- Column pinning
- Filtering
- Pagination
- Row expansion
- Row-level options

## CSS variables for customizing styles

Customize the component by wrapping it in a parent container and overriding the following CSS variables on that container:

| CSS variable                 | Default value       | Description                                                   |
| ---------------------------- | ------------------- | ------------------------------------------------------------- |
| `--checkbox-border`          | `1px solid #d5d5d5` | Border around the row selection checkboxes                    |
| ` --checkbox-checked-bg`     | `#000000`           | Background color of row selection checkboxes when its checked |
| `--row-hover-color`          | `#f5f5f5`           | Row background color on hover                                 |
| `--table-border`             | `1px solid #e5e5e5` | Border around the table container                             |
| `--table-border-radius`      | `6px`               | Border radius of the table container                          |
| `--table-font-family`        | `Inter`             | Font family for table                                         |
| `--table-font-size`          | `14px`              | Font size for table                                           |
| `--table-header-font-weight` | `600`               | Font weight of table header text                              |
| `--table-max-height`         | `500px`             | Max height of the table container                             |

### CSS override example

```jsx
<div style={{ "--row-hover-color": "#f5f5f5" }}>
  <Datatable />
</div>
```
