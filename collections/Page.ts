import type { CollectionConfig } from 'payload'

import { Hero } from '@/heros/herosConfig'
import { Content } from '@/blocks/Content/contentConfig'
import { StatsBar } from '@/blocks/StatsBar/statsBarConfig'
import { SideBar } from '@/blocks/SideBar/sideBarConfig'
import { ContactCards } from '@/blocks/ContactCards/contactCardsConfig'
import { Tabs } from '@/blocks/Tabs/tabsConfig'
import { NewsPosts } from '@/blocks/NewsPosts/newsPostsConfig'
import { CourtListing } from '@/blocks/CourtListing/courtListingConfig'
import { Calendar } from '@/blocks/Calendar/calenderConfig'
import { MediaWithText } from '@/blocks/MediaWithText/mediaWithTextConfig'
import { Slider } from '@/blocks/Slider/sliderConfig'
import { Newsletters } from '@/blocks/Newsletters/newslettersConfig'
import { DiocesesAccordian } from '@/blocks/DiocesesAccordian/diocesesAccordian.config'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { revalidatePage } from './hooks/revalidatePage'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import { cleanSlugHook } from './hooks/cleanSlugHook'
import { Archive } from '@/blocks/Archive/archiveConfig'
import { MediaBlock } from '@/blocks/Media/mediaConfig'

export const Page: CollectionConfig = {
  slug: 'page',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    readVersions: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'page',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'page',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [Hero],
          label: 'Hero'
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Content,
                StatsBar,
                SideBar,
                ContactCards, 
                Tabs,
                NewsPosts,
                CourtListing,
                Calendar,
                MediaWithText,
                Slider,
                Newsletters,
                DiocesesAccordian,
                Archive,
                MediaBlock,
              ],
              required: false,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
      ]
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'This is the postfix to the domain name, i.e. cda-pa.org/<slug>.'
      },
      hooks: {
        beforeValidate: [cleanSlugHook]
      }
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}