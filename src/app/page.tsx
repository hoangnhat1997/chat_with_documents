"use client";

import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import { supabase } from "@/database/supabase";
import { POST } from "./api/chat/route";

type Message = Readonly<{
  readonly role: "user" | "assistant";
  readonly content: string;
}>;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>();

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId") || uuidv4();
  //   localStorage.setItem("userId", userId);
  //   (async () => {
  //     const { data } = await supabase
  //       .from("chat_messages")
  //       .select()
  //       .eq("userId", userId);
  //     if (data) {
  //       return;
  //     }
  //     const { error } = await supabase
  //       .from("chat_messages")
  //       .insert({ userId: userId });
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("/api/chat");
  //     const { messages } = await res.json();

  //     setMessages(messages);
  //   })();

  //   return () => {};
  // }, []);

  const handleSubmit = async () => {
    if (!input) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          ...messages,
          {
            role: "user",
            content: input,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { content } = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content,
      },
    ]);
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index.toString()}>
            <div>{message.role == "user" ? "Human" : "AI"}</div>
            <div>{message.content}</div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border"
        />
        <button type="submit" onClick={handleSubmit}>
          Gui
        </button>
      </div>
    </div>
  );
}
