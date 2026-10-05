'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { LandingPage } from '@/components/LandingPage';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/telemetry';

export default function Home() {
  const router = useRouter();

  const handleRoleSwitch = (role: UserRole) => {
    if (role === 'login') router.push('/login');
    else if (role === 'fleet_owner') router.push('/fleet-owner');
    else if (role === 'wholesaler') router.push('/wholesaler');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header currentRole="landing" onRoleSwitch={handleRoleSwitch} />
      <div className="flex-1">
        <LandingPage
          onGetStarted={() => router.push('/login')}
          onSelectRole={handleRoleSwitch}
        />
      </div>
      <Footer onSelectRole={handleRoleSwitch} />
    </div>
  );
}
