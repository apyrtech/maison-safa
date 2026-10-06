import { useEffect, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { BagPanel } from "@/components/bag-panel";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MenuPanel } from "@/components/menu-panel";
import { SearchPanel } from "@/components/search-panel";
import { useCart } from "@/lib/cart";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const searchStr = useRouterState({ select: (state) => state.location.searchStr });
  const bagOpen = useCart((state) => state.bagOpen);
  const searchOpen = useCart((state) => state.searchOpen);
  const menuOpen = useCart((state) => state.menuOpen);
  const closeOverlays = useCart((state) => state.closeOverlays);
  const overlay = bagOpen || searchOpen || menuOpen;
  const skipRouteClose = useRef(true);

  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (skipRouteClose.current) {
      skipRouteClose.current = false;
      return;
    }
    closeOverlays();
  }, [pathname, searchStr, closeOverlays]);

  useEffect(() => {
    document.documentElement.style.overflow = overlay ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [overlay]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeOverlays();
        return;
      }
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      useCart.getState().setSearchOpen(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeOverlays]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ivory focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <button
        type="button"
        className="backdrop"
        data-open={overlay ? "true" : "false"}
        aria-label="Close"
        tabIndex={-1}
        inert={!overlay ? true : undefined}
        onClick={closeOverlays}
      />
      <SearchPanel />
      <MenuPanel />
      <BagPanel />
    </div>
  );
}
