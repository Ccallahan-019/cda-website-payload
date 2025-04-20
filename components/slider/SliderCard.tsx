import RichText from "@/lexical-components/RichText";
import type { SliderBlock as SliderBlockProps } from "@/payload-types";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
    slide: SliderBlockProps["slides"][number];
    direction: number;
    onPrev: () => void;
    onNext: () => void;
}

export default function SliderCard({ slide, direction, onNext, onPrev }: Props) {
    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 400 : -400,
                opacity: 0
            } 
        },
        visible: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => {
            return {
                x: direction < 0 ? 400 : -400,
                opacity: 0
            } 
        },
    }

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
    };

    return(
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
                key={slide.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{
                x: { type: "spring", stiffness: 400, damping: 30, },
                opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
        
                    if (swipe < -swipeConfidenceThreshold) {
                    onNext();
                    } else if (swipe > swipeConfidenceThreshold) {
                    onPrev();
                    }
                }}
            >
                <div className="relative h-full">
                    <div className="absolute -inset-4">
                        <div className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter bg-primary"></div>
                    </div>

                    <div className="relative h-full rounded-xl bg-background/90 backdrop-blur-sm shadow-xl p-8">
                        {slide.slideContent && <RichText data={slide.slideContent} />}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>

    )
}