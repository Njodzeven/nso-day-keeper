# NSO Day Keeper

This repository contains a small Vite + React + TypeScript app configured to be built and deployed to GitHub Pages (project site) and includes PWA support.

This README documents how to build and run locally, how CI is configured to publish to `gh-pages`, and how to (un)publish the site in GitHub Pages settings.

## Quick links

- Project site (expected): https://njodzeven.github.io/nso-day-keeper/

## Requirements

- Node.js 20+ (LTS recommended)
- npm 9+ (or npm 10 as present in newer Node)
- Git

## Local development

1. Install dependencies

```bash
npm ci
```

2. Start dev server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production build locally

```bash
npm run preview
```

Notes:
- The `build` script runs TypeScript project build and then `vite build`.
- The output directory is `dist`.

## CI / Deployment (GitHub Actions)

This repository contains a workflow at `.github/workflows/deploy.yml` that:

- Runs on push to `master` and on published releases.
- Installs dependencies with `npm ci`.
- Builds the project into `./dist`.
- Uses `peaceiris/actions-gh-pages` to publish `./dist` to the `gh-pages` branch.

Key configuration in the workflow:

- `permissions: contents: write` — allows the workflow to push to `gh-pages` using the provided `GITHUB_TOKEN`.
- `publish_dir: ./dist` and `publish_branch: gh-pages` — where to find build output and which branch to publish.
- `force_orphan: true` — the action creates/overwrites the `gh-pages` branch as an orphan to ensure a clean deployed branch.

You do not need to re-create the workflow after unpublishing; the workflow file and `gh-pages` branch remain in the repo.

## GitHub Pages site configuration

Because this repository is a project site (not a user/org site), Pages must be served from the `gh-pages` branch root.

To confirm or set Pages settings in the GitHub web UI:

1. Go to the repository on GitHub.
2. Click `Settings` in the repo navigation.
3. In the sidebar, click `Pages` (may be under "Code and automation" or similar).
4. For "Source" select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click `Save` or `Save and deploy`.

If you don't see a "Publish" button, the UI will simply show the configured source. If you previously clicked "Unpublish", the same panel will let you re-select a source and save it — that's the way to re-enable publishing.

If the Pages UI shows the source is already `gh-pages` but the site returns 404:

- Wait 30–90 seconds then refresh. GitHub sometimes needs a moment to provision the site.
- Clear your browser cache or try an incognito window.

## How to safely unpublish and republish

- "Unpublish" simply disables Pages. It does not delete the `gh-pages` branch nor the Actions workflow. You can click Unpublish, then re-select `gh-pages` → `/ (root)` and save to republish. No workflow reconfiguration is necessary.
- After republishing wait ~1 minute and check the site again.

## Manual verification commands (run locally)

Run these in the repo clone to verify what's on the `gh-pages` branch and the live site:

```bash
# fetch the latest gh-pages branch
git fetch origin gh-pages

# list files present on gh-pages
git ls-tree --name-only -r origin/gh-pages

# show the first part of index.html
git show origin/gh-pages:index.html | sed -n '1,160p'

# check the live URL headers (replace with your repo URL if different)
curl -I -L https://njodzeven.github.io/nso-day-keeper/

# ensure .nojekyll exists (helps when serving files in nested folders)
git show origin/gh-pages:.nojekyll || echo ".nojekyll is missing"
```

Expected results:
- `index.html` and `assets/` files should be in `origin/gh-pages`.
- `curl` should return HTTP 200 and content-type `text/html` once Pages is active.

## Troubleshooting

