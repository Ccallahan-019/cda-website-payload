import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { FixedToolbarFeature, HeadingFeature, HorizontalRuleFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig} from 'payload'
import { cleanSlug } from './hooks/cleanSlugHook'

export const Charity: CollectionConfig = {
  slug: 'charity',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'charityName',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Charity Info',
          fields: [
            {
              name: 'charityName',
              type: 'text',
              required: true,
            },
            {
              name: 'charityDescription',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Write a short description of the charity.'
              }
            },
            {
              name: 'charityType',
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
                condition: (_, { charityType } = {}) => charityType === 'local'
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
          description: 'This will be the postfix to the charities url (as in, cda-pa.org/charities/<slug>) and will create a new page corresponding to this charity. You only need to include the postfix, i.e. charity-name. Lowercase and dashes only, no special characters. If you do not fill this field in, a slug will be assigned based on the charity\'s name.'
      },
        hooks: {
          beforeValidate: [
              ({ value, data }) => {
                  if (!value) {
                      if (data?.charityName) {
                          const defaultSlug = cleanSlug(data?.charityName);
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