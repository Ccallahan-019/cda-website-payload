import { gql } from '@apollo/client';
import { LAYOUT_FRAGMENT } from '../fragments/layoutFrag';


export const GET_PAGE_BY_SLUG = gql`
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug } }, draft: $draft, pagination: false) {
      docs {
        id
        title
        slug
        hero {
          type
          richText
          media {
            url
            alt
            height
            width
          }
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
        layout {
          ...LayoutFragments
        }
      }
    }
  }
  ${LAYOUT_FRAGMENT}
`;