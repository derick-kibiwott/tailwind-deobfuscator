# Contributing to Tailwind Deobfuscator

First of all, thank you for considering contributing! 🎉

Whether you're fixing a typo, improving the UI, reporting a bug, or implementing a new feature, your contribution is greatly appreciated.

---

# Code of Conduct

Please be respectful and constructive when interacting with other contributors.

We welcome contributors of all skill levels and backgrounds.

---

# Before You Start

If you're planning to work on a larger feature, please open an issue first so we can discuss the implementation before significant work begins.

For small bug fixes or documentation improvements, feel free to open a pull request directly.

---

# Getting Started

## 1. Fork the repository

Click **Fork** on GitHub and clone your fork.

```bash
git clone https://github.com/derick-kibiwott/tailwind-deobfuscator.git
cd tailwind-deobfuscator
```

---

## 2. Install dependencies

```bash
pnpm install
```

---

## 3. Start development

```bash
pnpm dev
```

---

## 4. Create a branch

Please create a descriptive branch name.

Examples:

```text
fix/sidebar-animation
feature/dark-mode
docs/update-readme
refactor/parser
```

---

# Project Structure

```text
apps/
    extension/     Browser extension
    web/           Documentation / website

packages/
    ui/            Shared UI components
```

---

# Coding Guidelines

Please follow these principles:

- Keep code simple and readable.
- Prefer descriptive variable names.
- Avoid unnecessary abstractions.
- Reuse existing components where possible.
- Write comments only when they explain _why_, not _what_.

---

# Pull Request Guidelines

Before opening a pull request, make sure:

- The project builds successfully.
- Existing functionality still works.
- Your code follows the existing style.
- You have tested your changes.

Include a short description explaining:

- What changed
- Why it changed
- Any screenshots (for UI changes)

---

# Good First Issues

If you're looking for a place to start, check issues labelled:

- `good first issue`
- `help wanted`

These are designed to help new contributors become familiar with the project.

---

# Reporting Bugs

Please include:

- Browser
- Operating System
- Extension version
- Steps to reproduce
- Expected behaviour
- Actual behaviour
- Screenshots if applicable

---

# Suggesting Features

Feature requests are welcome.

Please explain:

- The problem you're trying to solve.
- Your proposed solution.
- Any alternative approaches you've considered.

---

# Commit Messages

Please write clear commit messages.

Good examples:

```text
Fix sidebar closing unexpectedly

Add support for arbitrary Tailwind values

Improve class extraction performance
```

Avoid:

```text
fix

update

changes

stuff
```

---

# Questions

If anything is unclear, feel free to open a discussion or issue before starting work.

We're happy to help.

---

# Thank You ❤️

Every contribution—large or small—helps make Tailwind Deobfuscator better for the community.

Thank you for taking the time to contribute!
