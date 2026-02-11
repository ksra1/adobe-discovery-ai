import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileBarChart, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CompanyOption {
  id: string;
  companyName: string;
}

interface GenerateReportProps {
  onBack: () => void;
}

async function generateReportPlaceholder(companyName: string): Promise<string> {
  // Placeholder for Perplexity LLM integration
  await new Promise(resolve => setTimeout(resolve, 2000));
  return `# Assessment Report: ${companyName}

## Executive Summary
This is a placeholder report for **${companyName}**. The full AI-generated assessment will be powered by Perplexity LLM integration.

## Current State Assessment
- Adobe Experience Cloud adoption analysis pending
- Maturity scoring across product areas pending

## Recommendations
1. **Quick Wins (0–3 months):** To be determined based on discovery data
2. **Medium-Term (3–12 months):** Strategic initiatives pending analysis
3. **Long-Term (12+ months):** Transformation roadmap pending

## Next Steps
Connect the Perplexity API to generate real AI-powered assessments from the discovery data.`;
}

export function GenerateReport({ onBack }: GenerateReportProps) {
  const [companies, setCompanies] = useState<CompanyOption[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingCompanies, setFetchingCompanies] = useState(true);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const q = query(collection(db, 'entries'), orderBy('companyName'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          companyName: doc.data().generalInfo?.companyName || 'Unnamed',
        }));
        setCompanies(data);
      } catch (err) {
        console.error('Error fetching companies:', err);
      } finally {
        setFetchingCompanies(false);
      }
    }
    fetchCompanies();
  }, []);

  const handleGenerate = async () => {
    if (!selectedCompany) return;
    const company = companies.find(c => c.id === selectedCompany);
    if (!company) return;

    setLoading(true);
    setReport('');
    try {
      const result = await generateReportPlaceholder(company.companyName);
      setReport(result);
    } catch (err) {
      console.error('Report generation error:', err);
      setReport('Error generating report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </Button>
          <span className="text-sm font-semibold text-foreground">Generate Report</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="dept-gradient rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Select a Company</h2>
          <p className="text-sm text-muted-foreground">
            Choose a completed discovery entry to generate an AI-powered assessment report.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full sm:w-80">
                <SelectValue placeholder={fetchingCompanies ? 'Loading companies...' : 'Select a company'} />
              </SelectTrigger>
              <SelectContent>
                {companies.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.companyName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleGenerate}
              disabled={!selectedCompany || loading}
              className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <FileBarChart className="w-4 h-4" /> Generate Report
                </>
              )}
            </Button>
          </div>
        </div>

        {report && (
          <div className="dept-gradient rounded-lg p-8 space-y-4">
            <div className="prose prose-sm max-w-none text-foreground">
              {report.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-2xl font-black tracking-tight text-foreground mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-lg font-bold tracking-tight text-foreground mt-6 mb-2">{line.slice(3)}</h2>;
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="text-sm text-muted-foreground ml-4">{line.slice(2)}</li>;
                }
                if (line.match(/^\d+\./)) {
                  return <li key={i} className="text-sm text-foreground ml-4 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
                }
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-sm text-muted-foreground">{line}</p>;
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
