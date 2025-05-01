import { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import RichText from "@/lexical-components/RichText";
import ArchiveCardsSkeleton from "@/components/archive/ArchiveCardsSkeleton";
import PaginationSkeleton from "@/components/pagination/PaginationSkeleton";

export const ArchiveSkeleton: React.FC<ArchiveBlockProps> = (props) => {
    const { introContent, entriesPerPage } = props

    return (
        <div className="container my-16 sm:my-20">
            {introContent && (
                <div className="mb-16">
                    <RichText data={introContent} />
                </div>
            )}
            <PaginationSkeleton>
                <ArchiveCardsSkeleton entriesPerPage={entriesPerPage} />
            </PaginationSkeleton>
        </div>
    )
}