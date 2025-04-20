import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const SideBar: Block = {
  slug: "sideBar",
  interfaceName: "SideBarBlock",
  fields: [
    {
        name: 'sections',
        type: 'array',
        required: true,
        fields: [
            {
            name: 'sectionHeading',
            type: 'text',
            required: true,
            },
            {
                name: 'sectionRichText',
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
        ],
        maxRows: 4
    },
    {
        name: 'alignment',
        type: 'select',
        required: true,
        defaultValue: 'right',
        hasMany: false,
        options: [
            {
                label: 'Left',
                value: 'left',
            },
            {
                label: 'Right',
                value: 'right'
            }
        ],
    }
  ],
};