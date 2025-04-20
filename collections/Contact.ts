import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Contact: CollectionConfig = {
  slug: 'contact',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'contactName'
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact Info',
          fields: [
            {
              name: 'contactName',
              type: 'text',
              required: true,
            },
            {
                name: 'contactEmail',
                type: 'text',
                required: false,
            },
            {
                name: 'contactImage',
                type: 'relationship',
                relationTo: 'media',
                required: false,
            },
            {
              name: 'contactRoles',
              type: 'array',
              required: true,
              fields: [
                  {
                      name: 'role',
                      type: 'text',
                  },
              ],
              admin: {
                description: 'List the roles this contact fills.'
              }
            },
            {
              name: 'contactPositions',
              type: 'group',
              fields: [
                {
                  name: 'officer',
                  type: 'checkbox',
                },
                {
                  name: 'chairman',
                  type: 'checkbox',
                },
                {
                  name: 'districtDeputy',
                  type: 'checkbox',
                },
              ],
              admin: {
                description: 'Choose what position(s) this contact falls under. More than one can be selected.',
              }
            },
            {
              name: 'contactType',
              type: 'radio',
              required: true,
              options: [
                  {
                      label: 'National',
                      value: 'national',
                  },
                  {
                      label: 'State',
                      value: 'state',
                  },
                  {
                      label: 'Local',
                      value: 'local',
                  },
              ],
              defaultValue: 'national',
              admin: {
                  layout: "horizontal",
                  description: 'Choose the scope of this contact. If they are an officer, use their scope as an officer; if not, they are most likely "State", i.e. chairmen who are not officers.'
              },
            },
          ],
        },
      ]
    },
  ],
}