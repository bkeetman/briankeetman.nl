"use client";

import { NextStudio } from 'next-sanity/studio';

import config from '../../../../sanity.config';

export function StudioWrapper({ config: providedConfig }: { config?: unknown }) {
  const studioConfig = providedConfig ?? config;

  return <NextStudio config={studioConfig as any} />;
}
