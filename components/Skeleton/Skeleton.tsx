// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from "react";

interface ISkeletonProps {
  className?: string;
}

/**
 * Skeleton component - animated placeholder for loading states. 
 * @param {ISkeletonProps} props - The component props.
 * @param {string} [props.className] - Additional classNames for styling.
 * @returns {JSX.Element} Styled div serving as a loading placeholder.
 */
export const Skeleton = ({ className }: ISkeletonProps): JSX.Element => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} data-testid="skeleton" />
  );
};
