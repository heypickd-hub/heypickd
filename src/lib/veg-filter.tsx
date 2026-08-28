import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type FoodFilter = "all" | "veg" | "nonveg";

const STORAGE_KEY = "pickd.foodfilter.v1";

interface FoodFilterValue {
  filter: FoodFilter;
  setFilter: (f: FoodFilter) => void;
}

const FoodFilterContext = createContext<FoodFilterValue | null>(null);

export function FoodFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilterState] = useState<FoodFilter>("all");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "veg" || raw === "nonveg") setFilterState(raw);
    } catch {
      /* ignore */
    }
  }, []);

  const setFilter = useCallback((f: FoodFilter) => {
    setFilterState(f);
    try {
      localStorage.setItem(STORAGE_KEY, f);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);
  return (
    <FoodFilterContext.Provider value={value}>
      {children}
    </FoodFilterContext.Provider>
  );
}

export function useFoodFilter(): FoodFilterValue {
  const ctx = useContext(FoodFilterContext);
  // Fallback keeps the UI alive (e.g. during HMR) instead of crashing the tree.
  const [localFilter, setLocalFilter] = useState<FoodFilter>("all");
  const fallback = useMemo<FoodFilterValue>(
    () => ({ filter: localFilter, setFilter: setLocalFilter }),
    [localFilter],
  );
  return ctx ?? fallback;
}
