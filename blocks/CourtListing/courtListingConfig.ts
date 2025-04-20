import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from "@payloadcms/richtext-lexical";
import { Block } from "payload";

export const CourtListing: Block = {
  slug: "courtListing",
  interfaceName: "CourtListingBlock",
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
        name: 'courts',
        type: 'array',
        required: true,
        fields: [
            {
                name: 'court',
                type: 'relationship',
                required: true,
                relationTo: 'localCourt',
                unique: true
            }
        ]
    },
    {
        name: 'rowsPerPage',
        type: 'number',
        required: true,
        defaultValue: 10,
    }
  ],
};