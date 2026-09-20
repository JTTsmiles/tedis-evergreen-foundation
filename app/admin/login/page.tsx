"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../src/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    async function checkExistingSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/admin");
        return;
      }

      setIsCheckingSession(false);
    }

    checkExistingSession();
  }, [router]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSigningIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage(
        error.message === "Invalid login credentials"
          ? "The email address or password is incorrect."
          : error.message
      );

      setIsSigningIn(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F3F7F5]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#328BC3]/20 border-t-[#328BC3]" />

          <p className="mt-4 text-sm font-semibold text-[#65716C]">
            Checking administrator access...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F7F5] px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#DDE8E3] bg-white p-7 shadow-[0_24px_70px_rgba(20,56,45,0.12)] sm:p-10">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#13824A]">
            TEDIS Evergreen Foundation
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#14382D]">
            Administrator login
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#65716C]">
            Sign in to manage subscribers, applications, messages and
            administrator access.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#14382D]">
              Email address
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-[#CBDAD3] bg-white px-4 py-3.5 text-[#14201D] outline-none transition focus:border-[#13824A] focus:ring-4 focus:ring-[#13824A]/10"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#14382D]">
              Password
            </span>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-[#CBDAD3] bg-white px-4 py-3.5 pr-20 text-[#14201D] outline-none transition focus:border-[#13824A] focus:ring-4 focus:ring-[#13824A]/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-xs font-black text-[#13824A] transition hover:text-[#0E5F38]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full rounded-xl bg-[#14382D] px-5 py-4 text-sm font-black text-white transition hover:bg-[#0E2B22] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSigningIn ? "Signing in..." : "Sign in to dashboard"}
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center text-sm font-bold text-[#13824A] hover:underline"
        >
          Return to website
        </a>
      </section>
    </main>
  );
}