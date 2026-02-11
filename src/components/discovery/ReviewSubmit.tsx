import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SECTIONS } from '@/types/discovery';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

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

  const handleSubmit = () => {
    console.log('Discovery form data:', JSON.stringify(formData, null, 2));
    setIsSubmitted(true);
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

      <div className="flex justify-center pt-4">
        <Button onClick={handleSubmit} size="lg" className="dept-gradient text-primary-foreground font-semibold gap-2 px-8">
          <Send className="w-4 h-4" /> Submit Discovery
        </Button>
      </div>
    </div>
  );
}
