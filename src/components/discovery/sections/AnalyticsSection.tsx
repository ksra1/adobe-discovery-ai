import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, TextAreaField } from '../FormFields';

export function AnalyticsSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.analytics;
  const set = (updates: Partial<typeof d>) => updateSection('analytics', updates);

  return (
    <SectionWrapper title="Analytics & Customer Journey Analytics (CJA)">
      <FieldGroup title="Tools & Implementation">
        <MultiSelectField label="Analytics tools in use" selected={d.toolsInUse} onChange={v => set({ toolsInUse: v })} options={['Adobe Analytics', 'CJA', 'GA4', 'Mixpanel', 'Amplitude', 'Other']} />
        <RadioField label="Implementation method" value={d.implementationMethod} onChange={v => set({ implementationMethod: v })} options={['Legacy AppMeasurement', 'Web SDK & AEP', 'Both / transitioning', 'Not sure']} />
        <MultiSelectField label="Connected channels" selected={d.connectedChannels} onChange={v => set({ connectedChannels: v })} options={['Web', 'Mobile app', 'Call center', 'In-store / POS', 'IoT / Connected devices', 'Other']} />
      </FieldGroup>

      <FieldGroup title="Maturity & Challenges">
        <RadioField label="Reporting & analysis maturity" value={d.maturityLevel} onChange={v => set({ maturityLevel: v })} options={['Basic out-of-box reports', 'Custom reports & dashboards', 'Advanced segmentation & attribution', 'Customer journey analysis', 'Predictive / AI-driven analytics']} />
        <MultiSelectField label="Pain points" selected={d.painPoints} onChange={v => set({ painPoints: v })} options={['Data trust issues', 'Inconsistent tagging', 'Limited self-service', 'Manual exports', 'Sampling concerns', 'Limited training', 'Cross-channel gaps']} />
      </FieldGroup>

      <TextAreaField label="Analytics / CJA Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
