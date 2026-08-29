import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/data/menu";

/** A cart-only item that isn't in the menu (e.g. a built snack combo). */
export interface CustomItem {
  name: string;
  price: number;
  description: string;
  image: string;
  /** The individual things inside the combo, shown in the cart. */
  parts: string[];
}

export interface CartLine {
  id: string;
  qty: number;
  note?: string | undefined;
  custom?: CustomItem | undefined;
}

export interface ResolvedLine extends CartLine {
  product: Product;
  lineTotal: number;
}

const STORAGE_KEY = "pickd.cart.v1";
const BRANCH_KEY = "pickd.branch.v1";

interface CartValue {
  lines: CartLine[];
  items: ResolvedLine[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number, note?: string) => void;
  addCustom: (item: CustomItem, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  setNote: (id: string, note: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  branch: string | null;
  setBranch: (branch: string) => void;
}

const CartContext = createContext<CartValue | null>(null);

function customToProduct(id: string, custom: CustomItem): Product {
  return {
    id,
    name: custom.name,
    description: custom.description,
    price: custom.price,
    category: "Combos",
    foodType: "veg",
    source: "pickd",
    featured: false,
    available: true,
    image: custom.image,
    keywords: [],
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [branch, setBranchState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed))
          setLines(parsed.filter((l) => l.custom || getProduct(l.id)));
      }
      setBranchState(localStorage.getItem(BRANCH_KEY));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((id: string, qty = 1, note?: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) =>
          l.id === id ? { ...l, qty: l.qty + qty, note: note ?? l.note } : l,
        );
      }
      return [...prev, { id, qty, note }];
    });
  }, []);

  const addCustom = useCallback((item: CustomItem, qty = 1) => {
    const key = `combo:${item.name}:${item.parts.join("|")}:${item.price}`;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === key);
      if (existing) {
        return prev.map((l) => (l.id === key ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { id: key, qty, custom: item }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const setNote = useCallback((id: string, note: string) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, note } : l)));
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const setBranch = useCallback((value: string) => {
    setBranchState(value);
    try {
      localStorage.setItem(BRANCH_KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  const items = useMemo(
    () =>
      lines
        .map((line) => {
          const product = line.custom
            ? customToProduct(line.id, line.custom)
            : getProduct(line.id);
          if (!product) return null;
          return { ...line, product, lineTotal: product.price * line.qty };
        })
        .filter((l): l is ResolvedLine => l !== null),
    [lines],
  );

  const value = useMemo<CartValue>(
    () => ({
      lines,
      items,
      count: items.reduce((n, l) => n + l.qty, 0),
      subtotal: items.reduce((n, l) => n + l.lineTotal, 0),
      add,
      addCustom,
      setQty,
      setNote,
      remove,
      clear,
      branch,
      setBranch,
    }),
    [lines, items, add, addCustom, setQty, setNote, remove, clear, branch, setBranch],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
