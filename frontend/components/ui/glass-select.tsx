"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type GlassOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  value: string;
  options: GlassOption[];
  onChange: (value: string) => void;
};

export default function GlassSelect({
  label,
  value,
  options,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const selected = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );

  useEffect(() => {
    if (!open) return;

    const onDown = (event: PointerEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onDown);

    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) refs.current[selected]?.focus();
  }, [open, selected]);

  const choose = (newValue: string) => {
    onChange(newValue);
    setOpen(false);
    trigger.current?.focus();
  };

  return (
    <div className={`glass-select relative min-w-0 ${open ? "z-50" : ""}`} ref={root}>
      <button
        ref={trigger}
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="glass-input flex w-full items-center justify-between gap-2 text-left"
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", " ", "Enter"].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span className="truncate">
          {options[selected]?.label ?? label}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className="glass-dropdown absolute left-0 top-[calc(100%+8px)] z-50 max-h-64 w-max min-w-full overflow-auto rounded-2xl p-1.5 shadow-xl"
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                refs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className="glass-option flex w-full min-w-0 items-center justify-between gap-4 rounded-xl px-3 py-2 text-left text-sm"
              onClick={() => choose(option.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  setOpen(false);
                  trigger.current?.focus();
                } else if (
                  event.key === "ArrowDown" ||
                  event.key === "ArrowUp"
                ) {
                  event.preventDefault();
                  refs.current[
                    (index +
                      (event.key === "ArrowDown"
                        ? 1
                        : options.length - 1)) %
                    options.length
                  ]?.focus();
                } else if (event.key === "Home") {
                  event.preventDefault();
                  refs.current[0]?.focus();
                } else if (event.key === "End") {
                  event.preventDefault();
                  refs.current[options.length - 1]?.focus();
                } else if (
                  event.key === " " ||
                  event.key === "Enter"
                ) {
                  event.preventDefault();
                  choose(option.value);
                }
              }}
            >
              <span className="min-w-0 break-words">{option.label}</span>

              {option.value === value && (
                <Check size={15} className="shrink-0 text-orange-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}