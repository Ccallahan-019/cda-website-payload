import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
	slug: 'header',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'navItems',
			type: 'array',
			required: true,
			fields: [
				{
					name: 'title',
					type: 'text'
				},
				{
					name: 'description',
					type: 'text',
					required: false,
				},
				link({}),
				{
					name: 'subNav',
					type: 'array',
					required: false,
					fields: [
						{
							name: 'title',
							type: 'text',
							required: true,
						},
						linkGroup({})
					]
				}
			],
		},
		{
			name: 'logo',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'menuIcon',
			type: 'upload',
			relationTo: 'media',
			required: true
		},
		{
			name: 'closeIcon',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'subMenuIcon',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'backIcon',
			type: 'upload',
			relationTo: 'media',
			required: true,
		}
	],
	}