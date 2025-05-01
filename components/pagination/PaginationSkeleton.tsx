import LeftChevron from "../ui/svgs/LeftChevron";
import RightChevron from "../ui/svgs/RightChevron";

type Props = {
    children: React.ReactNode;
}

export default function PaginationSkeleton({ children }: Props) {
    const pageArr: number[] = [];

    for (let i = 1; i <= 5; i++) {
        pageArr.push(i)
    }

    return (
        <div className="space-y-8">
            <div className="h-5 bg-gray-300 w-1/3" />
            <div>
                {children}
            </div>
            <nav className="relative mt-6 lg:mt-0 flex justify-center space-x-1.5">
                <button
                    disabled
                    className="inline-flex items-center justify-center px-3 py-2 text-gray-600 border border-gray-400 rounded-md w-9"
                >
                    <LeftChevron height="20px" width="20px" />
                </button>

                {pageArr.map((page) => (
                    <button
                        key={page}
                        disabled
                        className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-600 border border-gray-400 rounded-md w-9"
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled
                    className="inline-flex items-center justify-center px-3 py-2 text-gray-600 border border-gray-400 rounded-md w-9"
                >
                    <RightChevron height="20px" width="20px" />
                </button>
            </nav>
        </div>
    )
}