import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents($type:  Event_eventType_Input, $limit: Int, $page: Int) {
    Events(limit: $limit, page: $page, where: { eventType: { equals: $type } }, sort: "-createdAt") {
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
      totalDocs
    }
  }
`;