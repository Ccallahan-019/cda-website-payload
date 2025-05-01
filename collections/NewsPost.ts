import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { cleanSlugHook } from './hooks/cleanSlugHook'

export const NewsPost: CollectionConfig = {
  slug: 'newsPost',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
                name: 'description',
                type: 'textarea',
                required: true,
                admin: {
                  description: 'Write a short description of the news post.'
                }
            },
            {
              name: 'referenceType',
              type: 'select',
              hasMany: false,
              required: false,
              options: [
                { label: 'New Page', value: 'new' },
                { label: 'Existing Page', value: 'existing' },
              ]
            },
            {
              name: 'referenceTo',
              type: 'relationship',
              hasMany: false,
              required: false,
              relationTo: ['charity', 'fundraiser', 'event', 'localCourt', 'page', 'project'],
              admin: {
                condition: (_, { referenceType }) => referenceType === 'existing'
              },
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              required: false,
              admin: {
                description: 'This will be postfix to the news url (as in, cda-pa.org/news/<slug>) and will create a new page corresponding to this news post. You only need to include the postfix, i.e. donation-form-change. Lowercase and dashes only, no special characters.',
                condition: (_, { referenceType }) => referenceType === 'new'
              },
              hooks: {
                beforeValidate: [cleanSlugHook]
              }
            },
          ]
        },
        {
          label: 'Content',
                    admin: {
            condition: (_, { referenceType }) => referenceType === 'new'
          },
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
              required: false,
            },
          ]
        },
        {
          fields: [
            {
              name: 'relatedNewsPosts',
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
              relationTo: 'newsPost',
            },
          ],
          label: 'Related',
        },
      ]
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
