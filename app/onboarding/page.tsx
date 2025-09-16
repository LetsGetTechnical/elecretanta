'use client';

import { Suspense } from 'react';
import { Onboarding } from './onboarding-form/onboarding-form';

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-white text-2xl">Loading...</div>
      }
    >
      <Onboarding />
    </Suspense>
  );
}
