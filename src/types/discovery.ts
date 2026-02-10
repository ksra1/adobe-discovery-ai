export interface GeneralInfo {
  companyName: string;
  websiteUrls: string;
  industry: string;
  primaryMarkets: string[];
  interviewDate: string;
  interviewerName: string;
  interviewerRole: string;
  contactName: string;
  contactEmail: string;
  contactRole: string;
  contactDepartment: string;
  teamSize: string;
  agenciesPartners: string;
  budgetRange: string;
}

export interface ProblemsGoals {
  topPriorities: string[];
  biggestPainPoints: string[];
  successMeasures: string[];
  adoptionLevels: Record<string, string>;
  timeHorizon: string;
  notes: string;
}

export interface AEMData {
  deploymentModel: string;
  licensedCapabilities: string[];
  yearsOnAEM: string;
  numberOfSites: string;
  cmsInUse: string[];
  activeAuthors: string;
  authoringPainPoints: string[];
  localizationStrategy: string;
  usesCoreComponents: string;
  frontEndApproach: string;
  keyIntegrations: string[];
  releaseFrequency: string;
  operationalPainPoints: string[];
  monitoringTools: string;
  notes: string;
}

export interface AEPData {
  rtcdpLicenseType: string;
  usageStatus: string;
  dataSources: string[];
  primaryIdentifiers: string[];
  profileVolumeTier: string;
  dataChallenges: string[];
  currentUseCases: string[];
  destinations: string[];
  painPoints: string[];
  notes: string;
}

export interface AJOData {
  status: string;
  channelsUsed: string[];
  journeyTypes: string[];
  activeJourneys: string;
  dataSourcesForJourneys: string[];
  challenges: string[];
  notes: string;
}

export interface CampaignData {
  flavor: string;
  usageStatus: string;
  regions: string;
  channelsOrchestrated: string[];
  campaignTypes: string[];
  monthlySendVolume: string;
  primaryDataSources: string[];
  dataChallenges: string[];
  adobeIntegrations: string[];
  workflowMaturity: string;
  commonWorkflowActivities: string[];
  workflowPainPoints: string[];
  deliverabilityStrategy: string;
  emailInfrastructure: string;
  complianceRequirements: string[];
  governanceChallenges: string[];
  reportingApproach: string;
  kpisTracked: string[];
  optimizationPainPoints: string[];
  rolesInCampaign: string[];
  skillGaps: string[];
  operatingModel: string;
  notes: string;
}

export interface AnalyticsData {
  toolsInUse: string[];
  implementationMethod: string;
  connectedChannels: string[];
  maturityLevel: string;
  painPoints: string[];
  notes: string;
}

export interface TagsData {
  tagManagementSystem: string[];
  webSdkMigration: string;
  governanceOwner: string;
  painPoints: string[];
  notes: string;
}

export interface TargetData {
  licenseStatus: string;
  primaryUseCases: string[];
  a4tUsage: string;
  testVolume: string;
  painPoints: string[];
  notes: string;
}

export interface GenStudioData {
  toolsInUse: string[];
  creativeWorkflow: string[];
  automationLevel: string;
  painPoints: string[];
  notes: string;
}

export interface WorkfrontData {
  usage: string;
  primaryWorkflows: string[];
  integrations: string[];
  reportingMaturity: string;
  painPoints: string[];
  notes: string;
}

export interface OtherStackData {
  additionalAdobeProducts: string[];
  criticalNonAdobeSystems: string[];
  integrationMaturity: string;
  notes: string;
}

export interface DiscoveryFormData {
  generalInfo: GeneralInfo;
  problemsGoals: ProblemsGoals;
  aem: AEMData;
  aep: AEPData;
  ajo: AJOData;
  campaign: CampaignData;
  analytics: AnalyticsData;
  tags: TagsData;
  target: TargetData;
  genStudio: GenStudioData;
  workfront: WorkfrontData;
  otherStack: OtherStackData;
}

