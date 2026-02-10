import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, DropdownField, TextField, TextAreaField } from '../FormFields';

export function AEMSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.aem;
  const set = (updates: Partial<typeof d>) => updateSection('aem', updates);

  return (
    <SectionWrapper title="AEM (Sites / Assets / Dynamic Media / Edge Delivery)">
      <FieldGroup title="Platform & Licensing">
        <RadioField label="Deployment model" value={d.deploymentModel} onChange={v => set({ deploymentModel: v })} options={['AEM as a Cloud Service', 'AMS', 'On-prem', 'Not using AEM']} />
        <MultiSelectField label="Licensed capabilities" selected={d.licensedCapabilities} onChange={v => set({ licensedCapabilities: v })} options={['Sites', 'Assets', 'Dynamic Media', 'Forms', 'Edge Delivery Services', 'Screens', 'Guides', 'Other']} />
        <RadioField label="How long on AEM?" value={d.yearsOnAEM} onChange={v => set({ yearsOnAEM: v })} options={['< 1 year', '1–3 years', '3–5 years', '5+ years', 'N/A']} />
        <DropdownField label="Approximate number of sites/brands" value={d.numberOfSites} onChange={v => set({ numberOfSites: v })} options={['1–5', '6–20', '21–50', '51–100', '100+']} />
      </FieldGroup>

      <FieldGroup title="Content Management & Authoring">
        <MultiSelectField label="CMSs currently in use" selected={d.cmsInUse} onChange={v => set({ cmsInUse: v })} options={['AEM', 'Drupal', 'WordPress', 'Sitecore', 'Contentful', 'Other']} />
        <DropdownField label="Approximate number of active AEM authors" value={d.activeAuthors} onChange={v => set({ activeAuthors: v })} options={['1–10', '11–25', '26–50', '51–100', '100+']} />
        <MultiSelectField label="Authoring experience pain points" selected={d.authoringPainPoints} onChange={v => set({ authoringPainPoints: v })} options={['Slow page load in author', 'Confusing component library', 'Lack of reusable content/fragments', 'Poor preview', 'Localization complexity', 'Workflow/approval friction', 'Lack of training', 'Governance issues', 'Other']} />
        <RadioField label="Localization / multi-site strategy" value={d.localizationStrategy} onChange={v => set({ localizationStrategy: v })} options={['Single market only', 'Few localized sites', 'Large global multi-site', 'In transition / unclear']} />
      </FieldGroup>

      <FieldGroup title="Architecture & Implementation">
        <RadioField label="Do you use AEM Core Components?" value={d.usesCoreComponents} onChange={v => set({ usesCoreComponents: v })} options={['Yes', 'Partially', 'No', 'Not sure']} />
        <RadioField label="Front-end approach" value={d.frontEndApproach} onChange={v => set({ frontEndApproach: v })} options={['Traditional AEM pages', 'SPA / React / Angular', 'Headless / GraphQL', 'Edge Delivery / Universal Editor', 'Hybrid']} />
        <MultiSelectField label="Key integrations" selected={d.keyIntegrations} onChange={v => set({ keyIntegrations: v })} options={['AEP', 'Analytics', 'Target', 'AJO', 'Commerce (Magento/SFCC)', 'Search', 'External DAMs', 'PIM', 'SSO / Identity Provider', 'Other']} />
      </FieldGroup>

      <FieldGroup title="Operations & Performance">
        <RadioField label="Release frequency to production" value={d.releaseFrequency} onChange={v => set({ releaseFrequency: v })} options={['On demand', 'Weekly', 'Bi-weekly', 'Monthly', 'Less often']} />
        <MultiSelectField label="Operational pain points" selected={d.operationalPainPoints} onChange={v => set({ operationalPainPoints: v })} options={['Deployment complexity', 'Environment parity', 'Performance issues', 'Caching / CDN problems', 'Security / compliance', 'Content governance', 'Localization operations', 'Search relevance', 'Incident management']} />
        <TextField label="Monitoring & observability tools" value={d.monitoringTools} onChange={v => set({ monitoringTools: v })} placeholder="e.g., New Relic, Datadog, Splunk..." />
      </FieldGroup>

      <TextAreaField label="AEM Notes / Additional context" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
