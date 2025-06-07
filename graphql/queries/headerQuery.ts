import { gql } from '@apollo/client';

export const GET_HEADER = gql`
  query Header {
    Header {
            navItems {
                title
                description
                link {
                    type
                    newTab
                    reference {
                        title
                        slug
                    }
                    label
                    appearance
                }
                subNav {
                    id
                    title
                    links {
                        link {
                            type
                            newTab
                            reference {
                                title
                                slug
                            }
                            label
                            appearance
                        }
                    }
                }
            }
            logo {
                url
                alt
                width
                height
            }
            menuIcon {
                url
                alt
                width
                height
            }
            closeIcon {
                url
                alt
                width
                height
            }
            subMenuIcon {
                url
                alt
                width
                height
            }
            backIcon {
                url
                alt
                width
                height
            }
        }
  }
`;