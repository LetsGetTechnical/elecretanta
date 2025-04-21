declare module 'react-snow-overlay' {
  export interface SnowOverlayProps {
    disabled?: boolean;
    disabledOnSingleCpuDevices?: boolean;
  }
  export const SnowOverlay: React.FC<SnowOverlayProps>;
}
