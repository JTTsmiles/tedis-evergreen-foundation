"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../src/lib/supabase";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    async function redirectAdministrator() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      router.replace("/admin");
    }

    redirectAdministrator();
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3F7F5] text-[#14201D]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#63B1E5]/20 border-t-[#328BC3]" />

        <p className="mt-4 text-sm font-semibold text-[#65716C]">
          Checking administrator access...
        </p>
      </div>
    </main>
  );
}