import { gql } from '@apollo/client';

export const STATS_BAR_FRAGMENT = gql`
  fragment StatsBarBlockFields on StatsBarBlock {
    blockType
    blockName
    id
    richText
    stats {
        id
        statNumber
        statPostfix
        statDescription
    }
  }
`;