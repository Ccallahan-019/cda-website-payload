import { gql } from '@apollo/client';

export const GET_FOOTER = gql`
    query Footer {
        Footer {
            logo {
                id
                height
                width
                url
                alt
            }
            title
            text
            socialMediaIcons {
                id
                link
                icon {
                    id
                    alt
                    url
                    height
                    width
                }
            }
            links {
                link {
                    slug
                    title
                }
            }
            copyrightText
            linksHeading
        }
    }
`;