import { useState } from 'react';
import { PasswordGate } from '@/components/discovery/PasswordGate';
import { MainMenu } from '@/components/discovery/MainMenu';
import { WizardShell } from '@/components/discovery/WizardShell';
import { SearchRecords } from '@/components/discovery/SearchRecords';
import { GenerateReport } from '@/components/discovery/GenerateReport';
import { DiscoveryProvider } from '@/contexts/DiscoveryContext';

type AppView = 'login' | 'menu' | 'new' | 'search' | 'report';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('login');

  if (currentView === 'login') {
    return <PasswordGate onAuthenticated={() => setCurrentView('menu')} />;
  }

  if (currentView === 'menu') {
    return <MainMenu onNavigate={(view) => setCurrentView(view)} />;
  }

  if (currentView === 'search') {
    return <SearchRecords onBack={() => setCurrentView('menu')} />;
  }

  if (currentView === 'report') {
    return <GenerateReport onBack={() => setCurrentView('menu')} />;
  }

  // currentView === 'new'
  return (
    <DiscoveryProvider>
      <WizardShell onBack={() => setCurrentView('menu')} />
    </DiscoveryProvider>
  );
};

export default Index;
