import LeftChevron from "../ui/svgs/LeftChevron";
import RightChevron from "../ui/svgs/RightChevron";
import { motion } from "framer-motion";

type Props = {
    direction: 'left' | 'right';
    onClick: () => void;
}

export default function DirectionalButton({ direction, onClick }: Props) {
    return (
        <motion.button
            className='hidden sm:flex px-3 items-center justify-center hover:text-gray-600 cursor-pointer'
            onClick={onClick}
            whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 }
            }}
        >
            {direction === 'left' ? (
                <LeftChevron height="60px" width="30px" />
            ) : (
                <RightChevron height="60px" width="30px" />
            )}
        </motion.button>
    )
}