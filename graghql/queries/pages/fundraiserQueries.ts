import { gql } from '@apollo/client';

export const GET_FUNDRAISER_BY_SLUG = gql`
  query Fundraisers($slug: String, $draft: Boolean) {
    Fundraisers(where: { slug: { equals: $slug } }, draft: $draft, pagination: false) {
      docs {
        id
        slug
        fundraiserName
        fundraiserType
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

export const GET_FUNDRAISER_SLUGS = gql`
    query Fundraisers {
        Fundraisers(limit: 1000, draft: false, pagination: false) {
            docs {
                slug
            }
        }
    }
`