import LeftChevron from "../ui/svgs/LeftChevron";
import RightChevron from "../ui/svgs/RightChevron";

type Props = {
    children: React.ReactNode;
    pages: number;
    currentPage: number;
    rangeLabels: {
        singular: string;
        plural: string;
    };
    pageLength: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
    maxVisiblePages?: number;
}

export default function Pagination({
    children,
    pages,
    currentPage,
    pageLength,
    totalCount,
    rangeLabels,
    onPageChange,
    onNextPage,
    onPrevPage,
    maxVisiblePages = 5
}: Props) {
    const pageArr = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > pages) {
        endPage = pages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageArr.push(i);
    }


    let startIndex;
    let endIndex;

    if (currentPage > 1 ) {
        startIndex = ((currentPage - 1) * pageLength) + 1;
    } else {
        startIndex = 1
    }

    if (currentPage < pages) {
        endIndex = currentPage * pageLength;
    } else {
        endIndex = totalCount;
    }

    return (
        <div className="space-y-8">
            {totalCount > 1 ? (
                <div className="text-gray-700">
                    {`Showing ${startIndex} - ${endIndex} of ${totalCount} ${rangeLabels.plural}`}
                </div>
            ): (
                <div className="text-gray-700">
                    {`Showing ${startIndex} of ${totalCount} ${rangeLabels.singular}`}
                </div>
            )}
            <div>
                {children}
            </div>
            <nav className="relative mt-6 lg:mt-0 flex justify-center space-x-1.5">
                <button
                    onClick={() => onPrevPage()}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-600 border border-gray-400 rounded-md w-9"
                >
                    <span className="sr-only"> Previous </span>
                    <LeftChevron height="20px" width="20px" />
                </button>

                {pageArr.map((page) => (
                    <button
                        onClick={() => onPageChange(page)}
                        key={page}
                        className={`inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-600 border border-gray-400 rounded-md w-9
                                ${currentPage === page ? "z-10 bg-gray-100 text-gray-700 border-gray-700": "bg-white"}
                            `}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => onNextPage()}
                    disabled={currentPage === pages}
                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-600 border border-gray-400 rounded-md w-9"
                >
                    <span className="sr-only"> Next </span>
                    <RightChevron height="20px" width="20px" />
                </button>
            </nav>
        </div>

    )
}