import CourtCardsSkeleton from "@/components/court-card/CourtCardSkeleton";
import TableSkeleton from "@/components/table/TableSkeleton";
import RichText from "@/lexical-components/RichText";
import type { CourtListingBlock as CourtListingBlockProps } from "@/payload-types";

export const CourtListingSkeleton: React.FC<CourtListingBlockProps> = (props) => {
    const { richText, rowsPerPage } = props

    const columns = [
        { header: 'Number', accessor: 'courtNumber' },
        { header: 'Name', accessor: 'courtName' },
        { header: 'Diocese', accessor: 'courtDiocese.dioceseName' },
        { header: 'Location', accessor: 'courtLocation.courtCity' },
        { header: 'Instituted', accessor: 'instituted' },
        { header: 'Anniversary', accessor: 'instituted' },
        { header: 'Court Regent', accessor: 'courtOfficers.courtRegent.contactName' },
      ];

    return (
        <div className="container my-16 sm:my-20">
                <div className="py-10 px-4 sm:px-6 rounded-xl bg-background/60 backdrop-blur-sm shadow-xl">
                    {richText && <RichText data={richText} />}
                    <div className="rounded h-[22px] w-1/3 mb-8 bg-gray-300" />
                    <TableSkeleton rowsPerPage={rowsPerPage} columns={columns} />
                    <CourtCardsSkeleton rowsPerPage={rowsPerPage} />
                </div>
            </div>
    )
}