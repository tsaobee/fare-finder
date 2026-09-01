import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { usePageMeta } from "@/hooks/use-page-meta";

type Watch = {
  id: string;
  origin: string;
  destination: string;
  destination_label: string | null;
  target_price: number;
  current_low: number | null;
};

const destinations = [
  { code: "HND", label: "TOKYO 東京" },
  { code: "ICN", label: "SEOUL 首爾" },
  { code: "KIX", label: "OSAKA 大阪" },
  { code: "BKK", label: "BANGKOK 曼谷" },
  { code: "SGN", label: "HO CHI MINH 胡志明市" },
  { code: "SIN", label: "SINGAPORE 新加坡" },
];

const twd = (n: number) => `NT$${n.toLocaleString("en-US")}`;

export default function Watchlist() {
  usePageMeta(
    "My watchlist · 我的觀望清單 — Flight Price Notifier",
    "Manage the routes and target prices we watch for you. 管理你追蹤的航線與目標價。",
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session } = useSession();
  const [destination, setDestination] = useState("HND");
  const [target, setTarget] = useState("7000");

  const { data: watches = [], isLoading } = useQuery({
    queryKey: ["fare_watches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fare_watches")
        .select("id, origin, destination, destination_label, target_price, current_low")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Watch[];
    },
  });

  const addWatch = useMutation({
    mutationFn: async () => {
      const userId = session?.user.id;
      if (!userId) throw new Error("Not signed in");
      const label = destinations.find((d) => d.code === destination)?.label ?? null;
      const { error } = await supabase.from("fare_watches").insert({
        user_id: userId,
        origin: "TPE",
        destination,
        destination_label: label,
        target_price: Number(target),
      });
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fare_watches"] }),
  });

  const removeWatch = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("fare_watches").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["fare_watches"] }),
  });

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/sign-in", { replace: true });
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-sm bg-fare font-mono font-bold text-background">
              F
            </div>
            <div className="leading-none">
              <p className="font-mono text-[13px] font-bold tracking-tight">FAREWATCH</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-muted">TW·DEP</p>
            </div>
          </Link>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-[11px] text-muted md:inline">
              {session?.user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="rounded-sm border border-border px-4 py-2 font-mono text-[12px] tracking-wide text-foreground transition-colors hover:border-fare hover:text-fare"
            >
              Sign out / 登出
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Your watchlist · 你的觀望清單
          </h1>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
            {watches.length} WATCHING
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addWatch.mutate();
          }}
          className="rise mt-8 flex flex-col gap-4 rounded-md border border-border bg-panel p-5 md:flex-row md:items-end"
        >
          <label className="block flex-1">
            <span className="font-mono text-[10px] tracking-wide text-muted">
              ROUTE 航線 (from TPE)
            </span>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-[13px] text-foreground outline-none focus:border-fare"
            >
              {destinations.map((d) => (
                <option key={d.code} value={d.code}>
                  TPE → {d.code} · {d.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block flex-1">
            <span className="font-mono text-[10px] tracking-wide text-muted">
              TARGET PRICE 目標價 (TWD)
            </span>
            <input
              type="number"
              min={1000}
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-[13px] text-foreground outline-none focus:border-fare"
            />
          </label>
          <button
            type="submit"
            disabled={addWatch.isPending}
            className="rounded-sm bg-fare px-5 py-3 font-mono text-[13px] font-bold tracking-wide text-background transition-colors hover:bg-foreground disabled:opacity-60"
          >
            Add watch / 新增
          </button>
        </form>

        <div className="rise mt-8 overflow-hidden rounded-md border border-border bg-panel">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] gap-4 border-b border-border px-5 py-3 font-mono text-[10px] tracking-wide text-muted">
            <span>ROUTE</span>
            <span>TARGET</span>
            <span>LOW</span>
            <span className="text-right">STATUS</span>
          </div>

          {isLoading && <p className="px-5 py-6 font-mono text-[11px] text-muted">LOADING…</p>}

          {!isLoading && watches.length === 0 && (
            <p className="px-5 py-6 font-mono text-[11px] text-muted">
              尚無追蹤航線 — add your first route above.
            </p>
          )}

          {watches.map((w) => {
            const beat = w.current_low != null && w.current_low <= w.target_price;
            return (
              <div
                key={w.id}
                className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0"
              >
                <span className="font-mono text-[13px] font-bold">
                  {w.origin} → {w.destination}
                </span>
                <span className="font-mono text-[12px] text-muted">{twd(w.target_price)}</span>
                <span className={`font-mono text-[12px] ${beat ? "text-fare" : ""}`}>
                  {w.current_low != null ? twd(w.current_low) : "—"}
                </span>
                <span className="flex items-center justify-end gap-3">
                  {beat ? (
                    <span className="rounded-sm bg-fare px-2 py-0.5 font-mono text-[10px] font-bold text-background">
                      BEAT
                    </span>
                  ) : (
                    <span className="rounded-sm border border-fare/40 px-2 py-0.5 font-mono text-[10px] font-bold text-fare">
                      WATCH
                    </span>
                  )}
                  <button
                    onClick={() => removeWatch.mutate(w.id)}
                    className="font-mono text-[10px] text-muted transition-colors hover:text-up"
                  >
                    REMOVE
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
