import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const DiocesesAccordian: Block = {
    slug: 'diocesesAccordian',
    interfaceName: 'DiocesesAccordianBlock',
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
            name: 'dioceses',
            type: 'relationship',
            required: true,
            relationTo: 'diocese',
            hasMany: true
        }
    ]
}