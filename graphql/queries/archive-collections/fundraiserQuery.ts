import { gql } from '@apollo/client';

export const GET_FUNDRAISERS = gql`
  query GetFundraisers($type: Fundraiser_fundraiserType_Input, $limit: Int, $page: Int) {
    Fundraisers(limit: $limit, page: $page, where: { fundraiserType: { equals: $type } }, sort: "-createdAt") {
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
      totalDocs
    }
  }
`;