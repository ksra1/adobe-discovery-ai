# Quick Start: API Keys for GitHub Pages

This is a simplified guide. For complete details, see [GITHUB_PAGES_API_SETUP.md](./GITHUB_PAGES_API_SETUP.md).

## 📋 Checklist

### ✅ Step 1: Get Google API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project → Enable "Google Docs API"
3. Create API Key
4. **Restrict it**: Only allow Google Docs API + your GitHub Pages URL

### ✅ Step 2: Add to GitHub Secrets
1. Go to: `https://github.com/[your-username]/adobe-discovery-ai/settings/secrets/actions`
2. Click "New repository secret"
3. Add: `VITE_GOOGLE_API_KEY` = `[your-api-key]`

### ✅ Step 3: Workflow Already Updated ✅
The `.github/workflows/deploy.yml` file has been updated to use your secrets automatically.

### ✅ Step 4: Deploy
1. Commit any changes to `main` branch
2. GitHub Actions will build and deploy automatically
3. Visit: `https://[your-username].github.io/adobe-discovery-ai/`

## 🎯 What You Get

| Feature | Works Without API Keys? | With API Keys |
|---------|------------------------|---------------|
| Fill out discovery form | ✅ Yes | ✅ Yes |
| Generate PDF with watermark | ✅ Yes | ✅ Yes |
| Submit to Google Docs | ❌ Simulated only | ✅ Actually writes to Google Docs |
| LLM-enhanced content | ❌ No | ⭐ Yes (with OpenAI key) |

## 🔑 All Available API Keys

```
Required:
VITE_GOOGLE_API_KEY=your_key_here          # For Google Docs integration

Optional:
VITE_GOOGLE_CLIENT_ID=your_id.apps.google  # For OAuth (more secure)
VITE_OPENAI_API_KEY=sk-...                 # For AI features
VITE_GOOGLE_DOC_ID=1BxiMVs...              # Specific doc to write to
```

## 🚨 Security Warning

API keys in client-side apps (GitHub Pages) are **visible** to anyone who visits your site.

**Mitigations:**
- ✅ Use Google Cloud Console to restrict API key usage
- ✅ Only allow your GitHub Pages domain
- ✅ Only enable Google Docs API for the key
- ⚠️ Never use this for sensitive/private data
- 🔐 Consider OAuth 2.0 for production use

## 🆘 Troubleshooting

**"API key not valid"**
→ Check you copied the entire key, including any equals signs at the end

**Feature still doesn't work after adding key**
→ Wait 2-3 minutes for GitHub Actions to rebuild
→ Check Actions tab for build errors
→ Clear browser cache

**Want to test locally first?**
```bash
cp .env.example .env
# Edit .env and add your keys
npm install
npm run dev
```

## 📚 More Help

- **Complete Setup Guide**: [GITHUB_PAGES_API_SETUP.md](./GITHUB_PAGES_API_SETUP.md)
- **Google Docs Details**: [GOOGLE_DOCS_SETUP.md](./GOOGLE_DOCS_SETUP.md)
- **GitHub Pages Basics**: [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)

---

**TL;DR**: Get Google API key → Add to GitHub Secrets as `VITE_GOOGLE_API_KEY` → Done! 🎉
