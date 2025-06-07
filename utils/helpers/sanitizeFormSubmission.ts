import DOMPurify from "isomorphic-dompurify";

type SubmissionField = {
  field: string;
  value: unknown;
};

export const sanitizeFormSubmission = (
  fields: SubmissionField[]
): SubmissionField[] => {
  return fields.map(({ field, value }) => {
    let sanitizedValue;

    if (typeof value !== "string") {
      sanitizedValue = DOMPurify.sanitize(String(value));
    } else {
      sanitizedValue = DOMPurify.sanitize(value);
    }

    return { field, value: sanitizedValue };
  });
};
