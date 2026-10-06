import { Link } from "@tanstack/react-router";
import { getCategory, type Product } from "@/data/catalog";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="overflow-hidden bg-paper">
        <img
          src={product.image}
          alt={`${product.name}, a ${product.colorName.toLowerCase()} ${category?.singular ?? "piece"}`}
          width={1200}
          height={1600}
          loading="lazy"
          className="card-media aspect-portrait w-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="text-xl sm:text-2xl">{product.name}</h3>
        <p className="shrink-0 text-sm tabular-nums">{formatPrice(product.price)}</p>
      </div>
      <p className="mt-1 text-sm text-muted">{product.fabric}</p>
    </Link>
  );
}
