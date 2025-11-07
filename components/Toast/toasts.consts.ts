// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Toast } from '@/hooks/use-toast';
import { ToastVariants } from './Toast.enum';

export const TOASTS = {
  badLinkToast: {
    variant: ToastVariants.Error,
    title: 'Bad Link',
    description: 'Please check the invitation link and try again.',
  },
  expiredLinkToast: {
    variant: ToastVariants.Error,
    title: 'Expired Link',
    description: 'Sorry, this invitation is no longer valid.',
  },
  errorToast: {
    variant: ToastVariants.Error,
    title: 'Error',
    description: 'Sorry, something went wrong.',
  },
} as const satisfies Record<string, Toast>;
