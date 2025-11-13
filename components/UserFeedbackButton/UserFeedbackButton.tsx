// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';

/**
 * The UserFeedbackButton component is a button that links to a user feedback form.
 * @returns A user feedback button.
 */
const UserFeedbackButton = (): JSX.Element => {
  const feedbackUrl = 'https://forms.gle/1rUskWou62FopGTXA';

  return (
    <a
      href={feedbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="user-feedback-button"
      className="fixed bottom-0 left-4 bg-[#FAFAFA] text-[#0B4157] px-4 py-[10px] border-2 border-[#222222] rounded-tl-xl rounded-tr-xl"
    >
      Support/Feedback
    </a>
  );
};

export default UserFeedbackButton;
