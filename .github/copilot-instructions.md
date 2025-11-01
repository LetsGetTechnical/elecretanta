# Copilot Agent Instructions for Elecretanta

## Repository Overview

**Project**: Secret Santa Exchange - An AI-powered Secret Santa platform for organizing gift exchanges between colleagues, friends, and family.

**Type**: Full-stack Next.js web application  
**Version**: 0.7.0-alpha  
**Size**: ~230 source files (TypeScript/TSX), ~1GB total with dependencies

### Tech Stack
- **Framework**: Next.js 15.2.3 (React 18.3.1, App Router)
- **Language**: TypeScript 5
- **Runtime**: Node.js v20.19.5
- **Package Manager**: npm (pnpm and yarn also supported)
- **Database & Auth**: Supabase (PostgreSQL with real-time features)
- **AI**: OpenAI API for gift suggestions
- **UI**: Shadcn/UI components with TailwindCSS 3.4.1 and Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Testing**: Jest 29.7.0 with Testing Library, Playwright 1.51.1 for e2e
- **Tools**: Storybook 8.6.12, ESLint 8, Prettier 3.5.3

## Build & Development Commands

### Installation
```bash
npm install
```
**IMPORTANT**: Always run `npm install` after pulling changes or switching branches. Installation takes ~2 minutes. The project uses npm by default but pnpm and yarn are also supported.

### Development Server
```bash
npm run dev
```
Starts Next.js dev server on **http://localhost:4000** (custom port via cross-env PORT=4000). Takes ~2-3 seconds to start. Requires environment variables (see Environment Setup section).

### Build
```bash
npm run build
```
Creates production build. Takes ~30-60 seconds. **Known Issue**: Build fails with TypeScript error in `lib/supabase/client.ts` due to SupabaseClient type mismatch. This is a pre-existing issue in the codebase - ignore it for now unless directly related to your changes.

### Linting
```bash
npm run lint
```
Runs Next.js ESLint. Takes ~5-10 seconds. **Expected**: Several JSDoc warnings in `components/Form/form.tsx` and `components/LinkCustom/LinkCustom.tsx` about undefined React types - these are pre-existing and safe to ignore.

### Testing
```bash
npm run test
```
Runs Jest tests (cross-env NODE_ENV=development jest). Takes ~15-20 seconds. **Expected Results**: 75 tests pass, 4 tests fail (pre-existing failures in Calendar and GiftExchangeHeader tests). Only fix test failures if they're related to your changes.

### Storybook
```bash
npm run storybook        # Dev server on port 6006
npm run build-storybook  # Build static Storybook
```

## Environment Setup

### Required Environment Variables
Create `.env` file in root (see `.env.example`):
```
NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
OPENAI_API_KEY="your_openai_api_key"
GOOGLE_API_KEY="your_google_api_key"
GOOGLE_CSE_ID="your_google_cse_id"
```
**Note**: Dev server will start but fail on first request if these are missing. Middleware requires Supabase credentials.

## Project Architecture & Layout

### Directory Structure
```
/app                      # Next.js App Router pages and API routes
  /api                    # API routes (gift-exchanges, profile, cron, etc.)
    /cron                 # Scheduled cron job (runs daily at 10:00 UTC via Vercel)
    /gift-exchanges       # Gift exchange CRUD and matching logic
    /profile              # User profile management
  /auth                   # Authentication pages (login, callback)
  /dashboard              # User dashboard
  /gift-exchanges         # Gift exchange pages
  /onboarding             # User onboarding flow
  /profile                # Profile management pages
  layout.tsx              # Root layout with GlobalHeader, SnowOverlay, AuthContext
  page.tsx                # Landing page (144 lines)
  globals.css             # Global styles and Tailwind directives

/components               # React components (70+ components, all with tests)
  /Button, /Card, /Input  # Shadcn/UI base components
  /Avatar                 # User avatar with fallback
  /Form                   # Form components (radio, select, label, etc.)
  /GiftSuggestionCard     # AI-generated gift suggestion display
  /GroupCard              # Gift exchange group card
  /GlobalHeader           # Main navigation header

/lib                      # Utility libraries
  /supabase               # Supabase client factories (client, server, middleware)
  utils.ts                # cn() helper for Tailwind class merging (113 lines)
  generateAndStoreSuggestions.ts  # AI gift suggestion generation
  drawGiftExchange.ts     # Secret Santa matching algorithm

/context                  # React contexts
  AuthContextProvider.tsx # Authentication state management

/hooks                    # Custom React hooks
  use-toast.test.ts       # Toast notification hook

/providers                # React providers
  SnowOverlayProvider     # Snow effect toggle state

/middleware.ts            # Next.js middleware for auth and routing
/public                   # Static assets
/stories                  # Storybook stories
```

