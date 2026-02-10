# Google Docs & PDF Generation Setup

This document explains how to set up and use the Google Docs integration and PDF generation features.

## Features

1. **Google Docs Integration**: Automatically write discovery data to a Google Document
2. **PDF Generation**: Generate a professionally formatted PDF with DEPT® watermark
3. **LLM Enhancement**: (Optional) Use AI to enhance content formatting

## Setup Instructions

### 1. Google Docs API Setup

To enable Google Docs integration:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Docs API:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Docs API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key" (for simple setup)
   - Or use "OAuth 2.0 Client ID" (for production use)
5. Copy your credentials to `.env` file

### 2. Environment Configuration

Create a `.env` file in the root directory based on `.env.example`:

```bash
cp .env.example .env
```

Then fill in your credentials:

```env
VITE_GOOGLE_API_KEY=your_actual_api_key
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
VITE_GOOGLE_DOC_ID=your_document_id (optional)
```

### 3. OpenAI API (Optional)

For enhanced content generation with AI:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your `.env` file:
   ```env
   VITE_OPENAI_API_KEY=sk-...
   ```

## Usage

### Submitting Discovery Data

1. Complete all sections of the discovery form
2. Navigate to the "Review & Submit" page
3. Click "Submit to Google Docs"
4. The data will be written to Google Docs (or logged for development)
5. You'll receive a link to view the document

### Generating PDF

1. After reviewing your data, click "Generate PDF"
2. The system will:
   - Format the discovery data
   - Apply DEPT® watermark to all pages
   - Generate a professional PDF report
   - Download the file automatically

## Development Mode

When API keys are not configured, the system will:
- Simulate Google Docs API calls
- Still generate PDFs with watermarks
- Log data to the console

This allows development and testing without requiring API credentials.

## Security Notes

- Never commit `.env` files to version control
- API keys should be kept secure
- For production, use OAuth 2.0 instead of API keys
- Consider using environment-specific configurations

## Troubleshooting

### Google Docs API Issues

- **Error: API Key invalid**: Verify your API key in Google Cloud Console
- **Error: Permission denied**: Ensure the Google Docs API is enabled
- **Error: Document not found**: Check the document ID in your `.env` file

### PDF Generation Issues

- **PDF not downloading**: Check browser's download settings
- **Watermark not visible**: Verify DEPT® watermark code in `pdfGenerationService.ts`
- **Content overflow**: Large amounts of data may need pagination adjustments

## Future Enhancements

- Real-time Google Docs synchronization
- Enhanced LLM integration for content generation
- Custom watermark options
- Email delivery of generated reports
- Cloud storage integration

## Support

For issues or questions, please open an issue in the GitHub repository.
