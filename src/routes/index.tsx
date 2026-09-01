import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/site-header";
import { usePageMeta } from "@/hooks/use-page-meta";

const routes = [
  { code: "TPE → HND", city: "TOKYO", fare: "NT$6,980", drop: "▼ NT$820" },
  { code: "TPE → ICN", city: "SEOUL", fare: "NT$5,420", drop: "▼ NT$430" },
  { code: "TPE → KIX", city: "OSAKA", fare: "NT$7,260", drop: "▼ NT$960" },
  { code: "TPE → BKK", city: "BANGKOK", fare: "NT$8,140", drop: "▼ NT$610" },
  { code: "TPE → SGN", city: "HO CHI MINH", fare: "NT$6,580", drop: "▼ NT$540" },
  { code: "TPE → SIN", city: "SINGAPORE", fare: "NT$9,720", drop: "▼ NT$380" },
];

const bars = [78, 64, 82, 70, 55, 60];

const steps = [
  { n: "01", en: "Pick a route", zh: "選擇出發地與目的地航線" },
  { n: "02", en: "Set target price", zh: "設定你願意的目標價" },
  { n: "03", en: "Get the email", zh: "跌破目標價立刻寄信給你" },
];

export default function Landing() {
  usePageMeta(
    "Flight Price Notifier · 機票降價通知 — Fare drop alerts from Taipei",
    "設定航線與目標價，機票降價就通知你。Set a route from Taipei and a target price — we email you the moment the fare drops.",
  );

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6">
        <section className="grid items-center gap-12 py-16 md:grid-cols-[1.05fr_1fr] md:gap-16 md:py-24">
          <div className="rise">
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-fare">
              <span className="size-1.5 rounded-full bg-fare" />
              LIVE FARE MONITOR · 即時監測
            </p>
            <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.04] tracking-tight md:text-[56px]">
              設定航線與目標價，
              <br />
              機票降價就通知你
            </h1>
            <p className="mt-5 max-w-[42ch] text-pretty font-body text-base text-muted">
              Set a route and a target price — we email you the moment the fare drops.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/sign-in"
                className="rounded-sm bg-fare px-5 py-3 font-mono text-[13px] font-bold tracking-wide text-background transition-colors hover:bg-foreground"
              >
                Sign in / 登入
              </Link>
              <a
                href="#how"
                className="rounded-sm border border-border px-5 py-3 font-mono text-[13px] tracking-wide text-foreground transition-colors hover:border-fare hover:text-fare"
              >
                Watch a route ↓
              </a>
            </div>
            <div className="mt-8 flex items-center gap-5 font-mono text-[11px] text-muted">
              <span>12,408 routes watched</span>
              <span className="size-1 rounded-full bg-border" />
              <span>96K alerts sent</span>
            </div>
          </div>

          <div className="rise rounded-md border border-border bg-panel p-5 [animation-delay:120ms]">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] tracking-wide text-muted">
                FARE HISTORY · TPE → HND
              </p>
              <span className="rounded-sm border border-fare/30 px-2 py-0.5 font-mono text-[10px] text-fare">
                LIVE
              </span>
            </div>
            <div className="relative mt-6">
              <div className="flex h-40 items-end gap-2">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-panel-2"
                    style={{ height: `${h}%` }}
                  />
                ))}
                <div className="relative flex-1 rounded-t-sm bg-fare" style={{ height: "38%" }} />
              </div>
              <div
                className="absolute left-0 right-0 border-t border-dashed border-fare/70"
                style={{ top: "38%" }}
              >
                <span className="absolute -top-2.5 right-0 bg-background px-1 font-mono text-[10px] text-fare">
                  NT$7,800 target
                </span>
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
              <div>
                <p className="font-mono text-[10px] tracking-wide text-muted">CURRENT LOW</p>
                <p className="mt-1 font-mono text-[34px] font-bold leading-none text-fare">
                  NT$6,980
                </p>
                <p className="mt-1 font-mono text-[11px] text-up">▼ NT$820 · beat target</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] text-muted">NEXT ALERT</p>
                <p className="mt-1 font-mono text-[12px] font-bold text-foreground">Now</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="border-t border-border py-14">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              How it works · 運作原理
            </h2>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted">3 STEPS</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="rise rounded-md border border-border bg-panel p-5"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <p className="font-mono text-[11px] font-bold text-fare">{s.n}</p>
                <p className="mt-3 font-body text-[15px] font-semibold">{s.en}</p>
                <p className="mt-1 font-body text-[13px] text-muted">{s.zh}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="routes" className="border-t border-border py-14">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Popular from TPE · 熱門航線
            </h2>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
              LOWEST / ONE-WAY
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {routes.map((r, i) => (
              <div
                key={r.code}
                className="rise rounded-md border border-border bg-panel p-5 transition-colors hover:border-fare/40"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[14px] font-bold">{r.code}</p>
                  <span className="font-mono text-[10px] text-muted">{r.city}</span>
                </div>
                <p className="mt-4 font-mono text-[26px] font-bold leading-none text-fare">
                  {r.fare}
                </p>
                <p className="mt-1 font-mono text-[10px] text-up">{r.drop}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="alerts" className="border-t border-border py-14">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Your watchlist · 你的觀望清單
            </h2>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
              SIGNED-IN PREVIEW
            </span>
          </div>
          <div className="rise overflow-hidden rounded-md border border-border bg-panel">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] gap-4 border-b border-border px-5 py-3 font-mono text-[10px] tracking-wide text-muted">
              <span>ROUTE</span>
              <span>TARGET</span>
              <span>LOW</span>
              <span className="text-right">STATUS</span>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] items-center gap-4 border-b border-border px-5 py-4">
              <span className="font-mono text-[13px] font-bold">TPE → HND</span>
              <span className="font-mono text-[12px] text-muted">NT$7,800</span>
              <span className="font-mono text-[12px] text-fare">NT$6,980</span>
              <span className="justify-self-end">
                <span className="rounded-sm bg-fare px-2 py-0.5 font-mono text-[10px] font-bold text-background">
                  BEAT
                </span>
              </span>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] items-center gap-4 border-b border-border px-5 py-4">
              <span className="font-mono text-[13px] font-bold">TPE → KIX</span>
              <span className="font-mono text-[12px] text-muted">NT$7,000</span>
              <span className="font-mono text-[12px]">NT$7,260</span>
              <span className="justify-self-end">
                <span className="rounded-sm border border-fare/40 px-2 py-0.5 font-mono text-[10px] font-bold text-fare">
                  WATCH
                </span>
              </span>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.7fr] items-center gap-4 px-5 py-4">
              <span className="font-mono text-[13px] font-bold">TPE → SIN</span>
              <span className="font-mono text-[12px] text-muted">NT$9,500</span>
              <span className="font-mono text-[12px]">NT$9,720</span>
              <span className="justify-self-end">
                <span className="rounded-sm border border-fare/40 px-2 py-0.5 font-mono text-[10px] font-bold text-fare">
                  WATCH
                </span>
              </span>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-14">
          <div className="rise flex flex-col gap-8 rounded-md bg-fare px-8 py-12 text-background md:flex-row md:items-center md:justify-between md:py-16">
            <div>
              <h2 className="text-balance font-display text-3xl font-bold tracking-tight md:text-[40px]">
                Don't overpay your next flight
              </h2>
              <p className="mt-3 max-w-[40ch] font-body text-[15px] text-background/70">
                設定目標價，我們替你盯著每一班。Set your budget — we'll watch the rest.
              </p>
            </div>
            <Link
              to="/sign-in"
              className="shrink-0 rounded-sm bg-background px-6 py-4 font-mono text-[13px] font-bold tracking-wide text-fare transition-colors hover:bg-panel-2"
            >
              Sign in / 登入
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="grid size-7 place-items-center rounded-sm bg-fare font-mono text-[12px] font-bold text-background">
              F
            </div>
            <p className="font-mono text-[11px] text-muted">
              FAREWATCH — Flight Price Notifier · 機票降價通知
            </p>
          </div>
          <p className="font-mono text-[10px] tracking-wide text-muted">
            Alerts only · no booking · © 2026
          </p>
        </div>
      </footer>
    </>
  );
}
