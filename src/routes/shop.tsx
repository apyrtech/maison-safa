import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { ProductCard } from "@/components/product-card";
import { categories, getCategory, products, type CategoryId } from "@/data/catalog";
import { cn } from "@/lib/cn";

type ShopSearch = { category?: CategoryId };
type Sort = "featured" | "asc" | "desc";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const category = search.category;
    if (category === "thobes" || category === "abayas" || category === "koofis") {
      return { category };
    }
    return {};
  },
  head: () => ({
    meta: [{ title: "Shop — Maison Safa" }],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const current = category ? getCategory(category) : undefined;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    let list = products.filter((product) => !category || product.category === category);
    if (needle) {
      list = list.filter((product) =>
        [product.name, product.fabric, product.colorName, product.summary]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      );
    }
    const next = list.slice();
    if (sort === "asc") next.sort((a, b) => a.price - b.price);
    else if (sort === "desc") next.sort((a, b) => b.price - a.price);
    else next.sort((a, b) => Number(b.featured) - Number(a.featured));
    return next;
  }, [category, query, sort]);

  return (
    <Container className="py-10 md:py-14">
      <p className="text-xs tracking-label text-muted uppercase">
        {current ? current.label : "The house"}
      </p>
      <h1 className="mt-3 text-5xl md:text-6xl">{current ? current.title : "All pieces"}</h1>
      <p className="mt-4 max-w-xl text-muted">
        {current
          ? current.copy
          : "Twelve pieces this season. Thobes, abayas, and koofis — nothing else."}
      </p>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        <Link
          to="/shop"
          search={{}}
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center border px-4 text-xs tracking-label uppercase",
            !category ? "border-ink bg-ink text-ivory" : "border-line text-ink",
          )}
        >
          All
        </Link>
        {categories.map((item) => (
          <Link
            key={item.id}
            to="/shop"
            search={{ category: item.id }}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center border px-4 text-xs tracking-label uppercase",
              category === item.id ? "border-ink bg-ink text-ivory" : "border-line text-ink",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block sm:w-72">
          <span className="sr-only">Filter pieces</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cloth, color, or name"
            aria-label="Filter pieces"
            className="field"
            type="search"
          />
        </label>
        <div className="flex items-center justify-between gap-6">
          <p className="text-sm tabular-nums text-muted">
            {visible.length} {visible.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="text-sm">
            <span className="sr-only">Sort</span>
            <select
              className="select"
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
            >
              <option value="featured">Featured</option>
              <option value="asc">Price, low to high</option>
              <option value="desc">Price, high to low</option>
            </select>
          </label>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-muted">Nothing under that name. Try a cloth, a color, or a garment.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
