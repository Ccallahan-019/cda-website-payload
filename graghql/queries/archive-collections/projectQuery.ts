import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects($type: Project_projectType_Input, $limit: Int) {
    Projects(limit: $limit, where: { projectType: { equals: $type } }, sort: "-createAt") {
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
    }
  }
`;