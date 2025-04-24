// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX } from 'react';
import { useSnowOverlay } from '@/providers/SnowOverlayProvider';
import { SnowOverlay } from 'react-snow-overlay';

/**
 * Wrapper than renders the visual snow effect of SnowOverlay.
 * `isSnowing`: A boolean state derived from useSnowOverlay context to toggle snowing.
 * `disabledOnSingleCpuDevices`: A boolean prop that disables the snow effect on devices with a single CPU core.
 * @returns {JSX.Element} - The rendered SnowOverlayWrapper element.
 */
const SnowOverlayWrapper = (): JSX.Element => {
  const { isSnowing } = useSnowOverlay();
  return <SnowOverlay disabledOnSingleCpuDevices disabled={!isSnowing} />;
}

export default SnowOverlayWrapper

