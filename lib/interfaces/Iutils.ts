// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ToastVariants } from '@/components/Toast/Toast.enum';
import { GiftExchangeWithMemberCount } from '@/app/types/giftExchange';

export interface IToastFunction {
  (props: {
    variant: ToastVariants;
    title: string;
    description: string;
    group: string;
  }): void;
}

export interface processExchangeForToastProps {
  exchange: GiftExchangeWithMemberCount;
  toast: ToastFunction;
  today?: Date;
}
