import { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import RichText from "@/lexical-components/RichText";
import ArchiveCardsSkeleton from "@/components/archive/ArchiveCardsSkeleton";

export const ArchiveSkeleton: React.FC<ArchiveBlockProps> = (props) => {
    const { introContent, entriesPerPage } = props

    return (
        <div className="container my-16 sm:my-20">
            {introContent && (
                <div className="mb-16">
                    <RichText data={introContent} />
                </div>
            )}
            <div className="rounded h-[22px] w-1/6 mb-8 bg-gray-300" />
            <ArchiveCardsSkeleton entriesPerPage={entriesPerPage} />
        </div>
    )
}