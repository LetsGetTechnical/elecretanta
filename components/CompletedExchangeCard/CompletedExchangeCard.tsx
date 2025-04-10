'use client';

import { useEffect, useState } from 'react';
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

export const CompletedExchangeCard = ({
  members,
}: CompletedExchangeCardProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 1000);

    return () => clearTimeout(timer);
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
          {members.map((member, index) => (
            <div key={index} className="grid grid-cols-[auto_1fr_auto]">
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
