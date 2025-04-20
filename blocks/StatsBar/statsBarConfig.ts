import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const StatsBar: Block = {
    slug: 'statsBar',
    interfaceName: 'StatsBarBlock',
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
            name: 'stats',
            type: 'array',
            required: true,
            maxRows: 3,
            fields: [
                {
                    name: 'statNumber',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'statPostfix',
                    type: 'text',
                    required: false,
                },
                {
                    name: 'statDescription',
                    type: 'text',
                    required: false
                },
            ]
        }
    ]
}