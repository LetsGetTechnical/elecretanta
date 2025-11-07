// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ImageLoader } from 'next/image';

export interface GroupImage {
  id: string;
  title: string;
  src: string;
  loader?: ImageLoader;
  alt: string;
}
