import { ArchiveBlock as ArchiveBlockProps } from "@/payload-types";
import { Archive } from "./Archive";
import { Suspense } from "react";
import ArchiveLoadingSkeleton from "@/components/archive/ArchiveLoadingSkeleton";
import ApolloProvider from "@/providers/ApolloProvider";

export const ArchiveBlock: React.FC<ArchiveBlockProps> = (props) => {
    return (
        <ApolloProvider>
            <Suspense fallback={<ArchiveLoadingSkeleton />}>
                <Archive {...props}  />
            </Suspense>
        </ApolloProvider>
    )
}