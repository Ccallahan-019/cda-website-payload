import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents($type:  Event_eventType_Input, $limit: Int) {
    Events(limit: $limit, where: { eventType: { equals: $type } }, sort: "-createAt") {
      docs {
        id
        heroImage {
          url
          alt
          height
          width
        }
        eventName
        eventDescription
        slug
      }
    }
  }
`;