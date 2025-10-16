// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import '@testing-library/jest-dom';

/* Replace <Image /> with <img /> for testing. Resolves "invalid src prop" error. */
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));
