"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { Profile } from "@/app/types/profile";
import { useEffect, useState } from "react";
import { GiftExchange } from "@/app/types/giftExchange";
import { GiftExchangeHeader } from "@/app/gift-exchanges/[id]/GiftExchangeHeader";
import { useParams } from "next/navigation";

const GiftExchangeMatch = () => {
  const params = useParams();

  const [match, setMatch] = useState<Profile | null>(null);

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

  const fetchGiftGroup = async () => {
    try {
      const giftGroupID = params.groupID;
      const giftExchangeResponse = await fetch(
        `/api/gift-exchanges/${giftGroupID}`
      );

      const giftExchangeResult = await giftExchangeResponse.json();

      setGiftExchangeData(giftExchangeResult);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchGiftGroup();
  }, []);

  const fetchMatch = async () => {
    try {
      const matchedID = params.matchedID;
      const response = await fetch(`/api/profile/${matchedID}`);
      const match = await response.json();
      setMatch(match);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchMatch();
  }, []);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex flex-col gap-4 px-4 xl:px-52 pt-12 text-primary-foreground mb-16">
        <GiftExchangeHeader giftExchangeData={giftExchangeData} />
      </div>
      <ProfileCard className="px-4 xl:px-52" profile={match} />
    </section>
  );
};

export default GiftExchangeMatch;
