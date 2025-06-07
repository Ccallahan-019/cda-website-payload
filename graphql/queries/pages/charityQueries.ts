import { gql } from '@apollo/client';

export const GET_CHARITY_BY_SLUG = gql`
  query Charity($slug: String, $draft: Boolean) {
    Charities(where: { slug: { equals: $slug } }, draft: $draft, pagination: false) {
      docs {
        id
        slug
        charityName
        charityType
        associatedCourt {
            courtName
        }
        heroImage {
            url
            alt
            height
            width
        }
        content
      }
    }
  }
`;

export const GET_CHARITY_SLUGS = gql`
    query Charities {
        Charities(limit: 1000, draft: false, pagination: false) {
            docs {
                slug
            }
        }
    }
`