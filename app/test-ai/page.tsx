"use client";

import { useState } from "react";

const TestAIPage = (): React.JSX.Element => {
  const [message, setMessage] = useState<string>("");

  const handleAI = async () => {
    const response = await fetch("/api/testAIFunction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    console.log(data.message.content);
  };

  return (
    <div>
      <label htmlFor="message">Say anything to the AI!!!</label>
      <input
        type="text"
        name="message"
        id="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleAI}>Send</button>
    </div>
  );
};

export default TestAIPage;
