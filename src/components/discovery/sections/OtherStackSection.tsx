import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, TextAreaField } from '../FormFields';

export function OtherStackSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.otherStack;
  const set = (updates: Partial<typeof d>) => updateSection('otherStack', updates);

  return (
    <SectionWrapper title="Other Adobe & Non-Adobe Stack">
      <FieldGroup title="Additional Adobe Products">
        <MultiSelectField label="Other Adobe products licensed" selected={d.additionalAdobeProducts} onChange={v => set({ additionalAdobeProducts: v })} options={['Marketo Engage', 'Adobe Commerce (Magento)', 'Frame.io', 'Adobe Sign', 'Substance 3D', 'Creative Cloud for Enterprise', 'Document Cloud', 'Other']} />
      </FieldGroup>

      <FieldGroup title="Non-Adobe Systems">
        <MultiSelectField label="Critical non-Adobe systems" selected={d.criticalNonAdobeSystems} onChange={v => set({ criticalNonAdobeSystems: v })} options={['Salesforce CRM', 'HubSpot', 'Microsoft Dynamics', 'Snowflake / Databricks', 'Google Marketing Platform', 'The Trade Desk', 'Braze', 'Klaviyo', 'Twilio', 'Segment', 'mParticle', 'LaunchDarkly', 'Optimizely', 'Other']} />
        <RadioField label="Integration maturity" value={d.integrationMaturity} onChange={v => set({ integrationMaturity: v })} options={['Loosely coupled / manual', 'Point-to-point integrations', 'API-first architecture', 'Hub-and-spoke with CDP', 'Event-driven / real-time']} />
      </FieldGroup>

      <TextAreaField label="Other Stack Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
