import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

const ACRONYM_DEFS: Record<string, string> = {
  // Regions
  'EMEA': 'Europe, Middle East, and Africa',
  'UK': 'United Kingdom',
  'DACH': 'Germany (D), Austria (A), and Switzerland (CH)',
  'Nordics': 'Denmark, Finland, Iceland, Norway, and Sweden',
  'ANZ': 'Australia and New Zealand',
  'APAC': 'Asia-Pacific',
  'NA': 'North America',
  'LATAM': 'Latin America',
  'SEA': 'Southeast Asia',
  
  // Metrics & Business
  'NPS': 'Net Promoter Score - Measures customer loyalty and likelihood to recommend',
  'CSAT': 'Customer Satisfaction Score - Measures satisfaction with a specific interaction or product',
  'MQLs': 'Marketing Qualified Leads - Leads identified as more likely to become customers',
  'SQL': 'Sales Qualified Lead',
  'SQLs': 'Sales Qualified Leads',
  'LTV': 'Lifetime Value',
  'CLV': 'Customer Lifetime Value',
  'ROI': 'Return on Investment',
  'KPIs': 'Key Performance Indicators',
  'SLA': 'Service Level Agreement',
  'PMO': 'Project Management Office',
  'B2C': 'Business to Consumer',
  'B2B': 'Business to Business',
  'B2P': 'Business to Person (Hybrid model)',
  
  // Technology & Adobe
  'AEM': 'Adobe Experience Manager',
  'AEP': 'Adobe Experience Platform',
  'RTCDP': 'Real-Time Customer Data Platform',
  'CDP': 'Customer Data Platform',
  'CJA': 'Customer Journey Analytics',
  'AJO': 'Adobe Journey Optimizer',
  'DAM': 'Digital Asset Management',
  'PIM': 'Product Information Management',
  'CMS': 'Content Management System',
  'CRM': 'Customer Relationship Management',
  'POS': 'Point of Sale',
  'ECID': 'Experience Cloud ID',
  'MVT': 'Multivariate Testing',
  'A4T': 'Analytics for Target',
  'SSO': 'Single Sign-On',
  'SDK': 'Software Development Kit',
  'API': 'Application Programming Interface',
  'SPA': 'Single Page Application',
  'OOTB': 'Out of the Box (Standard features)',
  
  // Compliance
  'GDPR': 'General Data Protection Regulation (EU)',
  'CCPA': 'California Consumer Privacy Act',
  'HIPAA': 'Health Insurance Portability and Accountability Act',
  'PCI': 'Payment Card Industry compliance',
};

const TooltipIcon = ({ term }: { term: string }) => {
  // Check for exact match or if term contains known acronyms (e.g. "NPS / CSAT")
  const definition = ACRONYM_DEFS[term] || 
    Object.keys(ACRONYM_DEFS).find(k => term.includes(k) && ACRONYM_DEFS[k]);

  if (!definition && !ACRONYM_DEFS[term]) {
    // Try to find if multiple acronyms are in the string (like "NPS / CSAT")
    const parts = term.split(/[^a-zA-Z0-9]+/).filter(p => ACRONYM_DEFS[p]);
    if (parts.length > 0) {
      return (
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Info className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-[#ff4901] cursor-help transition-colors" />
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs space-y-2">
            {parts.map(p => (
              <div key={p}>
                <span className="font-bold text-[#ff4901]">{p}:</span> {ACRONYM_DEFS[p]}
              </div>
            ))}
          </TooltipContent>
        </Tooltip>
      );
    }
    return null;
  }

  const finalDef = ACRONYM_DEFS[term] || (Object.keys(ACRONYM_DEFS).find(k => term.includes(k)) ? ACRONYM_DEFS[Object.keys(ACRONYM_DEFS).find(k => term.includes(k))!] : null);

  if (!finalDef) return null;

  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <Info className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-[#ff4901] cursor-help transition-colors" />
      </TooltipTrigger>
      <TooltipContent side="right">
        <p className="max-w-xs">{finalDef}</p>
      </TooltipContent>
    </Tooltip>
  );
};

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
}

export function TextField({ label, value, onChange, placeholder, type = 'text' }: TextFieldProps) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <TooltipIcon term={label} />
      </div>
      <Input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-card border-border"
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function TextAreaField({ label, value, onChange, placeholder }: TextAreaFieldProps) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <TooltipIcon term={label} />
      </div>
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Enter additional context...'}
        className="bg-card border-border min-h-[80px]"
      />
    </div>
  );
}

interface DropdownFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
}

export function DropdownField({ label, value, onChange, options, placeholder }: DropdownFieldProps) {
  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <TooltipIcon term={label} />
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder={placeholder || 'Select...'} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border z-50">
          {options.map(opt => (
            <SelectItem key={opt} value={opt}>
              <div className="flex items-center justify-between w-full">
                <span>{opt}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface MultiSelectFieldProps {
  label: string;
  selected: string[];
  onChange: (val: string[]) => void;
  options: string[];
}

export function MultiSelectField({ label, selected, onChange, options }: MultiSelectFieldProps) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter(s => s !== opt)
        : [...selected, opt]
    );
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <TooltipProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {options.map(opt => (
            <div key={opt} className="flex items-center gap-2 group py-1">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={selected.includes(opt)}
                  onCheckedChange={() => toggle(opt)}
                  className="border-input data-[state=checked]:bg-[#ff4901] data-[state=checked]:border-[#ff4901]"
                />
                <span className="text-foreground">{opt}</span>
              </label>
              
              <TooltipIcon term={opt} />
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}

interface RadioFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}

export function RadioField({ label, value, onChange, options }: RadioFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-1">
        {options.map(opt => (
          <div key={opt} className="flex items-center gap-2 group py-1">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <RadioGroupItem value={opt} className="border-input" />
              <span className="text-foreground">{opt}</span>
            </label>
            <TooltipIcon term={opt} />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

interface ScaleFieldProps {
  label: string;
  items: string[];
  values: Record<string, string>;
  onChange: (key: string, val: string) => void;
  scaleOptions: string[];
}

export function ScaleField({ label, items, values, onChange, scaleOptions }: ScaleFieldProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 font-medium text-foreground min-w-[160px]">Product</th>
              {scaleOptions.map(opt => (
                <th key={opt} className="text-center py-2 px-1 font-medium text-muted-foreground text-xs min-w-[80px]">
                  {opt}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item} className="border-b border-border/50 group">
                <td className="py-2 pr-4 text-foreground">
                  <div className="flex items-center gap-2">
                    {item}
                    <TooltipIcon term={item} />
                  </div>
                </td>
                {scaleOptions.map(opt => (
                  <td key={opt} className="text-center py-2 px-1">
                    <input
                      type="radio"
                      name={`scale-${item}`}
                      checked={values[item] === opt}
                      onChange={() => onChange(item, opt)}
                      className="accent-primary cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SectionWrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#ff4901]">{title}</h2>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

export function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 p-4 rounded-md bg-muted/30 border border-border/50">
      <h3 className="text-sm font-bold text-[#ff4901] uppercase tracking-wider">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
