import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { Where } from 'payload'
import { cleanSlugHook } from './hooks/cleanSlugHook'

const contactQuery: Where = {
    contactType: {
        equals: 'local',
    },
}

const eventQuery: Where = {
    eventType: {
        equals: 'local'
    }
}

const projectQuery: Where = {
    projectType: {
        equals: 'local'
    }
}

const charityQuery: Where = {
    charityType: {
        equals: 'local'
    }
}

const fundraiserQuery: Where = {
    fundraiserType: {
        equals: 'local'
    }
}


export const LocalCourt: CollectionConfig = {
  slug: 'localCourt',
    access: {
      create: authenticated,
      delete: authenticated,
      read: authenticatedOrPublished,
      update: authenticated,
    },
  admin: {
    useAsTitle: 'courtName'
  },
  fields: [
    {
        type: 'tabs',
        tabs: [
            {
            label: 'Court Info',
            fields: [
                {
                    name: 'courtName',
                    type: 'text',
                    required: true,
                    },
                    {
                    name: 'courtDiocese',
                    type: 'relationship',
                    required: true,
                    relationTo: 'diocese',
                    },
                    {
                        name: 'courtNumber',
                        type: 'number',
                        required: true,
                    },
                    {
                        name: 'instituted',
                        type: 'date',
                        required: true,
                        admin: {
                            date: {
                                pickerAppearance: 'dayOnly'
                            },
                        },
                    },
                    {
                        name: 'courtWebsite',
                        type: 'text',
                        required: false,
                    },
                    {
                        name: 'courtLocation',
                        type: 'group',
                        fields: [
                            {
                                name: 'courtAddress',
                                type: 'text',
                                required: false,
                            },
                            {
                                name: 'courtCity',
                                type: 'text',
                                required: false,
                            },
                            {
                                name: 'courtState',
                                type: 'text',
                                required: false,
                            },
                            {
                                name: 'courtZipcode',
                                type: 'text',
                                required: false,
                            },
                        ]
                    },
                    {
                    name: 'courtPhoneNumber',
                    type: 'text',
                    required: false,
                    },
                    {
                        name: 'courtOfficers',
                        type: 'group',
                        fields: [
                            {
                                name: 'courtRegent',
                                type: 'relationship',
                                required: false,
                                relationTo: 'contact',
                                filterOptions: contactQuery,
                            },
                            {
                                name: 'courtViceRegent',
                                type: 'relationship',
                                required: false,
                                relationTo: 'contact',
                                filterOptions: contactQuery,
                            },
                            {
                                name: 'courtRecordingSecretary',
                                type: 'relationship',
                                required: false,
                                relationTo: 'contact',
                                filterOptions: contactQuery,
                            },
                            {
                                name: 'courtFinancialSecretary',
                                type: 'relationship',
                                required: false,
                                relationTo: 'contact',
                                filterOptions: contactQuery,
                            },
                            {
                                name: 'courtTreasurer',
                                type: 'relationship',
                                required: false,
                                relationTo: 'contact',
                                filterOptions: contactQuery,
                            },
                        ],
                    },
                    {
                        name: 'courtNewsletters',
                        type: 'relationship',
                        required: false,
                        relationTo: 'newsletter',
                        hasMany: true,
                        filterOptions: ({ data }) => {
                            const courtId = data?.id;
                      
                            if (!courtId) return true; // fallback to show all
                      
                            return {
                                associatedCourt: {
                                    equals: courtId
                                }
                            };
                        },
                        admin: {
                            description: 'Save this court to enable newsletter filtering.'
                        }
                    }
                ]
            },
            {
                label: 'Related Info',
                fields: [
                    {
                        name: 'courtEvents',
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
                    {
                        name: 'courtProjects',
                        type: 'array',
                        required: false,
                        fields: [
                            {
                                name: 'project',
                                type: 'relationship',
                                required: true,
                                relationTo: 'project',
                                filterOptions: projectQuery,
                            },
                        ],
                    },
                    {
                        name: 'courtCharities',
                        type: 'array',
                        required: false,
                        fields: [
                            {
                                name: 'charity',
                                type: 'relationship',
                                required: true,
                                relationTo: 'charity',
                                filterOptions: charityQuery,
                            },
                        ],
                    },
                    {
                        name: 'courtFundraisers',
                        type: 'array',
                        required: false,
                        fields: [
                            {
                                name: 'fundraiser',
                                type: 'relationship',
                                required: true,
                                relationTo: 'fundraiser',
                                filterOptions: fundraiserQuery,
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
                        required: false,
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
        ]
    },
    {
        name: 'slug',
        type: 'text',
        required: false,
        admin: {
            description: 'This will be the postfix to the courts url (as in, cda-pa.org/local-courts/<slug>) and will create a new page corresponding to this court. You only need to include the postfix, i.e. columbia. Lowercase and dashes only, no special characters.'
        },
          hooks: {
            beforeValidate: [cleanSlugHook]
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