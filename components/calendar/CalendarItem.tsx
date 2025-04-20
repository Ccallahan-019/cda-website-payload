'use client'

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Checkmark from "../ui/svgs/Checkmark";

type Props = {
    children: React.ReactNode;
}

export default function CalendarItem({ children }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [elementHeight, setElementHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (containerRef.current) {
        const { height } = containerRef.current.getBoundingClientRect();
        setElementHeight(height);
    }
  }, [isHovered]);

  return (
    <div
      className="relative overflow-hidden"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {!isHovered ? (
          <motion.li
            key="first"
            className="p-2 flex items-start rounded-sm"
            initial={{ y: -elementHeight, transition: { duration: 0.4 } }}
            animate={{ y: 0, transition: { duration: 0.4 } }}
            exit={{ y: -elementHeight, transition: { duration: 0.2 } }}
          >
            <Checkmark color="var(--color-primary)" />
            <span className="ml-3 text-md font-medium text-gray-700">
              {children}
            </span>
          </motion.li>
        ) : (
          <motion.li
            key="second"
            className="p-2 flex items-start rounded-sm bg-primary"
            initial={{ y: elementHeight, transition: { duration: 0.4 } }}
            animate={{ y: 0, transition: { duration: 0.4 } }}
            exit={{ y: elementHeight, transition: { duration: 0.2 } }}
          >
            <Checkmark color="white" />
            <span className="ml-3 text-md font-medium text-white">
              {children}
            </span>
          </motion.li>
        )}
      </AnimatePresence>
    </div>
  );
}
