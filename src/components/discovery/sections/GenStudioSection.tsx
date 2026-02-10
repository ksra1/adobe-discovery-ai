import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, TextAreaField } from '../FormFields';

export function GenStudioSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.genStudio;
  const set = (updates: Partial<typeof d>) => updateSection('genStudio', updates);

  return (
    <SectionWrapper title="GenStudio / Content Supply Chain / Firefly">
      <FieldGroup title="Tools & Workflow">
        <MultiSelectField label="Tools in use" selected={d.toolsInUse} onChange={v => set({ toolsInUse: v })} options={['GenStudio for Performance', 'GenStudio for Text', 'GenStudio for Images', 'Firefly', 'Adobe Express', 'AEM Assets integration', 'None']} />
        <MultiSelectField label="Current creative workflow stages" selected={d.creativeWorkflow} onChange={v => set({ creativeWorkflow: v })} options={['Ideation', 'Copy creation', 'Design / visual production', 'Approvals', 'Localization / adaptation', 'Distribution']} />
        <RadioField label="Level of automation" value={d.automationLevel} onChange={v => set({ automationLevel: v })} options={['Manual', 'Partially automated', 'Highly automated']} />
      </FieldGroup>

      <FieldGroup title="Challenges">
        <MultiSelectField label="Pain points" selected={d.painPoints} onChange={v => set({ painPoints: v })} options={['Slow creative cycles', 'Poor versioning', 'Lack of asset reuse', 'Lack of brand compliance', 'Fragmented tools', 'Limited AI adoption']} />
      </FieldGroup>

      <TextAreaField label="GenStudio / Content Supply Chain Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
