import { SerializedHeadingNode } from "@payloadcms/richtext-lexical";

export type ContactFormInputs = {
    name: string;
    email: string;
    phone: string;
    message: string;
    csrfToken: string;
}

export type RichTextNode = {
    children?: RichTextNode[];
    direction?: string;
    format?: string | number;
    indent?: number;
    textFormat?: number;
    type?: string;
    version?: number;
    tag?: string;
    text?: string;
    detail?: number;
    mode?: string;
    style?: string;
    fields?: {
      doc?: {
        value?: {
          link?: string;
        }
      }
      linkType?: "internal" | "custom";
      newTab?: boolean;
      url?: string;
    }
    listType?: string;
    start?: number;
    value?: number;
  };