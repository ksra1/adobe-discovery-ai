import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Building2, Calendar, User } from 'lucide-react';

interface EntryRecord {
  id: string;
  companyName: string;
  contactName: string;
  industry: string;
  submittedAt: string;
}

interface SearchRecordsProps {
  onBack: () => void;
}

export function SearchRecords({ onBack }: SearchRecordsProps) {
  const [records, setRecords] = useState<EntryRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const q = query(collection(db, 'entries'), orderBy('companyName'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            companyName: d.generalInfo?.companyName || 'Unnamed',
            contactName: d.generalInfo?.contactName || '—',
            industry: d.generalInfo?.industry || '—',
            submittedAt: d.submittedAt || '—',
          };
        });
        setRecords(data);
      } catch (err: any) {
        console.error('Error fetching records:', err);
        setError('Failed to load records. Please check your Firestore configuration.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);

  const filtered = records.filter(r =>
    r.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </Button>
          <span className="text-sm font-semibold text-foreground">Search Existing Records</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by company name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        {loading && (
          <div className="text-center py-12 text-muted-foreground">Loading records...</div>
        )}

        {error && (
          <div className="dept-gradient rounded-lg p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            {records.length === 0 ? 'No records found in Firestore.' : 'No matching records.'}
          </div>
        )}

        <div className="space-y-3">
          {filtered.map(record => (
            <div key={record.id} className="dept-gradient rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground tracking-tight flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    {record.companyName}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {record.contactName}
                    </span>
                    <span>{record.industry}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {record.submittedAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
