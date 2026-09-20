"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../src/lib/supabase";

type Section = "overview" | "beneficiaries" | "messages";
type ModalMode = "create" | "view" | "edit" | null;

type Beneficiary = {
  id: string;
  name: string;
  phone: string;
  email: string;
  email_verified: boolean;
  address: string | null;
  community: string | null;
  lga: string | null;
  state: string | null;
  serial_number: string;
  product: string;
  installation_date: string | null;
  system_status: string;
  battery_health: number | null;
  current_load: number | null;
  energy_today: number | null;
  last_signal: string | null;
  subscription_status: string;
  next_payment: string | null;
  guarantor_name: string | null;
  guarantor_phone: string | null;
  guarantor_address: string | null;
  guarantor_relationship: string | null;
  maintenance_notes: string | null;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  organisation: string | null;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Stats = {
  beneficiaries: number;
  active: number;
  online: number;
  unreadMessages: number;
};

type AdminProfile = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: "super_admin" | "admin";
  is_active: boolean;
  created_at: string;
};

type BeneficiaryForm = {
  name: string;
  phone: string;
  email: string;
  email_verified: boolean;
  address: string;
  community: string;
  lga: string;
  state: string;
  serial_number: string;
  product: string;
  installation_date: string;
  system_status: string;
  battery_health: string;
  current_load: string;
  energy_today: string;
  last_signal: string;
  subscription_status: string;
  next_payment: string;
  guarantor_name: string;
  guarantor_phone: string;
  guarantor_address: string;
  guarantor_relationship: string;
  maintenance_notes: string;
};

const PAGE_SIZE = 50;
const ADMIN_ACTIVITY_KEY = "tedis_admin_last_activity";
const ADMIN_INACTIVITY_LIMIT_MS = 5 * 60 * 1000;

