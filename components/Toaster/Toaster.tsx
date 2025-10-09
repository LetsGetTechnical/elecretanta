// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast } from "@/components/Toast/Toast"
import { ToastTitle } from "../ToastTitle/ToastTitle"
import { ToastDescription } from "../ToastDescription/ToastDescription"
import { ToastClose } from "../ToastClose/ToastClose"
import { ToastViewport } from "../ToastViewport/ToastViewport"
import { ToastProvider } from "../ToastProvider/ToastProvider"
import { JSX } from "react"

/**
 * Renders and manages display of toast notifications.
 * @returns {JSX.Element} The rendered toast notification. 
 */
const Toaster = (): JSX.Element => {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

export default Toaster
