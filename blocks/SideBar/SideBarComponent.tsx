'use client'

import React, { useState } from "react";

import type { SideBarBlock as SideBarBlockProps } from "@/payload-types";
import { AnimatePresence, motion } from "framer-motion";
import SideBar from "@/components/side-bar/SideBar";
import RichText from "@/lexical-components/RichText";

export const SideBarBlock: React.FC<SideBarBlockProps> = (props) => {
    const { sections, alignment } = props;

    const [activeSection, setActiveSection] = useState(sections[0]);

    const left = alignment === 'left';

    return (
        <div className="container my-16 sm:my-20">
            <div className={`py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl from-slate-200 to-40% ${left ? "md:bg-gradient-to-r" : "md:bg-gradient-to-l"}`}>
                <div className={`hidden md:grid grid-cols-12 gap-8 min-h-[50vh]`}>
                    <main className={`h-full flex items-center py-8 col-span-9 ${left ? "pr-8 xl:pr-0 col-start-4 xl:col-start-4" : "pl-8 xl:pl-0"}`}>
                        <div>
                            {activeSection && (
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={activeSection.id || activeSection.sectionHeading}
                                        initial={{ y: -15, x:-20, opacity: 0 }}
                                        animate={{ y: 0, x:0, opacity: 1 }}
                                        exit={{ y: 15, x:20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {activeSection.sectionRichText && (
                                            <RichText data={activeSection.sectionRichText} />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </main>

                    <div className={`relative col-span-3 ${left ? "row-start-1 col-start-1" : ""}`}>
                        <SideBar
                            alignment={alignment}
                            sections={sections}
                            onClick={setActiveSection}
                            activeSection={activeSection}
                        />
                    </div>
                </div>
                <div className="container my-16 px-8 sm:px-12 md:hidden">
                    <div className="space-y-20">
                        {sections && sections.length > 0 && (
                            sections.map((section, index) => (
                                <div key={section.id || index} className="space-y-4 sm:space-y-8">
                                    {section.sectionRichText && (
                                        <RichText data={section.sectionRichText} />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}