// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';

import { AvatarImage } from './AvatarImage';
import { AvatarFallback } from './AvatarFallback/AvatarFallback';
import { AvatarBody } from './AvatarBody/AvatarBody';

/**
 * An Avatar component that displays a provided image URL or a default image if not provided.
 * @param {string} userAvatar - URL string for the avatar image. If undefined, the AvatarFallback img will be used.
 * @returns {JSX.Element} - The rendered Avatar element.
 */
const Avatar = ({
  userAvatar,
}: {
  userAvatar: string | undefined;
}): JSX.Element => {
  return (
    <AvatarBody>
      <AvatarImage src={userAvatar} alt="" />
      <AvatarFallback>
        <img
          src="https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
          alt="default avatar"
        />
      </AvatarFallback>
    </AvatarBody>
  );
};

export default Avatar;
