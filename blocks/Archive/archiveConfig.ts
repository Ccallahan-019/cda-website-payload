import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
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
      label: 'Intro Content',
    },
    {
      name: 'collection',
      type: 'select',
      required: true,
      defaultValue: 'event',
      label: 'Collection To Show',
      options: [
        {
          label: 'Events',
          value: 'event',
        },
        {
          label: 'Projects',
          value: 'project',
        },
        {
          label: 'Charities',
          value: 'charity',
        },
        {
          label: 'Fundraisers',
          value: 'fundraiser',
        },
      ],
    },
    {
        name: 'type',
        type: 'select',
        required: true,
        defaultValue: 'state',
        label: 'Type To Show',
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
            value: 'local'
          },
        ],
    },
    {
        name: 'autoPopulate',
        type: 'checkbox',
        defaultValue: true,
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.autoPopulate === true,
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.autoPopulate === false,
      },
      hasMany: true,
      label: 'Selection',
      relationTo: ["event", "charity", "fundraiser", "project"],
      filterOptions: ({ blockData, relationTo }) => {
        const collection = blockData?.collection;
        const type = blockData?.type;

        if (relationTo !== collection || !type) return false;

        const typeFieldMap = {
          event: 'eventType',
          project: 'projectType',
          fundraiser: 'fundraiserType',
          charity: 'charityType',
        };

        const typeField = typeFieldMap[collection as keyof typeof typeFieldMap];

        return {
          [typeField]: { equals: type },
        };
      },
    },
    {
      name: 'pagination',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'entriesPerPage',
      type: 'number',
      defaultValue: 3,
      admin: {
        step: 1,
        condition: (_, siblingData) => siblingData.pagination === true,
      }
    },
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
