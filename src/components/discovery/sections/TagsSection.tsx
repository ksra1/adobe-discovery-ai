import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, TextField, TextAreaField } from '../FormFields';

export function TagsSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.tags;
  const set = (updates: Partial<typeof d>) => updateSection('tags', updates);

  return (
    <SectionWrapper title="Tags / Launch / Web SDK">
      <FieldGroup title="Tag Management">
        <MultiSelectField label="Tag management system(s)" selected={d.tagManagementSystem} onChange={v => set({ tagManagementSystem: v })} options={['Adobe Tags / Launch', 'GTM', 'Tealium', 'Ensighten', 'Other']} />
        <RadioField label="Web SDK & Event Forwarding migration status" value={d.webSdkMigration} onChange={v => set({ webSdkMigration: v })} options={['Yes, fully migrated', 'Partial migration', 'No, not started', 'Not sure']} />
      </FieldGroup>

      <FieldGroup title="Governance & Challenges">
        <TextField label="Who owns tags / governance?" value={d.governanceOwner} onChange={v => set({ governanceOwner: v })} placeholder="e.g., Marketing ops, IT, shared..." />
        <MultiSelectField label="Pain points" selected={d.painPoints} onChange={v => set({ painPoints: v })} options={['Tag sprawl', 'Lack of documentation', 'Dependency on IT', 'Conflicts between tags', 'Poor testing / QA', 'Performance impact']} />
      </FieldGroup>

      <TextAreaField label="Tags / SDK Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
