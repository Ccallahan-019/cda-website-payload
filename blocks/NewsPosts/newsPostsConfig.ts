import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const NewsPosts: Block = {
    slug: 'newsPosts',
    interfaceName: 'NewsPostsBlock',
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
            name: 'posts',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'post',
                    type: 'relationship',
                    relationTo: 'newsPost'
                }
            ]
        },
        {
            name: 'pagination',
            type: 'checkbox',
            required: true,
            defaultValue: false,
        },
        {
            name: 'rowsPerPage',
            type: 'number',
            required: true,
            defaultValue: 10,
            admin: {
                condition: (_, { pagination } = {}) => pagination === true
            }
        }
    ]
}