import React from 'react';
import { useDiscovery } from '@/contexts/DiscoveryContext';
import { SECTIONS } from '@/types/discovery';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send, RotateCcw, ArrowLeft } from 'lucide-react';
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
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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

const TOTAL_STEPS = SECTIONS.length + 1;

interface WizardShellProps {
  onBack?: () => void;
}

export function WizardShell({ onBack }: WizardShellProps) {
  const { currentSection, setCurrentSection, isSubmitted, formData, resetForm, setIsSubmitted } = useDiscovery();
  const isReview = currentSection === SECTIONS.length;
  const progress = ((currentSection + 1) / TOTAL_STEPS) * 100;

  const CurrentComponent = isReview ? ReviewSubmit : SECTION_COMPONENTS[currentSection];

  const handleFinalSubmit = async () => {
    try {
      await addDoc(collection(db, 'entries'), {
        ...formData,
        companyName: formData.generalInfo.companyName,
        submittedAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error writing to Firestore:', err);
      alert('Failed to submit. Please check your Firestore configuration.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-lg px-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Send className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Submission Complete</h1>
          <p className="text-muted-foreground">
            Discovery data for <strong className="text-foreground">{formData.generalInfo.companyName || 'the client'}</strong> has been saved to Firestore.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={resetForm} variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              <RotateCcw className="w-4 h-4" /> Start New Discovery
            </Button>
            {onBack && (
              <Button onClick={onBack} variant="outline" className="gap-2 border-border text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" /> Back to Menu
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-1 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" /> Menu
              </Button>
            )}
            <img src={`${import.meta.env.BASE_URL}images/logo-dept.svg`} className="h-8 w-auto" alt="DEPT®" />
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            <span className="text-primary font-semibold">Adobe Experience Cloud</span> Discovery
          </span>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              {currentSection + 1} / {TOTAL_STEPS}
            </span>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-card/50 overflow-x-auto">
        <div className="max-w-5xl mx-auto px-4 py-2 flex gap-1">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(i)}
              className={cn(
                'px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors font-medium',
                i === currentSection
                  ? 'bg-primary text-primary-foreground'
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
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            Review
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <CurrentComponent />
      </main>

      <footer className="border-t border-border bg-card sticky bottom-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="gap-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          {isReview ? (
            <Button
              onClick={handleFinalSubmit}
              className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors px-8"
            >
              Final Submit <Send className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentSection(currentSection + 1)}
              className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors px-8"
            >
              {currentSection === SECTIONS.length - 1 ? 'Review' : 'Next'} <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
