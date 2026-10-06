import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { NotFound } from "@/components/not-found";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  FREE_SHIPPING_FROM,
  getCategory,
  getProduct,
  relatedProducts,
  swatchClass,
} from "@/data/catalog";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const product = getProduct(params.slug);
    return {
      meta: [
        {
          title: product ? `${product.name} — Maison Safa` : "Not found — Maison Safa",
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound />;
  return <ProductView slug={product.slug} />;
}

function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const lines = useCart((state) => state.lines);
  const add = useCart((state) => state.add);
  const [size, setSize] = useState<string | null>(null);

  useEffect(() => {
    setSize(null);
  }, [slug]);

  if (!product) return <NotFound />;

  const category = getCategory(product.category);
  const related = relatedProducts(product.slug);
  const inBag = size
    ? lines.find((line) => line.slug === product.slug && line.size === size)?.qty
    : 0;

  return (
    <Container className="py-8 md:py-12">
      <p className="text-sm text-muted">
        <Link to="/shop" search={{}} className="underline-offset-4 hover:underline">
          Shop
        </Link>
        <span aria-hidden="true"> / </span>
        {category ? (
          <Link
            to="/shop"
            search={{ category: category.id }}
            className="underline-offset-4 hover:underline"
          >
            {category.label}
          </Link>
        ) : null}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <img
            src={product.image}
            alt={`${product.name}, a ${product.colorName.toLowerCase()} ${category?.singular ?? "piece"}`}
            width={1200}
            height={1600}
            fetchPriority="high"
            className="aspect-portrait w-full object-cover"
          />
          <p className="mt-3 text-sm text-muted">
            {product.weight} · {product.fabric}
          </p>
        </div>

        <div className="lg:pt-6">
          <p className="text-xs tracking-label text-muted uppercase">{category?.label}</p>
          <h1 className="mt-2 text-5xl md:text-6xl">{product.name}</h1>
          <p className="mt-4 text-lg tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-md">{product.summary}</p>
          <p className="mt-4 max-w-md text-muted">{product.story}</p>

          <p className="mt-8 flex items-center gap-3 text-sm">
            <span
              className={cn("size-3 rounded-full border border-line", swatchClass[product.swatch])}
              aria-hidden="true"
            />
            {product.colorName}
          </p>

          <fieldset className="mt-8">
            <legend className="text-xs tracking-label text-muted uppercase">
              Size{product.category === "koofis" ? " (cm)" : ""}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((value) => {
                const selected = size === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSize(value)}
                    className={cn(
                      "tap min-h-11 min-w-11 border px-3 text-sm tabular-nums transition-colors duration-200",
                      selected
                        ? "border-ink bg-ink text-ivory"
                        : "border-line bg-transparent text-ink hover:border-ink",
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <Button
            className="mt-8 w-full sm:w-auto"
            disabled={!size}
            onClick={() => {
              if (size) add(product.slug, size);
            }}
          >
            {size ? "Add to bag" : "Select a size"}
          </Button>
          {inBag ? (
            <p className="mt-3 text-sm text-muted">
              {inBag} of this size {inBag === 1 ? "is" : "are"} in the bag.
            </p>
          ) : null}
          <p className="mt-4 max-w-md text-sm text-muted">
            Cut to order. Two to three weeks. Complimentary shipping from{" "}
            {formatPrice(FREE_SHIPPING_FROM)}.
          </p>

          <div className="mt-10 border-b border-line">
            <details className="border-t border-line">
              <summary className="flex min-h-14 items-center justify-between gap-4 text-sm">
                Composition
                <span className="plus text-lg text-muted" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm text-muted">{product.composition}</p>
            </details>
            <details className="border-t border-line">
              <summary className="flex min-h-14 items-center justify-between gap-4 text-sm">
                Care
                <span className="plus text-lg text-muted" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm text-muted">{product.care}</p>
            </details>
            <details className="border-t border-line">
              <summary className="flex min-h-14 items-center justify-between gap-4 text-sm">
                Fit and shipping
                <span className="plus text-lg text-muted" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm text-muted">{product.fit}</p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="text-4xl">With this</h2>
          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