export const SECTIONS = [
  { id: 'generalInfo', label: 'General Company Info', shortLabel: 'Company' },
  { id: 'problemsGoals', label: 'Current Problems & Goals', shortLabel: 'Goals' },
  { id: 'aem', label: 'AEM', shortLabel: 'AEM' },
  { id: 'aep', label: 'AEP / RTCDP', shortLabel: 'AEP' },
  { id: 'ajo', label: 'Adobe Journey Optimizer', shortLabel: 'AJO' },
  { id: 'campaign', label: 'Adobe Campaign', shortLabel: 'Campaign' },
  { id: 'analytics', label: 'Analytics & CJA', shortLabel: 'Analytics' },
  { id: 'tags', label: 'Tags / Launch / Web SDK', shortLabel: 'Tags' },
  { id: 'target', label: 'Adobe Target', shortLabel: 'Target' },
  { id: 'genStudio', label: 'GenStudio / Content Supply Chain', shortLabel: 'GenStudio' },
  { id: 'workfront', label: 'Workfront / Fusion', shortLabel: 'Workfront' },
  { id: 'otherStack', label: 'Other Stack', shortLabel: 'Other' },
] as const;

export type SectionId = typeof SECTIONS[number]['id'];

export const DEFAULT_FORM_DATA: DiscoveryFormData = {
  generalInfo: {
    companyName: '', websiteUrls: '', industry: '', primaryMarkets: [],
    interviewDate: '', interviewerName: '', interviewerRole: '',
    contactName: '', contactEmail: '', contactRole: '', contactDepartment: '',
    teamSize: '', agenciesPartners: '', budgetRange: '',
  },
  problemsGoals: {
    topPriorities: [], biggestPainPoints: [], successMeasures: [],
    adoptionLevels: {}, timeHorizon: '', notes: '',
  },
  aem: {
    deploymentModel: '', licensedCapabilities: [], yearsOnAEM: '', numberOfSites: '',
    cmsInUse: [], activeAuthors: '', authoringPainPoints: [], localizationStrategy: '',
    usesCoreComponents: '', frontEndApproach: '', keyIntegrations: [],
    releaseFrequency: '', operationalPainPoints: [], monitoringTools: '', notes: '',
  },
  aep: {
    rtcdpLicenseType: '', usageStatus: '', dataSources: [], primaryIdentifiers: [],
    profileVolumeTier: '', dataChallenges: [], currentUseCases: [],
    destinations: [], painPoints: [], notes: '',
  },
  ajo: {
    status: '', channelsUsed: [], journeyTypes: [], activeJourneys: '',
    dataSourcesForJourneys: [], challenges: [], notes: '',
  },
  campaign: {
    flavor: '', usageStatus: '', regions: '', channelsOrchestrated: [],
    campaignTypes: [], monthlySendVolume: '', primaryDataSources: [],
    dataChallenges: [], adobeIntegrations: [], workflowMaturity: '',
    commonWorkflowActivities: [], workflowPainPoints: [], deliverabilityStrategy: '',
    emailInfrastructure: '', complianceRequirements: [], governanceChallenges: [],
    reportingApproach: '', kpisTracked: [], optimizationPainPoints: [],
    rolesInCampaign: [], skillGaps: [], operatingModel: '', notes: '',
  },
  analytics: {
    toolsInUse: [], implementationMethod: '', connectedChannels: [],
    maturityLevel: '', painPoints: [], notes: '',
  },
  tags: {
    tagManagementSystem: [], webSdkMigration: '', governanceOwner: '',
    painPoints: [], notes: '',
  },
  target: {
    licenseStatus: '', primaryUseCases: [], a4tUsage: '', testVolume: '',
    painPoints: [], notes: '',
  },
  genStudio: {
    toolsInUse: [], creativeWorkflow: [], automationLevel: '',
    painPoints: [], notes: '',
  },
  workfront: {
    usage: '', primaryWorkflows: [], integrations: [],
    reportingMaturity: '', painPoints: [], notes: '',
  },
  otherStack: {
    additionalAdobeProducts: [], criticalNonAdobeSystems: [],
    integrationMaturity: '', notes: '',
  },
};
