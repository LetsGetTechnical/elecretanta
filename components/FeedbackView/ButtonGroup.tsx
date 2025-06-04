// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';

/**
 * Component that renders a group of buttons.
 * @param {object} props - The component props
 * @param {object[]} props.variants - The list of button variants to render
 * @param {Function} props.handleFeedbackSubmit - The function to handle the feedback submit
 * @returns {JSX.Element} The rendered button group component
 */
const ButtonGroup = ({
  variants,
  handleFeedbackSubmit,
}: {
  variants: { title: string; subtitle: string; id: string }[];
  handleFeedbackSubmit: (feedback: string) => void;
}): JSX.Element[] => {
  return variants.map(({ title, subtitle, id }) => (
    <button
      data-testid={`feedback-button-${id}`}
      type="button"
      key={id}
      className="bg-[#E5ECDF] w-72 h-20 rounded-xl hover:bg-[#DBE2D5]"
      onClick={() => handleFeedbackSubmit(`${title}: ${subtitle}`)}
    >
      <p className="text-sm font-bold">{title}</p>
      <p className="text-sm">{subtitle}</p>
    </button>
  ));
};

export default ButtonGroup;
