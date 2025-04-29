import { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import { Archive } from "./Archive";
import { Suspense } from "react";
import ApolloProvider from "@/providers/ApolloProvider";
import { ArchiveSkeleton } from "./ArchiveSkeleton";

export const ArchiveBlock: React.FC<ArchiveBlockProps> = (props) => {
    return (
        <ApolloProvider>
            <Suspense fallback={<ArchiveSkeleton {...props} />}>
                <Archive {...props}  />
            </Suspense>
        </ApolloProvider>
    )
}