// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { Snowflake, Sun } from 'lucide-react';
import { useSnowOverlay } from '@/providers/SnowOverlayProvider';
import { Button } from '../Button/button';
import React from 'react';


/**
 * SnowOverlayToggle component
 * A button that toggles snowfall overlay
 * @returns {React.JSX.Element} button element that toggles between sun and snowflake
 */
const SnowOverlayToggle = (): React.JSX.Element => {
  const { isSnowing, toggleSnowSetting } = useSnowOverlay();
  return (
    <Button
      variant={'ghost'}
      className="text-white p-1 transition-all ease-in-out w-auto h-auto"
      onClick={toggleSnowSetting}
      data-testid="snow-overlay-toggle"
    >
      {isSnowing ? (
        <Sun
          data-testid="sun-icon"
          size={24}
          className="text-orange-300 text-xl"
        />
      ) : (
        <Snowflake
          data-testid="snow-icon"
          size={24}
          className="text-blue-300 text-xl"
        />
      )}
    </Button>
  );
}

export { SnowOverlayToggle };
