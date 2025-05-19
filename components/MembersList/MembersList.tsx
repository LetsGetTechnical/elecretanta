'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/Card/Card';
import { UsersRound } from 'lucide-react';
import Avatar from '@/components/Avatar/Avatar';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';
import Link from 'next/link';
interface IMembersListProps {
  members: GiftExchangeMember[];
}

export const MembersList = ({ members }: IMembersListProps) => {
  return (
    <Card className="w-full" data-testid="members-list">
      <CardHeader className="rounded-xl" data-testid="member-list-header">
        <CardTitle className="text-md font-medium px-2 py-1 flex gap-2 items-start">
          <UsersRound />
          Members ({members.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-4" data-testid="member-item">
              <Link href={`/profile/${member.user_id}`} target="_blank" data-testid="member-profile-link">
                <Avatar userAvatar={member.member.avatar} />
              </Link>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">
                  {member.member.display_name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {member.member.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
