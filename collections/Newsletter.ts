import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { CollectionConfig } from "payload";

export const Newsletter: CollectionConfig = {
    slug: 'newsletter',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        useAsTitle: 'displayTitle',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'yearOfRelease',
            type: 'number',
            required: true,
        },
        {
            name: 'quarter',
            type: 'text',
            required: false,
        },
        {
            name: 'type',
            type: 'select',
            required: true,
            defaultValue: 'state',
            options: [
                {
                    label: 'Local',
                    value: 'local',
                },
                {
                    label: 'State',
                    value: 'state',
                },
                {
                    label: 'National',
                    value: 'national',
                },
            ]
        },
        {
            name: 'reissueDate',
            type: 'date',
            required: false,
        },
        {
            name: 'associatedCourt',
            type: 'relationship',
            required: false,
            relationTo: 'localCourt',
            admin: {
                condition: (_, { type } = {}) => type === 'local'
            }
        },
        {
            name: 'displayTitle',
            type: 'text',
            admin:
                {
                    hidden: true,
                },
            hooks: {
                beforeChange: [
                    ({ data }) => `${data?.title} (${data?.yearOfRelease})`
                ]
            }

        }
    ],
    upload: true,
}
