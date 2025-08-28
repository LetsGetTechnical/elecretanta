// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ToastVariants } from "./ToastNotification.enum";

export interface IToastNotification {
  // title: string;
  message: string;
  variant: ToastVariants;
}