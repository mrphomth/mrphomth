import { createServerClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { CookieOptions } from "@supabase/auth-helpers-shared";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

import type { Database } from "./types";

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createSupabaseServerComponentClient() {
  return createServerComponentClient<Database>({ cookies });
}

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        const mutableStore = cookieStore as unknown as {
          set?: (options: { name: string; value: string } & CookieOptions) => void;
        };
        mutableStore.set?.({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        const mutableStore = cookieStore as unknown as {
          delete?: (options: { name: string } & CookieOptions) => void;
        };
        mutableStore.delete?.({ name, ...options });
      }
    }
  });
}

export function createSupabaseRouteHandlerClient(
  request: NextRequest,
  response: NextResponse
): SupabaseClient<Database> {
  const supabaseUrl = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseAnonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  const headerStore = headers();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    headers: {
      get(key) {
        return request.headers.get(key) ?? headerStore.get(key) ?? undefined;
      }
    },
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: "", ...options, maxAge: 0 });
      }
    }
  });
}

export type { SupabaseClient };
