import { supabase } from "@/database/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<any> => {
  const userId = localStorage.getItem("userId");
  const { data, error } = await supabase
    .from("chat_messages")
    .insert([{ userId: userId }])
    .select();

  return NextResponse.json({ data });
};

export const POST = async (req: NextRequest): Promise<any> => {
  const { userId, messages } = await req.json();

  // const { data, error } = await supabase
  //   .from("chat_messages")
  //   .select("message")
  //   .eq("userId", userId);

  // await db.addMessage(id, "user", input);
  // const messageSend = { ...data, messages };

  const res = await fetch(`${process.env.API_CHAT_OPEN_AI}`, {
    method: "POST",
    body: JSON.stringify({ messages }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();

  if (!json["choices"]) {
    return NextResponse.json({
      message: "Something went wrong. Please try again.",
    });
  }

  const content = json["choices"][0]["message"]["content"];
  console.log("content", content);

  // const { data: dataPrevMessages, error: errorPrevMessages } = await supabase
  //   .from("chat_messages")
  //   .insert({ message: content });

  // if (dataPrevMessages === null || errorPrevMessages) {
  //   return NextResponse.json({
  //     message: "Something went wrong. Please try again.",
  //   });
  // }

  // await db.addMessage(id, "assistant", content);

  return NextResponse.json({ content });
};
