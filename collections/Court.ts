import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature, HorizontalRuleFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { Where } from 'payload'
import { cleanSlug } from './hooks/cleanSlugHook'

const contactQuery: Where = {
    contactType: {
        equals: 'local',
    },
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
                        admin: {
                            description: 'These fields have been pre-filtered to only include contacts whose \'type\' is \'local\'.'
                        },
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
                            description: 'As long as this court has been saved, this field has been pre-filtered to only include newsletters that have been associated with this court.'
                        }
                    }
                ]
            },
            {
                label: 'Related Info',
                fields: [
                    {
                        name: 'courtEvents',
                        type: 'relationship',
                        relationTo: 'event',
                        required: false,
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
                            description: 'As long as this court has been saved, this field has been pre-filtered to only include events that have been associated with this court.'
                        }
                    },
                    {
                        name: 'courtProjects',
                        type: 'relationship',
                        relationTo: 'project',
                        required: false,
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
                            description: 'As long as this court has been saved, this field has been pre-filtered to only include projects that have been associated with this court.'
                        }
                    },
                    {
                        name: 'courtCharities',
                        type: 'relationship',
                        relationTo: 'charity',
                        required: false,
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
                            description: 'As long as this court has been saved, this field has been pre-filtered to only include charities that have been associated with this court.'
                        }
                    },
                    {
                        name: 'courtFundraisers',
                        type: 'relationship',
                        relationTo: 'fundraiser',
                        required: false,
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
                            description: 'As long as this court has been saved, this field has been pre-filtered to only include fundraisers that have been associated with this court.'
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
        required: true,
        unique: true,
        admin: {
            description: 'This will be the postfix to the courts url (as in, cda-pa.org/courts/<slug>) and will create a new page corresponding to this court. You only need to include the postfix, i.e. columbia. Lowercase and dashes only, no special characters. If you do not fill this field in, a slug will be assigned based on the court\'s name.'
        },
          hooks: {
            beforeValidate: [
                ({ value, data }) => {
                    if (!value) {
                        if (data?.courtName) {
                            const defaultSlug = cleanSlug(data?.courtName);
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