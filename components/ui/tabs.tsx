"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside Tabs.");
  return context;
}

export function Tabs({
  defaultValue,
  className,
  children
}: {
  defaultValue: string;
  className?: string;
  children: ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-white/[0.045] p-2 backdrop-blur-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const tabs = useTabs();
  const active = tabs.value === value;

  return (
    <button
      type="button"
      onClick={() => tabs.setValue(value)}
      className={cn(
        "rounded-xl px-4 py-2 text-sm font-semibold text-accent transition",
        active && "bg-primary/20 text-text shadow-[0_0_24px_rgba(26,111,255,0.18)]",
        !active && "hover:bg-white/[0.06] hover:text-text",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const tabs = useTabs();
  if (tabs.value !== value) return null;
  return <div className={className}>{children}</div>;
}
