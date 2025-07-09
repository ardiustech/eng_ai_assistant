# Google Docs Skill

This skill provides Eng AI Assistant capabilities for automated retrieval and manipulation of Google Docs content using browser automation with Microsoft Edge remote debugging.

## Features

- Retrieve full document content from Google Docs
- Extract document structure including headings and outline
- Save content in both JSON and formatted text formats
- Manual authentication support (no credential storage)
- Automatic word count and metadata extraction
- Reusable components for other skills needing document processing

## Usage

### Test Connection

First, verify that you can connect to Google Docs:

```bash
npm run google-docs-test
```

This will:
1. Launch Edge browser (if not already running)
2. Check if you're authenticated with Google
3. Prompt you to log in if needed

### Retrieve Document Content

To retrieve content from a Google Doc:

```bash
npm run google-docs "https://docs.google.com/document/d/YOUR_DOCUMENT_ID/edit"
```

The Eng AI Assistant will:
1. Connect to your authenticated Google session
2. Navigate to the document
3. Extract the full content and structure
4. Save the data in two formats:
   - JSON file with structured data
   - Text file with formatted content

## Output Files

The skill creates two files in the repository root:

### JSON Format (`google-doc-[timestamp].json`)
Contains:
- Document title
- Full content
- Document outline (headings)
- Word count
- Document ID
- Extraction timestamp

### Text Format (`google-doc-[timestamp].txt`)
Contains:
- Formatted document information
- Document outline
- Full document content

## Authentication

This skill uses your existing Google authentication from the Edge browser:
1. No passwords or credentials are stored
2. Supports Google's 2FA/MFA
3. Session persists between Eng AI Assistant operations

## Configuration

Edit `config.js` to customize:
- Timeouts
- Output directory
- File naming
- Viewport size

## Skill Architecture

This skill demonstrates:
- **Reusable Pattern**: Document extraction methods can be adapted for other document services
- **Shared Components**: Uses `BrowserHelper` from `lib/` for browser management
- **Modular Design**: Document processing logic can be extracted to `lib/` for broader reuse
- **Accumulated Learning**: Best practices documented for future skill development

## Troubleshooting

### "Not authenticated with Google"
- Log in to Google in the Edge browser window
- Run the test script again

### "Access denied to document"
- Ensure you have permission to view the document
- Check if the document is shared with your Google account

### Content not loading
- The script takes a screenshot on error (check `google-docs-error.png`)
- Try increasing timeouts in `config.js`
- Ensure you're using a public or shared document URL

## Future Enhancements

Potential skill improvements:
- Document editing capabilities
- Comment extraction
- Version history access
- Batch document processing
- Integration with other document services 