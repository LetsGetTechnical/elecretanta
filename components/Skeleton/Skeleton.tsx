// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from "react";

interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton component - animated placeholder for loading states. 
 * @param {SkeletonProps} props - The component props.
 * @param {string} [props.className] - Additional classNames for styling.
 * @returns {JSX.Element} Styled div serving as a loading placeholder.
 */
export const Skeleton = ({ className }: SkeletonProps): JSX.Element => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );
};
