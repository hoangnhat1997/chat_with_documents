import { NextRequest, NextResponse } from "next/server";

const db: any = {};

export const GET = async (req: NextRequest): Promise<any> => {
  const userId = localStorage.getItem("userId");
  const messages = db.getMessages(userId);

  return NextResponse.json({ messages });
};

export const POST = async (req: NextRequest): Promise<any> => {
  const { id, input } = await req.json();

  // const messages = db.getMessages(id);

  await db.addMessage(id, "user", input);
  const messages = db.getMessages(id);

  const res = await fetch(
    "https://github-copilot.idex.vn/v1/chat/completions",
    {
      method: "POST",
      body: JSON.stringify({ messages }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await res.json();

  if (!json["choices"]) {
    return NextResponse.json({
      message: "Something went wrong. Please try again.",
    });
  }

  const content = json["choices"][0]["message"]["content"];

  await db.addMessage(id, "assistant", content);

  return NextResponse.json({ content });
};
