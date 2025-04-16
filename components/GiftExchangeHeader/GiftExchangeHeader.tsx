'use client';

import { useState, useEffect } from 'react';
import { GiftExchange } from '@/app/types/giftExchange';
import { createClient } from '@/lib/supabase/client';
import { formatDate } from '@/lib/utils';
import {
  ChevronLeft,
  Settings,
  Verified,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../AlertDialogue/AlertDialgoue';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';
import { Button } from '@/components/Button/button';
import LinkCustom from '../NavLink/LinkCustom';
// initialize type for exchange data response

interface MembersListProps {
  members: GiftExchangeMember[];
}

interface GiftExchangeHeaderProps {
  giftExchangeData: GiftExchange;
  id: string | string[] | undefined;
}
type GiftExchangeHeaderPropsUnion = GiftExchangeHeaderProps & MembersListProps;

export const GiftExchangeHeader = ({
  giftExchangeData,
  members,
  id,
}: GiftExchangeHeaderPropsUnion) => {
  const [membersData, setMembersData] = useState(members);

  useEffect(() => {
    setMembersData(members);
  }, [members]);

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    async function checkOwnerStatus() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const id = data.user?.id;
      setIsOwner(id === giftExchangeData.owner_id);
    }

    checkOwnerStatus();
  }, [giftExchangeData.owner_id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Verified />;
      case 'active':
        return <Clock />;
      case 'completed':
        return <CheckCircle />;
      case 'cancelled':
        return <XCircle />;
      default:
        return <Verified />;
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Open';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Open';
    }
  };

  // fetch call to thomas's matching logic
  const call = async () => {
    try {
      const response = await fetch(
        // currently fetches memberslist from
        `/api/gift-exchanges/${id}/draw`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memberData: {
              groupId: id,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      location.reload();
      console.log('data:', data);
    } catch (error) {
      console.log('this is the error: ', error);
    }
  };

  async function completeGiftExchange() {
    try {
      const updatedGiftExchangeData = {
        ...giftExchangeData,
        status: 'completed',
      };

      const response = await fetch(`/api/gift-exchanges/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedGiftExchangeData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      window.location.reload();
    } catch (error) {
      console.error('Failed to delete gift exchange:', error);
    }
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <LinkCustom href="/dashboard">
          <ChevronLeft size={16} strokeWidth={2.25} />
          Back to Dashboard
        </LinkCustom>
        {isOwner && (
          <Link
            href={`/gift-exchanges/${giftExchangeData.id}/edit`}
            className="flex items-center gap-1 text-sm"
          >
            <Settings size={16} strokeWidth={2.25} />
            <span>Edit Group Details</span>
          </Link>
        )}
      </div>

      <section className="flex flex-col grow-0 gap-8 sm:flex-row">
        <div className="w-36 h-36 grow-0 shrink-0">
          <img
            className="w-full h-full rounded-xl ring-4 ring-white"
            src={giftExchangeData.group_image}
            alt="Group logo"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold">
                {giftExchangeData.name}
              </h1>
              <p className="text-xs">{giftExchangeData.description}</p>
            </div>
            <div>
              {getStatusText(giftExchangeData.status) === 'Active' && (
                <Button onClick={completeGiftExchange}>
                  Complete Gift Exchange
                </Button>
              )}
              {getStatusText(giftExchangeData.status) === 'Open' ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={membersData.length < 2}>
                      Draw Gift Exchange
                    </Button>
                  </AlertDialogTrigger>
                  {membersData.length < 2 && (
                    <p className="text-yellow-600 bg-yellow-100 border border-yellow-600 p-2 rounded-lg text-sm mt-2">
                      Gift Exchange needs 3 or more people to start
                    </p>
                  )}
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to start gift exchangee?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={call}>
                        Draw Gift Exchange
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : null}
            </div>
          </div>

          <div className="flex sm:flex-row flex-wrap border-t pt-2 gap-4 sm:gap-16">
            <div className="flex items-center gap-2 basis-full sm:basis-auto">
              {getStatusIcon(giftExchangeData.status)}
              <p className="text-md font-semibold">
                {getStatusText(giftExchangeData.status)}
              </p>
            </div>
            <div className="basis-full sm:basis-auto">
              <p className="text-lg font-semibold">Gift Budget</p>
              <p className="text-lg text-primary-foreground/80">
                ${giftExchangeData.budget}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Draw date</p>
              <p className="text-lg text-primary-foreground/80">
                {formatDate(giftExchangeData.drawing_date)}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold">Exchange Date</p>
              <p className="text-lg text-primary-foreground/80">
                {formatDate(giftExchangeData.exchange_date)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
