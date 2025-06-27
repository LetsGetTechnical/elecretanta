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
}): JSX.Element => {
  return (
    <div
      data-testid="buttonGroup"
      className="flex flex-col justify-center mt-4 gap-4"
    >
      {variants.map((variant) => (
        <button
          data-testid={variant.id}
          type="button"
          key={variant.id}
          className="bg-[#E5ECDF] w-72 h-20 rounded-xl hover:bg-[#DBE2D5]"
          onClick={() =>
            handleFeedbackSubmit(`${variant.title}: ${variant.subtitle}`)
          }
        >
          <p className="text-sm font-bold">{variant.title}</p>
          <p className="text-sm">{variant.subtitle}</p>
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
