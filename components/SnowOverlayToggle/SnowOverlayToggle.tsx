// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX } from 'react';
import { Snowflake, Sun } from 'lucide-react';
import { useSnowOverlay } from '@/providers/SnowOverlayProvider';
import { Button } from '../Button/button';


/**
 * SnowOverlayToggle component
 * A button that toggles snowfall overlay
 * @returns {JSX.Element} button element that toggles between sun and snowflake
 */
const SnowOverlayToggle = (): JSX.Element => {
  const { isSnowing, toggleSnowSetting } = useSnowOverlay();
  return (
    <Button
      variant={'ghost'}
      className="text-white p-1 transition-all ease-in-out w-auto h-auto"
      onClick={toggleSnowSetting}
    >
      {isSnowing ? (
        <Sun size={24} className="text-orange-300 text-xl" />
      ) : (
        <Snowflake size={24} className="text-blue-300 text-xl" />
      )}
    </Button>
  );
}

export { SnowOverlayToggle };
