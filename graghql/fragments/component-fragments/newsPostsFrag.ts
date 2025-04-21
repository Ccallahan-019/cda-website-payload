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
        }
    }
  }
`;