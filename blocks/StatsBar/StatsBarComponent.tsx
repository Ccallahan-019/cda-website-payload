'use client'

import React from "react";

import type { StatsBarBlock as StatsBarBlockProps } from "@/payload-types";
import { motion } from "framer-motion";
import Stat from "@/components/stat/Stat";
import RichText from "@/lexical-components/RichText";

export const StatsBarBlock: React.FC<StatsBarBlockProps> = (props) => {
    const { richText, stats } = props

    return (
        <section className="container">
            {richText && <RichText data={richText} />}
            <div className="shadow-lg shadow-purple-800/50 relative max-w-md mx-auto mt-8 md:max-w-none rounded-xl ">
                <div className="absolute inset-[-3px] white rounded-xl overflow-hidden">
                    <motion.div
                        className="absolute left-0 top-1/4 w-full h-1/2 bg-primary rounded-xl blur-2xl"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    ></motion.div>
                </div>

                <div className="relative flex flex-col items-stretch overflow-hidden bg-white divide-y md:divide-y-0 md:divide-x divide-primary text-center md:flex-row md:text-left rounded-xl">
                    {stats.map((stat, index) => {
                        return (
                            <Stat key={stat.id || index} stat={stat} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
