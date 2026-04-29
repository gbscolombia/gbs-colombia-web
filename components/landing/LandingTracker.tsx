'use client';
import { useEffect } from 'react';
import { analytics } from '@/components/analytics/events';

export function LandingTracker({ campaign }: { campaign: string }) {
  useEffect(() => {
    analytics.landingView(campaign);
  }, [campaign]);
  return null;
}
