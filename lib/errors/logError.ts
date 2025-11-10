// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse } from 'next/server';
import {
  BackendError,
  OpenAiError,
  SupabaseError,
  GoogleError,
} from './CustomErrors';

/**
 *
 * Logs an error to the console and returns a JSON response with the error message and status code
 * @param {unknown} error - The error object to be logged
 * @returns {NextResponse} A NextResponse object with error message and status code
 */
export default function logError(error: unknown): NextResponse {
  if (error instanceof SupabaseError) {
    console.error({
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
      stack: error.stack,
    });

    return NextResponse.json({ error: error.message });
  } else if (error instanceof BackendError) {
    console.error({
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  } else if (error instanceof OpenAiError) {
    console.error({
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  } else if (error instanceof GoogleError) {
    console.error({
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      details: error.details,
      stack: error.stack,
    });

    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode },
    );
  } else if (error instanceof Error) {
    console.error({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json({ error: error.message, status: 500 });
  } else {
    console.error({
      name: 'UnknownError',
      message: 'An unknown error occurred',
      details: error,
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
