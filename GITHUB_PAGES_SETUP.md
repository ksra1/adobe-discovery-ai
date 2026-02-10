# GitHub Pages Setup Instructions

This repository is configured to deploy to GitHub Pages using GitHub Actions.

## Required Manual Configuration

To enable GitHub Pages deployment, you need to configure the repository settings:

1. Go to your repository on GitHub: https://github.com/ksra1/adobe-discovery-ai
2. Click on **Settings** (top right)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under **Build and deployment**:
   - Set **Source** to: `GitHub Actions`
   - This allows the custom workflow in `.github/workflows/deploy.yml` to deploy to GitHub Pages

## What This Will Deploy

Once configured, the workflow will:
- Build the Vite/React application on every push to the `main` branch
- Deploy the static files to GitHub Pages
- Make the site available at: https://ksra1.github.io/adobe-discovery-ai/

⚠️ **Important**: The basic site will work, but to enable Google Docs integration and other API-based features, you need to configure API keys. See [GITHUB_PAGES_API_SETUP.md](./GITHUB_PAGES_API_SETUP.md) for complete instructions.

## Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`) will:
1. Checkout the code
2. Set up Node.js
3. Install dependencies
4. Build the project with `npm run build` (including environment variables from GitHub Secrets)
5. Upload the `dist` folder as a Pages artifact
6. Deploy to GitHub Pages

**Note**: API keys are injected during the build step from GitHub repository secrets. Without configuring these secrets, API-dependent features won't work in production. See [GITHUB_PAGES_API_SETUP.md](./GITHUB_PAGES_API_SETUP.md) for setup instructions.

## Troubleshooting

If the deployment fails:
- Check that GitHub Pages is enabled and set to use GitHub Actions
- Verify the workflow has the correct permissions (already configured in the workflow file)
- Check the Actions tab for detailed error logs

## Changes Made to Support GitHub Pages

The following changes were made to support GitHub Pages deployment:

1. **vite.config.ts**: Set `base: '/adobe-discovery-ai/'` to match the repository name
2. **public/.nojekyll**: Added to prevent GitHub Pages from ignoring files starting with underscore
3. **Fixed code issues**: Removed duplicate 'MQLs' key in FormFields.tsx that was causing build warnings
