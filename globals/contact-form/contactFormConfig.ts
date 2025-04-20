import type { GlobalConfig } from 'payload'

export const ContactForm: GlobalConfig = {
  slug: 'contactForm',
  access: {
    read: () => true,
  },
  fields: [
    {
        name: 'emailHeading',
        type: 'text',
        defaultValue: 'Email',
        required: true
    },
    {
      name: 'contactName',
      type: 'text',
      required: true,
    },
    {
        name: 'contactEmail',
        type: 'text',
        required: true,
    },
    {
        name: 'text',
        type: 'richText'
    },
    {
        name: 'nameLabel',
        type: 'text',
        required: true
    },
    {
        name: 'namePlaceholder',
        type: 'text',
        required: true
    },
    {
        name: 'emailLabel',
        type: 'text',
        required: true
    },
    {
        name: 'emailPlaceholder',
        type: 'text',
        required: true
    },
    {
        name: 'phoneLabel',
        type: 'text',
        required: true
    },
    {
        name: 'phonePlaceholder',
        type: 'text',
        required: true
    },
    {
        name: 'messageLabel',
        type: 'text',
        required: true
    },
    {
        name: 'messagePlaceholder',
        type: 'text',
        required: true
    }
  ],
}