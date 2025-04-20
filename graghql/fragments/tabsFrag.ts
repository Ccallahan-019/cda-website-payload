import { gql } from '@apollo/client';
import { CONTACT_CARDS_FRAGMENT } from './contactsCardFrag';
import { CONTENT_FRAGMENT } from './contentFrag';

export const TABS_FRAGMENT = gql`
  fragment TabsBlockFields on TabsBlock {
    blockType
    blockName
    id
    tabs {
        tabLabel
        tabContent {
            __typename
            ...ContactCardsBlockFields
            ...ContentBlockFields
        }
    }
  }
  ${CONTACT_CARDS_FRAGMENT}
  ${CONTENT_FRAGMENT}
`;