'use client'

import { ContactCardsBlock } from "@/blocks/ContactCards/ContactCardsComponent";
import { TabsBlock as TabsBlockProps } from "@/payload-types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ContentBlock } from "../Content/ContentComponent";

const blockComponents = {
  contactCards: ContactCardsBlock,
  content: ContentBlock,
}

  
  export const TabsBlock: React.FC<TabsBlockProps> = (props) => {
    const { tabs } = props;

    const [activeTab, setActiveTab] = useState(tabs[0]);

    const hasTabs = tabs && Array.isArray(tabs) && tabs.length > 0;

    if (hasTabs) {
      return (
        <div className="container my-6 space-y-16 sm:space-y-20">
            <nav className="w-fit border-b-[2px] border-gray-200">
                <ul className="flex">
                    {tabs.map((tab, index) => (
                        <li
                            className={`relative py-2 px-1.5 sm:px-5 rounded-t-sm ${tab !== activeTab ? "cursor-pointer" : " bg-gray-300"}`}
                            key={tab.id || index}
                            onClick={() => {setActiveTab(tab)}}
                        >
                            {tab.tabLabel}
                            {tab === activeTab ? (
                                <motion.div
                                    className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-accent"
                                    layoutId="underline"
                                    id="underline"
                                />
                            ) : null}
                        </li>
                    ))}
                </ul>
            </nav>
    
            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab.id || activeTab.tabLabel}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                      {activeTab.tabContent && activeTab.tabContent.length > 0 && activeTab.tabContent.map((block, index) => {
                        const blockType = block.blockType;

                        if (blockType && blockType in blockComponents) {
                          const Block = blockComponents[blockType];
            
                          if (Block) {
                            return (
                              <div className="my-20" key={index}>
                                {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                <Block {...block} />
                              </div>
                            );
                          };
                        };

                      })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>   
      )
      
    };

    return null;
  }