import { GlobalConfig } from "payload";

export const Background: GlobalConfig = {
    slug: 'background',
    access: {
        read: () => true,
      },
      fields: [
        {
            name: 'backgroundMedia',
            type: 'upload',
            relationTo: 'media',
            required: true
        }
      ]
}