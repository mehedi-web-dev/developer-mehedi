# Project Overview: developer-mehedi

`developer-mehedi` is a modern web application and personal developer portfolio built with Next.js (App Router), React 19, Tailwind CSS v4, and TypeScript.

---

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript (`tsconfig.json` with strict mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/turbopack`, imported via `@import "tailwindcss";` in `src/app/globals.css`)
- **Linting**: ESLint 9 (`eslint.config.mjs`)
- **Bundler**: Turbopack

---

## Directory Structure

```text
developer-mehedi/
├── public/                 # Static assets (images, icons, svgs)
├── src/
│   └── app/                # Next.js App Router
│       ├── layout.tsx      # Root layout (fonts, metadata, html/body)
│       ├── page.tsx        # Home page entry point
│       ├── globals.css     # Global styles & Tailwind theme definitions
│       └── favicon.ico     # Site favicon
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── eslint.config.mjs       # ESLint flat configuration
└── GEMINI.md               # Antigravity project rules & guidelines
```

---

## Development Workflow & Scripts

- `npm run dev`: Start the development server with Turbopack (defaults to `http://localhost:3000`)
- `npm run build`: Create an optimized production build
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint checks

---

## Coding Guidelines & Conventions

1. **React Server Components (RSC) by Default**:
   - Keep components as Server Components unless interactivity (hooks like `useState`, `useEffect`, event handlers) is strictly needed.
   - Place `"use client"` at the top of client-specific components.
2. **Styling with Tailwind CSS v4**:
   - Use utility classes according to Tailwind v4 conventions.
   - Utilize theme variables defined in `globals.css` (`--color-background`, `--color-foreground`, etc.).
3. **TypeScript & Type Safety**:
   - Strictly type component props, API responses, and shared data models.
   - Avoid `any`; favor explicit interfaces or type aliases.
4. **Code Organization**:
   - Reusable UI components belong in `src/components/`.
   - Shared utility functions belong in `src/lib/` or `src/utils/`.
   - Custom hooks belong in `src/hooks/`.
