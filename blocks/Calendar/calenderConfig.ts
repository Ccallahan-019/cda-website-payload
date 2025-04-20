import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Calendar: Block = {
    slug: 'calendar',
    interfaceName: 'CalendarBlock',
    fields: [
        {
            name: 'intro',
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
        },
        {
            name: 'months',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'monthItems',
                    type: 'array',
                    required: false,
                    fields: [
                        {
                            name: 'item',
                            type: 'text',
                        },
                    ],
                },
            ],
        },
    ],
}