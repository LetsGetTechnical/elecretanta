"use client";

import GiftSuggestionCard from "@/components/GiftSuggestionCard/GiftSuggestionCard";
import { useEffect } from "react";

const TestAIPage = (): React.JSX.Element => {
  const fetchGifts = async () => {
    const response = await fetch("/api/giftSuggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    console.log(data.message.content);
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  return (
    <>
      <GiftSuggestionCard />
    </>
  );
};

export default TestAIPage;
