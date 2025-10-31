// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/Card/Card';
import { formatDate } from '@/lib/utils';
import { Gift, UserCircle, Sparkles, PartyPopper } from 'lucide-react';
import { JSX } from 'react';

interface JourneyCardProps {
  drawingDate: string;
  exchangeDate: string;
}

/**
 * JourneyCard component
 * @param {JourneyCardProps} props - Component props.
 * @param {string} props.drawingDate - Date string representing the day of the randomized drawing.
 * @param {string} props.exchangeDate - Date string representing the day of the gift exchange.
 * @returns {JSX.Element} - The rendered JourneyCard element.
 */
export const JourneyCard = ({
  drawingDate,
  exchangeDate,
}: JourneyCardProps): JSX.Element => {
  const journeySteps = [
    {
      id: 1,
      icon: <Gift className="text-groupCardGreen" />,
      title: 'Secret Match',
      description: `On ${formatDate(
        drawingDate,
      )}, we'll review who you're gifting to`,
    },
    {
      id: 2,
      icon: <UserCircle className="text-groupCardGreen" />,
      title: 'Profile Insights',
      description:
        'See their interests and preferences to guide your gift choice. Update your own profile anytime to help your Secret Santa',
    },
    {
      id: 3,
      icon: <Sparkles className="text-groupCardGreen" />,
      title: 'Smart Gift Ideas',
      description:
        'Our AI suggests personalized gifts based on their interests. Your feedback helps find the perfect match.',
    },
    {
      id: 4,
      icon: <PartyPopper className="text-groupCardGreen" />,
      title: 'Exchange Time',
      description: `Bring your wrapped gift to exchange on ${formatDate(
        exchangeDate,
      )}`,
    },
  ];

  return (
    <Card className="w-full bg-groupCardGreen border-none" data-testid="journey-card">
      <CardHeader className="bg-groupCardGreen rounded-xl p-2">
        <CardTitle className="p-4 flex gap-2 items-center text-white font-bold">
          Your Gift Giving Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-6">
          {journeySteps.map((step) => (
            <div key={step.id} className="flex gap-4 items-center" data-testid={`journey-step-${step.id}`}>
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="flex flex-col items-start justify-start text-white w-full">
                <div className="text-lg font-semibold">{step.title}</div>
                <div className="text-sm">{step.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
