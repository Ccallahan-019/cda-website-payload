import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { cleanSlugHook } from './hooks/cleanSlugHook'

export const Fundraiser: CollectionConfig = {
  slug: 'fundraiser',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'fundraiserName'
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
      unique: true,
      required: true,
      admin: {
        description: 'This will be the postfix to the fundraisers url (as in, cda-pa.org/fundraisers/<slug>) and will create a new page corresponding to this fundraiser. You only need to include the postfix, i.e. lucky-lottery-calendars. Lowercase and dashes only, no special characters.'
      },
      hooks: {
        beforeValidate: [cleanSlugHook]
      }
    },
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