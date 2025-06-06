'use client';

import { Snowflake, Sun } from 'lucide-react';
import { useSnowOverlay } from '@/providers/SnowOverlayProvider';
import { Button } from '../Button/button';

export default function SnowOverlayToggle() {
  const { isSnowing, toggleSnowSetting } = useSnowOverlay();
  return (
    <Button
      variant={'ghost'}
      className="text-white p-1 transition-all ease-in-out w-auto h-auto"
      onClick={toggleSnowSetting}
      data-testid="snow-overlay-toggle"
    >
      {isSnowing ? (
        <Sun size={24} className="text-orange-300 text-xl" />
      ) : (
        <Snowflake size={24} className="text-blue-300 text-xl" />
      )}
    </Button>
  );
}
