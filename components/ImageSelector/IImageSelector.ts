// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export interface GroupImage {
  id: string;
  title: string;
  src: string;
  loader?: ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => string;
  alt: string;
}
