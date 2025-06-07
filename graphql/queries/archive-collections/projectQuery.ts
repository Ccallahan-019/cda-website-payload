import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects($type: Project_projectType_Input, $limit: Int, $page: Int) {
    Projects(limit: $limit, page: $page, where: { projectType: { equals: $type } }, sort: "-createdAt") {
      docs {
        id
        heroImage {
          url
          alt
          height
          width
        }
        projectName
        projectDescription
        slug
      }
      totalDocs
    }
  }
`;