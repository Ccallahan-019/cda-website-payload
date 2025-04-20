import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const Slider: Block = {
    slug: 'slider',
    interfaceName: 'SliderBlock',
    fields: [
        {
            name: 'intro',
            type: 'richText',
            required: false,
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
            name: 'slides',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'slideContent',
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
                }
            ]
        },
    ]
}