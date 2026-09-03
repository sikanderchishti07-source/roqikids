import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useI18n } from "./i18n";

export type CartItem = {
  id: string;
  title: string;
  desc: string;
  price: number;
  save: number;
  qty: number;
  covers: string[];
};

export type Toast = { id: number; message: string };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  totalSave: number;
  isOpen: boolean;
  toasts: Toast[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty">, opts?: { silent?: boolean }) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  pushToast: (message: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "ruqi-cart-v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) =>
        i &&
        typeof i.id === "string" &&
        typeof i.price === "number" &&
        typeof i.qty === "number"
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const pushToast = useCallback((message: string) => {
    const id = ++toastId.current;
    setToasts((ts) => [...ts.slice(-2), { id, message }]);
    window.setTimeout(
      () => setToasts((ts) => ts.filter((x) => x.id !== id)),
      2600
    );
  }, []);

  const addItem = useCallback<CartCtx["addItem"]>(
    (item, opts) => {
      const existed = itemsRef.current.some((i) => i.id === item.id);
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, qty: Math.min(99, i.qty + 1) } : i
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
      if (!opts?.silent) {
        pushToast(
          existed ? t.cart.increased(item.title) : t.cart.added(item.title)
        );
      }
    },
    [pushToast, t]
  );

  const removeItem = useCallback(
    (id: string) => {
      const target = itemsRef.current.find((i) => i.id === id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (target) pushToast(t.cart.removed(target.title));
    },
    [pushToast, t]
  );

  const setQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i))
    );
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { count, subtotal, totalSave } = useMemo(() => {
    return items.reduce(
      (acc, i) => ({
        count: acc.count + i.qty,
        subtotal: acc.subtotal + i.price * i.qty,
        totalSave: acc.totalSave + i.save * i.qty,
      }),
      { count: 0, subtotal: 0, totalSave: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      totalSave,
      isOpen,
      toasts,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQty,
      pushToast,
    }),
    [items, count, subtotal, totalSave, isOpen, toasts, openCart, closeCart, addItem, removeItem, setQty, pushToast]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
