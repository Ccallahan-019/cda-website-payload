import { gql } from '@apollo/client';

export const GET_CHARITIES = gql`
  query GetCharities($type: Charity_charityType_Input, $limit: Int) {
    Charities(limit: $limit, where: { charityType: { equals: $type } }, sort: "-createAt") {
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
    }
  }
`;