- 404 after selecting `gh-pages`: confirm `index.html` exists at root of `gh-pages`. Confirm index.html asset URLs are correct for a project site (the `base` path like `/nso-day-keeper/` or relative URLs should match). Wait a minute and retry.
- Browser shows 404 but `curl` shows 200: try clearing cache, use incognito, or check service worker caching issues (PWA). If a service worker served an old response, unregister it in DevTools -> Application -> Service Workers.
- Actions cannot push to `gh-pages` (git exit code 128): ensure the workflow has `permissions: contents: write` and that the token hasn't been overridden. The included workflow already sets `permissions`.
- If your Pages settings don't show a publish/unpublish button: GitHub sometimes updates the UI. Look for the "Source" section and choose `gh-pages` → `/ (root)` and save. If the repo is in an organization with enforced policies, you may need admin access.

## Alternative: manual deploy to gh-pages (local)

If you prefer to publish the `dist` directory manually from your machine:

```bash
npm run build
git checkout --orphan gh-pages
git --work-tree dist add --all
git --work-tree dist commit -m "Publish site"
git push -f origin gh-pages
git checkout -   # go back to previous branch
```

This force-updates `gh-pages` from your local `dist` without touching the workflow.

## Notes about PWA

- The project includes `manifest.webmanifest`, a basic `sw.js` service worker in `public/`, and `src/registerPWA.ts` which registers the service worker on load.
- If you change the service worker, users may need to refresh and/or unregister the old service worker for new content to appear.

## Contact / next steps

If the site still 404s after republishing or the verification commands show everything is correct but the site is not served, paste the outputs of the commands above here and I will inspect them and suggest the exact fix.

---
Generated by the repo assistant to document build and deployment steps.
 #Nso Day Keeper

    A small cultural-calendar web app built with React, TypeScript and Vite that presents the Nso traditional eight-day week, cultural notes, phrases, proverbs and story prompts.

    This repository contains the UI and a GitHub Actions workflow that builds the app and deploys the static output (the `dist` folder) to GitHub Pages using the GitHub Actions Pages integration.

    ## Features

    - Calendar UI with Nso week day names and cultural content.
    - Daily phrase and proverb/story prompts for selected days.
    - Mobile-friendly responsive layout using Tailwind-like utility classes (project ships with PostCSS and Tailwind listed as dev dependencies).
    - GitHub Actions workflow to build and deploy to GitHub Pages.

    ## Quick start

    Requirements:

    - Node.js 18+ (Node 20 recommended)
    - npm

    Install dependencies:

    ```bash
    npm ci
    ```

    Start the dev server:

    ```bash
    npm run dev
    ```

    Open http://localhost:5173 (Vite default) in your browser.

    ## Build

    Create a production build (outputs to `dist`):

    ```bash
    npm run build
    ```

    You can preview the production build locally with:

    ```bash
    npm run preview
    ```

    ## Deployment (GitHub Pages via Actions)

    This repository includes a workflow at `.github/workflows/deploy.yml` that:

    - Installs dependencies and builds the app (producing the `dist` folder).
    - Uploads `dist` as a Pages artifact and uses the `actions/deploy-pages` action to publish it.

    Important notes:

    - In your repository Settings → Pages, if you set the "Source" to "GitHub Actions" the workflow will publish automatically when it runs.
    - The workflow sets the job environment to `github-pages`. Do not attempt to reference step outputs in the job's `environment` block — those outputs are only available after the step runs.

    If you want the workflow to echo the published URL after deployment, the workflow can include a follow-up step that prints `steps.deploy.outputs.page_url`.

    ## Troubleshooting

    - "could not determine executable to run" when running `npx tailwindcss init -p`:
      - Ensure `tailwindcss` is installed locally (it's included in `devDependencies`). Run `npm ci` or `npm i -D tailwindcss postcss autoprefixer` and then run `npx tailwindcss init -p`.

    - TypeScript unused variable errors during `npm run build`:
      - Edit the files to remove or use the declared but unused variables. The project typechecks as part of the `build` script (`tsc -b`).

    - Workflow failing with `environment.url` errors:
      - Job-level environment fields can't reference step outputs. Instead, read `steps.deploy.outputs.page_url` in a subsequent step.

    ## Contributing

    Contributions are welcome. Please open issues or PRs.