import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { cleanSlugHook } from './hooks/cleanSlugHook'

export const Event: CollectionConfig = {
  slug: 'event',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'eventName'
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
      unique: true,
      required: true,
      admin: {
        description: 'This will be the postfix to the events url (as in, cda-pa.org/events/<slug>) and will create a new page corresponding to this event. You only need to include the postfix, i.e. 2024-national-convention. Lowercase and dashes only, no special characters.'
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