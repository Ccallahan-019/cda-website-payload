"use client";
import type { Form as FormType } from "@payloadcms/plugin-form-builder/types";

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import ApolloProvider from "@/providers/ApolloProvider";
import { Form } from "./Form";

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form: FormType;
  introContent?: SerializedEditorState;
};

export const FormBlock: React.FC<
  {
    id?: string;
  } & FormBlockType
> = (props) => {
  return (
    <ApolloProvider>
      <Form {...props} />
    </ApolloProvider>
  );
};
