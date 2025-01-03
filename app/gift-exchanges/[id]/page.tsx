"use client";

import { GiftExchange } from "@/app/types/giftExchange";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GiftExchangeHeader } from "./GiftExchangeHeader";
import { JourneyCard } from "./JourneyCard";
import { MembersList } from "./MembersList";
import { InviteCard } from "./InviteCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { GiftExchangeMember } from "@/app/types/giftExchangeMember";
import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";
import WarningModal from "./WarningModal";
import { CompletedExchangeCard } from "./CompletedExchangeCard";
import { Profile } from "@/app/types/profile";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import GiftSuggestionCard from "@/components/GiftSuggestionCard/GiftSuggestionCard";
import { GiftSuggestion } from "@/app/types/giftSuggestion";

export default function GiftExchangePage() {
  const { id } = useParams();
  const [session, setSession] = useState<Session | null>(null);
  const [isUserAMember, setIsUserAMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [giftExchangeData, setGiftExchangeData] = useState<GiftExchange>({
    id: "",
    name: "",
    description: "",
    budget: "",
    drawing_date: "",
    group_image: "",
    exchange_date: "",
    owner_id: "",
    status: "pending",
  });
  const [giftExchangeMembers, setGiftExchangeMembers] = useState<
    GiftExchangeMember[]
  >([]);

  const [giftMatch, setGiftMatch] = useState<Profile | null>(null);
  const [giftSuggestions, setGiftSuggestions] = useState<GiftSuggestion[]>([]);

  const handleGiftUpdate = (
    updatedGift: GiftSuggestion,
    originalIndex: number
  ) => {
    setGiftSuggestions((prevSuggestions) => {
      const newSuggestions = [...prevSuggestions];
      newSuggestions[originalIndex] = updatedGift;
      return newSuggestions;
    });
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
  }, []);

  const fetchGiftExchangeData = async () => {
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
            (member: GiftExchangeMember) => member.user_id === session?.user.id
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftExchangeData();
  }, [id, session]);

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
      case "pending":
        return (
          <div className="flex flex-row w-full py-12 gap-8 items-start">
            <JourneyCard
              drawingDate={giftExchangeData.drawing_date}
              exchangeDate={giftExchangeData.exchange_date}
            />
            <div className="flex flex-col gap-4 w-full max-w-md">
              <MembersList members={giftExchangeMembers} />
              <InviteCard />
            </div>
          </div>
        );
      case "active":
        return (
          <div className="w-full py-12">
            <section className="py-4">
              <h1 className="font-bold mb-2">Your Secret Santa Match</h1>
              <ProfileCard profile={giftMatch} />
            </section>
            <section className="flex flex-col ">
              <h1 className="font-bold mb-2">Gift Suggestions</h1>
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
            </section>
          </div>
        );
      case "completed":
        return (
          <div className="w-full py-12">
            <CompletedExchangeCard members={giftExchangeMembers} />
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen">
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
