import { gql } from '@apollo/client';

export const GET_CHARITIES = gql`
  query GetCharities($type: Charity_charityType_Input, $limit: Int, $page: Int) {
    Charities(limit: $limit, page: $page, where: { charityType: { equals: $type } }, sort: "-createdAt") {
      docs {
        id
        heroImage {
          url
          alt
          height
          width
        }
        charityName
        charityDescription
        slug
      }
      totalDocs
    }
  }
`;