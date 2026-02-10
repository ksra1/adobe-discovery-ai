import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
}

export function TextField({ label, value, onChange, placeholder, type = 'text' }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
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
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
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
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-card border-border">
          <SelectValue placeholder={placeholder || 'Select...'} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border z-50">
          {options.map(opt => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer py-1">
            <Checkbox
              checked={selected.includes(opt)}
              onCheckedChange={() => toggle(opt)}
              className="border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <span className="text-foreground">{opt}</span>
          </label>
        ))}
      </div>
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
          <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer py-1">
            <RadioGroupItem value={opt} className="border-input" />
            <span className="text-foreground">{opt}</span>
          </label>
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
              <tr key={item} className="border-b border-border/50">
                <td className="py-2 pr-4 text-foreground">{item}</td>
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
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

export function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 p-4 rounded-md bg-muted/30 border border-border/50">
      <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
