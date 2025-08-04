import { gql } from "@apollo/client";

export const GET_PROJECT_BY_SLUG = gql`
  query Project($slug: String, $draft: Boolean) {
    Projects(
      where: { slug: { equals: $slug } }
      draft: $draft
      pagination: false
    ) {
      docs {
        id
        slug
        projectName
        projectType
        associatedCourt {
          courtName
        }
        heroImage {
          url
          alt
          height
          width
        }
        content
      }
    }
  }
`;

export const GET_PROJECT_SLUGS = gql`
  query Projects {
    Projects(limit: 1000, draft: false, pagination: false) {
      docs {
        slug
      }
    }
  }
`;
