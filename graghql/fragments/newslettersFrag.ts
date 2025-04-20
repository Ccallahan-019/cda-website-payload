import { gql } from '@apollo/client';

export const NEWSLETTERS_FRAGMENT = gql`
  fragment NewslettersBlockFields on NewslettersBlock {
    blockType
    blockName
    richText
    downloadImage {
        url
        alt
        height
        width
    }
    dropdownIcon {
      url
      alt
      height
      width
    }
    newsletters {
        newsletter {
            id
            url
            title
            filesize
            yearOfRelease
            reissueDate
        }
    }
  }
`;