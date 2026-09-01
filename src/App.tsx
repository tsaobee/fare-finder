import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "@/routes/index";
import AuthPage from "@/routes/auth";
import Watchlist from "@/routes/watchlist";
import NotFound from "@/routes/not-found";
import { ProtectedRoute } from "@/routes/protected-route";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/sign-in" element={<AuthPage mode="signin" />} />
      <Route path="/sign-up" element={<AuthPage mode="signup" />} />
      {/* Legacy path — keep deep links / bookmarks working. */}
      <Route path="/auth" element={<Navigate to="/sign-in" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Watchlist />} />
      </Route>
      {/* Legacy path for the authenticated app. */}
      <Route path="/watchlist" element={<Navigate to="/app" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
