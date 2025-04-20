import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Media as MediaProps } from "@/payload-types";
import { Media } from "../Media/Media";

type Props = {
    value: string | number;
    options: string[] | number[];
    onClick: (option: string | number) => void;
    icon: number | MediaProps | null | undefined;
}

export default function DropdownFilter({ value, options, onClick, icon }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <div onClick={toggleExpanded} className="cursor-pointer block w-full py-3 px-4 border-gray-400 border rounded-lg sm:text-sm">
                <div className="flex justify-between items-center">
                    <div className="min-w-28 flex items-center justify-start space-x-2">
                        {value}
                    </div>
                    <Media resource={icon} className="h-4 w-4" />
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="absolute w-full z-10 overflow-hidden border-gray-300 bg-white shadow border rounded-lg block text-sm px-4"
                    >
                        <div className=" py-2 space-y-2">
                            <ul className="flex flex-col">
                                {options.map((option, index) => (
                                    <li
                                        key={index}
                                        className="w-full rounded-md p-2 text-right hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            onClick(option);
                                            toggleExpanded();
                                        }}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}