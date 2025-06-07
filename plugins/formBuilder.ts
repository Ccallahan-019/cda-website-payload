import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import {
  lexicalEditor,
  FixedToolbarFeature,
  HeadingFeature,
} from "@payloadcms/richtext-lexical";
import { fields } from "@payloadcms/plugin-form-builder";
import { sanitizeFormSubmission } from "@/utils/helpers/sanitizeFormSubmission";
import { validateFormSubmission } from "@/utils/helpers/validateFormSubmission";

export const formBuilder = formBuilderPlugin({
  fields: {
    text: {
      fields: [
        ...(typeof fields.text === "function"
          ? fields.text().fields
          : fields.text.fields),
        {
          name: "isPhoneNumber",
          label: "Phone Number",
          type: "checkbox",
          required: false,
        },
        {
          name: "placeholder",
          type: "text",
          required: false,
        },
      ],
    },
    email: {
      fields: [
        ...(typeof fields.email === "function"
          ? fields.email().fields
          : fields.email.fields),
        {
          name: "placeholder",
          type: "text",
          required: false,
        },
      ],
    },
    textarea: {
      fields: [
        ...(typeof fields.textarea === "function"
          ? fields.textarea().fields
          : fields.textarea.fields),
        {
          name: "placeholder",
          type: "text",
          required: false,
        },
      ],
    },
    payment: false,
  },
  formOverrides: {
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ("name" in field && field.name === "confirmationMessage") {
          return {
            ...field,
            editor: lexicalEditor({
              features: ({ rootFeatures }) => [
                ...rootFeatures,
                FixedToolbarFeature(),
                HeadingFeature({
                  enabledHeadingSizes: ["h2", "h3", "h4"],
                }),
              ],
            }),
          };
        }
        return field;
      });
    },
  },
  formSubmissionOverrides: {
    slug: "form-submissions",
    fields: ({ defaultFields }) => {
      return [
        ...defaultFields,
        {
          name: "ip",
          type: "text",
          required: false,
          admin: {
            readOnly: true,
          },
        },
      ];
    },
    hooks: {
      beforeValidate: [
        async ({ data, req: { payload } }) => {
          const formId = data?.form;
          if (!formId) {
            throw new Error("Missing form ID.");
          }

          const form = await payload.findByID({
            collection: "forms",
            id: formId,
          });

          const errors = validateFormSubmission(form, data);

          if (errors.length > 0) {
            console.log(errors.join(" "));
            throw new Error(errors.join(" "));
          }

          return data;
        },
      ],
      beforeChange: [
        async ({ data, req }) => {
          let cleanedSubmissionData = data.submissionData;
          if (data.submissionData && Array.isArray(data.submissionData)) {
            cleanedSubmissionData = sanitizeFormSubmission(data.submissionData);
          }

          const ip = req?.headers.get("x-forwarded-for") || "unknown";

          return {
            ...data,
            submissionData: cleanedSubmissionData,
            ip:
              typeof ip === "string"
                ? ip
                : Array.isArray(ip)
                  ? ip[0]
                  : "unknown",
          };
        },
      ],
    },
  },
});
