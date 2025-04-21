import { gql } from '@apollo/client';

import { CONTENT_FRAGMENT } from './component-fragments/contentFrag';
import { STATS_BAR_FRAGMENT } from './component-fragments/statsBarFrag';
import { SIDE_BAR_FRAGMENT } from './component-fragments/sideBarFrag';
import { CONTACT_CARDS_FRAGMENT } from './component-fragments/contactsCardFrag';
import { TABS_FRAGMENT } from './component-fragments/tabsFrag';
import { NEWS_POSTS_FRAGMENT } from './component-fragments/newsPostsFrag';
import { COURT_LISTING_FRAGMENT } from './component-fragments/courtListingFrag';
import { CALENDAR_FRAGMENT } from './component-fragments/calendarFrag';
import { MEDIA_WITH_TEXT_FRAGMENT } from './component-fragments/mediaWithTextFrag';
import { SLIDER_FRAGMENT } from './component-fragments/sliderFrag';
import { NEWSLETTERS_FRAGMENT } from './component-fragments/newslettersFrag';

export const LAYOUT_FRAGMENTS = gql`
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