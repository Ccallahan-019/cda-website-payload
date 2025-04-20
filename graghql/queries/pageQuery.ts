import { gql } from '@apollo/client';
import { CONTENT_FRAGMENT } from '../fragments/contentFrag';
import { STATS_BAR_FRAGMENT } from '../fragments/statsBarFrag';
import { SIDE_BAR_FRAGMENT } from '../fragments/sideBarFrag';
import { CONTACT_CARDS_FRAGMENT } from '../fragments/contactsCardFrag';
import { TABS_FRAGMENT } from '../fragments/tabsFrag';
import { NEWS_POSTS_FRAGMENT } from '../fragments/newsPostsFrag';
import { COURT_LISTING_FRAGMENT } from '../fragments/courtListingFrag';
import { CALENDAR_FRAGMENT } from '../fragments/calendarFrag';
import { MEDIA_WITH_TEXT_FRAGMENT } from '../fragments/mediaWithTextFrag';
import { SLIDER_FRAGMENT } from '../fragments/sliderFrag';
import { NEWSLETTERS_FRAGMENT } from '../fragments/newslettersFrag';


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
          __typename
          ...ContentBlockFields
          ...StatsBarBlockFields
          ...SideBarBlockFields
          ...ContactCardsBlockFields
          ...TabsBlockFields
          ...NewsPostsBlockFields
          ...CourtListingBlockFields
          ...CalendarBlockFields
          ...MediaWithTextBlockFields
          ...SliderBlockFields
          ...NewslettersBlockFields
        }
      }
    }
  }
  ${CONTENT_FRAGMENT}
  ${STATS_BAR_FRAGMENT}
  ${SIDE_BAR_FRAGMENT}
  ${CONTACT_CARDS_FRAGMENT}
  ${TABS_FRAGMENT}
  ${NEWS_POSTS_FRAGMENT}
  ${COURT_LISTING_FRAGMENT}
  ${CALENDAR_FRAGMENT}
  ${MEDIA_WITH_TEXT_FRAGMENT}
  ${SLIDER_FRAGMENT}
  ${NEWSLETTERS_FRAGMENT}
`;