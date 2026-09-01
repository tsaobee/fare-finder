import { Navigate, Outlet } from "react-router-dom";

import { useSession } from "@/hooks/use-session";

// Client-side replacement for the TanStack `_authenticated` route guard
// (`beforeLoad` -> redirect to /auth). Renders nothing until the Supabase
// session state is known, then redirects unauthenticated visitors to sign-in.
export function ProtectedRoute() {
  const { session, loading } = useSession();

  if (loading) return null;
  if (!session) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
}
