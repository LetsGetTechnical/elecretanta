// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/**
 * Checks the dates to know how to update gift exchange status.
 * @param {Request} request - The incoming request object containing the headers.
 * @returns {boolean} Returns true if the 'Authorization' header matches the expected secret, false otherwise.
 */
export const checkAuthorization = ({
  request,
}: {
  request: Request;
}): boolean => {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
};
