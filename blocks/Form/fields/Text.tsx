import type { TextField } from "@payloadcms/plugin-form-builder/types";
import {
  type FieldErrorsImpl,
  type FieldValues,
  type UseFormRegister,
  type Control,
  Controller,
} from "react-hook-form";

import { Input } from "@/components/ui/forms/Input";
import Label from "@/components/ui/forms/Label";
import React from "react";

import { Error } from "./Error";
import { Width } from "./Width";

const formatPhone = (input: string): string => {
  const numbers = input.replace(/\D/g, ""); // Remove non-digits
  const match = numbers.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

  if (!match) return numbers;

  let formatted = "";
  if (match[1]) formatted += `(${match[1]}`;
  if (match[2]) formatted += `) ${match[2]}`;
  if (match[3]) formatted += `-${match[3]}`;

  return formatted;
};

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    control: Control;
    placeholder: string;
    defaultTextValue: string;
    isPhoneNumber: boolean;
  }
> = ({
  name,
  defaultTextValue,
  errors,
  label,
  control,
  required,
  width,
  placeholder,
  isPhoneNumber,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultTextValue}
        rules={{
          required: required ? "This field is required" : false,
          validate: isPhoneNumber
            ? (value) =>
                /^\(\d{3}\) \d{3}-\d{4}$/.test(value) ||
                "Invalid phone number format"
            : (value) => {
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
          maxLength: {
            value: 256,
            message: "Text input too long",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value || ""}
            id={name}
            type="text"
            placeholder={placeholder}
            onChange={(e) => {
              const raw = e.target.value;
              const formatted = isPhoneNumber ? formatPhone(raw) : raw;
              onChange(formatted);
            }}
            inputMode={isPhoneNumber ? "numeric" : undefined}
            pattern={isPhoneNumber ? "\\(\\d{3}\\) \\d{3}-\\d{4}" : undefined}
          />
        )}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  );
};
