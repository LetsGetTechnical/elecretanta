"use client";

import { useEffect, useState } from "react";

const TestAIPage = (): React.JSX.Element => {
  const [link, setLink] = useState("");

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

  useEffect(() => {}, []);

  return <></>;
};

export default TestAIPage;
