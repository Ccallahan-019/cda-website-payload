import { gql } from '@apollo/client';

export const GET_BACKGROUND = gql`
  query Background {
    Background {
        backgroundMedia {
            id
            url
            alt
            height
            width
        }
    }
  }
`;