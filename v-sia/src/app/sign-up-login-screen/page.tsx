'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AuthBrandPanel from './components/AuthBrandPanel';

function AuthPageContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const m = searchParams?.get('mode');
    if (m === 'register') setMode('register');
  }, [searchParams]);

  return (
    <div className="min-h-screen flex">
      {/* Brand panel — hidden on small screens */}
      <AuthBrandPanel mode={mode} />

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background min-h-screen">
        <div className="w-full max-w-md">
          {mode === 'login' ? (
            <LoginForm onSwitchToRegister={() => setMode('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode('login')} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  );
}