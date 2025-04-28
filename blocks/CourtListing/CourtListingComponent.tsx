import ApolloProvider from "@/providers/ApolloProvider";
import { CourtListing } from "./CourtListing";
import type { CourtListingBlock as CourtListingBlockProps } from "@/payload-types";
import React, { Suspense } from "react";
import { CourtListingSkeleton } from "./CourtListingSkeleton";

export const CourtListingBlock: React.FC<CourtListingBlockProps> = (props) => {
    return (
        <ApolloProvider>
            <Suspense fallback={<CourtListingSkeleton {...props} />}>
                <CourtListing {...props} />
            </Suspense>
            
        </ApolloProvider>
    )
}