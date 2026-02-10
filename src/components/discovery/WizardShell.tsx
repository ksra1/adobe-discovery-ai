import React from 'react';
import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SECTIONS } from '@/types/discovery';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send, RotateCcw } from 'lucide-react';
import { GeneralInfoSection } from './sections/GeneralInfo';
import { ProblemsGoalsSection } from './sections/ProblemsGoals';
import { AEMSection } from './sections/AEMSection';
import { AEPSection } from './sections/AEPSection';
import { AJOSection } from './sections/AJOSection';
import { CampaignSection } from './sections/CampaignSection';
import { AnalyticsSection } from './sections/AnalyticsSection';
import { TagsSection } from './sections/TagsSection';
import { TargetSection } from './sections/TargetSection';
import { GenStudioSection } from './sections/GenStudioSection';
import { WorkfrontSection } from './sections/WorkfrontSection';
import { OtherStackSection } from './sections/OtherStackSection';
import { ReviewSubmit } from './ReviewSubmit';
import { cn } from '@/lib/utils';

const SECTION_COMPONENTS = [
  GeneralInfoSection,
  ProblemsGoalsSection,
  AEMSection,
  AEPSection,
  AJOSection,
  CampaignSection,
  AnalyticsSection,
  TagsSection,
  TargetSection,
  GenStudioSection,
  WorkfrontSection,
  OtherStackSection,
];

const TOTAL_STEPS = SECTIONS.length + 1; // sections + review

export function WizardShell() {
  const { currentSection, setCurrentSection, isSubmitted, formData, resetForm } = useDiscovery();
  const isReview = currentSection === SECTIONS.length;
  const progress = ((currentSection + 1) / TOTAL_STEPS) * 100;

  const CurrentComponent = isReview ? ReviewSubmit : SECTION_COMPONENTS[currentSection];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-lg px-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Send className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Submission Complete</h1>
          <p className="text-muted-foreground">
            Discovery data for <strong className="text-foreground">{formData.generalInfo.companyName || 'the client'}</strong> has been recorded.
            Backend integrations (Google Sheets & AI report) will be connected in a future update.
          </p>
          <Button onClick={resetForm} variant="outline" className="gap-2 border-[#ff4901] text-[#ff4901] hover:bg-[#ff4901] hover:text-white transition-colors">
            <RotateCcw className="w-4 h-4" /> Start New Discovery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}images/logo-dept.svg`} className="h-8 w-auto" alt="DEPT®" />
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            <span className="text-[#ff4901] font-semibold">Adobe Experience Cloud</span> Discovery
          </span>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#ff4901] transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              {currentSection + 1} / {TOTAL_STEPS}
            </span>
          </div>
        </div>
      </header>

      {/* Section nav pills */}
      <div className="border-b border-border bg-card/50 overflow-x-auto">
        <div className="max-w-5xl mx-auto px-4 py-2 flex gap-1">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(i)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors font-medium',
                i === currentSection
                  ? 'bg-[#ff4901] text-white'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {s.shortLabel}
            </button>
          ))}
          <button
            onClick={() => setCurrentSection(SECTIONS.length)}
            className={cn(
              'px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors font-medium',
              isReview
                ? 'bg-[#ff4901] text-white'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            Review
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <CurrentComponent />
      </main>

      {/* Footer nav */}
      <footer className="border-t border-border bg-card sticky bottom-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="gap-1 border-[#ff4901] text-[#ff4901] hover:bg-[#ff4901] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          {isReview ? (
            <Button
              onClick={() => { /* Handle final submission */ }}
              className="bg-[#ff4901] text-white font-bold hover:bg-[#ff4901]/90 transition-colors px-8"
            >
              Final Submit <Send className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="bg-[#ff4901] text-white font-bold hover:bg-[#ff4901]/90 transition-colors px-8"
            >
              {currentSection === SECTIONS.length - 1 ? 'Review' : 'Next'} <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
