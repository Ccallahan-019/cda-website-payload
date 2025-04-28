import { gql } from "@apollo/client";

export const GET_COURT_SLUGS = gql`
    query LocalCourts {
        LocalCourts(limit: 1000, draft: false, pagination: false) {
            docs {
                slug
            }
        }
    }
`