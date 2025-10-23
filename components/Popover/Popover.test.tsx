// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { render, screen } from '@testing-library/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from './popover';

import userEvent from '@testing-library/user-event';
describe('Popover Component', () => {
  describe('Popover Component without data', () => {
    beforeEach(() => {
      render(
        <Popover>
          <PopoverTrigger></PopoverTrigger>
          <PopoverContent></PopoverContent>
          <PopoverAnchor />
        </Popover>,
      );
    });

    it('renders the popover component and nested children components', () => {
      const trigger = screen.getByTestId('popover-trigger');
      const anchor = screen.getByTestId('popover-anchor');

      expect(trigger).toBeInTheDocument();
      expect(anchor).toBeInTheDocument();
      console.log(trigger);
    });

    it('popover opens when content is empty', async () => {
      await userEvent.click(screen.getByTestId('popover-trigger'));
      const popoverContent = screen.getByTestId('popover-content');
      expect(popoverContent).toBeInTheDocument();
    });
  });

  describe('Popover Component with data', () => {
    const handleOpenChange = jest.fn();
    beforeEach(() => {
      render(
        <>
          <Popover onOpenChange={handleOpenChange}>
            <PopoverTrigger>triggerContent</PopoverTrigger>
            <PopoverContent className="custom-class">content</PopoverContent>
            <PopoverAnchor />
          </Popover>
          <div data-testid="outside"></div>
        </>,
      );
    });

    it('closes on outside click and calls onOpenChange', async () => {
      const popoverTrigger = screen.getByRole('button', {
        name: /triggerContent/i,
      });
      await userEvent.click(popoverTrigger);

      const popoverContent = screen.getByRole('dialog');
      const outsideDiv = screen.getByTestId('outside');
      expect(popoverContent).toBeVisible();

      await userEvent.click(outsideDiv);
      expect(popoverContent).not.toBeVisible();
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('renders content inside of trigger component', () => {
      const trigger = screen.getByText('triggerContent');

      expect(trigger).toBeInTheDocument();
    });

    it('when popover is closed, content is not visible', () => {
      const popoverContent = screen.queryByRole('dialog', { name: /content/i });

      expect(popoverContent).not.toBeInTheDocument();
    });

    it('content is visible when popover is opened', async () => {
      const triggerContent = screen.getByText('triggerContent');
      await userEvent.click(triggerContent);

      const popoverContent = screen.queryByText('content');
      expect(popoverContent).toBeVisible();
    });

    it('content not visible when popover is opened then closed', async () => {
      const triggerContent = screen.getByText('triggerContent');
      //opens popover
      await userEvent.click(triggerContent);

      const content = screen.queryByText('content');
      expect(content).toBeVisible();

      //closes popover
      await userEvent.click(triggerContent);
      expect(screen.queryByText('content')).not.toBeInTheDocument();
    });

    it('applies align attribute to content element', async () => {
      const triggerContent = screen.getByText('triggerContent');

      await userEvent.click(triggerContent);

      const popoverContent = screen.queryByTestId('popover-content');
      expect(popoverContent).toHaveAttribute('data-align', 'center');
    });

    it('applies custom className to content', async () => {
      const triggerContent = screen.getByText('triggerContent');

      await userEvent.click(triggerContent);

      const popoverContent = screen.queryByTestId('popover-content');
      expect(popoverContent).toHaveClass('custom-class');
    });

    it('opens with Enter/Space and closes with Escape', async () => {
      const trigger = screen.getByRole('button', { name: /triggerContent/i });
      trigger.focus();

      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('dialog')).toBeVisible();

      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await userEvent.keyboard(' ');
      expect(screen.getByRole('dialog')).toBeVisible();
    });

    it('returns focus to trigger after close', async () => {
      const trigger = screen.getByRole('button', { name: /triggerContent/i });
      await userEvent.click(trigger);

      await userEvent.keyboard('{Escape}');
      expect(trigger).toHaveFocus();
    });
  });

  describe('Popover Component with attributes while popover is open', () => {
    it('applies align attribute with different value than default to content element', async () => {
      render(
        <Popover>
          <PopoverTrigger>triggerContent</PopoverTrigger>
          <PopoverContent align="start">content</PopoverContent>
          <PopoverAnchor />
        </Popover>,
      );
      const triggerContent = screen.getByText('triggerContent');

      await userEvent.click(triggerContent);

      const popoverContent = screen.queryByTestId('popover-content');
      expect(popoverContent).toHaveAttribute('data-align', 'start');
    });
  });
});
