<div align="center">

# Tailwindify

### Select any element. Get Tailwind CSS instantly.

<p align="center">
  Tailwindify is a Chrome extension that lets you inspect any section of a webpage and instantly generate clean Tailwind CSS code — even on sites using obfuscated, hashed, minified, CSS Modules, or CSS-in-JS class names.
</p>

<p align="center">
  No more digging through DevTools. No more guessing utility classes from computed styles.  
  Just point, click, and copy.
</p>

<br />

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)
[![License](https://img.shields.io/badge/License-MIT-232323?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-232323?style=flat-square)](CONTRIBUTING.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square&logo=vercel&logoColor=white)](https://turbo.build/repo)

</div>

---

## ✨ Features

- **🎯 Element Selection** — Click any element to capture its full styling context
- **🧬 Tailwind Conversion** — Converts computed CSS into idiomatic Tailwind utility classes
- **🔐 Obfuscation-Proof** — Works on sites using CSS Modules, Styled Components, Emotion, or hashed classes
- **📋 One-Click Copy** — Copy clean, reusable Tailwind markup instantly
- **🎨 Arbitrary Values** — Automatically generates utilities like `w-[127px]` and `text-[#101010]`
- **⚡ Zero Config** — Install and start using immediately
- **🖥️ Companion Dashboard** — Full web dashboard for saved snippets, history, and future collaboration features

---

## 🧠 How It Works

1. Open any website
2. Launch Tailwindify
3. Select an element or section
4. Tailwindify analyzes computed styles
5. Instantly receive clean Tailwind CSS output
6. Copy and use it in your project

---

## 🏗️ Monorepo Structure

```txt
tailwindify
│
├─ apps
│  │
│  ├─ extension                     # Chrome Extension (Manifest V3)
│  │  │
│  │  ├─ src
│  │  │  ├─ content                # DOM selection & style extraction
│  │  │  ├─ background             # Service worker & messaging
│  │  │  ├─ popup                  # Extension popup UI
│  │  │  ├─ overlay                # On-page selection interface
│  │  │  └─ lib                    # Tailwind conversion engine
│  │  │
│  │  ├─ assets
│  │  └─ manifest.json
│  │
│  └─ web                           # Marketing site & dashboard
│     │
│     ├─ src
│     │  ├─ app                    # Next.js App Router
│     │  ├─ components             # Website components
│     │  ├─ lib                    # Shared utilities
│     │  └─ styles                 # Global styles
│     │
│     └─ public
│
├─ packages
│  │
│  ├─ ui                            # Shared design system
│  │  ├─ components                # Shared React components
│  │  ├─ hooks
│  │  ├─ utils
│  │  └─ styles
│  │
│  ├─ eslint-config                 # Shared ESLint configuration
│  └─ typescript-config             # Shared TypeScript configuration
│
├─ .github
│  └─ workflows                     # CI/CD pipelines
│
├─ turbo.json                       # Turborepo task pipeline
├─ pnpm-workspace.yaml              # Workspace configuration
├─ package.json
└─ README.md
```

### Why a Monorepo?

Tailwindify uses a modern monorepo architecture to keep the extension, dashboard, and shared UI ecosystem fully synchronized.

This allows us to:

- share components and utilities,
- maintain consistent branding,
- reuse Tailwind configs and design tokens,
- scale faster as the project grows.

Built with:

- **pnpm workspaces**
- **Turborepo**
- **React**
- **TypeScript**
- **Tailwind CSS**

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/tailwindify.git
cd tailwindify
```

### Install Dependencies

```bash
pnpm install
```

### Start Development

```bash
pnpm dev
```

### Build All Apps

```bash
pnpm build
```

---

## 🧩 Tech Stack

### Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

### Tooling

- Turborepo
- pnpm Workspaces
- ESLint
- Prettier

### Extension

- Chrome Extension APIs
- Manifest V3

---

## 🛣️ Roadmap

- [ ] Responsive layout reconstruction
- [ ] React component generation
- [ ] Vue & Svelte support
- [ ] AI-assisted Tailwind cleanup
- [ ] Figma export
- [ ] Shared snippet library
- [ ] Team collaboration
- [ ] Component grouping & hierarchy detection

---

## 🤝 Contributing

Contributions, ideas, issues, and feature requests are welcome.

If you'd like to contribute:

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "Add amazing feature"

# Push to GitHub
git push origin feature/amazing-feature
```

Then open a Pull Request 🚀

---

## 📸 Demo

> Add screenshots, GIFs, or terminal demos here.

Suggested demos:

- Selecting an element
- Generated Tailwind output
- Obfuscated CSS conversion
- Copy-to-clipboard workflow

---

## 🏷️ Suggested GitHub Topics

```txt
tailwind
tailwindcss
chrome-extension
developer-tools
frontend
web-development
react
typescript
css
ui
inspect-element
code-generator
browser-extension
devtools
design-tools
monorepo
turborepo
```

---

## 📄 License

Licensed under the MIT License.

See [`LICENSE`](LICENSE) for more information.
