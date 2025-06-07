import { gql } from '@apollo/client';

export const COURT_LISTING_FRAGMENT = gql`
  fragment CourtListingBlockFields on CourtListingBlock {
    blockType
    blockName
    id
    richText
    rowsPerPage
    selectionType
    selectedCourts {
        id
    }
    selectedDiocese {
        id
    }
  }
`;