### Key Configuration Files
- **next.config.ts**: Next.js config (image domains: unsplash)
- **tsconfig.json**: TypeScript config with path aliases (@/*)
- **jest.config.ts**: Jest config (preset: ts-jest, testPathIgnorePatterns for Playwright)
- **playwright.config.ts**: Playwright e2e config (testDir: ./tests)
- **tailwind.config.ts**: Tailwind with custom colors, motion plugin
- **.eslintrc.json**: Strict ESLint rules (jsdoc required, header enforcement, React best practices)
- **prettier.config.js**: Prettier config (80 char width, 2 spaces, single quotes)
- **components.json**: Shadcn/UI config (style: new-york, aliases for @/components)
- **vercel.json**: Vercel deployment config with daily cron job

### Architecture Notes

1. **Authentication Flow**: 
   - Middleware (`middleware.ts`) checks auth on every request via Supabase
   - Unauthenticated users redirected to `/` (landing page)
   - Authenticated users without complete onboarding redirected to `/onboarding`
   - Auth context provides user state throughout app

2. **Database**: Supabase (PostgreSQL) with tables: profiles, gift_exchanges, gift_exchange_members, gift_suggestions

3. **AI Integration**: OpenAI API generates personalized gift suggestions based on user profiles, preferences, and budget

4. **Styling**: TailwindCSS with custom color palette (green/yellow Christmas theme), Shadcn/UI components

5. **Code Quality**:
   - **Required**: JSDoc comments on all functions (enforced by ESLint)
   - **Required**: Copyright header on all files: `// Copyright (c) Gridiron Survivor.\n// Licensed under the MIT License.`
   - **Strict**: No console.log (only console.error allowed), curly braces required, strict equality checks

## Common Pitfalls & Workarounds

### Known Issues
1. **TypeScript Build Error**: `lib/supabase/client.ts` has type mismatch - pre-existing, ignore unless your changes affect Supabase client
2. **Test Failures**: 4 tests fail (Calendar date selection, GiftExchangeHeader worker exceptions) - pre-existing
3. **ESLint Warnings**: JSDoc warnings about React types in Form/LinkCustom - pre-existing
4. **Middleware Error Without .env**: Dev server starts but crashes on first request if Supabase env vars missing

### Build/Test Best Practices
- **Always** run `npm install` after branch changes
- Run `npm run lint` before committing (fix errors, warnings can be ignored if pre-existing)
- Run `npm run test` to ensure your changes don't break passing tests
- For build errors, check if they're pre-existing by checking git status
- When adding new components, follow existing patterns (JSDoc, copyright header, co-located test file)

## Validation Checklist

Before finalizing changes:
1. [ ] Run `npm run lint` - no NEW errors (pre-existing warnings OK)
2. [ ] Run `npm run test` - no NEW failures (4 pre-existing failures OK)
3. [ ] Try `npm run build` - check if NEW TypeScript errors (client.ts error is pre-existing)
4. [ ] Test dev server starts: `npm run dev` (requires .env but should start)
5. [ ] All new functions have JSDoc comments
6. [ ] All new files have copyright header
7. [ ] Component changes include updated tests
8. [ ] Use path aliases (@/components, @/lib, etc.) not relative imports

## GitHub Workflow

**CI/CD**: Single workflow `.github/workflows/update-reviewers.yml` automatically adds peer and senior code reviewers to PRs

**Code Owners**: @shashilo, @nickytonline, @bethanyann (see CODEOWNERS)

**PR Template**: Follow pre-submission checklist in `.github/PULL_REQUEST_TEMPLATE.md`:
- Code builds and passes locally
- PR title follows Conventional Commits format
- Request reviews from specified groups
- Link PR in Discord

## Trust These Instructions

These instructions are comprehensive and validated. Only search or explore further if:
- You encounter NEW errors not documented here
- You need to understand specific business logic in a file
- Instructions appear outdated (check git log for recent changes)

For routine tasks (build, test, lint, file locations), trust this document and proceed directly.
