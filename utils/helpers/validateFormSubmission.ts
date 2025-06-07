import { Form } from "@/payload-types";
import { stateOptions } from "@/blocks/Form/fields/state/options";
import { countryOptions } from "@/blocks/Form/fields/country/options";

export const validateFormSubmission = (form: Form, data: any): string[] => {
  const errors: string[] = [];

  if (!form?.fields || !Array.isArray(data.submissionData)) {
    throw new Error("Invalid submission.");
  }

  const submissionMap = Object.fromEntries(
    data.submissionData.map((entry: { field: string; value: unknown }) => [
      entry.field,
      entry,
    ])
  );

  for (const field of form.fields) {
    if ("name" in field) {
      if (typeof field.name !== "string") continue;

      const submitted = submissionMap[field.name];

      // Required field missing or empty
      if (field.required && (!submitted || submitted.value === "")) {
        errors.push(`Field "${field.name}" is required.`);
        continue;
      }

      // Type-specific validation
      if (submitted?.value && typeof submitted.value === "string") {
        if ("isPhoneNumber" in field && field.isPhoneNumber) {
          const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
          if (!phonePattern.test(submitted.value)) {
            errors.push(`Field "${field.name}" must be a valid phone number.`);
          }
        }

        if (field.blockType === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(submitted.value)) {
            errors.push(`Field "${field.name}" must be a valid email address.`);
          }
        }

        if (field.blockType === "select") {
          const validOptions = field.options?.map((option) => option.value);
          if (validOptions && !validOptions.includes(submitted.value)) {
            errors.push(`Invalid option for "${field.name}".`);
          }
        }

        if (field.blockType === "state") {
          const validOptions = stateOptions.map((option) => option.value);
          if (validOptions && !validOptions.includes(submitted.value)) {
            errors.push(`Invalid option for "${field.name}".`);
          }
        }
        if (field.blockType === "country") {
          const validOptions = countryOptions.map((option) => option.value);
          if (validOptions && !validOptions.includes(submitted.value)) {
            errors.push(`Invalid option for "${field.name}".`);
          }
        }
        if (field.blockType === "number") {
          const num = Number(submitted.value);

          if (isNaN(num) || !Number.isFinite(num)) {
            errors.push(`Field "${field.name}" must be a valid number.`);
          }

          if (num < 0) {
            errors.push(`Field "${field.name}" must be at least 0.`);
          }
        }
      }
    }
  }

  const allowedFields = form.fields
    .filter((field) => "name" in field)
    .map((field) => field.name);

  for (const entry of data.submissionData) {
    if (!allowedFields.includes(entry.field)) {
      errors.push(`Unexpected field "${entry.field}".`);
    }
  }

  return errors;
};
