import { gql } from '@apollo/client';

export const CONTENT_FRAGMENT = gql`
  fragment ContentBlockFields on ContentBlock {
    blockType
    blockName
    id
    columns {
      size
      richText
      id
    }
  }
`;