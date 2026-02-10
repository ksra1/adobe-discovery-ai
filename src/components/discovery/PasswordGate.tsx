import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const GATE_PASSWORD = 'dept2026';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

export function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === GATE_PASSWORD) {
      onAuthenticated();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-xl space-y-12 text-center px-4">
        <div className="space-y-12">
          <div className="flex justify-center">
            <img src={`${import.meta.env.BASE_URL}images/logo-dept.svg`} className="h-24 md:h-32 w-auto" alt="DEPT®" />
          </div>
          
          <div className="space-y-2 leading-none tracking-tighter flex flex-col items-center cursor-default select-none">
            <div className="font-black text-2xl sm:text-4xl md:text-5xl text-foreground uppercase text-center whitespace-nowrap">
              ADOBE EXPERIENCE CLOUD
            </div>
            <div className="font-black text-2xl sm:text-4xl md:text-5xl text-[#ff4901] uppercase text-center whitespace-nowrap">
              DISCOVERY TOOL
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Enter access password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 bg-card border-border"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">Incorrect password. Please try again.</p>
          )}
          <Button type="submit" className="w-full dept-gradient text-[#ff4901] font-semibold hover:bg-[#ff4901] hover:text-white transition-colors">
            Launch
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Contact your DEPT® representative for access credentials.
        </p>
      </div>
    </div>
  );
}
