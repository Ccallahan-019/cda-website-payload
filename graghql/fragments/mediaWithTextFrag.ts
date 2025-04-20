import { gql } from '@apollo/client';

export const MEDIA_WITH_TEXT_FRAGMENT = gql`
  fragment MediaWithTextBlockFields on MediaWithTextBlock {
    blockType
    blockName
    id
    mediaSize
    mediaAlignment,
    richText
    media {
        url
        alt
        height
        width
    }
  }
`;