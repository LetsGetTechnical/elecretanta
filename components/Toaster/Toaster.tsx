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
import { useAuthContext } from '@/context/AuthContextProvider';
import useUserOwnedGroups from "@/hooks/useUserOwnedGroups"

/**
 * Renders and manages display of toast notifications.
 * @returns {JSX.Element} The rendered toast notification. 
 */
const Toaster = (): JSX.Element => {
  const { toasts } = useToast()
  const { session } = useAuthContext()
  const userOwnedGroups = useUserOwnedGroups()
  
  const filteredToasts = toasts.filter((toast) => {
    return userOwnedGroups.some((group) => {
      return (group.gift_exchange_id === toast.group && group.owner_id === session?.user.id)
    })
  })

  // Create function/hook to get the current user
  // Create function/hook to load user owned groups
  
  // Filter toasts for groups the user owns

  return (
    <ToastProvider>
      {filteredToasts.map(function ({ id, title, description, action, ...props }) {
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
      <ToastViewport className="flex flex-col gap-2"/>
    </ToastProvider>
  )
}

export default Toaster
