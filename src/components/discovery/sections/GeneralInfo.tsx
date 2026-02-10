import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, TextField, DropdownField, MultiSelectField, TextAreaField } from '../FormFields';

const INDUSTRIES = [
  'Automotive', 'Retail', 'Financial Services', 'Travel & Hospitality',
  'Healthcare', 'B2B SaaS', 'Media & Entertainment', 'Public Sector', 'Other',
];

const MARKETS = [
  'North America', 'Latin America', 'EMEA', 'UK', 'DACH',
  'Nordics', 'APAC', 'Japan', 'ANZ', 'India', 'Global',
];

const TEAM_SIZES = ['1–5', '6–15', '16–30', '31–50', '51–100', '100+'];

const BUDGET_RANGES = [
  'Under $100K', '$100K–$500K', '$500K–$1M', '$1M–$5M',
  '$5M–$10M', '$10M+', 'Prefer not to say',
];

export function GeneralInfoSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.generalInfo;
  const set = (updates: Partial<typeof d>) => updateSection('generalInfo', updates);

  return (
    <SectionWrapper title="General Company Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Company Name" value={d.companyName} onChange={v => set({ companyName: v })} placeholder="Acme Corp" />
        <TextField label="Website URL(s)" value={d.websiteUrls} onChange={v => set({ websiteUrls: v })} placeholder="https://example.com" />
      </div>
      <DropdownField label="Industry" value={d.industry} onChange={v => set({ industry: v })} options={INDUSTRIES} placeholder="Select industry..." />
      <MultiSelectField label="Primary Markets / Regions" selected={d.primaryMarkets} onChange={v => set({ primaryMarkets: v })} options={MARKETS} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Interview Date" value={d.interviewDate} onChange={v => set({ interviewDate: v })} type="date" />
        <TextField label="Interviewer Name" value={d.interviewerName} onChange={v => set({ interviewerName: v })} />
      </div>
      <TextField label="Interviewer Role" value={d.interviewerRole} onChange={v => set({ interviewerRole: v })} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Primary Contact Name" value={d.contactName} onChange={v => set({ contactName: v })} />
        <TextField label="Contact Email" value={d.contactEmail} onChange={v => set({ contactEmail: v })} type="email" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField label="Contact Role" value={d.contactRole} onChange={v => set({ contactRole: v })} />
        <TextField label="Contact Department" value={d.contactDepartment} onChange={v => set({ contactDepartment: v })} />
      </div>
      <DropdownField label="Size of Digital / Marketing Team" value={d.teamSize} onChange={v => set({ teamSize: v })} options={TEAM_SIZES} />
      <TextAreaField label="Agencies / Partners Involved" value={d.agenciesPartners} onChange={v => set({ agenciesPartners: v })} placeholder="List agencies or partners..." />
      <DropdownField label="Annual Digital Marketing Budget Range" value={d.budgetRange} onChange={v => set({ budgetRange: v })} options={BUDGET_RANGES} />
    </SectionWrapper>
  );
}
