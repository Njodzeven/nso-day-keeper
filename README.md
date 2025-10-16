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