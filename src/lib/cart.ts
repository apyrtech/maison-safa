import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartLine = {
  slug: string;
  size: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  bagOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  setBagOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
  closeOverlays: () => void;
  add: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const memoryStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      bagOpen: false,
      searchOpen: false,
      menuOpen: false,
      setBagOpen: (bagOpen) =>
        set(bagOpen ? { bagOpen: true, searchOpen: false, menuOpen: false } : { bagOpen: false }),
      setSearchOpen: (searchOpen) =>
        set(
          searchOpen ? { searchOpen: true, bagOpen: false, menuOpen: false } : { searchOpen: false },
        ),
      setMenuOpen: (menuOpen) =>
        set(menuOpen ? { menuOpen: true, bagOpen: false, searchOpen: false } : { menuOpen: false }),
      closeOverlays: () => set({ bagOpen: false, searchOpen: false, menuOpen: false }),
      add: (slug, size) => {
        const lines = get().lines.slice();
        const index = lines.findIndex((line) => line.slug === slug && line.size === size);
        if (index >= 0) {
          const current = lines[index];
          if (!current || current.qty >= 8) {
            set({ bagOpen: true, searchOpen: false, menuOpen: false });
            return;
          }
          lines[index] = { ...current, qty: current.qty + 1 };
        } else {
          lines.push({ slug, size, qty: 1 });
        }
        set({ lines, bagOpen: true, searchOpen: false, menuOpen: false });
      },
      setQty: (slug, size, qty) => {
        if (qty < 1) {
          set({ lines: get().lines.filter((line) => !(line.slug === slug && line.size === size)) });
          return;
        }
        set({
          lines: get().lines.map((line) =>
            line.slug === slug && line.size === size ? { ...line, qty: Math.min(8, qty) } : line,
          ),
        });
      },
      remove: (slug, size) =>
        set({ lines: get().lines.filter((line) => !(line.slug === slug && line.size === size)) }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "maison-safa-bag",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? memoryStorage : window.localStorage,
      ),
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);
