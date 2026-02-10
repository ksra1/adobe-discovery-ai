import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, DropdownField, TextAreaField } from '../FormFields';

export function AJOSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.ajo;
  const set = (updates: Partial<typeof d>) => updateSection('ajo', updates);

  return (
    <SectionWrapper title="Adobe Journey Optimizer (AJO)">
      <FieldGroup title="Adoption & Channels">
        <RadioField label="AJO status" value={d.status} onChange={v => set({ status: v })} options={['Not licensed', 'Purchased (Not Implemented)', 'Implementation In-progress', 'In production', 'Advanced']} />
        <MultiSelectField label="Channels used with AJO" selected={d.channelsUsed} onChange={v => set({ channelsUsed: v })} options={['Email', 'Push', 'In-app', 'SMS', 'On-site messages', 'Other']} />
      </FieldGroup>

      <FieldGroup title="Journeys & Campaigns">
        <MultiSelectField label="Types of journeys" selected={d.journeyTypes} onChange={v => set({ journeyTypes: v })} options={['Always-on triggers', 'Batch campaigns', 'Lifecycle programs', 'Transactional messages', 'Journeys with decisioning / personalization']} />
        <DropdownField label="Volume of active journeys / campaigns" value={d.activeJourneys} onChange={v => set({ activeJourneys: v })} options={['1–5', '6–15', '16–30', '31–50', '50+']} />
        <MultiSelectField label="Data sources for journeys" selected={d.dataSourcesForJourneys} onChange={v => set({ dataSourcesForJourneys: v })} options={['AEP unified profiles', 'External data via APIs', 'Batch imports']} />
      </FieldGroup>

      <FieldGroup title="Challenges">
        <MultiSelectField label="AJO challenges" selected={d.challenges} onChange={v => set({ challenges: v })} options={['Configuration complexity', 'Limited templates', 'Testing / QA difficulty', 'Approvals', 'Deliverability', 'Integration with other tools', 'Performance', 'Lack of skills']} />
      </FieldGroup>

      <TextAreaField label="AJO Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
