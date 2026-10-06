import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const FOCUSABLE =
  'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled)';

export function Panel({
  open,
  label,
  side,
  children,
}: {
  open: boolean;
  label: string;
  side: "right" | "top" | "full";
  children: ReactNode;
}) {
  const [present, setPresent] = useState(false);
  if (open && !present) setPresent(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open || !present) return;
    const timer = window.setTimeout(() => setPresent(false), 240);
    return () => window.clearTimeout(timer);
  }, [open, present]);

  useEffect(() => {
    if (!open || !ref.current) return;
    const root = ref.current;
    const previously = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const items = () => [...root.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const timer = window.setTimeout(() => items()[0]?.focus(), 40);

    function onKey(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const list = items();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKey);
      previously?.focus();
    };
  }, [open]);

  if (!present) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal={open}
      aria-label={label}
      aria-hidden={!open}
      inert={!open ? true : undefined}
      data-open={open ? "true" : "false"}
      className={cn(
        "panel",
        side === "right" && "panel-right flex flex-col",
        side === "top" && "panel-top",
        side === "full" && "panel-full",
      )}
    >
      {children}
    </div>
  );
}
