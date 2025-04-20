import { gql } from '@apollo/client';

export const COURT_LISTING_FRAGMENT = gql`
  fragment CourtListingBlockFields on CourtListingBlock {
    blockType
    blockName
    id
    richText
    courts {
        court {
            id
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