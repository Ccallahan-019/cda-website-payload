import { gql } from '@apollo/client';

export const CONTACT_CARDS_FRAGMENT = gql`
  fragment ContactCardsBlockFields on ContactCardsBlock {
    blockType
    blockName
    id
    richText
    contactsToList {
        contactToList {
            contactName
            contactEmail
            contactImage {
                url
                alt
                height
                width
            }
            contactRoles {
                role
            }
        }
    }
  }
`;