import { gql } from '@apollo/client';

export const GET_COURT_BY_SLUG = gql`
  query LocalCourt($slug: String, $draft: Boolean) {
    LocalCourts(where: { slug: { equals: $slug } }, draft: $draft, pagination: false) {
      docs {
        id
        slug
        courtName
        courtDiocese {
            dioceseName
        }
        courtNumber
        instituted
        courtWebsite
        courtLocation {
            courtAddress
            courtCity
            courtState
            courtZipcode
        }
        courtPhoneNumber
        courtOfficers {
            courtRegent {
                contactName
            }
            courtViceRegent {
                contactName
            }
            courtRecordingSecretary {
                contactName
            }
            courtFinancialSecretary {
                contactName
            }
            courtTreasurer {
                contactName
            }
        }
        heroImage {
            url
            alt
            height
            width
        }
        content
        updatedAt
      }
    }
  }
`;