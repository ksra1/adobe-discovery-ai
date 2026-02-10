import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, TextAreaField } from '../FormFields';

export function WorkfrontSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.workfront;
  const set = (updates: Partial<typeof d>) => updateSection('workfront', updates);

  return (
    <SectionWrapper title="Workfront / Workfront Fusion">
      <FieldGroup title="Usage & Workflows">
        <RadioField label="Workfront usage scope" value={d.usage} onChange={v => set({ usage: v })} options={['Marketing only', 'Enterprise PMO', 'Mixed', 'Not using Workfront']} />
        <MultiSelectField label="Primary workflows" selected={d.primaryWorkflows} onChange={v => set({ primaryWorkflows: v })} options={['Campaign intake', 'Content production', 'Dev tickets', 'Approvals', 'Compliance reviews', 'Resource management']} />
      </FieldGroup>

      <FieldGroup title="Integration & Maturity">
        <MultiSelectField label="Integrations" selected={d.integrations} onChange={v => set({ integrations: v })} options={['AEM', 'AEP', 'Jira', 'Slack', 'Salesforce', 'Other']} />
        <RadioField label="Reporting & governance maturity" value={d.reportingMaturity} onChange={v => set({ reportingMaturity: v })} options={['Basic / ad hoc', 'Standard reports & dashboards', 'Advanced / automated reporting', 'Fully governed with SLAs']} />
        <MultiSelectField label="Pain points" selected={d.painPoints} onChange={v => set({ painPoints: v })} options={['Adoption', 'Configuration complexity', 'Integration gaps', 'Reporting', 'Change management']} />
      </FieldGroup>

      <TextAreaField label="Workfront Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
