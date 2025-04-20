import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    // Delay binding to ensure DOM updates
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
