import { Link } from "@tanstack/react-router";
import { Container } from "@/components/container";
import { buttonClass } from "@/components/ui/button";

export function NotFound() {
  return (
    <Container className="flex flex-1 flex-col justify-center py-24">
      <p className="text-xs tracking-label text-muted uppercase">404</p>
      <h1 className="mt-3 text-5xl">This page is not in the house.</h1>
      <p className="mt-4 max-w-md text-muted">
        The piece may have left the season, or the address is mistyped.
      </p>
      <div className="mt-8">
        <Link to="/shop" search={{}} className={buttonClass("ink")}>
          Back to the shop
        </Link>
      </div>
    </Container>
  );
}
