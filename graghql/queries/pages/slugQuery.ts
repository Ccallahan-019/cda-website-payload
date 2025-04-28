import { gql } from "@apollo/client";

export const GET_SLUGS = gql`
    query Pages {
        Pages(limit: 1000, draft: false, pagination: false) {
            docs {
                slug
            }
        }
    }
`