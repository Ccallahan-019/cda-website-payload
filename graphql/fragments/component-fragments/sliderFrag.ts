import { gql } from '@apollo/client';

export const SLIDER_FRAGMENT = gql`
  fragment SliderBlockFields on SliderBlock {
    blockType
    blockName
    id
    intro
    slides {
        id
        slideContent
    }
  }
`;