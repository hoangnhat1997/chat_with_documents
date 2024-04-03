import { supabase } from "@/database/supabase";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<any> => {
  const userId = localStorage.getItem("userId");
  const { data, error } = await supabase
    .from("chat_messages")
    .select("message")
    .eq("userId", userId);

  return NextResponse.json({ data });
};

export const POST = async (req: NextRequest): Promise<any> => {
  const { id, input } = await req.json();

  // const { data, error } = await supabase
  //   .from("chat_messages")
  //   .select("message")
  //   .eq("userId", id);

  // // await db.addMessage(id, "user", input);
  // const messages = { ...data, input };

  const res = await fetch(`${process.env.API_CHAT_OPEN_AI}`, {
    method: "POST",
    body: JSON.stringify({ input }),
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

  // await db.addMessage(id, "assistant", content);

  return NextResponse.json({ content });
};
