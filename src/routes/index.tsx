import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { ProductCard } from "@/components/product-card";
import { buttonClass } from "@/components/ui/button";
import { categories, editPieces, type Product } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/")({
  component: Home,
});

const facts = [
  { k: "Cloth", v: "Named mills. Cotton, crepe, wool, linen." },
  { k: "Cut", v: "Numbered sizes, tried on a standing form." },
  { k: "Time", v: "Two to three weeks, cut to order." },
  { k: "Repair", v: "Seams and cuffs, for the life of the cloth." },
];

function Home() {
  const edit = editPieces();
  return (
    <>
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs tracking-label text-muted uppercase">Autumn 2026</p>
          <h1 className="display mt-4">
            The thobe.
            <br />
            The abaya.
            <br />
            The koofi.
          </h1>
          <p className="mt-6 max-w-md text-muted">
            Maison Safa is a small house for these three. Cloth we can name. Seams you can trust.
            Cut to order in Riyadh, finished to the same pattern in London.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop" search={{}} className={buttonClass("ink")}>
              Shop the house
            </Link>
            <Link to="/atelier" className={buttonClass("line")}>
              The atelier
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src="/products/hero.jpg"
            alt="An ivory thobe, a black abaya, and a cream koofi in the atelier."
            width={1200}
            height={1600}
            fetchPriority="high"
            className="aspect-portrait w-full object-cover"
          />
        </div>
      </Container>

      <section aria-label="House practice">
        <ul className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.k} className="bg-ivory px-5 py-8 md:px-8">
              <p className="text-xs tracking-label text-muted uppercase">{fact.k}</p>
              <p className="mt-3 font-serif text-2xl">{fact.v}</p>
            </li>
          ))}
        </ul>
      </section>

      <Container className="py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-4xl md:text-5xl">The edit</h2>
          <Link
            to="/shop"
            search={{}}
            className="inline-flex min-h-11 items-center text-xs tracking-label uppercase"
          >
            All pieces
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:hidden">
          {edit.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <EditIndex pieces={edit} />
      </Container>

      <section>
        {categories.map((category, index) => (
          <article key={category.id} className="grid border-t border-line lg:grid-cols-2">
            <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
              <img
                src={category.image}
                alt={category.imageAlt}
                width={1200}
                height={1600}
                loading="lazy"
                className="aspect-portrait w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-10 px-5 py-12 md:px-12 md:py-16">
              <p className="text-xs tracking-label text-muted uppercase">
                {category.index} — {category.label}
              </p>
              <div>
                <h2 className="text-4xl md:text-6xl">{category.title}</h2>
                <p className="mt-4 max-w-md text-muted">{category.copy}</p>
                <Link
                  to="/shop"
                  search={{ category: category.id }}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 text-xs tracking-label uppercase"
                >
                  Shop {category.label.toLowerCase()}
                  <ArrowRight className="size-4" strokeWidth={1.4} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="border-t border-line bg-ink text-ivory">
        <Container className="py-20 md:py-28">
          <p className="text-xs tracking-label uppercase text-ivory/80">The house</p>
          <blockquote className="quote mt-6 max-w-3xl">
            We would rather make fewer things, and mend them.
          </blockquote>
          <Link
            to="/atelier"
            className="mt-8 inline-flex min-h-11 items-center text-sm underline decoration-ivory/40 underline-offset-4"
          >
            Read the atelier
          </Link>
        </Container>
      </section>
    </>
  );
}

function EditIndex({ pieces }: { pieces: Product[] }) {
  const [active, setActive] = useState(pieces[0]?.slug ?? "");
  const current = pieces.find((piece) => piece.slug === active) ?? pieces[0];
  if (!current) return null;

  return (
    <div className="hidden gap-12 lg:grid lg:grid-cols-12">
      <div className="lg:col-span-5">
        <img
          src={current.image}
          alt={`${current.name}, ${current.colorName.toLowerCase()}`}
          width={1200}
          height={1600}
          className="aspect-portrait w-full object-cover"
        />
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <p className="font-serif text-2xl">{current.name}</p>
          <p className="text-sm tabular-nums">{formatPrice(current.price)}</p>
        </div>
        <p className="mt-1 text-sm text-muted">{current.fabric}</p>
      </div>
      <ol className="lg:col-span-7">
        {pieces.map((piece, index) => {
          const selected = piece.slug === current.slug;
          return (
            <li key={piece.slug}>
              <Link
                to="/product/$slug"
                params={{ slug: piece.slug }}
                onMouseEnter={() => setActive(piece.slug)}
                onFocus={() => setActive(piece.slug)}
                className={cn(
                  "flex min-h-16 items-baseline justify-between gap-6 border-b border-l-2 py-4 pl-4 transition-colors duration-200",
                  selected
                    ? "border-b-line border-l-brass text-ink"
                    : "border-b-line border-l-transparent text-muted hover:text-ink",
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span className="w-8 text-xs tabular-nums tracking-label">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-3xl">{piece.name}</span>
                </span>
                <span className="text-sm tabular-nums">{formatPrice(piece.price)}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
