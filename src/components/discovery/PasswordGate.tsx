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
      <div className="w-full max-w-sm space-y-8 text-center px-4">
        <div className="space-y-3">
          <div className="text-4xl font-black tracking-tighter text-foreground">
            DEPT®
          </div>
          <p className="text-sm text-muted-foreground">
            Adobe Experience Cloud Discovery Tool
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full dept-gradient text-primary-foreground font-semibold">
            Access Tool
          </Button>
        </form>

        <p className="text-xs text-muted-foreground">
          Contact your DEPT® representative for access credentials.
        </p>
      </div>
    </div>
  );
}
