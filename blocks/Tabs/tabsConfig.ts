import { Block } from "payload";
import { ContactCards } from "../ContactCards/contactCardsConfig";
import { Content } from "../Content/contentConfig";

export const Tabs: Block = {
  slug: "tabs",
  interfaceName: 'TabsBlock',
  fields: [
    {
      name: 'tabs',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tabLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'tabContent',
          type: 'blocks',
          blocks: [ContactCards, Content],
        }
      ],
      maxRows: 3
    }
  ],
};