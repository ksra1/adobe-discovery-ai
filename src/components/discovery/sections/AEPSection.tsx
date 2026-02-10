import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, DropdownField, TextAreaField } from '../FormFields';

export function AEPSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.aep;
  const set = (updates: Partial<typeof d>) => updateSection('aep', updates);

  return (
    <SectionWrapper title="Adobe Experience Platform / CDP (RTCDP)">
      <FieldGroup title="Licensing & Scope">
        <RadioField label="RTCDP license type" value={d.rtcdpLicenseType} onChange={v => set({ rtcdpLicenseType: v })} options={['B2C', 'B2B', 'B2P', 'Standard', 'Not sure', 'Not licensed']} />
        <RadioField label="AEP usage status" value={d.usageStatus} onChange={v => set({ usageStatus: v })} options={['Not purchased', 'Purchased not implemented', 'In implementation', 'In production', 'Advanced / optimized']} />
      </FieldGroup>

      <FieldGroup title="Data & Identity">
        <MultiSelectField label="Data sources connected to AEP" selected={d.dataSources} onChange={v => set({ dataSources: v })} options={['CRM', 'Web events', 'Mobile app events', 'Offline POS', 'Call center', 'Loyalty', 'Data warehouse / lake', 'Ad platforms', 'Other']} />
        <MultiSelectField label="Primary identifiers" selected={d.primaryIdentifiers} onChange={v => set({ primaryIdentifiers: v })} options={['Email', 'ECID', 'CRM ID', 'Loyalty ID', 'Phone', 'Device IDs', 'Other']} />
        <DropdownField label="Profile volume tier" value={d.profileVolumeTier} onChange={v => set({ profileVolumeTier: v })} options={['< 1M', '1M–10M', '10M–50M', '50M–100M', '100M+']} />
        <MultiSelectField label="Data challenges" selected={d.dataChallenges} onChange={v => set({ dataChallenges: v })} options={['Data quality', 'Late data', 'Incomplete schemas', 'Identity resolution issues', 'Consent handling', 'Governance', 'Limited access to data']} />
      </FieldGroup>

      <FieldGroup title="Use Cases & Activation">
        <MultiSelectField label="Current use cases in production" selected={d.currentUseCases} onChange={v => set({ currentUseCases: v })} options={['Audience building', 'Omni-channel activation', 'Look-alike modeling', 'Churn prediction', 'Real-time personalization', 'Suppression lists', 'Measurement']} />
        <MultiSelectField label="Destinations used" selected={d.destinations} onChange={v => set({ destinations: v })} options={['Adobe solutions', 'Social platforms', 'DSPs', 'CRM', 'Email / ESP', 'Custom APIs']} />
        <MultiSelectField label="Biggest pain points" selected={d.painPoints} onChange={v => set({ painPoints: v })} options={['Lack of clear use cases', 'Slow time-to-value', 'Performance / latency', 'Skills gap', 'Integration gaps', 'Organizational alignment']} />
      </FieldGroup>

      <TextAreaField label="AEP / CDP Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
