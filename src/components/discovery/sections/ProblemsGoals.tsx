import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, MultiSelectField, RadioField, ScaleField, TextAreaField } from '../FormFields';

const TOP_PRIORITIES = [
  'Content velocity', 'Personalization', 'First-party data strategy',
  'Privacy / compliance', 'Campaign orchestration', 'Customer journeys',
  'Analytics maturity', 'Attribution', 'Site performance',
  'Experimentation', 'Content supply chain', 'Other',
];

const PAIN_POINTS = [
  'Slow content publishing', 'Inconsistent tracking', 'Siloed data',
  'Lack of personalization', 'Manual campaign execution', 'Poor reporting',
  'Poor attribution', 'Unstable environments', 'Governance issues',
  'Lack of skills', 'Long creative cycles',
];

const SUCCESS_MEASURES = [
  'Revenue', 'Conversion rate', 'Leads / MQLs', 'Customer lifetime value',
  'Engagement', 'Retention / churn', 'NPS / CSAT', 'Channel-specific KPIs',
];

const ADOPTION_PRODUCTS = [
  'AEM Sites', 'AEM Assets', 'AEP / RTCDP', 'AJO', 'Adobe Campaign',
  'Adobe Analytics', 'CJA', 'Adobe Target', 'Tags / Launch',
  'GenStudio', 'Workfront', 'Marketo',
];

const ADOPTION_LEVELS = [
  'Not purchased', 'Purchased (Not Implemented)', 'Implementation In-progress',
  'In production', 'Optimized',
];

const TIME_HORIZONS = ['0–3 months', '3–6 months', '6–12 months', '12+ months'];

export function ProblemsGoalsSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.problemsGoals;
  const set = (updates: Partial<typeof d>) => updateSection('problemsGoals', updates);

  return (
    <SectionWrapper title="Current Problems & Goals">
      <MultiSelectField label="Top priorities for the next 12–24 months" selected={d.topPriorities} onChange={v => set({ topPriorities: v })} options={TOP_PRIORITIES} />
      <MultiSelectField label="Biggest pain points today" selected={d.biggestPainPoints} onChange={v => set({ biggestPainPoints: v })} options={PAIN_POINTS} />
      <MultiSelectField label="Primary success measures" selected={d.successMeasures} onChange={v => set({ successMeasures: v })} options={SUCCESS_MEASURES} />
      <ScaleField
        label="Current Adobe Experience Cloud adoption level per product"
        items={ADOPTION_PRODUCTS}
        values={d.adoptionLevels}
        onChange={(k, v) => set({ adoptionLevels: { ...d.adoptionLevels, [k]: v } })}
        scaleOptions={ADOPTION_LEVELS}
      />
      <RadioField label="Time horizon for seeing value" value={d.timeHorizon} onChange={v => set({ timeHorizon: v })} options={TIME_HORIZONS} />
      <TextAreaField label="Notes / Additional context" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
