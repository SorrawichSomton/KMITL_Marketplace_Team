"use client";
import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

type Theme = "light" | "dark";

export function useMarketplaceTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const theme: Theme = resolvedTheme === "dark" ? "dark" : "light";
  return { theme, setTheme: (value: Theme) => setTheme(value) };
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}
      storageKey="kmitl-theme" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
