import { SideBarBlock } from "@/payload-types"
import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react";

type Props = {
    sections: SideBarBlock["sections"];
    alignment: SideBarBlock["alignment"];
    activeSection: SideBarBlock["sections"][number];
    onClick: Dispatch<SetStateAction<SideBarBlock["sections"][number]>>
}

export default function SideBar({ sections, alignment, activeSection, onClick }: Props) {
    const left = alignment === 'left';
    const translate = left ? 5 : -5;

    return (
        <aside className="h-full flex flex-col justify-center">
            <div className={`space-y-12 ${left ? "flex flex-col text-right items-end" : ""}`}>
                {sections && sections.length > 0 && (
                    sections.map((section, index) => (
                        <motion.div
                            key={section.id || index}
                            className={`pr-8 ${section === activeSection ? "" : "cursor-pointer"}`}
                            onClick={() => {onClick(section)}}
                            animate={{
                                opacity: section === activeSection ? 1 : 0.6,
                                scale: section === activeSection ? 1.1 : 1,
                                translateX: section === activeSection ? translate : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="relative flex items-center">
                                <h3 className="text-3xl">
                                    {section.sectionHeading}
                                </h3>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </aside>
    )
}