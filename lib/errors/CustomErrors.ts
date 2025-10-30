// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/**
 * Error class for catching general Backend errors.
 */
export class BackendError extends Error {
  /**
   * Error class for an general Backend errors
   * @param {string} message - Friendly error message for the user
   * @param {number} statusCode - HTTP status code
   * @param {any} details - Optional additional details
   */
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'BackendError';
    this.stack = new Error().stack;
  }
}

/**
 * Error class for catching OpenAI API errors.
 */
export class OpenAiError extends Error {
  /**
   * Error class for catching OpenAI errors
   * @param {string} message - Friendly error message for the user
   * @param {number} statusCode - HTTP status code
   * @param {any} details - Optional additional details
   */
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'OpenAiError';
    this.stack = new Error().stack;
  }
}

/**
 * Error class for catching Supabase errors.
 */
export class SupabaseError extends Error {
  /**
   * Error class for catching Supabase errors
   * @param {string} message - Friendly error message for the user
   * @param {number | string} statusCode - HTTP status code
   * @param {any} details - Optional additional details
   */
  constructor(
    message: string,
    public statusCode: number | string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'SupabaseError';
    this.stack = new Error().stack;
  }
}

/**
 * Error class for catching Google API errors.
 */
export class GoogleError extends Error {
  /**
   * Error class for catching Google errors
   * @param {string} message - Friendly error message for the user
   * @param {number} statusCode - HTTP status code
   * @param {any} details - Optional additional details
   */
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'GoogleError';
    this.stack = new Error().stack;
  }
}
