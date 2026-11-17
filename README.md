<div align="center">

# ⚡ iconcraft-react

### A high-performance, fully customizable React icon suite & studio with 2,000+ vector icons.

[![npm version](https://img.shields.io/npm/v/iconcraft-react.svg?style=flat-square&color=10B981)](https://www.npmjs.com/package/iconcraft-react)
[![npm downloads](https://img.shields.io/npm/dm/iconcraft-react.svg?style=flat-square&color=3B82F6)](https://www.npmjs.com/package/iconcraft-react)
[![license](https://img.shields.io/npm/l/iconcraft-react.svg?style=flat-square&color=8B5CF6)](https://github.com/iconcraft/iconcraft/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/iconcraft-react?style=flat-square&color=F59E0B)](https://bundlephobia.com/package/iconcraft-react)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<p align="center">
  <a href="#-installation">Installation</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-custom-icons">Custom Icons</a> •
  <a href="#-props-reference">Props Reference</a>
</p>

---

</div>

## ✨ Features

- **🚀 2,000+ Ready-to-use Icons:** Powered by the curated Lucide icon set across 10 functional categories.
- **🌲 100% Tree-Shakeable:** Only the icons you explicitly import end up in your production bundle.
- **🎨 Dynamic Customization:** Granular control over `size`, `strokeWidth`, `color`, `strokeLinecap`, and Tailwind classes.
- **🪄 Figma / Custom SVG Factory:** Convert any raw vector from Figma into a first-class, typed React component using `createIcon`.
- **🟦 TypeScript Native:** Complete auto-complete and typings for every icon and prop.
- **⚡ Dual Module Builds:** Seamless support for both modern ESM (`import`) and legacy CommonJS (`require`).

---

## 📦 Installation

Install via your preferred package manager:

```bash
# Using npm
npm install iconcraft-react

# Using pnpm
pnpm add iconcraft-react

# Using yarn
yarn add iconcraft-react

# Using bun
bun add iconcraft-react
```

---

## 💡 Quick Start

### 1. Named Component Imports (Recommended)

Import only what you need. Dead code elimination ensures unused icons are excluded:

```tsx
import React from 'react';
import { Home, Sparkles, ShoppingBag, ArrowRight } from 'iconcraft-react';

export function NavigationBar() {
  return (
    <nav className="flex items-center gap-4 p-3 bg-zinc-900 text-zinc-100 rounded-xl">
      {/* Default 24px icon */}
      <Home />

      {/* Customized stroke, size, and accent color */}
      <Sparkles size={20} strokeWidth={1.5} color="#10B981" />

      {/* Styled with Tailwind CSS classes */}
      <ShoppingBag className="w-5 h-5 text-emerald-400 hover:text-emerald-300 transition-colors" />

      {/* Custom line ending shapes */}
      <ArrowRight size={18} strokeLinecap="square" strokeLinejoin="miter" />
    </nav>
  );
}
```

---

### 2. Dynamic Icon Component (Render by String Name)

Ideal for CMS-driven navigation, menus, or dynamic tables:

```tsx
import React from 'react';
import { Icon } from 'iconcraft-react';

export function MenuItem({ title, iconName }: { title: string; iconName: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={iconName} size={18} strokeWidth={1.75} />
      <span>{title}</span>
    </div>
  );
}
```

---

## 🪄 Creating Custom Icons (`createIcon`)

Need a custom brand logo or vector from Figma that matches the rest of your icon set? Use the built-in `createIcon` factory:

```tsx
import { createIcon } from 'iconcraft-react';

// Define vector nodes in standard viewBox="0 0 24 24" format
export const BrandRocket = createIcon('BrandRocket', [
  ['path', { d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z' }],
  ['path', { d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' }],
  ['path', { d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0' }],
  ['path', { d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' }]
]);

// Use it anywhere like a native icon:
<BrandRocket size={28} strokeWidth={1.5} color="#3B82F6" />
```

---

## 🎨 Props Reference

All components forward their root ref to `<svg>` and accept standard HTML SVG attributes plus the following properties:

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number \| string` | `24` | Width & height of the icon in pixels. |
| `strokeWidth` | `number \| string` | `2` | Stroke thickness. Supports decimal values (e.g. `1.25`, `1.5`, `2.5`). |
| `color` | `string` | `'currentColor'` | Stroke color. Defaults to `currentColor` to inherit text color via CSS / Tailwind. |
| `strokeLinecap` | `'round' \| 'square' \| 'inherit'` | `'round'` | Shape used at the end of open subpaths. |
| `strokeLinejoin` | `'round' \| 'miter' \| 'inherit'` | `'round'` | Shape used at the corners of paths. |
| `className` | `string` | `''` | Tailwind or custom CSS class string. |

---

## 📄 License

MIT © Open Source Community
