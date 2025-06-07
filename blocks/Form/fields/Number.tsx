import type { TextField } from "@payloadcms/plugin-form-builder/types";
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
export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    defaultNumberValue: number;
  }
> = ({
  name,
  defaultNumberValue,
  errors,
  label,
  register,
  required,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>

      <Input
        defaultValue={defaultNumberValue}
        id={name}
        type="number"
        min={0}
        {...register(name, {
          required,
          valueAsNumber: true,
          min: { value: 0, message: "Must be at least 0" },
        })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
