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
    });

    it('popover opens when content is empty', async () => {
      await userEvent.click(screen.getByTestId('popover-trigger'));
      const popoverContent = screen.getByTestId('popover-content');

      expect(popoverContent).toBeInTheDocument();
    });
  });

  describe('Popover Component with data', () => {
    beforeEach(() => {
      render(
        <Popover>
          <PopoverTrigger>triggerContent</PopoverTrigger>
          <PopoverContent>Content Here</PopoverContent>
          <PopoverAnchor />
        </Popover>,
      );
    });
    it('renders content inside of trigger component', () => {
      const trigger = screen.getByText('triggerContent');

      expect(trigger).toBeInTheDocument();
    });

    it('when popover is closed, content is not visible', () => {
      const popoverContent = screen.queryByText('Content Here');

      expect(popoverContent).not.toBeInTheDocument();
    });

    it('content is visible when popover is opened', async () => {
      const triggerContent = screen.getByText('triggerContent');
      await userEvent.click(triggerContent);

      const popoverContent = screen.queryByText('Content Here');
      expect(popoverContent).toBeVisible();
    });

    it('content not visible when popover is opened then closed', async () => {
      const triggerContent = screen.getByText('triggerContent');
      //opens popover
      await userEvent.click(triggerContent);

      const content = screen.queryByText('Content Here');
      expect(content).toBeVisible();

      //closes popover
      await userEvent.click(triggerContent);
      expect(screen.queryByText('Content Here')).not.toBeInTheDocument();
    });
  });

  describe('Popover Component with attributes while popover is open', () => {
    it('applies align attribute to content element', async () => {
      render(
        <Popover>
          <PopoverTrigger>triggerContent</PopoverTrigger>
          <PopoverContent>Content Here</PopoverContent>
          <PopoverAnchor />
        </Popover>,
      );
      const triggerContent = screen.getByText('triggerContent');

      await userEvent.click(triggerContent);

      const popoverContent = screen.queryByTestId('popover-content');
      expect(popoverContent).toHaveAttribute('data-align', 'center');
    });

    it('applies align attribute with different value than default to content element', async () => {
      render(
        <Popover>
          <PopoverTrigger>triggerContent</PopoverTrigger>
          <PopoverContent align="start">Content Here</PopoverContent>
          <PopoverAnchor />
        </Popover>,
      );
      const triggerContent = screen.getByText('triggerContent');

      await userEvent.click(triggerContent);

      const popoverContent = screen.queryByTestId('popover-content');
      expect(popoverContent).toHaveAttribute('data-align', 'start');
    });
  });
})