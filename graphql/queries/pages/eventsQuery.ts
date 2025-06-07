import { gql } from '@apollo/client';

export const GET_EVENT_BY_SLUG = gql`
  query Events($slug: String, $draft: Boolean) {
    Events(where: { slug: { equals: $slug } }, draft: $draft, pagination: false) {
      docs {
        id
        slug
        eventName
        eventDate
        eventType
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

export const GET_EVENT_SLUGS = gql`
    query Events {
        Events(limit: 1000, draft: false, pagination: false) {
            docs {
                slug
            }
        }
    }
`