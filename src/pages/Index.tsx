import { useState } from 'react';
import { PasswordGate } from '@/components/discovery/PasswordGate';
import { WizardShell } from '@/components/discovery/WizardShell';
import { DiscoveryProvider } from '@/contexts/DiscoveryContext';

const Index = () => {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <PasswordGate onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <DiscoveryProvider>
      <WizardShell />
    </DiscoveryProvider>
  );
};

export default Index;
