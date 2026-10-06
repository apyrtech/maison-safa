import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Panel } from "@/components/panel";
import { editPieces, getCategory, products } from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function SearchPanel() {
  const open = useCart((state) => state.searchOpen);
  const setSearchOpen = useCart((state) => state.setSearchOpen);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return editPieces();
    return products.filter((product) => {
      const category = getCategory(product.category)?.label ?? "";
      return [product.name, product.fabric, product.colorName, category, product.summary]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [query]);

  return (
    <Panel open={open} label="Search" side="top">
      <div className="mx-auto w-full max-w-3xl px-5 py-4 md:px-8">
        <div className="flex items-center gap-2 border-b border-line">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cloth, color, or name"
            aria-label="Search pieces"
            className="min-h-14 w-full border-0 bg-transparent font-serif text-2xl text-ink outline-none placeholder:text-muted sm:text-3xl"
          />
          <button
            type="button"
            className="tap grid size-11 shrink-0 place-items-center"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <X className="size-5" strokeWidth={1.4} />
          </button>
        </div>
        <p className="mt-5 text-xs tracking-label text-muted uppercase">
          {query.trim() ? "Matches" : "In the edit"}
        </p>
        <ul className="mt-2 max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <li className="py-6 text-sm text-muted">No piece matches.</li>
          ) : (
            results.map((product) => {
              const category = getCategory(product.category);
              return (
                <li key={product.slug}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="flex min-h-16 items-center justify-between gap-4 border-b border-line"
                  >
                    <span>
                      <span className="block font-serif text-2xl">{product.name}</span>
                      <span className="text-xs tracking-label text-muted uppercase">
                        {category?.label}
                      </span>
                    </span>
                    <span className="text-sm tabular-nums">{formatPrice(product.price)}</span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </Panel>
  );
}
