import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SECTIONS } from '@/types/discovery';
import { Button } from '@/components/ui/button';
import { Send, FileText, Download, Loader2 } from 'lucide-react';
import { googleDocsService } from '@/services/googleDocsService';
import { pdfGenerationService } from '@/services/pdfGenerationService';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function renderValue(val: unknown): string {
  if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : '—';
  if (typeof val === 'object' && val !== null) {
    const entries = Object.entries(val as Record<string, string>).filter(([, v]) => v);
    return entries.length > 0 ? entries.map(([k, v]) => `${k}: ${v}`).join('; ') : '—';
  }
  return (val as string) || '—';
}

function SectionSummary({ title, data, onEdit }: { title: string; data: Record<string, unknown>; onEdit: () => void }) {
  return (
    <div className="border border-border rounded-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onEdit} className="text-primary text-xs h-7">
          Edit
        </Button>
      </div>
      <div className="px-4 py-3 space-y-2">
        {Object.entries(data).map(([key, val]) => (
          <div key={key} className="flex gap-2 text-sm">
            <span className="text-muted-foreground min-w-[140px] capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </span>
            <span className="text-foreground">{renderValue(val)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewSubmit() {
  const { formData, setCurrentSection, setIsSubmitted } = useDiscovery();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleDocsUrl, setGoogleDocsUrl] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Write to Google Docs
      toast({
        title: 'Submitting...',
        description: 'Writing discovery data to Google Docs...',
      });

      const result = await googleDocsService.writeToGoogleDocs(formData);

      if (result.success && result.documentUrl) {
        setGoogleDocsUrl(result.documentUrl);
        toast({
          title: 'Success!',
          description: 'Discovery data has been written to Google Docs.',
        });
        console.log('Discovery form data:', JSON.stringify(formData, null, 2));
        setIsSubmitted(true);
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to write to Google Docs.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during submission.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      toast({
        title: 'Generating PDF...',
        description: 'Creating your discovery report with DEPT® watermark...',
      });

      const result = await pdfGenerationService.generatePDF(formData);

      if (result.success && result.blob) {
        const filename = `adobe-discovery-${formData.generalInfo.companyName || 'report'}-${new Date().toISOString().split('T')[0]}.pdf`;
        pdfGenerationService.downloadPDF(result.blob, filename);
        
        toast({
          title: 'PDF Generated!',
          description: 'Your discovery report has been downloaded.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to generate PDF.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during PDF generation.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground">Review & Submit</h2>
        <p className="text-sm text-muted-foreground">Review all responses before submitting. Click Edit to modify any section.</p>
      </div>

      {SECTIONS.map((section, index) => (
        <SectionSummary
          key={section.id}
          title={section.label}
          data={formData[section.id as keyof typeof formData] as unknown as Record<string, unknown>}
          onEdit={() => setCurrentSection(index)}
        />
      ))}

      <div className="flex justify-center pt-4 gap-3">
        <Button 
          onClick={handleSubmit} 
          size="lg" 
          className="dept-gradient text-primary-foreground font-semibold gap-2 px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit to Google Docs
            </>
          )}
        </Button>
        
        <Button 
          onClick={handleGeneratePDF} 
          size="lg" 
          variant="outline"
          className="border-[#ff4901] text-[#ff4901] hover:bg-[#ff4901] hover:text-white font-semibold gap-2 px-8"
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" /> Generate PDF
            </>
          )}
        </Button>
      </div>
      
      {googleDocsUrl && (
        <div className="mt-4 p-4 bg-muted/50 rounded-md border border-border">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Google Doc created:</span>
            <a 
              href={googleDocsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              View Document
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
