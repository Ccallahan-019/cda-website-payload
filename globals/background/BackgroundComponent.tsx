import type { Background as BackgroundProps } from "@/payload-types";
import React from "react";
import { Media } from "@/components/Media/Media";

export const Background: React.FC<BackgroundProps> = (props) => {
    const { backgroundMedia } = props;

    return (
        <div>
            {backgroundMedia && typeof backgroundMedia === 'object' && (
                <Media priority className="z-[-5] fixed top-0 left-0 h-screen w-screen bg-gradient-to-b from-white to-transparent to-50% overflow-hidden" imgClassName="h-screen w-screen min-w-[700px]" resource={backgroundMedia} />
            )}
            <div className="z-[-1] fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-white to-transparent to-70%"></div>
            <div className="z-[-1] fixed top-0 left-0 w-screen h-screen bg-gradient-to-t from-white from-10% to-transparent to-70%"></div>
            <div className="z-[-1] fixed top-0 left-0 w-screen h-screen bg-gradient-to-l from-white to-transparent to-30%"></div>
        </div>
    )
}