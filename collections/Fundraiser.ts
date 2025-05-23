import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature, BlocksFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { cleanSlug } from './hooks/cleanSlugHook'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import { MediaBlock } from '@/blocks/Media/mediaConfig'

export const Fundraiser: CollectionConfig = {
  slug: 'fundraiser',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'fundraiserName',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'fundraiser',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'fundraiser',
        req,
      }),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Fundraiser Info',
          fields: [
            {
              name: 'fundraiserName',
              type: 'text',
              required: true,
            },
            {
              name: 'fundraiserDescription',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Write a short description of the fundraiser.'
              }
            },
            {
              name: 'fundraiserType',
              type: 'radio',
              required: true,
              options: [
                {
                    label: 'National',
                    value: 'national',
                },
                {
                    label: 'State',
                    value: 'state',
                },
                {
                    label: 'Local',
                    value: 'local',
                },
              ],
            },
            {
              name: 'associatedCourt',
              type: 'relationship',
              required: false,
              relationTo: 'localCourt',
              admin: {
                condition: (_, { fundraiserType } = {}) => fundraiserType === 'local'
              }
            },
          ]
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    BlocksFeature({ blocks: [MediaBlock] }),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ]
        },
      ]
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
          description: 'This will be the postfix to the fundraiser url (as in, cda-pa.org/fundraisers/<slug>) and will create a new page corresponding to this fundraiser. You only need to include the postfix, i.e. lucky-lottery-calendar. Lowercase and dashes only, no special characters. If you do not fill this field in, a slug will be assigned based on the fundraiser\'s name.'
      },
        hooks: {
          beforeValidate: [
              ({ value, data }) => {
                  if (!value) {
                      if (data?.fundraiserName) {
                          const defaultSlug = cleanSlug(data?.fundraiserName);
                          return defaultSlug;
                      }
                      return value;
                  }
                  return cleanSlug(value);
              }
          ]
      }
    }
  ],
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