import { gql } from '@apollo/client';

export const GET_FUNDRAISERS = gql`
  query GetFundraisers($type: Fundraiser_fundraiserType_Input, $limit: Int) {
    Fundraisers(limit: $limit, where: { fundraiserType: { equals: $type } }, sort: "-createAt") {
      docs {
        id
        heroImage {
          url
          alt
          height
          width
        }
        fundraiserName
        fundraiserDescription
        slug
      }
    }
  }
`;