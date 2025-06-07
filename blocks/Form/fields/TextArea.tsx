import type { TextField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import Label from "@/components/ui/forms/Label";
import { TextAreaInput } from "@/components/ui/forms/TextAreaInput";
import React from "react";

import { Error } from "./Error";
import { Width } from "./Width";

export const TextArea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    rows?: number;
    defaultTextAreaValue: string;
    placeholder: string;
  }
> = ({
  name,
  defaultTextAreaValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
  placeholder,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>

      <TextAreaInput
        defaultValue={defaultTextAreaValue}
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name, {
          required: required ? "This field is required" : false,
          maxLength: {
            value: 1000,
            message: "Response must be 1000 characters or fewer",
          },
          validate: (value) => {
            if (
              /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(
                value
              ) ||
              /<\/?[^>]+(>|$)/g.test(value)
            ) {
              return "Scripts and HTML are not allowed in this input.";
            }
            return true;
          },
        })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  );
};
