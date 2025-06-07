import { gql } from '@apollo/client';

export const CALENDAR_FRAGMENT = gql`
  fragment CalendarBlockFields on CalendarBlock {
    blockType
    blockName
    id
    intro
    months {
        id
        title
        monthItems {
            id
            item
        }
    }
  }
`;