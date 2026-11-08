"use client";

import { useSyncExternalStore } from "react";
import { LiquidToggle, NimbusToggleIcons } from "@/components/ui/liquid-glass-toggle";
import { useMarketplaceTheme } from "@/components/theme-provider";

// Render the exact same placeholder in SSR and the first hydration pass.
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeToggle() {
  const { theme, setTheme } = useMarketplaceTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!mounted) {
    return <span className="inline-block shrink-0" style={{ width: 74, height: 35 }} aria-hidden="true" />;
  }

  const dark = theme === "dark";
  return (
    <div className="flex shrink-0 items-center justify-center" style={{ width: 74, height: 35 }}
      title={dark ? "โหมดกลางคืน" : "โหมดกลางวัน"}>
      <LiquidToggle
        size={35}
        tone={dark ? "dark" : "light"}
        checked={dark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        icons={{ off: NimbusToggleIcons.sun, on: NimbusToggleIcons.moon }}
        label="สลับโหมดกลางวันและกลางคืน"
      />
    </div>
  );
}
