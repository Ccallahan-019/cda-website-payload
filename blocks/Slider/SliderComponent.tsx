'use client'

import type { SliderBlock as SliderBlockProps } from "@/payload-types";
import SliderCard from "@/components/slider/SliderCard";
import { useState } from "react";
import DirectionalButton from "@/components/slider/DirectionalButton";
import RichText from "@/lexical-components/RichText";

export const SliderBlock: React.FC<SliderBlockProps> = (props) => {
    const { slides, intro } = props

    const [[activeIndex, direction], setActiveIndex] = useState([0, 1]);

    const handleNext = () => {
        setActiveIndex((prevIndex) => ([((prevIndex[0] + 1) + slides.length) % slides.length, 1]));
    }

    const handlePrev = () => {
        setActiveIndex((prevIndex) => ([((prevIndex[0] - 1) + slides.length) % slides.length, -1]));
    }

    const activeCard = slides[activeIndex];

    return (
        <div className="container">
            {intro && <RichText data={intro} />}
            <div className="flex item-center min-h-[300px]">
                <DirectionalButton direction="left" onClick={handlePrev} />
                <SliderCard
                    slide={activeCard}
                    direction={direction}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
                <DirectionalButton direction="right" onClick={handleNext} />
            </div>
        </div>
    );
}