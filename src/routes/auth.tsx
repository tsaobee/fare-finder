import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · 登入 — Flight Price Notifier" },
      {
        name: "description",
        content:
          "Sign in to manage your Taipei fare watches and target prices. 登入管理你的航線與目標價。",
      },
      { property: "og:title", content: "Sign in · 登入 — Flight Price Notifier" },
      {
        property: "og:description",
        content: "Sign in to manage your Taipei fare watches and target prices.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) navigate({ to: "/watchlist", replace: true });
  }, [session, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signup") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (signUpError) setError(signUpError.message);
      else if (!data.session)
        setMessage("確認信已寄出 — Check your email to confirm your account.");
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) setError(signInError.message);
    }
    setBusy(false);
  }

  async function handleGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error.message ?? "Google sign-in failed.");
      return;
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-sm bg-fare font-mono font-bold text-background">
              F
            </div>
            <div className="leading-none">
              <p className="font-mono text-[13px] font-bold tracking-tight">FAREWATCH</p>
              <p className="mt-1 font-mono text-[9px] tracking-[0.2em] text-muted">TW·DEP</p>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="rise w-full max-w-md rounded-md border border-border bg-panel p-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-fare">
            {mode === "signin" ? "SIGN IN · 登入" : "CREATE ACCOUNT · 註冊"}
          </p>
          <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
            {mode === "signin" ? "歡迎回來" : "開始盯票"}
          </h1>
          <p className="mt-2 font-body text-[13px] text-muted">
            {mode === "signin"
              ? "Sign in to manage your routes and target prices."
              : "Create an account to set your first fare alert."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <label className="block">
              <span className="font-mono text-[10px] tracking-wide text-muted">EMAIL 電子郵件</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-[13px] text-foreground outline-none focus:border-fare"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="font-mono text-[10px] tracking-wide text-muted">PASSWORD 密碼</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2.5 font-mono text-[13px] text-foreground outline-none focus:border-fare"
                placeholder="••••••••"
              />
            </label>

            {error && <p className="font-mono text-[11px] text-up">{error}</p>}
            {message && <p className="font-mono text-[11px] text-fare">{message}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-sm bg-fare px-5 py-3 font-mono text-[13px] font-bold tracking-wide text-background transition-colors hover:bg-foreground disabled:opacity-60"
            >
              {busy ? "..." : mode === "signin" ? "Sign in / 登入" : "Sign up / 註冊"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] tracking-wide text-muted">OR</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={handleGoogle}
            className="w-full rounded-sm border border-border px-5 py-3 font-mono text-[13px] tracking-wide text-foreground transition-colors hover:border-fare hover:text-fare"
          >
            Continue with Google
          </button>

          <button
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setMessage(null);
            }}
            className="mt-5 w-full font-mono text-[11px] text-muted transition-colors hover:text-fare"
          >
            {mode === "signin" ? "還沒有帳號？註冊 → " : "已經有帳號？登入 → "}
          </button>
        </div>
      </main>
    </div>
  );
}
