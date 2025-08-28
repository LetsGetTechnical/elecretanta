// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { JSX } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { IToastNotification } from './ToastNotification.interface';
import { ToastVariants } from './ToastNotification.enum';
import { X } from 'lucide-react';

const variantConfig = {
  [ToastVariants.CountDown]:{
    title: 'Drawing Date Countdown',
    tailwindClasses: 'bg-yellow-200'
  },
  [ToastVariants.DrawingDay]:{
    title: "It's Secret Santa Reveal Day!",
    tailwindClasses: 'bg-green-300'
  },
  [ToastVariants.OverDue]:{
    title: 'Drawing Date has passed.',
    tailwindClasses: 'bg-red-400',
  }
};

/**
 * Toast Notifications.
 * @param {object} props - The component's props.
 * @param {ToastVariants} props.variant - variant that determine's toast's styling, title, and default description. 
 * @param {string} [props.message] - optional custom message instead of default description.
 * @returns {JSX.Element} The rendered toast notification. 
 */
const ToastNotification = ({ variant, message }: IToastNotification): JSX.Element => {

  const { title, tailwindClasses } = variantConfig[variant];

  return (
    <ToastPrimitive.Provider duration={8000}>
      <ToastPrimitive.Root 
        className={`${tailwindClasses} rounded-md shadow-lg p-4 grid gap-x-4 items-start`}
        style={{
          gridTemplateAreas: '"title" "message"',
          gridTemplateColumns: 'auto max-content',
        }}
      >
        <ToastPrimitive.Title 
          className="font-medium mb-1 text-slate-900 text-base text-center" 
          style={{ gridArea: 'title' }}
        >
          {title}
        </ToastPrimitive.Title>
        <ToastPrimitive.Description 
          className="m-0 text-[var(--slate-11)] text-[13px] leading-[1.3] text-center"
          style={{ gridArea: 'message' }}
        >
          {message}
        </ToastPrimitive.Description>
        <ToastPrimitive.Close data-testid="dismiss-button" asChild className="hover:cursor-pointer">
          <X/>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col p-6 gap-2 w-[350px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </ToastPrimitive.Provider>
  );
};

export default ToastNotification;
