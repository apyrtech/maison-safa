import { Link } from "@tanstack/react-router";
import { Container } from "@/components/container";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <Container className="grid gap-12 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-4xl leading-none">
            Maison
            <span className="block">Safa</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Thobes, abayas, and koofis. Cut to order in Riyadh, with a finishing room in London.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-label text-muted uppercase">Visit</p>
          <ul className="mt-3 text-sm">
            <li>
              <Link to="/shop" search={{}} className="inline-flex min-h-11 items-center">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/atelier" className="inline-flex min-h-11 items-center">
                Atelier
              </Link>
            </li>
            <li>
              <a
                href="mailto:atelier@maisonsafa.com"
                className="inline-flex min-h-11 items-center"
              >
                atelier@maisonsafa.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-label text-muted uppercase">House notes</p>
          <ul className="mt-3 text-sm">
            <li>
              <Link to="/atelier" hash="shipping" className="inline-flex min-h-11 items-center">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/atelier" hash="care" className="inline-flex min-h-11 items-center">
                Cloth care
              </Link>
            </li>
            <li>
              <Link to="/atelier" hash="repair" className="inline-flex min-h-11 items-center">
                Repair
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Maison Safa</p>
        <p>Prices in USD. Nothing is charged on this page.</p>
      </Container>
    </footer>
  );
}
