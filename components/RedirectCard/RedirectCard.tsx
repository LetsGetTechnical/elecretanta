// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card/Card';
import { Button } from '@/components/Button/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

interface RedirectCardProps {
  title?: string;
  description?: string;
  buttonHref?: string;
  buttonLabel?: string;
  className?: string;
}

/**
 * RedirectCard displays a card component with a title (optional), description (optional), and
 * a button to redirect the user when a user action is needed to continue,
 * @param {object} props - Component props
 * @param {string} [props.title] - The title to display on the card
 * @param {string} [props.description] - The description to display on the card
 * @param {string} [props.buttonHref="/"] - The path to navigate to when button is clicked
 * @param {string} [props.buttonLabel="Home"] - The label for the button
 * @param {string} [props.className] - Classes to be applied to the root Card
 * @returns {JSX.Element} The rendered component
 */
const RedirectCard = ({
  title,
  description,
  buttonHref = '/',
  buttonLabel = 'Home',
  className,
}: RedirectCardProps): JSX.Element => {
  return (
    <Card className={cn(className)} data-testid="redirect-card">
      <CardHeader className="flex items-center space-y-3">
        <Gift className="w-10 h-10 text-logoRed mb-2" aria-hidden="true" />
        {title && <CardTitle>{title}</CardTitle>}
      </CardHeader>
      <CardContent className="space-y-5">
        {description && <CardDescription>{description}</CardDescription>}
        <div className="flex justify-center">
          <Button asChild>
            <Link href={buttonHref}>{buttonLabel}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedirectCard;
