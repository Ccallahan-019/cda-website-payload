import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Banner: Block = {
  slug: "banner",
  interfaceName: "BannerBlock",
  fields: [
    {
        name: 'style',
        type: 'select',
        defaultValue: 'info',
        options: [
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warning' },
            { label: 'Error', value: 'error' },
            { label: 'Success', value: 'success' },
        ],
        required: true,
    },
    {
        name: 'type',
        type: 'select',
        defaultValue: 'generic',
        options: [
            { label: 'Generic', value: 'generic' },
            { label: 'Diocesan', value: 'diocesan' },
            { label: 'Court', value: 'court' }
        ]
    },
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
        admin: {
            condition: (_, { type } = {}) => type === 'generic',
            description: 'This field will only populate on the page when the banner type is  "Generic"'
        }
    },
  ],
};