"use client";

import { NextStudio } from 'next-sanity/studio';
import type { StudioConfig } from 'sanity';

import config from '../../../../sanity.config';

export function StudioWrapper({ config: providedConfig }: { config?: StudioConfig }) {
  const studioConfig = providedConfig ?? config;

  return <NextStudio config={studioConfig} />;
}
