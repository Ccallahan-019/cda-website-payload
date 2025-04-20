import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const ContactCards: Block = {
    slug: 'contactCards',
    interfaceName: 'ContactCardsBlock',
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
            name: 'contactsToList',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'contactToList',
                    type: 'relationship',
                    required: true,
                    relationTo: 'contact'
                }
            ]
        }
    ]
}