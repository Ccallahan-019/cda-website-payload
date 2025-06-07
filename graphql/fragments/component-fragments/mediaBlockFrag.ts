import { gql } from '@apollo/client';

export const MEDIA_BLOCK_FRAGMENT = gql`
  fragment MediaBlockFields on MediaBlock {
    blockType
    blockName
    id
    media {
        url
        alt
        caption
        height
        width
    }
  }
`;