import { motion } from "framer-motion";
import React from "react";

type Props = {
    children: React.ReactNode;
    isExpanded: boolean;
}

export default function AnimateDropdown({ children, isExpanded }: Props) {
    return (
        <motion.div
        className="overflow-y-hidden"
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0 }}
        >
            {children}
        </motion.div>
    )
}