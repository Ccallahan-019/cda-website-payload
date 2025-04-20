import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { Where } from 'payload'

const contactQuery: Where = {
    'contactPositions.districtDeputy': {
        equals: true,
    },
}

const eventQuery: Where = {
    eventType: {
        equals: 'diocesan'
    }
}


export const Diocese: CollectionConfig = {
  slug: 'diocese',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'dioceseName'
  },
  fields: [
    {
        type: 'tabs',
        tabs: [
            {
            label: 'Diocese Info',
            fields: [
                {
                    name: 'dioceseName',
                    type: 'text',
                    required: true,
                    },
                    {
                        name: 'dioceseWebsite',
                        type: 'text',
                        required: false,
                    },
                    {
                        name: 'dioceseLocation',
                        type: 'group',
                        fields: [
                            {
                                name: 'dioceseAddress',
                                type: 'text',
                                required: false,
                            },
                            {
                                name: 'dioceseCity',
                                type: 'text',
                                required: false,
                            },
                            {
                                name: 'dioceseState',
                                type: 'text',
                                required: false,
                            },
                            {
                                name: 'dioceseZipcode',
                                type: 'text',
                                required: false,
                            },
                        ]
                    },
                    {
                    name: 'diocesePhoneNumber',
                    type: 'text',
                    required: false,
                    },
                    {
                        name: 'districtDeputies',
                        type: 'array',
                        required: true,
                        fields: [
                            {
                                name: 'deputy',
                                type: 'relationship',
                                required: true,
                                relationTo: 'contact',
                                filterOptions: contactQuery,
                            },
                        ],
                        admin: {
                            description: 'This field has been pre-filtered to only allow access to contacts that have designated as a District Deputy in the "Contact Positions" field.'
                        }
                    },
                    {
                        name: 'dioceseEvents',
                        type: 'array',
                        required: false,
                        fields: [
                            {
                                name: 'event',
                                type: 'relationship',
                                required: true,
                                relationTo: 'event',
                                filterOptions: eventQuery,
                            },
                        ],
                    },
                ]
            },
            {
                label: 'Misc Info',
                fields: [
                    {
                        name: 'info',
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
        ]
    },
  ],
}