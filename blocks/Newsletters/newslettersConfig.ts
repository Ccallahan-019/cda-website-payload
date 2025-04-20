import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Newsletters: Block = {
    slug: 'newsletters',
    interfaceName: 'NewslettersBlock',
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
            name: 'newsletters',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'newsletter',
                    type: 'relationship',
                    required: true,
                    relationTo: 'newsletter'
                }
            ]
        },
        {
            name: 'downloadImage',
            type: 'relationship',
            required: true,
            relationTo: 'media',
        },
        {
            name: 'dropdownIcon',
            type: 'relationship',
            required: false,
            relationTo: 'media',
        },
    ]
}