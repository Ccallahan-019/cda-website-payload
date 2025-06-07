import type { EmailField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { Input } from "@/components/ui/forms/Input";
import Label from "@/components/ui/forms/Label";
import React from "react";

import { Error } from "./Error";
import { Width } from "./Width";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    placeholder: string;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  width,
  placeholder,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>

      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        placeholder={placeholder}
        {...register(name, {
          required: required ? "Email is required" : false,
          pattern: {
            value: emailPattern,
            message: "Enter a valid email address",
          },
        })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  );
};
