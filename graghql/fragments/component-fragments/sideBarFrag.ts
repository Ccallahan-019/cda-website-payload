import { gql } from '@apollo/client';

export const SIDE_BAR_FRAGMENT = gql`
  fragment SideBarBlockFields on SideBarBlock {
    blockType
    blockName
    id
    alignment
    sections {
        id
        sectionHeading
        sectionRichText
    }
  }
`;