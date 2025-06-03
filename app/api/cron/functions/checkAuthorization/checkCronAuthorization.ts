// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/**
 * Checks the header to make sure it is valid.
 * @param {Request} request - The incoming request object containing the headers.
 * @returns {boolean} Returns true if the 'Authorization' header matches the expected secret, false otherwise.
 */
export const checkCronAuthorization = (request: Request): boolean => {
  const authHeader = request.headers.get('authorization');

  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
};
