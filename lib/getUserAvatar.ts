// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

/**
 * Asynchronously fetches the current user's avatar data (url) from the API.
 * Sends a GET request to the '/api/getUserAvatar' endpoint and returns the
 * parsed JSON response containing the user's avatar information (url).
 * @returns {Promise<string>} - A promise that resolves to the user's avatar url.
 */
const getUserAvatar = async (): Promise<string> => {
  const response = await fetch('api/getUserAvatar', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const userAvatar = await response.json();
  return userAvatar.avatarUrl;
};

export default getUserAvatar;
