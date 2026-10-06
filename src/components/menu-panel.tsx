import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Panel } from "@/components/panel";
import { useCart } from "@/lib/cart";

const items = [
  { label: "Shop the house", to: "/shop" as const, search: {} },
  { label: "Thobes", to: "/shop" as const, search: { category: "thobes" as const } },
  { label: "Abayas", to: "/shop" as const, search: { category: "abayas" as const } },
  { label: "Koofis", to: "/shop" as const, search: { category: "koofis" as const } },
];

export function MenuPanel() {
  const open = useCart((state) => state.menuOpen);
  const setMenuOpen = useCart((state) => state.setMenuOpen);

  return (
    <Panel open={open} label="Menu" side="full">
      <div className="flex h-full flex-col px-5 py-4 md:px-10">
        <div className="flex justify-end">
          <button
            type="button"
            className="tap grid size-11 place-items-center"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-5" strokeWidth={1.4} />
          </button>
        </div>
        <nav className="mt-6 flex flex-col" aria-label="Menu">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={item.search}
              className="font-serif text-5xl leading-tight"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/atelier" className="mt-2 font-serif text-5xl leading-tight">
            The atelier
          </Link>
        </nav>
        <p className="mt-auto pb-6 text-sm text-muted">Riyadh · London</p>
      </div>
    </Panel>
  );
}
