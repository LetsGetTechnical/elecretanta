// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { useEffect, useState, JSX } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/Card/card';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';
import Avatar from '@/components/Avatar/Avatar';
import { ArrowRight, Gift, PartyPopper } from 'lucide-react';

interface CompletedExchangeCardProps {
  members: GiftExchangeMember[];
}

/**
 * Function that shows up after gift exchange completes and shows confetti.
 * @param {CompletedExchangeCardProps} props - Props for function
 * @param {GiftExchangeMember[]} props.members - Gift exchange members.
 * @returns {JSX.Element} The rendered card component with confetti animation.
 */
export const CompletedExchangeCard = ({
  members,
}: CompletedExchangeCardProps): JSX.Element => {
  const [showConfetti, setShowConfetti] = useState(true);

  /**
   * Function that triggers the confetti.
   * @returns {Promise<void>} - A promise that resolves after confetti is turned off.
   */
  const triggerConfetti = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setShowConfetti(false);
        resolve();
      }, 1000);
    });
  };
  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <Card
      className={`w-full max-w-lg mx-auto sm:px-8 ${
        showConfetti &&
        'motion-preset-confetti motion-delay-[0.5s] motion-duration-1000'
      }`}
    >
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-2">
          <PartyPopper />
          <h2 className="text-xl">It&apos;s a Wrap!</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="grid grid-cols-[auto_1fr_auto]">
              <div className="flex items-center">
                <Avatar
                  userAvatar={
                    member.recipient.avatar ||
                    'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg'
                  }
                />
                <p className="sm:text-lg pl-2">{member.member.display_name}</p>
              </div>
              <div className="flex justify-center items-center">
                <Gift size={20} className="text-mutedRed" />
                <ArrowRight size={18} className="text-mutedRed -ml-1" />
                <p className="sr-only">gifted to</p>
              </div>

              <div className="flex items-center ">
                <p className="sm:text-lg pr-2">
                  {member.recipient.display_name}
                </p>
                <Avatar
                  userAvatar={
                    member.recipient.avatar ||
                    'https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg'
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
