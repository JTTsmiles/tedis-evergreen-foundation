import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

function getClients() {
  if (!supabaseUrl || !supabasePublishableKey || !supabaseSecretKey) {
    throw new Error("Supabase server environment variables are incomplete.");
  }

  const publicClient = createClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const serverClient = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return { publicClient, serverClient };
}

async function requireSuperAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return { error: "Missing administrator session.", status: 401 };
  }

  const accessToken = authorization.slice("Bearer ".length);
  const { publicClient, serverClient } = getClients();

  const {
    data: { user },
    error: userError,
  } = await publicClient.auth.getUser(accessToken);

  if (userError || !user) {
    return { error: "Your administrator session is invalid.", status: 401 };
  }

  const { data: profile, error: profileError } = await serverClient
    .from("admin_profiles")
    .select("user_id, role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (
    profileError ||
    !profile ||
    profile.role !== "super_admin" ||
    !profile.is_active
  ) {
    return {
      error: "Only the Super Admin can manage administrators.",
      status: 403,
    };
  }

  return { user, serverClient };
}

export async function GET(request: NextRequest) {
  try {
    const authorization = await requireSuperAdmin(request);

    if ("error" in authorization) {
      return NextResponse.json(
        { error: authorization.error },
        { status: authorization.status }
      );
    }

    const { data, error } = await authorization.serverClient
      .from("admin_profiles")
      .select(
        "user_id, email, full_name, role, is_active, created_at"
      )
      .order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ administrators: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load administrators.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authorization = await requireSuperAdmin(request);

    if ("error" in authorization) {
      return NextResponse.json(
        { error: authorization.error },
        { status: authorization.status }
      );
    }

    const body = await request.json();
    const fullName = String(body.full_name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "The password must contain at least 8 characters." },
        { status: 400 }
      );
    }

    const { data: createdUser, error: createError } =
      await authorization.serverClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
        },
      });

    if (createError || !createdUser.user) {
      return NextResponse.json(
        { error: createError?.message ?? "Unable to create administrator." },
        { status: 400 }
      );
    }

    const { error: profileError } = await authorization.serverClient
      .from("admin_profiles")
      .insert({
        user_id: createdUser.user.id,
        email,
        full_name: fullName,
        role: "admin",
        is_active: true,
        created_by: authorization.user.id,
      });

    if (profileError) {
      await authorization.serverClient.auth.admin.deleteUser(
        createdUser.user.id
      );

      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Administrator created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create administrator.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authorization = await requireSuperAdmin(request);

    if ("error" in authorization) {
      return NextResponse.json(
        { error: authorization.error },
        { status: authorization.status }
      );
    }

    const body = await request.json();
    const userId = String(body.user_id ?? "").trim();

    if (!userId) {
      return NextResponse.json(
        { error: "Administrator user ID is required." },
        { status: 400 }
      );
    }

    if (userId === authorization.user.id) {
      return NextResponse.json(
        { error: "You cannot remove your own Super Admin account." },
        { status: 400 }
      );
    }

    const { data: targetProfile, error: targetError } =
      await authorization.serverClient
        .from("admin_profiles")
        .select("user_id, role")
        .eq("user_id", userId)
        .maybeSingle();

    if (targetError || !targetProfile) {
      return NextResponse.json(
        { error: "Administrator account was not found." },
        { status: 404 }
      );
    }

    if (targetProfile.role === "super_admin") {
      return NextResponse.json(
        { error: "The Super Admin account cannot be removed here." },
        { status: 400 }
      );
    }

    const { error: deleteError } =
      await authorization.serverClient.auth.admin.deleteUser(userId);

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Administrator removed successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to remove administrator.",
      },
      { status: 500 }
    );
  }
}
