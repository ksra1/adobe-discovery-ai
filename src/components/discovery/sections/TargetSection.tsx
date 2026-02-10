import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, DropdownField, TextAreaField } from '../FormFields';

export function TargetSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.target;
  const set = (updates: Partial<typeof d>) => updateSection('target', updates);

  return (
    <SectionWrapper title="Adobe Target / Personalization">
      <FieldGroup title="License & Usage">
        <RadioField label="License & usage status" value={d.licenseStatus} onChange={v => set({ licenseStatus: v })} options={['Not licensed', 'Licensed but unused', 'In implementation', 'In production']} />
        <MultiSelectField label="Primary use cases" selected={d.primaryUseCases} onChange={v => set({ primaryUseCases: v })} options={['A/B tests', 'Multivariate tests (MVT)', 'Recommendations', 'Automated personalization', 'Rules-based personalization']} />
      </FieldGroup>

      <FieldGroup title="Testing & Performance">
        <RadioField label="A4T (Analytics for Target) usage" value={d.a4tUsage} onChange={v => set({ a4tUsage: v })} options={['Yes', 'No', 'Not sure']} />
        <DropdownField label="Test volume & throughput" value={d.testVolume} onChange={v => set({ testVolume: v })} options={['< 5 tests/month', '5–10 tests/month', '10–20 tests/month', '20+ tests/month', 'Not actively testing']} />
        <MultiSelectField label="Pain points" selected={d.painPoints} onChange={v => set({ painPoints: v })} options={['Low traffic', 'Limited hypotheses', 'Governance', 'Technical integration challenges', 'Decisioning limitations', 'Lack of skills', 'Flicker / performance']} />
      </FieldGroup>

      <TextAreaField label="Target Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
