import { gql } from '@apollo/client';

export const GET_COURTS = gql`
  query LocalCourts($limit: Int, $page: Int, $sort: String) {
  LocalCourts(
    limit: $limit
    page: $page
    sort: $sort
  ) {
    docs {
      id
      courtName
      slug
      courtNumber
      instituted
      courtLocation {
        courtCity
      }
      courtDiocese {
        dioceseName
      }
      courtOfficers {
        courtRegent {
          contactName
          contactEmail
        }
      }
    }
    totalDocs
  }
}
`;

export const GET_COURTS_BY_ID = gql`
  query LocalCourts($where: LocalCourt_where, $limit: Int, $page: Int, $sort: String) {
  LocalCourts(
    where: $where
    limit: $limit
    page: $page
    sort: $sort
  ) {
    docs {
      id
      courtName
      slug
      courtNumber
      instituted
      courtLocation {
        courtCity
      }
      courtDiocese {
        dioceseName
      }
      courtOfficers {
        courtRegent {
          contactName
          contactEmail
        }
      }
    }
    totalDocs
  }
}
`;

export const GET_COURTS_BY_DIOCESE = gql`
  query LocalCourts($dioceseId: JSON, $limit: Int, $page: Int, $sort: String) {
  LocalCourts(
    where: { courtDiocese: { equals: $dioceseId } }
    limit: $limit
    page: $page
    sort: $sort
  ) {
    docs {
      id
      courtName
      slug
      courtNumber
      instituted
      courtLocation {
        courtCity
      }
      courtDiocese {
        dioceseName
      }
      courtOfficers {
        courtRegent {
          contactName
          contactEmail
        }
      }
    }
    totalDocs
  }
}
`;