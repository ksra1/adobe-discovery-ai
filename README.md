# Adobe Experience Cloud Discovery Tool by DEPT®

## Project info

This tool is designed to facilitate the discovery process for Adobe Experience Cloud implementations.

## Features

- **Multi-section Discovery Form**: Comprehensive questionnaire covering all Adobe Experience Cloud products
- **Google Docs Integration**: Automatically save discovery data to Google Docs (no database required!)
- **PDF Generation**: Generate professional PDF reports with DEPT® watermark
- **LLM-Enhanced Reports**: Optional AI-powered content formatting for polished outputs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## How can I edit this code?

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Google Docs API (for data storage)
- jsPDF (for PDF generation)
- OpenAI API (optional, for enhanced content)

## Google Docs & PDF Features

This tool integrates with Google Docs to save discovery data without requiring a database or paid services. It can also generate professional PDF reports with DEPT® watermarking.

### Setup for GitHub Pages Deployment

⚠️ **Deploying to GitHub Pages?** See [GITHUB_PAGES_API_SETUP.md](./GITHUB_PAGES_API_SETUP.md) for detailed instructions on:
- What API keys are needed
- Where to add them (GitHub repository secrets)
- How to configure the deployment workflow
- Security considerations for client-side API keys

### Local Development Setup

See [GOOGLE_DOCS_SETUP.md](./GOOGLE_DOCS_SETUP.md) for detailed setup instructions.

Quick start:
1. Copy `.env.example` to `.env`
2. Add your Google API credentials (optional for development)
3. The tool works without API keys in development mode

### Usage

1. Complete the discovery form
2. Click "Submit to Google Docs" to save data
3. Click "Generate PDF" to download a formatted report with DEPT® watermark

## How can I deploy this project?

This project can be deployed to any static site hosting service (Vercel, Netlify, GitHub Pages, etc.).

```sh
# Build the project
npm run build
```
