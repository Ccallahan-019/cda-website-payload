import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const CourtListing: Block = {
  slug: "courtListing",
  interfaceName: "CourtListingBlock",
  fields: [
    {
        name: 'richText',
        type: 'richText',
        required: true,
        editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                        return [
                            ...rootFeatures,
                            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                        ]
                    },
                }),
        label: false,
    },
    {
        name: 'selectionType',
        type: 'select',
        required: true,
        options: [
            { label: 'All Courts', value: 'all' },
            { label: 'By Diocese', value: 'diocese' },
            { label: 'Manual Selection', value: 'manual' }
        ],
        defaultValue: 'all'
    },
    {
        name: 'selectedCourts',
        type: 'relationship',
        required: false,
        relationTo: 'localCourt',
        maxRows: 20,
        hasMany: true,
        admin: {
            condition: (_, { selectionType }) => selectionType === 'manual',
            description: 'Select the courts you would like to include in the listing; you may choose up to 20 courts. If you do not select any courts, the listing will default to displaying every court.'
        }
    },
    {
        name: 'selectedDiocese',
        type: 'relationship',
        required: false,
        relationTo: 'diocese',
        admin: {
            condition: (_, { selectionType }) => selectionType === 'diocese',
            description: 'Select the diocese you would like to filter the listing by. If you do not select a diocese, the listing will default to displaying every court.'
        }
    },
    {
        name: 'rowsPerPage',
        type: 'number',
        required: true,
        defaultValue: 10,
    }
  ],
};