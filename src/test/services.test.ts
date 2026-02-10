import { describe, it, expect, beforeEach } from 'vitest';
import { GoogleDocsService } from '@/services/googleDocsService';
import { PDFGenerationService } from '@/services/pdfGenerationService';
import { DEFAULT_FORM_DATA } from '@/types/discovery';

describe('GoogleDocsService', () => {
  let service: GoogleDocsService;

  beforeEach(() => {
    service = new GoogleDocsService();
  });

  it('should initialize successfully', async () => {
    await expect(service.initialize()).resolves.toBeUndefined();
  });

  it('should write to Google Docs and return success', async () => {
    const result = await service.writeToGoogleDocs(DEFAULT_FORM_DATA);
    
    expect(result.success).toBe(true);
    expect(result.documentId).toBeDefined();
    expect(result.documentUrl).toBeDefined();
    expect(result.documentUrl).toContain('docs.google.com');
  });

  it('should read from Google Docs', async () => {
    const result = await service.readFromGoogleDocs('test_doc_id');
    
    expect(result.success).toBe(true);
    expect(result.content).toBeDefined();
  });
});

describe('PDFGenerationService', () => {
  let service: PDFGenerationService;

  beforeEach(() => {
    service = new PDFGenerationService();
  });

  it('should generate PDF successfully', async () => {
    const testData = {
      ...DEFAULT_FORM_DATA,
      generalInfo: {
        ...DEFAULT_FORM_DATA.generalInfo,
        companyName: 'Test Company',
      },
    };

    const result = await service.generatePDF(testData);
    
    expect(result.success).toBe(true);
    expect(result.blob).toBeDefined();
    expect(result.blob).toBeInstanceOf(Blob);
  });

  it('should handle errors gracefully', async () => {
    // Test with invalid data
    const invalidData = null as any;
    
    const result = await service.generatePDF(invalidData);
    
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
