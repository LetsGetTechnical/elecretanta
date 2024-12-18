"use client";

import GiftSuggestionCard from "@/components/GiftSuggestionCard/GiftSuggestionCard";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const TestAIPage = (): React.JSX.Element => {
  const [gifts, setGifts] = useState<any>({});
  const fetchGifts = async () => {
    const response = await fetch("/api/giftSuggestions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    const dataObject = JSON.parse(data.message.content);
    console.log(dataObject);
    setGifts(dataObject);
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  return (
    <>
      {Object.keys(gifts).map((key) => (
        <GiftSuggestionCard key={key} gift={gifts[key]} />
      ))}
    </>
  );
};

export default TestAIPage;
