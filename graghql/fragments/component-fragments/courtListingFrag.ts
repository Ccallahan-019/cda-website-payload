import { gql } from '@apollo/client';

export const COURT_LISTING_FRAGMENT = gql`
  fragment CourtListingBlockFields on CourtListingBlock {
    blockType
    blockName
    id
    richText
    rowsPerPage
    courts {
        court {
            id
            slug
            courtName
            courtDiocese {
                dioceseName
            }
            courtLocation {
                courtCity
            }
            instituted
            courtNumber
            courtOfficers {
                courtRegent {
                    contactName
                    contactEmail
                }
            }
        }
        
    }
  }
`;