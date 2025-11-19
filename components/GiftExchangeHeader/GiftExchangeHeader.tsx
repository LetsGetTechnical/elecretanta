// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { useState, useEffect, JSX } from 'react';
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
import LinkCustom from '../LinkCustom/LinkCustom';
import Image from 'next/image';
import { GROUP_IMAGES } from '@/components/ImageSelector/ImageSelector';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import { ToastVariants } from '../Toast/Toast.enum';
// initialize type for exchange data response

interface MembersListProps {
  members: GiftExchangeMember[];
}

interface GiftExchangeHeaderProps {
  giftExchangeData: GiftExchange;
  id: string | string[] | undefined;
}
type GiftExchangeHeaderPropsUnion = GiftExchangeHeaderProps & MembersListProps;

/**
 * GiftExchangeHeader component displays the header section of a gift exchange,
 * including group details, status, and action buttons.
 * @param {object} props - Component props
 * @param {GiftExchange} props.giftExchangeData - The gift exchange data containing details like name, status, and dates
 * @param {GiftExchangeMember[]} props.members - Array of members participating in the gift exchange
 * @param {string | string[] | undefined} props.id - The unique identifier of the gift exchange
 * @returns {JSX.Element} The rendered gift exchange header component
 */
export const GiftExchangeHeader = ({
  giftExchangeData,
  members,
  id,
}: GiftExchangeHeaderPropsUnion): JSX.Element => {
  const [membersData, setMembersData] = useState(members);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMembersData(members);
  }, [members]);

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    /**
     * Checks if the current user is the owner of the gift exchange
     * by comparing the user's ID with the gift exchange owner ID
     * @returns {Promise<void>}
     */
    async function checkOwnerStatus(): Promise<void> {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const id = data.user?.id;
      setIsOwner(id === giftExchangeData.owner_id);
    }

    checkOwnerStatus();
  }, [giftExchangeData.owner_id]);

  /**
   * Returns the appropriate icon component based on the gift exchange status
   * @param {string} status - The current status of the gift exchange
   * @returns {JSX.Element} The icon component corresponding to the status
   */
  const getStatusIcon = (status: string): JSX.Element => {
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

  /**
   * Returns the human-readable text for a given gift exchange status
   * @param {string} status - The current status of the gift exchange
   * @returns {string} The formatted status text
   */
  const getStatusText = (status: string): string => {
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

  /**
   * Initiates the gift exchange drawing process by calling the API
   * and reloads the page on success
   * @returns {Promise<void>}
   */
  const call = async (): Promise<void> => {
    setIsDrawing(true);

    toast({
      variant: ToastVariants.Success,
      title: '',
      description: 'Please keep this browser open until our elves complete the gift drawing.',
    });

    try {
      const response = await fetch(`/api/gift-exchanges/${id}/draw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberData: {
            groupId: id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      location.reload();
    } catch (error) {
      console.error('Failed to draw gift exchange:', error);
    } finally {
      setIsDrawing(false);
    }
  };

  /**
   * Marks the gift exchange as completed by updating its status
   * and reloads the page on success
   * @returns {Promise<void>}
   */
  async function completeGiftExchange(): Promise<void> {
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
      console.error('Failed to complete gift exchange:', error);
    }
  }

  const group_image =
    GROUP_IMAGES.find((image) => image.src === giftExchangeData.group_image) ||
    GROUP_IMAGES[0];

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

      <section className="gift-exchange-header flex flex-col grow-0 gap-8 sm:flex-row">
        <div className="w-36 h-36 grow-0 shrink-0">
          <Image
            loader={group_image.loader}
            className="object-cover w-full h-full rounded-xl ring-4 ring-white"
            src={group_image.src}
            alt={group_image.alt}
            width={144}
            height={144}
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
              {getStatusText(giftExchangeData.status) === 'Active' &&
                isOwner && (
                <Button
                  onClick={completeGiftExchange}
                  data-testid="complete-gift-exchange"
                >
                  Complete Gift Exchange
                </Button>
              )}
              {getStatusText(giftExchangeData.status) === 'Open' && isOwner ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={membersData.length <= 2 || isDrawing}
                      data-testid="draw-gift-exchange"
                      className="min-w-40"
                    >
                      {isDrawing ? <LoadingSpinner /> : 'Draw Gift Exchange'}
                    </Button>
                  </AlertDialogTrigger>
                  {membersData.length <= 2 && (
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
