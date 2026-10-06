import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { getProduct, type CategoryId } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";

const links: { label: string; key: "shop" | CategoryId | "atelier" }[] = [
  { label: "Shop", key: "shop" },
  { label: "Thobes", key: "thobes" },
  { label: "Abayas", key: "abayas" },
  { label: "Koofis", key: "koofis" },
  { label: "Atelier", key: "atelier" },
];

function linkProps(key: (typeof links)[number]["key"]) {
  if (key === "atelier") return { to: "/atelier" as const };
  if (key === "shop") return { to: "/shop" as const, search: {} };
  return { to: "/shop" as const, search: { category: key } };
}

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const searchStr = useRouterState({ select: (state) => state.location.searchStr });
  const lines = useCart((state) => state.lines);
  const setBagOpen = useCart((state) => state.setBagOpen);
  const setSearchOpen = useCart((state) => state.setSearchOpen);
  const setMenuOpen = useCart((state) => state.setMenuOpen);
  const count = lines.reduce((total, line) => total + line.qty, 0);

  const slug = pathname.startsWith("/product/") ? pathname.slice("/product/".length) : "";
  const productCategory = slug ? getProduct(decodeURIComponent(slug))?.category : undefined;

  function active(key: (typeof links)[number]["key"]) {
    if (key === "atelier") return pathname === "/atelier";
    if (key === "shop") return pathname === "/shop" && !searchStr.includes("category=");
    if (productCategory) return productCategory === key;
    return searchStr.includes(`category=${key}`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ivory/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-3 md:px-6">
        <div className="flex min-w-0 items-center">
          <button
            type="button"
            className="tap grid size-11 place-items-center xl:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-5" strokeWidth={1.4} />
          </button>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.key}
                {...linkProps(link.key)}
                aria-current={active(link.key) ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center text-xs tracking-label uppercase transition-colors duration-200",
                  active(link.key) ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 font-serif text-xl tracking-tight sm:text-2xl"
        >
          Maison Safa
        </Link>

        <div className="flex items-center">
          <button
            type="button"
            className="tap grid size-11 place-items-center"
            aria-label="Search pieces"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="size-5" strokeWidth={1.4} />
          </button>
          <button
            type="button"
            className="tap inline-flex h-11 items-center gap-1.5 px-2"
            aria-label={count > 0 ? `Bag, ${count} pieces` : "Bag"}
            onClick={() => setBagOpen(true)}
          >
            <ShoppingBag className="size-5" strokeWidth={1.4} />
            {count > 0 ? <span className="text-xs tabular-nums">{count}</span> : null}
          </button>
        </div>
      </div>
    </header>
  );
}
