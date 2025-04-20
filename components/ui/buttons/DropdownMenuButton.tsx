import type { Media } from "@/payload-types";
import RotatePresence from "../animations/RotatePresence";
import Image from "next/image";

type Props = {
    menuIcon: Media;
    closeIcon: Media;
    isClicked: boolean;
    onClick: () => void;
}

export default function DropdownMenuButton({ menuIcon, closeIcon, isClicked, onClick }: Props) {
    return (
        <div className="lg:hidden">
            <RotatePresence
                clicked={isClicked}
                onClick={onClick}
                firstIcon={
                    <Image
                        src={menuIcon.url!}
                        alt={menuIcon.alt}
                        height={menuIcon.height!}
                        width={menuIcon.width!}
                        className="h-8 w-auto"
                    />
                }
                secondIcon={
                    <Image
                        src={closeIcon.url!}
                        alt={closeIcon.alt}
                        height={closeIcon.height!}
                        width={closeIcon.width!}
                        className="h-8 w-auto"
                    />
                }
            />
        </div>
    )
}