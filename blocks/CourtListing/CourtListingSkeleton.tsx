import CourtCardsSkeleton from "@/components/court-card/CourtCardSkeleton";
import TableSkeleton from "@/components/table/TableSkeleton";
import RichText from "@/lexical-components/RichText";
import type { CourtListingBlock as CourtListingBlockProps } from "@/payload-types";

export const CourtListingSkeleton: React.FC<CourtListingBlockProps> = (props) => {
    const { richText, rowsPerPage } = props

    return (
        <div className="container my-16 sm:my-20">
                <div className="py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
                    {richText && <RichText data={richText} />}
                    <div className="rounded h-5 w-1/3 mb-8 bg-gray-300" />
                    <TableSkeleton rowsPerPage={rowsPerPage} />
                    <CourtCardsSkeleton rowsPerPage={rowsPerPage} />
                </div>
            </div>
    )
}