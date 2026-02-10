import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SectionWrapper, FieldGroup, RadioField, MultiSelectField, DropdownField, TextField, TextAreaField } from '../FormFields';

export function CampaignSection() {
  const { formData, updateSection } = useDiscovery();
  const d = formData.campaign;
  const set = (updates: Partial<typeof d>) => updateSection('campaign', updates);

  return (
    <SectionWrapper title="Adobe Campaign (Classic / Standard / v8)">
      <FieldGroup title="Licensing & Version">
        <RadioField label="Which Campaign flavor?" value={d.flavor} onChange={v => set({ flavor: v })} options={['Campaign Classic v7', 'Campaign v8', 'Campaign Standard', 'Not sure', 'Not using Adobe Campaign']} />
        <RadioField label="Usage status" value={d.usageStatus} onChange={v => set({ usageStatus: v })} options={['Not purchased', 'Purchased not implemented', 'In implementation', 'In production', 'Being sunset']} />
        <TextField label="Regions / BUs using Campaign" value={d.regions} onChange={v => set({ regions: v })} placeholder="e.g., NA, EMEA, APAC..." />
      </FieldGroup>

      <FieldGroup title="Use Cases & Channels">
        <MultiSelectField label="Channels orchestrated" selected={d.channelsOrchestrated} onChange={v => set({ channelsOrchestrated: v })} options={['Email', 'SMS', 'Push', 'Direct mail', 'In-app', 'Call center', 'Other']} />
        <MultiSelectField label="Campaign types" selected={d.campaignTypes} onChange={v => set({ campaignTypes: v })} options={['One-off blasts', 'Recurring newsletters', 'Lifecycle / triggered programs', 'Transactional messaging', 'Loyalty programs', 'Win-back / reactivation', 'Cross-sell / upsell']} />
        <DropdownField label="Monthly send volume" value={d.monthlySendVolume} onChange={v => set({ monthlySendVolume: v })} options={['< 100K', '100K–500K', '500K–1M', '1M–5M', '5M–10M', '10M+']} />
      </FieldGroup>

      <FieldGroup title="Data & Integrations">
        <MultiSelectField label="Primary data sources" selected={d.primaryDataSources} onChange={v => set({ primaryDataSources: v })} options={['CRM', 'Ecommerce', 'Data warehouse', 'AEP segments', 'Web tracking', 'Mobile events', 'Offline', 'Other']} />
        <MultiSelectField label="Data challenges" selected={d.dataChallenges} onChange={v => set({ dataChallenges: v })} options={['Poor quality', 'Delayed refresh', 'Fragmented identities', 'Complex schemas', 'Limited attribute access', 'Compliance issues']} />
        <MultiSelectField label="Integrations with other Adobe tools" selected={d.adobeIntegrations} onChange={v => set({ adobeIntegrations: v })} options={['AEP / RTCDP', 'AJO', 'Analytics', 'Target', 'AEM', 'Marketo', 'None', 'Other']} />
      </FieldGroup>

      <FieldGroup title="Workflows & Automation">
        <RadioField label="Workflow maturity" value={d.workflowMaturity} onChange={v => set({ workflowMaturity: v })} options={['Simple list sends', 'Basic workflows', 'Complex multi-step', 'Fully templatized & governed']} />
        <MultiSelectField label="Common workflow activities" selected={d.commonWorkflowActivities} onChange={v => set({ commonWorkflowActivities: v })} options={['Queries', 'Splits', 'Enrichments', 'Imports / exports', 'External signals', 'Approvals', 'Control groups', 'A/B tests']} />
        <MultiSelectField label="Workflow pain points" selected={d.workflowPainPoints} onChange={v => set({ workflowPainPoints: v })} options={['Maintenance', 'Performance', 'Operational errors', 'Documentation gaps', 'Resourcing', 'Approvals']} />
      </FieldGroup>

      <FieldGroup title="Deliverability & Compliance">
        <RadioField label="Deliverability strategy" value={d.deliverabilityStrategy} onChange={v => set({ deliverabilityStrategy: v })} options={['Yes, with experts', 'Partial', 'No', 'Not sure']} />
        <RadioField label="Email infrastructure setup" value={d.emailInfrastructure} onChange={v => set({ emailInfrastructure: v })} options={['Adobe-managed', 'Hybrid', 'Legacy', 'Not sure']} />
        <MultiSelectField label="Compliance requirements" selected={d.complianceRequirements} onChange={v => set({ complianceRequirements: v })} options={['GDPR', 'CCPA', 'HIPAA', 'PCI', 'Other']} />
        <MultiSelectField label="Governance challenges" selected={d.governanceChallenges} onChange={v => set({ governanceChallenges: v })} options={['List hygiene', 'Consent management', 'Preference center', 'Approvals', 'Naming conventions', 'Audit trail adoption', 'Inconsistent sender identities']} />
      </FieldGroup>

      <FieldGroup title="Reporting & Optimization">
        <RadioField label="Reporting approach" value={d.reportingApproach} onChange={v => set({ reportingApproach: v })} options={['OOTB reports', 'Custom reports', 'BI exports', 'Manual Excel']} />
        <MultiSelectField label="KPIs tracked" selected={d.kpisTracked} onChange={v => set({ kpisTracked: v })} options={['Deliverability', 'Open rate', 'Click rate', 'Conversion', 'Revenue', 'Unsubscribes / complaints', 'Time-to-launch']} />
        <MultiSelectField label="Optimization pain points" selected={d.optimizationPainPoints} onChange={v => set({ optimizationPainPoints: v })} options={['Lack of testing', 'Attribution gaps', 'Disconnected from web/app analytics', 'Hard-to-use dashboards', 'Limited insight']} />
      </FieldGroup>

      <FieldGroup title="Organization & Skills">
        <MultiSelectField label="Roles working in Campaign" selected={d.rolesInCampaign} onChange={v => set({ rolesInCampaign: v })} options={['Marketing ops', 'Campaign managers', 'Developers', 'Data engineers', 'Analysts', 'Agencies']} />
        <MultiSelectField label="Skill gaps" selected={d.skillGaps} onChange={v => set({ skillGaps: v })} options={['Data model', 'Workflow design', 'Deliverability', 'APIs / integrations', 'Reporting', 'Governance']} />
        <RadioField label="Operating model" value={d.operatingModel} onChange={v => set({ operatingModel: v })} options={['Central CoE', 'Regional hubs', 'Decentralized', 'Hybrid']} />
      </FieldGroup>

      <TextAreaField label="Campaign Notes" value={d.notes} onChange={v => set({ notes: v })} />
    </SectionWrapper>
  );
}
