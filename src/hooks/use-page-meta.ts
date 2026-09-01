import { useEffect } from "react";

// Client-side replacement for TanStack Start's route `head()` — keeps the
// per-page <title> and meta description behaviour of the original app.
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let el = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }
  }, [title, description]);
}
