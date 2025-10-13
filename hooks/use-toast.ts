// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

// Inspired by react-hot-toast library
import * as React from 'react';

import type { ToastActionElement } from '@/components/ToastAction/ToastAction';
import type { ToastProps } from '@/components/Toast/Toast';

export const TOAST_LIMIT = 1;
export const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

/**
 * creates a sequential ID as a string.
 * @returns {string} The next sequential ID as a string.
 */
export function genId(): string {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

export type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

export interface State {
  toasts: ToasterToast[];
}

export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * adds specific toast ID a removal queue with a set timeout.
 * @param {string} toastId - ID generated from genId function
 * @returns {void}
 */
export const addToRemoveQueue = (toastId: string): void => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Manages state of toast notifications and applies a toast limit.
 * @param { State } state - current state object that includes a toast array.
 * @param { Action } action - action object containing data needed to update the state.
 * @returns { State } The new state after the action is applied.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t,
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || !toastId
            ? {
              ...t,
              open: false,
            }
            : t,
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (!action.toastId) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

export const listeners: Array<(state: State) => void> = [];

export let memoryState: State = { toasts: [] };

/**
 * Triggers an action to update the toast state and alert the listeners.
 * @param {Action} action - Action object with a type and the data.
 * @returns {void}
 */
export function dispatch(action: Action): void {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

type ToastControls = {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};

/**
 * creates and displays a toast notification.
 * @param props - toast props.
 * @returns {object} - has methods for controlling toast instance.
 */
export function toast({ ...props }: Toast): ToastControls {
  const id = genId();

  /**
   * Updates toast notification.
   * @param props - new properties to apply to the toast.
   * @returns {void}
   */
  const update = (props: ToasterToast): void =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });

  /**
   * dismisses the toast notification.
   * @returns {void}
   */
  const dismiss = (): void => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      /**
       * Callback function for "open" state changes.
       * @param {boolean} open - new open state.
       * @returns {void}
       */
      onOpenChange: (open) => {
        if (!open) {
          dismiss();
        }
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

export interface UseToastReturn extends State {
  toast: (props: Omit<ToasterToast, 'id'>) => ToastControls;
  dismiss: (toastId?: string) => void;
}

/**
 * A React hook that manages and provides global toast state and actions.
 * @returns {object} An object containing the current toast state and action functions.
 */
export function useToast(): UseToastReturn {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return (): void => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    /**
     * Dismisses a toast notification.
     * @param {string} [toastId] - Id of the toast to dismiss.
     * @returns {void}
     */
    dismiss: (toastId?: string): void =>
      dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}
