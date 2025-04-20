import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
	slug: 'footer',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'logo',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'text',
			type: 'text',
			required: false,
		},
		{
			name: 'socialMediaIcons',
			type: 'array',
			required: false,
			fields: [
				{
					name: 'icon',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'link',
					type: 'text',
					required: true,
				},
			]
		},
        {
            name: 'linksHeading',
            type: 'text',
            required: true,
        },
        {
            name: 'links',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'link',
                    type: 'relationship',
                    relationTo: 'page',
                    required: true,
                }
            ]
        },
        {
            name: 'copyrightText',
            type: 'text',
            required: true,
        },
	],
}