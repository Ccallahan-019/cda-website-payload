import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const MediaWithText: Block = {
    slug: 'mediaWithText',
    interfaceName: 'MediaWithTextBlock',
    fields: [
        {
            name: 'mediaSize',
            type: 'select',
            defaultValue: 'half',
            options: [
                {
                    label: 'One Third',
                    value: 'oneThird',
                },
                {
                    label: 'Half',
                    value: 'half',
                },
                {
                    label: 'Two Thirds',
                    value: 'twoThirds',
                },
            ],
        },
        {
            name: 'mediaAlignment',
            type: 'select',
            defaultValue: 'left',
            options: [
                {
                    label: 'Left',
                    value: 'left',
                },
                {
                    label: 'Right',
                    value: 'right'
                },
            ],
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
        },
        {
            name: 'media',
            type: 'relationship',
            relationTo: 'media',
            required: true
        },
    ]
}