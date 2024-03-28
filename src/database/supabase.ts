import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export { supabase };

export async function fetchMessages(userId: string) {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
