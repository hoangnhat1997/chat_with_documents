import { createClient } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY,
} from "./constants";

import { createBrowserClient } from "@supabase/ssr";

if (!NEXT_PUBLIC_SUPABASE_URL)
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
if (!NEXT_PUBLIC_SUPABASE_KEY)
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");

export const supabase = createBrowserClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY
);
