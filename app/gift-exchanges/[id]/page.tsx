'use client';

import { GiftExchange } from '@/app/types/giftExchange';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { GiftExchangeHeader } from '@/components/GiftExchangeHeader/GiftExchangeHeader';
import { JourneyCard } from '../../../components/JourneyCard/JourneyCard';
import { MembersList } from '../../../components/MembersList/MembersList';
import { InviteCard } from '../../../components/InviteCard/InviteCard';
import { LoadingSkeleton } from '../../../components/LoadingSkeleton/LoadingSkeleton';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';
import WarningModal from '../../../components/WarningModal/WarningModal';
import { CompletedExchangeCard } from '../../../components/CompletedExchangeCard/CompletedExchangeCard';
import { Profile } from '@/app/types/profile';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import GiftSuggestionCard from '@/components/GiftSuggestionCard/GiftSuggestionCard';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { useAuthContext } from '@/context/AuthContextProvider';
import { WaitingForSuggestions } from './WaitingForSuggestions/WaitingForSuggestions';
import { useToast } from '@/hooks/use-toast';
import { ToastVariants } from '@/components/Toast/Toast.enum';
import { signInWithGoogle } from '@/lib/utils';

export default function GiftExchangePage() {
  const { id } = useParams();
  const { session, isSignedIn } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [giftExchangeData, setGiftExchangeData] = useState<GiftExchange>({
    id: '',
    name: '',
    description: '',
    budget: '',
    drawing_date: '',
    group_image: '',
    exchange_date: '',
    owner_id: '',
    status: 'pending',
  });
  const [giftExchangeMembers, setGiftExchangeMembers] = useState<
    GiftExchangeMember[]
  >([]);

  const [giftMatch, setGiftMatch] = useState<Profile | null>(null);
  const [giftSuggestions, setGiftSuggestions] = useState<IGiftSuggestion[]>([]);

  const isUserAMember = session?.user?.id
    ? giftExchangeMembers.some((member) => member.user_id === session.user.id)
    : false;

  const handleGiftUpdate = (
    updatedGift: IGiftSuggestion,
    originalIndex: number,
  ) => {
    setGiftSuggestions((prevSuggestions) => {
      const newSuggestions = [...prevSuggestions];
      newSuggestions[originalIndex] = updatedGift;
      return newSuggestions;
    });
  };

  const fetchGiftExchangeData = useCallback(async () => {
    if (isSignedIn === null) {
      return;
    }
    setIsLoading(true);
    try {
      const [giftExchangeResponse, membersResponse, giftSuggestionsResponse] =
        await Promise.all([
          fetch(`/api/gift-exchanges/${id}`),
          fetch(`/api/gift-exchanges/${id}/members`),
          fetch(`/api/gift-exchanges/${id}/giftSuggestions`),
        ]);

      const [giftExchangeResult, membersResult, giftSuggestionsResult] =
        await Promise.all([
          giftExchangeResponse.json(),
          membersResponse.json(),
          giftSuggestionsResponse.json(),
        ]);

      if (giftExchangeResult.error || membersResult.error) {
        router.push('/dashboard');
        toast({
          variant: ToastVariants.Error,
          title: `Bad Link`,
          description: `Please check the invitation link and try again.`,
        });
        return;
      }

      setGiftExchangeData(giftExchangeResult);
      setGiftExchangeMembers(membersResult);
      setGiftMatch(giftSuggestionsResult.match);
      setGiftSuggestions(giftSuggestionsResult.suggestions);

      const isExchangePending = giftExchangeResult.status === 'pending';
      const isUserLoggedIn = !!session?.user?.id;
      const isUserAGroupMember =
        isUserLoggedIn &&
        membersResult.some(
          (member: GiftExchangeMember) => member.user_id === session.user.id,
        );

      if (!isExchangePending && !isUserLoggedIn) {
        await signInWithGoogle({
          redirectPath: window.location.pathname,
        });
        return;
      }

      if (isUserLoggedIn && !isExchangePending && !isUserAGroupMember) {
        router.push('/dashboard');
        toast({
          variant: ToastVariants.Error,
          title: `Expired Link`,
          description: `Sorry, this invitation is no longer valid.`,
        });
        return;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        variant: ToastVariants.Error,
        title: `Error`,
        description: `Sorry, something went wrong.`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, session, isSignedIn]);

  useEffect(() => {
    fetchGiftExchangeData();
  }, [fetchGiftExchangeData, session, id, isSignedIn]);

  const updateGiftExchangeMembers = async () => {
    try {
      await fetchGiftExchangeData();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton statsCount={4} cardItemCount={10} />;
  }

  const renderContent = () => {
    switch (giftExchangeData.status) {
      case 'pending':
        return (
          <div className="flex flex-col md:flex-row w-full py-12 gap-8 items-start">
            <JourneyCard
              drawingDate={giftExchangeData.drawing_date}
              exchangeDate={giftExchangeData.exchange_date}
            />
            <div className="flex flex-col gap-4 w-full">
              <MembersList members={giftExchangeMembers} />
              <InviteCard />
            </div>
          </div>
        );
      case 'active':
        return (
          <div className="w-full py-4">
            <section className="py-4 mb-12">
              <h1 className="font-bold mb-4">Your Secret Santa Match</h1>
              <ProfileCard profile={giftMatch} />
            </section>
            <section className="flex flex-col">
              <h1 className="font-bold">Gift Suggestions</h1>
              {giftSuggestions?.length === 0 && <WaitingForSuggestions />}

              {giftSuggestions?.length > 0 && (
                <div className="flex flex-row flex-wrap">
                  {giftSuggestions.map((gift, index) => (
                    <GiftSuggestionCard
                      allGiftSuggestions={giftSuggestions}
                      budget={giftExchangeData.budget}
                      gift={gift}
                      index={index}
                      key={gift.id}
                      onGiftUpdate={handleGiftUpdate}
                      recipient={giftMatch}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        );
      case 'completed':
        return (
          <div className="w-full py-12">
            <CompletedExchangeCard members={giftExchangeMembers} />
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen-minus-20">
      {isUserAMember === false && giftExchangeData.status === 'pending' && (
        <WarningModal
          giftExchangeData={giftExchangeData}
          members={giftExchangeMembers}
          updateGiftExchangeMembers={updateGiftExchangeMembers}
        />
      )}
      <section className="mx-auto flex flex-col gap-4 px-4 md:px-16 lg:px-32 xl:px-52 pt-12 text-primary-foreground">
        <GiftExchangeHeader
          giftExchangeData={giftExchangeData}
          id={giftExchangeData.id}
          members={giftExchangeMembers}
        />
        {renderContent()}
      </section>
    </main>
  );
}
