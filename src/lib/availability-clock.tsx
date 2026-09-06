import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const AvailabilityClockContext = createContext<Date | null>(null);

export function AvailabilityClockProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <AvailabilityClockContext.Provider value={now}>{children}</AvailabilityClockContext.Provider>
  );
}

export function useAvailabilityNow(): Date {
  return useContext(AvailabilityClockContext) ?? new Date();
}
