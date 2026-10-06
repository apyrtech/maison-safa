import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { buttonClass } from "@/components/ui/button";
import { getProduct } from "@/data/catalog";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [{ title: "The atelier — Maison Safa" }],
  }),
  component: Atelier,
});

const inWork = ["qasr", "safa", "madina"].flatMap((slug) => {
  const product = getProduct(slug);
  return product ? [product] : [];
});

function Atelier() {
  return (
    <>
      <Container className="grid items-end gap-10 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <p className="text-xs tracking-label text-muted uppercase">The atelier</p>
          <h1 className="mt-3 text-5xl md:text-6xl">A house for three garments.</h1>
        </div>
        <p className="max-w-xl text-muted lg:col-span-6 lg:col-start-7">
          Maison Safa began in a Riyadh cutting room and keeps a finishing table in London. We make
          the thobe, the abaya, and the koofi. Each is cut in small runs from cloth we can name —
          cotton with a known staple, crepe with a known hand, wool that holds a crease.
        </p>
      </Container>

      <img
        src="/products/atelier.jpg"
        alt="Oak worktable with ivory cloth, brass shears, thread, and a wooden ruler."
        width={1728}
        height={1152}
        className="aspect-landscape w-full object-cover"
      />

      <Container className="grid gap-16 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-1">
          <h2 className="text-4xl">How a piece is cut</h2>
          <div className="mt-6 space-y-4 text-muted">
            <p>
              Patterns are tried on a standing form, not only on the table. A thobe in size 56 is
              checked at the shoulder, the cuff, and the place the hem meets the shoe. Abayas are
              walked. If the sleeve catches, we recut it.
            </p>
            <p>
              Koofis are the smallest thing we make and the one people notice last. The Madina is
              crocheted. The Atlas is linen and holds its own shape. None of them have a brim.
            </p>
            <p>
              We do not add ornament that the cloth did not ask for. A cuff stitch, a covered
              button, a pocket you will use. That is the list.
            </p>
          </div>
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <p className="text-xs tracking-label text-muted uppercase">On the table</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {inWork.map((product) => (
              <li key={product.slug}>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="flex min-h-14 items-center justify-between gap-4"
                >
                  <span className="font-serif text-2xl">{product.name}</span>
                  <span className="text-sm text-muted">{product.colorName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      <div className="border-t border-line">
        <Container className="divide-y divide-line">
          <section id="shipping" className="scroll-mt-24 grid gap-4 py-12 md:grid-cols-12">
            <h2 className="font-serif text-3xl md:col-span-4">Shipping</h2>
            <div className="space-y-3 text-muted md:col-span-7">
              <p>Pieces are cut to order. Allow two to three weeks before they leave the room.</p>
              <p>
                Shipping is complimentary from $280 to the Gulf states, the United Kingdom, the
                European Union, and the United States. Elsewhere, we reply with a quote before
                anything is made.
              </p>
              <p>
                Unworn pieces can come back within fourteen days. Anything adjusted for your height
                stays with you.
              </p>
            </div>
          </section>
          <section id="care" className="scroll-mt-24 grid gap-4 py-12 md:grid-cols-12">
            <h2 className="font-serif text-3xl md:col-span-4">Cloth care</h2>
            <div className="space-y-3 text-muted md:col-span-7">
              <p>
                Every piece carries its own note. In general: cool water, no tumble, iron or steam
                from the reverse. Wool is brushed, not soaked. Crochet is dried over a bowl so it
                keeps the circle.
              </p>
              <p>Hang thobes and abayas the day they arrive. A fold left in the parcel becomes a crease.</p>
            </div>
          </section>
          <section id="repair" className="scroll-mt-24 grid gap-4 py-12 md:grid-cols-12">
            <h2 className="font-serif text-3xl md:col-span-4">Repair</h2>
            <div className="space-y-3 text-muted md:col-span-7">
              <p>
                Write to us. We mend seams, cuffs, hems, and koofi edges for the life of the cloth.
                You pay the postage. We pay the thread.
              </p>
              <p>
                <a href="mailto:atelier@maisonsafa.com" className="text-ink underline underline-offset-4">
                  atelier@maisonsafa.com
                </a>
              </p>
            </div>
          </section>
        </Container>
      </div>

      <Container className="py-16">
        <Link to="/shop" search={{}} className={buttonClass("ink")}>
          Shop the house
        </Link>
      </Container>
    </>
  );
}