const EMPTY_FORM: BeneficiaryForm = {
  name: "",
  phone: "",
  email: "",
  email_verified: false,
  address: "",
  community: "",
  lga: "",
  state: "",
  serial_number: "",
  product: "TED Evergreen Smart Energy 900",
  installation_date: "",
  system_status: "online",
  battery_health: "",
  current_load: "",
  energy_today: "",
  last_signal: "",
  subscription_status: "active",
  next_payment: "",
  guarantor_name: "",
  guarantor_phone: "",
  guarantor_address: "",
  guarantor_relationship: "",
  maintenance_notes: "",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [section, setSection] = useState<Section>("overview");
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stats, setStats] = useState<Stats>({ beneficiaries: 0, active: 0, online: 0, unreadMessages: 0 });
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [beneficiaryCount, setBeneficiaryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<Beneficiary | null>(null);
  const [form, setForm] = useState<BeneficiaryForm>(EMPTY_FORM);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showAdminManager, setShowAdminManager] = useState(false);
  const [administrators, setAdministrators] = useState<AdminProfile[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminSaving, setAdminSaving] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const totalPages = Math.max(1, Math.ceil(beneficiaryCount / PAGE_SIZE));

  const loadStats = useCallback(async () => {
    const [all, active, online, unread] = await Promise.all([
      supabase.from("energy_beneficiaries").select("*", { count: "exact", head: true }),
      supabase.from("energy_beneficiaries").select("*", { count: "exact", head: true }).eq("subscription_status", "active"),
      supabase.from("energy_beneficiaries").select("*", { count: "exact", head: true }).eq("system_status", "online"),
      supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
    ]);
    setStats({ beneficiaries: all.count ?? 0, active: active.count ?? 0, online: online.count ?? 0, unreadMessages: unread.count ?? 0 });
  }, []);

  const loadBeneficiaries = useCallback(async () => {
    setLoading(true);
    setError("");
    const from = (page - 1) * PAGE_SIZE;
    let query = supabase.from("energy_beneficiaries").select("*", { count: "exact" }).order("installation_date", { ascending: false }).range(from, from + PAGE_SIZE - 1);
    const term = search.trim().replaceAll(",", " ");
    if (term) query = query.or([`name.ilike.%${term}%`, `phone.ilike.%${term}%`, `email.ilike.%${term}%`, `serial_number.ilike.%${term}%`, `community.ilike.%${term}%`, `lga.ilike.%${term}%`, `state.ilike.%${term}%`].join(","));
    if (statusFilter !== "all") query = query.eq("system_status", statusFilter);
    const { data, count, error: queryError } = await query;
    if (queryError) setError(queryError.message);
    setBeneficiaries((data as Beneficiary[]) ?? []);
    setBeneficiaryCount(count ?? 0);
    setLoading(false);
  }, [page, search, statusFilter]);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    const { data, error: queryError } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200);
    if (queryError) setError(queryError.message);
    setMessages((data as ContactMessage[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) router.replace("/admin/login");
      else {
        const storedActivity = Number(
          window.localStorage.getItem(ADMIN_ACTIVITY_KEY)
        );
        const signedInAt = data.session.user.last_sign_in_at
          ? new Date(data.session.user.last_sign_in_at).getTime()
          : 0;
        const lastKnownActivity = storedActivity || signedInAt;

        if (
          !lastKnownActivity ||
          Date.now() - lastKnownActivity >
            ADMIN_INACTIVITY_LIMIT_MS
        ) {
          window.localStorage.removeItem(ADMIN_ACTIVITY_KEY);
          await supabase.auth.signOut();
          router.replace("/admin/login?reason=inactive");
          return;
        }

        const { data: profile } = await supabase
          .from("admin_profiles")
          .select("role, is_active")
          .eq("user_id", data.session.user.id)
          .maybeSingle();

        if (!profile?.is_active) {
          await supabase.auth.signOut();
          router.replace("/admin/login");
          return;
        }

        setIsSuperAdmin(profile.role === "super_admin");
        window.localStorage.setItem(
          ADMIN_ACTIVITY_KEY,
          String(Date.now())
        );
        setCheckingSession(false);
      }
    });
  }, [router]);

  useEffect(() => {
    if (checkingSession) return;

    let inactivityTimer: ReturnType<typeof setTimeout>;
    let lastRecordedActivity = 0;

    const signOutForInactivity = async () => {
      window.localStorage.removeItem(ADMIN_ACTIVITY_KEY);
      await supabase.auth.signOut();
      router.replace("/admin/login?reason=inactive");
    };

    const resetInactivityTimer = () => {
      const currentTime = Date.now();

      if (currentTime - lastRecordedActivity > 10_000) {
        window.localStorage.setItem(
          ADMIN_ACTIVITY_KEY,
          String(currentTime)
        );
        lastRecordedActivity = currentTime;
      }

      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(
        signOutForInactivity,
        ADMIN_INACTIVITY_LIMIT_MS
      );
    };

    const checkStoredActivity = () => {
      const storedActivity = Number(
        window.localStorage.getItem(ADMIN_ACTIVITY_KEY)
      );

      if (
        !storedActivity ||
        Date.now() - storedActivity >
          ADMIN_INACTIVITY_LIMIT_MS
      ) {
        signOutForInactivity();
        return;
      }

      resetInactivityTimer();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkStoredActivity();
      }
    };

    const activityEvents: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((eventName) =>
      window.addEventListener(eventName, resetInactivityTimer, {
        passive: true,
      })
    );

    window.addEventListener("focus", checkStoredActivity);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      activityEvents.forEach((eventName) =>
        window.removeEventListener(eventName, resetInactivityTimer)
      );
      window.removeEventListener("focus", checkStoredActivity);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [checkingSession, router]);

  useEffect(() => {
    if (checkingSession) return;
    loadStats();
    if (section === "overview") setLoading(false);
    if (section === "beneficiaries") loadBeneficiaries();
    if (section === "messages") loadMessages();
  }, [checkingSession, section, loadStats, loadBeneficiaries, loadMessages]);

  async function downloadBeneficiaryRecords() {
    setError("");
    setSuccess("Preparing beneficiary records for download...");

    const records: Beneficiary[] = [];
    const batchSize = 1000;
    let start = 0;

    while (true) {
      const { data, error: downloadError } = await supabase
        .from("energy_beneficiaries")
        .select("*")
        .order("installation_date", { ascending: false })
        .range(start, start + batchSize - 1);

      if (downloadError) {
        setSuccess("");
        setError(downloadError.message);
        return;
      }

      const batch = (data as Beneficiary[]) ?? [];
      records.push(...batch);

      if (batch.length < batchSize) break;
      start += batchSize;
    }

    const columns: { key: keyof Beneficiary; heading: string }[] = [
      { key: "name", heading: "Name" },
      { key: "phone", heading: "Phone" },
      { key: "email", heading: "Email" },
      { key: "address", heading: "Address" },
      { key: "community", heading: "Community" },
      { key: "lga", heading: "LGA" },
      { key: "state", heading: "State" },
      { key: "serial_number", heading: "Serial Number" },
      { key: "product", heading: "Product" },
      { key: "installation_date", heading: "Installation Date" },
      { key: "system_status", heading: "System Status" },
      { key: "battery_health", heading: "Battery Health" },
      { key: "current_load", heading: "Current Load" },
      { key: "energy_today", heading: "Energy Today" },
      { key: "last_signal", heading: "Last Signal" },
      { key: "subscription_status", heading: "Subscription Status" },
      { key: "next_payment", heading: "Next Payment" },
      { key: "guarantor_name", heading: "Guarantor Name" },
      { key: "guarantor_phone", heading: "Guarantor Phone" },
      { key: "guarantor_address", heading: "Guarantor Address" },
      { key: "guarantor_relationship", heading: "Guarantor Relationship" },
      { key: "maintenance_notes", heading: "Maintenance Notes" },
    ];

    const escapeCsv = (value: unknown) => {
      const text = value === null || value === undefined ? "" : String(value);
      return `"${text.replaceAll('"', '""')}"`;
    };

    const csv = [
      columns.map((column) => escapeCsv(column.heading)).join(","),
      ...records.map((record) =>
        columns.map((column) => escapeCsv(record[column.key])).join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tedis-energy-beneficiaries-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setSuccess(`${records.length.toLocaleString()} beneficiary records downloaded.`);
    setTimeout(() => setSuccess(""), 4000);
  }

  async function authenticatedAdminRequest(
    method: "GET" | "POST" | "DELETE",
    body?: Record<string, string>
  ) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/admin/login");
      throw new Error("Your administrator session has expired.");
    }

    const response = await fetch("/api/admins", {
      method,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error ?? "Administrator request failed.");
    }

    return result;
  }

  async function loadAdministrators() {
    setAdminLoading(true);
    setAdminError("");

    try {
      const result = await authenticatedAdminRequest("GET");
      setAdministrators(result.administrators ?? []);
    } catch (requestError) {
      setAdminError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load administrators."
      );
    } finally {
      setAdminLoading(false);
    }
  }

  async function openAdminManager() {
    setShowAdminManager(true);
    await loadAdministrators();
  }

  async function createAdministrator(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAdminSaving(true);
    setAdminError("");

    try {
      await authenticatedAdminRequest("POST", {
        full_name: adminName,
        email: adminEmail,
        password: adminPassword,
      });

      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      setShowAdminPassword(false);
      await loadAdministrators();
    } catch (requestError) {
      setAdminError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to create administrator."
      );
    } finally {
      setAdminSaving(false);
    }
  }

  async function removeAdministrator(administrator: AdminProfile) {
    if (
      !window.confirm(
        `Remove administrator access for ${administrator.full_name || administrator.email}?`
      )
    ) {
      return;
    }

    setAdminError("");

    try {
      await authenticatedAdminRequest("DELETE", {
        user_id: administrator.user_id,
      });
      await loadAdministrators();
    } catch (requestError) {
      setAdminError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to remove administrator."
      );
    }
  }

  function beneficiaryToForm(item: Beneficiary): BeneficiaryForm {
    return {
      name: item.name ?? "", phone: item.phone ?? "", email: item.email ?? "", email_verified: item.email_verified ?? false,
      address: item.address ?? "", community: item.community ?? "", lga: item.lga ?? "", state: item.state ?? "",
      serial_number: item.serial_number ?? "", product: item.product ?? "TED Evergreen Smart Energy 900",
      installation_date: item.installation_date ?? "", system_status: item.system_status ?? "online",
      battery_health: item.battery_health?.toString() ?? "", current_load: item.current_load?.toString() ?? "",
      energy_today: item.energy_today?.toString() ?? "", last_signal: item.last_signal ?? "",
      subscription_status: item.subscription_status ?? "active", next_payment: item.next_payment ?? "",
      guarantor_name: item.guarantor_name ?? "", guarantor_phone: item.guarantor_phone ?? "",
      guarantor_address: item.guarantor_address ?? "", guarantor_relationship: item.guarantor_relationship ?? "",
      maintenance_notes: item.maintenance_notes ?? "",
    };
  }

  function openCreate() { setSelected(null); setForm(EMPTY_FORM); setError(""); setModalMode("create"); }
  function openView(item: Beneficiary) { setSelected(item); setForm(beneficiaryToForm(item)); setModalMode("view"); }
  function openEdit(item: Beneficiary) { setSelected(item); setForm(beneficiaryToForm(item)); setError(""); setModalMode("edit"); }
  function closeModal() { if (!saving) { setModalMode(null); setSelected(null); setError(""); } }
  function updateField<K extends keyof BeneficiaryForm>(field: K, value: BeneficiaryForm[K]) { setForm((current) => ({ ...current, [field]: value })); }

  function payloadFromForm() {
    const nullable = (value: string) => value.trim() || null;
    const numberOrNull = (value: string) => value === "" ? null : Number(value);
    return {
      name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim().toLowerCase(), email_verified: form.email_verified,
      address: nullable(form.address), community: nullable(form.community), lga: nullable(form.lga), state: nullable(form.state),
      serial_number: form.serial_number.trim(), product: form.product.trim(), installation_date: nullable(form.installation_date),
      system_status: form.system_status, battery_health: numberOrNull(form.battery_health), current_load: numberOrNull(form.current_load),
      energy_today: numberOrNull(form.energy_today), last_signal: nullable(form.last_signal), subscription_status: form.subscription_status,
      next_payment: nullable(form.next_payment), guarantor_name: nullable(form.guarantor_name), guarantor_phone: nullable(form.guarantor_phone),
      guarantor_address: nullable(form.guarantor_address), guarantor_relationship: nullable(form.guarantor_relationship),
      maintenance_notes: nullable(form.maintenance_notes),
    };
  }

  async function saveBeneficiary(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setSaving(true);
    const payload = payloadFromForm();
    const result = modalMode === "edit" && selected
      ? await supabase.from("energy_beneficiaries").update(payload).eq("id", selected.id)
      : await supabase.from("energy_beneficiaries").insert(payload);
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    setModalMode(null); setSelected(null);
    setSuccess(modalMode === "edit" ? "Beneficiary updated successfully." : "Beneficiary added successfully.");
    setTimeout(() => setSuccess(""), 4000);
    await Promise.all([loadBeneficiaries(), loadStats()]);
  }

  async function deleteBeneficiary(item: Beneficiary) {
    if (!window.confirm(`Delete ${item.name}'s beneficiary record? This cannot be undone.`)) return;
    setError("");
    const { error: deleteError } = await supabase.from("energy_beneficiaries").delete().eq("id", item.id);
    if (deleteError) { setError(deleteError.message); return; }
    setSuccess("Beneficiary deleted successfully.");
    setTimeout(() => setSuccess(""), 4000);
    await Promise.all([loadBeneficiaries(), loadStats()]);
  }

  async function markRead(id: string) {
    const { error: updateError } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    if (updateError) setError(updateError.message);
    else { setMessages((items) => items.map((item) => item.id === id ? { ...item, is_read: true } : item)); loadStats(); }
  }

  async function deleteMessage(id: string) {
    if (!window.confirm("Delete this message?")) return;
    const { error: deleteError } = await supabase.from("contact_messages").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else { setMessages((items) => items.filter((item) => item.id !== id)); loadStats(); }
  }

  function formatDate(value: string | null) {
    if (!value) return "Not available";
    return new Intl.DateTimeFormat("en-NG", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
  }

  function badge(status: string) {
    if (["online", "active"].includes(status.toLowerCase())) return "bg-emerald-50 text-emerald-700";
    if (["warning", "due"].includes(status.toLowerCase())) return "bg-amber-50 text-amber-700";
    if (["offline", "overdue"].includes(status.toLowerCase())) return "bg-red-50 text-red-700";
    return "bg-slate-100 text-slate-700";
  }

  if (checkingSession) return <LoadingScreen label="Checking administrator access..." />;

  return (
    <main className="min-h-screen bg-[#F3F7F5] text-[#14201D]">
      <header className="border-b border-[#DDE8E3] bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#13824A]">TEDIS Evergreen Foundation</p><h1 className="mt-1 text-xl font-black text-[#14382D]">Administrator Dashboard</h1></div>
          <div className="flex gap-2">{isSuperAdmin && <button onClick={openAdminManager} className="rounded-lg border border-[#CBDAD3] px-3 py-2 text-xs font-bold">Manage Admins</button>}<button onClick={async () => { window.localStorage.removeItem(ADMIN_ACTIVITY_KEY); await supabase.auth.signOut(); router.replace("/admin/login"); }} className="rounded-lg bg-[#14382D] px-4 py-2.5 text-xs font-black text-white">Sign Out</button></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-6 lg:grid-cols-[230px_minmax(0,1fr)] lg:px-8">
        <aside className="h-fit rounded-2xl border border-[#DDE8E3] bg-white p-3">
          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            <Nav label="Overview" active={section === "overview"} onClick={() => setSection("overview")} />
            <Nav label="Energy Beneficiaries" active={section === "beneficiaries"} onClick={() => setSection("beneficiaries")} />
            <Nav label={stats.unreadMessages ? `Messages (${stats.unreadMessages})` : "Messages"} active={section === "messages"} onClick={() => setSection("messages")} />
          </nav>
        </aside>

        <section className="min-w-0">
          {error && !modalMode && <Notice colour="red">{error}</Notice>}
          {success && <Notice colour="green">{success}</Notice>}

          {section === "overview" && <><PageTitle eyebrow="Overview" title="Energy access at a glance" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Energy beneficiaries" value={stats.beneficiaries} /><Stat label="Active subscriptions" value={stats.active} /><Stat label="Systems online" value={stats.online} /><Stat label="Unread messages" value={stats.unreadMessages} /></div></>}

          {section === "beneficiaries" && <>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><PageTitle eyebrow="Energy beneficiaries" title="Beneficiary records" subtitle={`${beneficiaryCount.toLocaleString()} records found`} /><div className="flex flex-wrap gap-2"><button onClick={downloadBeneficiaryRecords} className="rounded-xl border border-[#13824A] bg-white px-5 py-3 text-sm font-black text-[#13824A]">Download Records</button><button onClick={openCreate} className="rounded-xl bg-[#13824A] px-5 py-3 text-sm font-black text-white">Add Beneficiary</button></div></div>
            <div className="mb-4 grid gap-3 rounded-2xl border border-[#DDE8E3] bg-white p-4 md:grid-cols-[1fr_220px]">
              <input type="search" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search name, phone, location or serial number" className="rounded-xl border border-[#CBDAD3] px-4 py-3 text-sm outline-none focus:border-[#13824A]" />
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="rounded-xl border border-[#CBDAD3] px-4 py-3 text-sm"><option value="all">All system statuses</option><option value="online">Online</option><option value="offline">Offline</option><option value="warning">Warning</option><option value="maintenance">Maintenance</option></select>
            </div>
            <div className="overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[1350px] text-left"><thead className="bg-[#EAF2EE]"><tr><Th>Beneficiary</Th><Th>Location</Th><Th>Serial number</Th><Th>Installed</Th><Th>System</Th><Th>Battery</Th><Th>Subscription</Th><Th>Actions</Th></tr></thead><tbody>{beneficiaries.map((item) => <tr key={item.id} className="border-t border-[#E5ECE8]"><Td><strong className="block text-[#14382D]">{item.name}</strong><span className="text-xs text-[#65716C]">{item.phone}</span></Td><Td>{item.community || "Not provided"}<span className="block text-xs text-[#65716C]">{[item.lga, item.state].filter(Boolean).join(", ")}</span></Td><Td><span className="font-mono text-xs font-bold">{item.serial_number}</span></Td><Td>{formatDate(item.installation_date)}</Td><Td><Status text={item.system_status} colour={badge(item.system_status)} /></Td><Td>{item.battery_health === null ? "N/A" : `${item.battery_health}%`}</Td><Td><Status text={item.subscription_status} colour={badge(item.subscription_status)} /></Td><Td><div className="flex gap-2"><Action onClick={() => openView(item)}>View</Action><Action onClick={() => openEdit(item)}>Edit</Action><Action danger onClick={() => deleteBeneficiary(item)}>Delete</Action></div></Td></tr>)}</tbody></table></div>{loading && <Empty>Loading beneficiaries...</Empty>}{!loading && beneficiaries.length === 0 && <Empty>No beneficiary records matched your search.</Empty>}</div>
            <div className="mt-4 flex items-center justify-between"><button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-lg border bg-white px-4 py-2 text-sm font-bold disabled:opacity-40">Previous</button><p className="text-sm font-bold text-[#65716C]">Page {page} of {totalPages}</p><button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border bg-white px-4 py-2 text-sm font-bold disabled:opacity-40">Next</button></div>
          </>}

          {section === "messages" && <><PageTitle eyebrow="Contact messages" title="Messages and enquiries" /><div className="space-y-4">{messages.map((item) => <article key={item.id} className={`rounded-2xl border bg-white p-5 ${item.is_read ? "border-[#DDE8E3]" : "border-[#13824A]"}`}><div className="flex justify-between gap-4"><div><h3 className="font-black">{item.subject} {!item.is_read && <span className="ml-2 rounded-full bg-[#13824A] px-2 py-1 text-[10px] text-white">NEW</span>}</h3><p className="mt-2 text-sm font-bold">{item.name}</p><a className="text-sm text-[#13824A]" href={`mailto:${item.email}`}>{item.email}</a></div><time className="text-xs text-[#65716C]">{formatDate(item.created_at)}</time></div><p className="mt-5 whitespace-pre-wrap text-sm leading-7">{item.message}</p><div className="mt-5 flex gap-2">{!item.is_read && <Action onClick={() => markRead(item.id)}>Mark as read</Action>}<Action danger onClick={() => deleteMessage(item.id)}>Delete</Action></div></article>)}{!loading && messages.length === 0 && <Empty>No contact messages yet.</Empty>}</div></>}
        </section>
      </div>

      {modalMode && <BeneficiaryModal mode={modalMode} form={form} selected={selected} saving={saving} error={error} onClose={closeModal} onEdit={() => setModalMode("edit")} onSubmit={saveBeneficiary} updateField={updateField} />}
      {showAdminManager && <AdminManager administrators={administrators} loading={adminLoading} saving={adminSaving} error={adminError} name={adminName} email={adminEmail} password={adminPassword} showPassword={showAdminPassword} onNameChange={setAdminName} onEmailChange={setAdminEmail} onPasswordChange={setAdminPassword} onTogglePassword={() => setShowAdminPassword((current) => !current)} onCreate={createAdministrator} onRemove={removeAdministrator} onClose={() => { if (!adminSaving) { setShowAdminManager(false); setAdminError(""); } }} />}
    </main>
  );
}

function AdminManager({ administrators, loading, saving, error, name, email, password, showPassword, onNameChange, onEmailChange, onPasswordChange, onTogglePassword, onCreate, onRemove, onClose }: { administrators: AdminProfile[]; loading: boolean; saving: boolean; error: string; name: string; email: string; password: string; showPassword: boolean; onNameChange: (value: string) => void; onEmailChange: (value: string) => void; onPasswordChange: (value: string) => void; onTogglePassword: () => void; onCreate: (event: FormEvent<HTMLFormElement>) => void; onRemove: (administrator: AdminProfile) => void; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/55 px-4 py-8"><div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl"><div className="flex items-center justify-between border-b px-6 py-5"><div><p className="text-xs font-black uppercase tracking-wider text-[#13824A]">Super Admin</p><h2 className="mt-1 text-2xl font-black">Manage administrators</h2></div><button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm font-black">Close</button></div><div className="grid gap-7 p-6 lg:grid-cols-[1fr_1.15fr]"><form onSubmit={onCreate} className="rounded-2xl border border-[#DDE8E3] bg-[#F8FBF9] p-5"><h3 className="text-lg font-black">Add administrator</h3><p className="mt-2 text-sm leading-6 text-[#65716C]">Create a dashboard login for a trusted team member.</p><div className="mt-5 space-y-4"><Field label="Full name" required value={name} onChange={onNameChange} /><Field label="Email address" type="email" required value={email} onChange={onEmailChange} /><label><span className="mb-2 block text-sm font-bold">Temporary password</span><div className="relative"><input type={showPassword ? "text" : "password"} required minLength={8} value={password} onChange={(event) => onPasswordChange(event.target.value)} className="w-full rounded-xl border border-[#CBDAD3] px-4 py-3 pr-20 outline-none focus:border-[#13824A]" /><button type="button" onClick={onTogglePassword} className="absolute inset-y-0 right-0 px-4 text-xs font-black text-[#13824A]">{showPassword ? "Hide" : "Show"}</button></div></label>{error && <Notice colour="red">{error}</Notice>}<button disabled={saving} className="w-full rounded-xl bg-[#14382D] px-5 py-3 text-sm font-black text-white disabled:opacity-50">{saving ? "Creating..." : "Create administrator"}</button></div></form><section><h3 className="text-lg font-black">Current administrators</h3><div className="mt-4 space-y-3">{loading && <Empty>Loading administrators...</Empty>}{!loading && administrators.map((administrator) => <article key={administrator.user_id} className="flex flex-col justify-between gap-3 rounded-2xl border border-[#DDE8E3] p-4 sm:flex-row sm:items-center"><div><div className="flex flex-wrap items-center gap-2"><strong>{administrator.full_name || "Administrator"}</strong><span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${administrator.role === "super_admin" ? "bg-[#14382D] text-white" : "bg-[#EAF2EE] text-[#14382D]"}`}>{administrator.role === "super_admin" ? "Super Admin" : "Admin"}</span></div><p className="mt-1 text-sm text-[#65716C]">{administrator.email}</p></div>{administrator.role !== "super_admin" && <Action danger onClick={() => onRemove(administrator)}>Remove</Action>}</article>)}{!loading && administrators.length === 0 && <Empty>No administrators found.</Empty>}</div></section></div></div></div>;
}

function BeneficiaryModal({ mode, form, selected, saving, error, onClose, onEdit, onSubmit, updateField }: { mode: Exclude<ModalMode, null>; form: BeneficiaryForm; selected: Beneficiary | null; saving: boolean; error: string; onClose: () => void; onEdit: () => void; onSubmit: (e: FormEvent<HTMLFormElement>) => void; updateField: <K extends keyof BeneficiaryForm>(field: K, value: BeneficiaryForm[K]) => void }) {
  const readOnly = mode === "view";
  return <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/55 px-4 py-8"><div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl"><div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5"><div><p className="text-xs font-black uppercase tracking-wider text-[#13824A]">Energy beneficiary</p><h2 className="mt-1 text-2xl font-black">{mode === "create" ? "Add beneficiary" : mode === "edit" ? "Edit beneficiary" : selected?.name}</h2></div><div className="flex gap-2">{readOnly && <button onClick={onEdit} className="rounded-lg bg-[#13824A] px-4 py-2 text-sm font-black text-white">Edit</button>}<button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm font-black">Close</button></div></div>
    <form onSubmit={onSubmit} className="p-6"><fieldset disabled={readOnly || saving} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <Field label="Full name" required value={form.name} onChange={(v) => updateField("name", v)} />
      <Field label="Phone" required value={form.phone} onChange={(v) => updateField("phone", v)} />
      <Field label="Email" required type="email" value={form.email} onChange={(v) => updateField("email", v)} />
      <Field label="Address" value={form.address} onChange={(v) => updateField("address", v)} />
      <Field label="Community" value={form.community} onChange={(v) => updateField("community", v)} />
      <Field label="LGA" value={form.lga} onChange={(v) => updateField("lga", v)} />
      <Field label="State" value={form.state} onChange={(v) => updateField("state", v)} />
      <Field label="Serial number" required value={form.serial_number} onChange={(v) => updateField("serial_number", v)} />
      <Field label="Product" required value={form.product} onChange={(v) => updateField("product", v)} />
      <Field label="Installation date" type="date" value={form.installation_date} onChange={(v) => updateField("installation_date", v)} />
      <SelectField label="System status" value={form.system_status} onChange={(v) => updateField("system_status", v)} options={["online", "offline", "warning", "maintenance"]} />
      <Field label="Battery health (%)" type="number" min="0" max="100" value={form.battery_health} onChange={(v) => updateField("battery_health", v)} />
      <Field label="Current load" type="number" min="0" step="0.01" value={form.current_load} onChange={(v) => updateField("current_load", v)} />
      <Field label="Energy today" type="number" min="0" step="0.01" value={form.energy_today} onChange={(v) => updateField("energy_today", v)} />
      <Field label="Last signal" value={form.last_signal} onChange={(v) => updateField("last_signal", v)} />
      <SelectField label="Subscription status" value={form.subscription_status} onChange={(v) => updateField("subscription_status", v)} options={["active", "due", "paused", "overdue"]} />
      <Field label="Next payment" type="date" value={form.next_payment} onChange={(v) => updateField("next_payment", v)} />
      <Field label="Guarantor name" value={form.guarantor_name} onChange={(v) => updateField("guarantor_name", v)} />
      <Field label="Guarantor phone" value={form.guarantor_phone} onChange={(v) => updateField("guarantor_phone", v)} />
      <Field label="Guarantor relationship" value={form.guarantor_relationship} onChange={(v) => updateField("guarantor_relationship", v)} />
      <label className="md:col-span-2 lg:col-span-3"><span className="mb-2 block text-sm font-bold">Guarantor address</span><textarea rows={2} value={form.guarantor_address} onChange={(e) => updateField("guarantor_address", e.target.value)} className="w-full rounded-xl border px-4 py-3 disabled:bg-slate-50" /></label>
      <label className="md:col-span-2 lg:col-span-3"><span className="mb-2 block text-sm font-bold">Maintenance notes</span><textarea rows={3} value={form.maintenance_notes} onChange={(e) => updateField("maintenance_notes", e.target.value)} className="w-full rounded-xl border px-4 py-3 disabled:bg-slate-50" /></label>
      <label className="flex items-center gap-3"><input type="checkbox" checked={form.email_verified} onChange={(e) => updateField("email_verified", e.target.checked)} /><span className="text-sm font-bold">Email verified</span></label>
    </fieldset>{error && <div className="mt-5"><Notice colour="red">{error}</Notice></div>}{!readOnly && <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl border px-5 py-3 text-sm font-black">Cancel</button><button disabled={saving} className="rounded-xl bg-[#14382D] px-6 py-3 text-sm font-black text-white disabled:opacity-50">{saving ? "Saving..." : mode === "create" ? "Add beneficiary" : "Save changes"}</button></div>}</form></div></div>;
}

function Field({ label, value, onChange, required = false, type = "text", min, max, step }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; min?: string; max?: string; step?: string }) { return <label><span className="mb-2 block text-sm font-bold">{label}</span><input required={required} type={type} min={min} max={max} step={step} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-[#CBDAD3] px-4 py-3 outline-none focus:border-[#13824A] disabled:bg-slate-50" /></label>; }
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) { return <label><span className="mb-2 block text-sm font-bold">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-[#CBDAD3] px-4 py-3 capitalize disabled:bg-slate-50">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
function LoadingScreen({ label }: { label: string }) { return <main className="flex min-h-screen items-center justify-center bg-[#F3F7F5]"><div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#328BC3]/20 border-t-[#328BC3]" /><p className="mt-4 text-sm font-semibold text-[#65716C]">{label}</p></div></main>; }
function Nav({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) { return <button onClick={onClick} className={`rounded-xl px-4 py-3 text-left text-sm font-black ${active ? "bg-[#14382D] text-white" : "text-[#46524D] hover:bg-[#EAF2EE]"}`}>{label}</button>; }
function PageTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) { return <div className="mb-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-[#13824A]">{eyebrow}</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#14382D]">{title}</h2>{subtitle && <p className="mt-2 text-sm text-[#65716C]">{subtitle}</p>}</div>; }
function Stat({ label, value }: { label: string; value: number }) { return <article className="rounded-2xl border border-[#DDE8E3] bg-white p-5"><span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#65716C]">{label}</span><strong className="mt-4 block text-3xl font-black text-[#14382D]">{value.toLocaleString()}</strong></article>; }
function Status({ text, colour }: { text: string; colour: string }) { return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black capitalize ${colour}`}>{text}</span>; }
function Action({ children, onClick, danger = false }: { children: ReactNode; onClick: () => void; danger?: boolean }) { return <button type="button" onClick={onClick} className={`rounded-lg border px-3 py-2 text-xs font-black ${danger ? "border-red-200 text-red-700" : "border-[#CBDAD3] text-[#14382D]"}`}>{children}</button>; }
function Th({ children }: { children: ReactNode }) { return <th className="px-4 py-4 text-xs font-black uppercase tracking-wider text-[#46524D]">{children}</th>; }
function Td({ children }: { children: ReactNode }) { return <td className="px-4 py-4 align-top text-sm text-[#46524D]">{children}</td>; }
function Empty({ children }: { children: ReactNode }) { return <div className="p-10 text-center text-sm font-semibold text-[#65716C]">{children}</div>; }
function Notice({ children, colour }: { children: ReactNode; colour: "red" | "green" }) { return <div className={`mb-5 rounded-xl border px-4 py-3 text-sm font-semibold ${colour === "red" ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>{children}</div>; }
