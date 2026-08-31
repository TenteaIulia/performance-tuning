import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");

  const next =
    requestUrl.searchParams.get("next") ?? "/update-password";

  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/forgot-password?error=invalid-link",
        requestUrl.origin
      )
    );
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error(
      "Password recovery callback error:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/forgot-password?error=expired-link",
        requestUrl.origin
      )
    );
  }

  return NextResponse.redirect(
    new URL(next, requestUrl.origin)
  );
}