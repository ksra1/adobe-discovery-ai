# GitHub Pages API Setup Guide

## Does This Work on GitHub Pages?

**Yes!** The Adobe Discovery AI tool works on GitHub Pages, including the Google Docs and PDF generation features. However, you need to properly configure API keys for the features to work in production.

## ⚠️ Important Security Notice

**API keys embedded in client-side applications (like this one) are visible to anyone who views the page source or network requests.** This is a limitation of static sites like GitHub Pages.

### Recommendations:
1. **For Development/Testing**: The current setup works fine
2. **For Production**: Consider one of these approaches:
   - Use OAuth 2.0 flow instead of API keys (more secure)
   - Implement a backend proxy server to hide API keys
   - Use API key restrictions in Google Cloud Console
   - Accept the risk for non-sensitive use cases

## Required API Keys

### 1. Google Docs API (Required for Google Docs feature)
- **Purpose**: Save discovery data to Google Docs
- **Where to get it**: [Google Cloud Console](https://console.cloud.google.com/)
- **Cost**: Free (within Google's generous free tier)

### 2. OpenAI API (Optional)
- **Purpose**: Enhanced PDF content formatting with AI
- **Where to get it**: [OpenAI Platform](https://platform.openai.com/)
- **Cost**: Pay-per-use (not required for basic functionality)

## How to Add API Keys for GitHub Pages

### Step 1: Get Your API Keys

#### Google Docs API Setup:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Docs API**:
   - Navigate to: APIs & Services → Library
   - Search: "Google Docs API"
   - Click: Enable
4. Create credentials:
   - Go to: APIs & Services → Credentials
   - Click: "Create Credentials" → "API Key"
   - Copy the API key

5. **IMPORTANT**: Restrict your API key:
   - Click on the API key you just created
   - Under "API restrictions", select "Restrict key"
   - Check only "Google Docs API"
   - Under "Website restrictions", add: `https://ksra1.github.io/*`
   - Save

#### OpenAI API Setup (Optional):
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API keys section
4. Create a new API key
5. Copy the key (starts with `sk-`)

### Step 2: Add API Keys to GitHub Repository

1. Go to your GitHub repository: `https://github.com/ksra1/adobe-discovery-ai`
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

Add each of these secrets:

**Required for Google Docs:**
- **Name**: `VITE_GOOGLE_API_KEY`
  - **Value**: Your Google API key from Step 1

**Optional (for OAuth flow):**
- **Name**: `VITE_GOOGLE_CLIENT_ID`
  - **Value**: Your Google OAuth Client ID (if using OAuth)

**Optional (for LLM enhancement):**
- **Name**: `VITE_OPENAI_API_KEY`
  - **Value**: Your OpenAI API key (if you want AI-enhanced PDFs)

### Step 3: Update GitHub Actions Workflow

The workflow file needs to be updated to pass these secrets as environment variables during the build process.

Edit `.github/workflows/deploy.yml` and add the `env` section to the "Build" step:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_GOOGLE_API_KEY: ${{ secrets.VITE_GOOGLE_API_KEY }}
    VITE_GOOGLE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_CLIENT_ID }}
    VITE_GOOGLE_DOC_ID: ${{ secrets.VITE_GOOGLE_DOC_ID }}
    VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
```

### Step 4: Deploy

Once you commit and push the workflow changes:
1. The GitHub Action will automatically run
2. It will build your app with the API keys embedded
3. Deploy to GitHub Pages
4. Your site will be live at: `https://ksra1.github.io/adobe-discovery-ai/`

## What Each URL/Key Does

| Variable | Purpose | Required? | Example |
|----------|---------|-----------|---------|
| `VITE_GOOGLE_API_KEY` | Authenticate with Google Docs API | Yes (for Google Docs feature) | `AIza...` |
| `VITE_GOOGLE_CLIENT_ID` | OAuth 2.0 authentication | Optional (more secure alternative) | `123-abc.apps.googleusercontent.com` |
| `VITE_GOOGLE_DOC_ID` | Specific document to write to | Optional (can create new docs) | `1BxiMVs0XRA5nFMdKvBdBZjgm...` |
| `VITE_OPENAI_API_KEY` | AI-powered content enhancement | Optional (for LLM features) | `sk-proj-...` |

## Testing Your Setup

### Local Testing (Before Deploying):
```bash
# 1. Create .env file in project root
cp .env.example .env

# 2. Add your API keys to .env file
# Edit .env and add your actual keys

# 3. Run locally
npm install
npm run dev

# 4. Visit http://localhost:8080/adobe-discovery-ai/
# 5. Complete a form and test "Submit to Google Docs" and "Generate PDF"
```

### After GitHub Pages Deployment:
1. Visit `https://ksra1.github.io/adobe-discovery-ai/`
2. Complete the discovery form
3. On the Review & Submit page:
   - Click "Submit to Google Docs" → Should save to Google Docs
   - Click "Generate PDF" → Should download a PDF with DEPT® watermark

## Features That Work Without API Keys

Even without configuring API keys, these features still work:

✅ **Complete the discovery form** - All form fields work
✅ **Navigate between sections** - Full UI functionality
✅ **Generate PDF** - PDF generation works entirely client-side (no API needed)
✅ **Development mode simulation** - Google Docs submission simulates success

❌ **What doesn't work without API keys:**
- Actually writing to Google Docs (will simulate in dev mode)
- LLM-enhanced content formatting (optional feature)

## Troubleshooting

### "API key not valid" error
- Check that you copied the full API key from Google Cloud Console
- Verify the API key is added to GitHub Secrets with the exact name `VITE_GOOGLE_API_KEY`
- Ensure Google Docs API is enabled in your Google Cloud project

### API key visible in browser
- This is normal for client-side applications deployed on GitHub Pages
- Use API restrictions in Google Cloud Console to limit where the key can be used
- For sensitive data, consider implementing a backend proxy

### Changes not appearing on GitHub Pages
- Wait 2-3 minutes for GitHub Actions to complete
- Check the Actions tab for any build errors
- Clear browser cache or try incognito mode
- Verify the workflow file was updated correctly

### Google Docs permission errors
- Ensure your Google API key has Google Docs API enabled
- Check that API restrictions allow your GitHub Pages domain
- Try creating a new API key if issues persist

## Alternative: OAuth 2.0 Flow (More Secure)

For production use, consider implementing OAuth 2.0:

1. In Google Cloud Console, create OAuth 2.0 credentials
2. Add authorized JavaScript origins: `https://ksra1.github.io`
3. Add authorized redirect URIs: `https://ksra1.github.io/adobe-discovery-ai/`
4. Use `VITE_GOOGLE_CLIENT_ID` instead of `VITE_GOOGLE_API_KEY`
5. Implement user authentication flow (requires code changes)

This approach requires users to log in with their Google account, but is much more secure.

## Quick Reference Commands

```bash
# View current secrets (in GitHub UI)
# Settings → Secrets and variables → Actions

# Local development with API keys
npm run dev

# Build with API keys (locally)
VITE_GOOGLE_API_KEY=your_key npm run build

# Preview production build locally
npm run build
npm run preview
```

## Summary

1. ✅ **Yes, it works on GitHub Pages**
2. 🔑 **API Keys needed**: Google Docs API (required), OpenAI API (optional)
3. 📍 **Where to add them**: GitHub repository Settings → Secrets → Actions
4. ⚙️ **Update workflow**: Add `env` section to build step in `.github/workflows/deploy.yml`
5. ⚠️ **Security**: API keys will be visible in built files - use restrictions in Google Cloud Console

For detailed Google Docs API setup, see [GOOGLE_DOCS_SETUP.md](./GOOGLE_DOCS_SETUP.md).
