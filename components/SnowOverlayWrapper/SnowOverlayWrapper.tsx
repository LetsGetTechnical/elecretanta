// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX } from 'react';
import { useSnowOverlay } from '@/providers/SnowOverlayProvider';
import { SnowOverlay } from 'react-snow-overlay';

/**
 * Function that renders the visual snow effect of SnowOverlay.
 * @returns {JSX.Element} - The rendered SnowOverlayWrapper element.
 */
const SnowOverlayWrapper = (): JSX.Element => {
  const { isSnowing } = useSnowOverlay();
  return (
    <div data-testid="snowOverlayWrapper">
      <SnowOverlay disabledOnSingleCpuDevices disabled={!isSnowing} />
    </div>
  )
}

export default SnowOverlayWrapper
