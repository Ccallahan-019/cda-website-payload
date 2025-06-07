import { gql } from '@apollo/client';

export const NEWS_POSTS_FRAGMENT = gql`
  fragment NewsPostsBlockFields on NewsPostsBlock {
    blockType
    blockName
    id
    richText
    pagination
    rowsPerPage
    posts {
        post {
            id
            updatedAt
            title
            description
            referenceType
            referenceTo {
              relationTo
              value {
                ... on Event {
                  slug
                }
                ... on Charity {
                  slug
                }
                ... on Fundraiser {
                  slug
                }
                ... on Project {
                  slug
                }
                ... on LocalCourt {
                  slug
                }
                ... on Page {
                  slug
                }
              }
            }
            slug
        }
    }
  }
`;