'use client';

import { GiftExchange } from '@/app/types/giftExchange';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { GiftExchangeHeader } from '@/components/GiftExchangeHeader/GiftExchangeHeader';
import { JourneyCard } from '@/components/JourneyCard/JourneyCard';
import { MembersList } from '@/components/MembersList/MembersList';
import { InviteCard } from '@/components/InviteCard/InviteCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton/LoadingSkeleton';
import { GiftExchangeMember } from '@/app/types/giftExchangeMember';
import WarningModal from '@/components/WarningModal/WarningModal';
import { CompletedExchangeCard } from '@/components/CompletedExchangeCard/CompletedExchangeCard';
import { Profile } from '@/app/types/profile';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import GiftSuggestionCard from '@/components/GiftSuggestionCard/GiftSuggestionCard';
import { IGiftSuggestion } from '@/app/types/giftSuggestion';
import { useAuthContext } from '@/context/AuthContextProvider';
import { WaitingForSuggestions } from './WaitingForSuggestions/WaitingForSuggestions';
import RedirectCard from '@/components/RedirectCard/RedirectCard';

export default function GiftExchangePage() {
  const { id } = useParams();
  const { session } = useAuthContext();
  const [isUserAMember, setIsUserAMember] = useState<boolean | null>(null);
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

      setGiftExchangeData(giftExchangeResult);
      setGiftExchangeMembers(membersResult);
      setGiftMatch(giftSuggestionsResult.match);
      setGiftSuggestions(giftSuggestionsResult.suggestions);
      if (session) {
        setIsUserAMember(
          membersResult.some(
            (member: GiftExchangeMember) => member.user_id === session?.user.id,
          ),
        );
      } else {
        setIsUserAMember(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, session]);

  useEffect(() => {
    fetchGiftExchangeData();
  }, [fetchGiftExchangeData, session, id]);

  const updateGiftExchangeMembers = async () => {
    try {
      await fetchGiftExchangeData();
    } catch (error) {
      console.error(error);
    }
  };

  const isValidGiftExchange = !!giftExchangeData?.id

  if (isLoading) {
    return <LoadingSkeleton statsCount={4} cardItemCount={10} />;
  }

  if (!isValidGiftExchange) {
    return (
      <main className="min-h-screen-minus-20 flex justify-center">
        <section className="max-w-xs mt-12">
          <RedirectCard 
            title="Bad Link" 
            description='This link may be invalid or expired. Please double-check your
                invitation link.'
            buttonHref='/'
            buttonLabel='Home'
          />
        </section>
      </main>
    );
  }

  if (!session && giftExchangeData.status !== 'pending') {
    return (
      <main className="min-h-screen-minus-20 flex justify-center">
        <section className="max-w-xs mt-12">
          <RedirectCard 
            title="Log In" 
            description='Please log in to visit this page.'
            buttonHref='/'
            buttonLabel='Home'
          />
        </section>
      </main>
    );
  }
  
  if (!isUserAMember && giftExchangeData.status !== 'pending') {
    return (
      <main className="min-h-screen-minus-20 flex justify-center">
        <section className="max-w-xs mt-12">
          <RedirectCard 
            title="Expired Link" 
            description='Your invitation link may be outdated.'
            buttonHref='/'
            buttonLabel='Home'
          />
        </section>
      </main>
    );
  }


  if (giftExchangeData.status === 'pending' && (!session || !isUserAMember) ) {
    return (
      <main className="min-h-screen-minus-20">
        <WarningModal
          giftExchangeData={giftExchangeData}
          members={giftExchangeMembers}
          updateGiftExchangeMembers={updateGiftExchangeMembers}
        />
      </main>
    );
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
              {giftSuggestions.length === 0 && <WaitingForSuggestions />}

              {giftSuggestions.length > 0 && (
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
