// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { JSX } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { IToastNotification } from './ToastNotification.interface';
import { X } from 'lucide-react';

/**
 * Toast Notifications.
 * @param {object} props - The page props.
 * @param {string} props.title - Main title of the toast notification.
 * @param {string} props.description - Description or message for the toast.
 * @returns {JSX.Element} The rendered toast notification. 
 */
const ToastNotification = ({ title, description }: IToastNotification): JSX.Element => {

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root 
        className="bg-white rounded-md shadow-lg p-4 grid gap-x-4 items-start"
        style={{
          gridTemplateAreas: '"title action" "description action"',
          gridTemplateColumns: 'auto max-content',
        }}
      >
        <ToastPrimitive.Title 
          className="font-medium mb-1 text-slate-900 text-base"
          style={{ gridArea: 'title' }}
        >
          {title}
        </ToastPrimitive.Title>
        <ToastPrimitive.Description 
          className="m-0 text-[var(--slate-11)] text-[13px] leading-[1.3]"
          style={{ gridArea: 'description' }}
        >
          {description}
        </ToastPrimitive.Description>
        <ToastPrimitive.Close data-testid="dismiss-button" asChild>
          <X/>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col p-6 gap-2 w-[350px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </ToastPrimitive.Provider>
  );
};

export default ToastNotification;
