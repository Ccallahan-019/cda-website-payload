import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature, BlocksFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { cleanSlug } from './hooks/cleanSlugHook'
import { generatePreviewPath } from '@/utils/generatePreviewPath'
import { MediaBlock } from '@/blocks/Media/mediaConfig'

export const Event: CollectionConfig = {
  slug: 'event',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'eventName',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'event',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'event',
        req,
      }),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Event Info',
          fields: [
            {
              name: 'eventName',
              type: 'text',
              required: true,
            },
            {
              name: 'eventDate',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                }
              }
            },
            {
              name: 'eventDescription',
              type: 'textarea',
              required: true
            },
            {
              name: 'eventType',
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
                {
                  label: 'Diocesan',
                  value: 'diocesan',
                },
              ],
            },
            {
              name: 'associatedCourt',
              type: 'relationship',
              required: false,
              relationTo: 'localCourt',
              admin: {
                condition: (_, { eventType } = {}) => eventType === 'local'
              }
            },
            {
              name: 'associatedDiocese',
              type: 'relationship',
              required: false,
              relationTo: 'localCourt',
              admin: {
                condition: (_, { eventType } = {}) => eventType === 'diocesan'
              }
            }
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
        {
          fields: [
            {
              name: 'relatedEvents',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'event',
            },
          ],
          label: 'Related',
        },
      ]
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
          description: 'This will be the postfix to the events url (as in, cda-pa.org/events/<slug>) and will create a new page corresponding to this event. You only need to include the postfix, i.e. state-convention-2023. Lowercase and dashes only, no special characters. If you do not fill this field in, a slug will be assigned based on the events\'s name.'
      },
        hooks: {
          beforeValidate: [
              ({ value, data }) => {
                  if (!value) {
                      if (data?.eventName) {
                          const defaultSlug = cleanSlug(data?.eventName);
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