import { gql } from '@apollo/client';

export const ARCHIVE_FRAGMENT = gql`
  fragment ArchiveBlockFields on ArchiveBlock {
    blockType
    blockName
    id
    introContent
    collection
    type
    autoPopulate
    limit
    pagination
    entriesPerPage
    selectedDocs {
        relationTo
        value {
            ... on Event {
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
            ... on Fundraiser {
                id
                heroImage {
                    url
                    alt
                    height
                    width
                }
                fundraiserName
                fundraiserDescription
                slug
            }
            ... on Project {
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
            ... on Charity {
                id
                heroImage {
                    url
                    alt
                    height
                    width
                }
                charityName
                charityDescription
                slug
            }
        }
    }
  }
`;