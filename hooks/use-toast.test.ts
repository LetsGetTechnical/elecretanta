import * as ToastModule from './use-toast';
import {
  reducer,
  actionTypes,
  genId,
  dispatch,
  addToRemoveQueue,
} from './use-toast';
import type { Action } from './use-toast';

import React from 'react';

// methods to test: addToRemoveQueue, dispatch, toast, useToast

const MOCK_TOAST_1 = { id: '1', title: 'Toast 1', open: true };
const MOCK_TOAST_2 = { id: '2', title: 'Toast 2', open: true };
const TOAST_LIMIT = 1;

const MOCK_TIMEOUT_ID = 123;
const mockSetTimeout = jest.fn(() => MOCK_TIMEOUT_ID as any);
const mockClearTimeout = jest.fn();

describe('reducer', () => {
  it('should add a new toast and enforce the TOAST_LIMIT', () => {
    const initialState = { toasts: [MOCK_TOAST_2] };

    const action = {
      type: actionTypes.ADD_TOAST,
      toast: MOCK_TOAST_1,
    };

    const newState = reducer(initialState, action);
    expect(newState.toasts).toHaveLength(TOAST_LIMIT);
    expect(newState.toasts[0]).toEqual(MOCK_TOAST_1);
  });

  it('should add the first toast when the list is empty', () => {
    const initialState = { toasts: [] };

    const action = {
      type: actionTypes.ADD_TOAST,
      toast: MOCK_TOAST_1,
    };

    const newState = reducer(initialState, action);
    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0]).toEqual(MOCK_TOAST_1);
  });
  it('should handle UPDATE_TOAST by merging data into the specified toast', () => {
    const initialState = { toasts: [MOCK_TOAST_1] };
    const update = { id: '1', description: 'Updated Desc', open: false };
    const action = {
      type: actionTypes.UPDATE_TOAST,
      toast: update,
    };

    const newState = reducer(initialState, action);
    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0]).toEqual({
      ...MOCK_TOAST_1,
      ...update,
    });
  });

  it('should handle REMOVE_TOAST by removing the specified toast by ID', () => {
    const initialState = { toasts: [MOCK_TOAST_1, MOCK_TOAST_2] };
    const action = {
      type: actionTypes.REMOVE_TOAST,
      toastId: '1',
    };

    const newState = reducer(initialState, action);

    expect(newState.toasts).toHaveLength(1);
    expect(newState.toasts[0].id).toBe('2');
  });

  it('should handle REMOVE_TOAST with no ID by clearing all toasts', () => {
    const initialState = { toasts: [MOCK_TOAST_1, MOCK_TOAST_2] };
    const action = {
      type: actionTypes.REMOVE_TOAST,
      toastId: undefined,
    };

    const newState = reducer(initialState, action);

    expect(newState.toasts).toHaveLength(0);
  });

  it('should handle DISMISS_TOAST by setting open: false for the specified toast', () => {
    const initialState = { toasts: [MOCK_TOAST_1, MOCK_TOAST_2] };
    const action = {
      type: actionTypes.DISMISS_TOAST,
      toastId: '2',
    };

    const newState = reducer(initialState, action);

    expect(newState.toasts).toHaveLength(2);
    expect(newState.toasts[0].open).toBe(true);
    expect(newState.toasts[1].open).toBe(false);
  });

  it('should handle DISMISS_TOAST by setting open: false for ALL toasts when no toastId is provided', () => {
    const initialState = { toasts: [MOCK_TOAST_1, MOCK_TOAST_2] };
    const action = {
      type: actionTypes.DISMISS_TOAST,
      toastId: undefined,
    };

    const newState = reducer(initialState, action);

    expect(newState.toasts).toHaveLength(2);
    expect(newState.toasts[0].open).toBe(false);
    expect(newState.toasts[1].open).toBe(false);
  });
});

describe('genId', () => {
  it('generates sequential IDs starting from 1', () => {
    jest.resetModules();
    const OriginalToastModule = jest.requireActual('./use-toast');
    const genId: () => string = (OriginalToastModule as any).genId;

    expect(genId()).toBe('1');
    expect(genId()).toBe('2');
    expect(genId()).toBe('3');
  });
});
