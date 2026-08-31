import { Link } from "@tanstack/react-router";
import { useSession } from "@/hooks/use-session";

export function SiteHeader() {
  const { session } = useSession();

  return (
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
        <nav className="hidden items-center gap-8 font-mono text-[11px] tracking-wide text-muted md:flex">
          <a href="/#routes" className="transition-colors hover:text-fare">
            ROUTES 航線
          </a>
          <a href="/#how" className="transition-colors hover:text-fare">
            METHOD 原理
          </a>
          <a href="/#alerts" className="transition-colors hover:text-fare">
            ALERTS 通知
          </a>
        </nav>
        {session ? (
          <Link
            to="/watchlist"
            className="rounded-sm bg-fare px-4 py-2 font-mono text-[12px] font-bold tracking-wide text-background transition-colors hover:bg-foreground"
          >
            Watchlist / 我的清單
          </Link>
        ) : (
          <Link
            to="/auth"
            className="rounded-sm bg-fare px-4 py-2 font-mono text-[12px] font-bold tracking-wide text-background transition-colors hover:bg-foreground"
          >
            Sign in / 登入
          </Link>
        )}
      </div>
    </header>
  );
}
