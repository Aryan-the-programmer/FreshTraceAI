'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { LoginPage } from '@/components/LoginPage';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/telemetry';

export default function LoginRoute() {
  const router = useRouter();

  const handleSelectRole = (role: UserRole) => {
    if (role === 'fleet_owner') router.push('/fleet-owner');
    else if (role === 'wholesaler') router.push('/wholesaler');
    else router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header currentRole="login" onRoleSwitch={handleSelectRole} />
      <div className="flex-1">
        <LoginPage onSelectRole={handleSelectRole} />
      </div>
      <Footer onSelectRole={handleSelectRole} />
    </div>
  );
}
