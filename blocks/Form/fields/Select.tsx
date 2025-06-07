import type { SelectField } from "@payloadcms/plugin-form-builder/types";
import type { Control, FieldErrorsImpl } from "react-hook-form";

import Label from "@/components/ui/forms/Label";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/forms/Select";
import React from "react";
import { Controller } from "react-hook-form";

import { Error } from "./Error";
import { Width } from "./Width";

export const Select: React.FC<
  SelectField & {
    control: Control;
    errors: Partial<FieldErrorsImpl>;
    defaultSelectValue: string;
  }
> = ({
  name,
  control,
  errors,
  label,
  options,
  required,
  width,
  placeholder,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field: { onChange, value } }) => {
          const controlledValue = options.find(
            (option) => option.value === value
          );

          return (
            <SelectRoot
              onValueChange={(val) => onChange(val)}
              value={controlledValue?.value}
            >
              <SelectTrigger className="w-full" id={name}>
                <SelectValue placeholder={placeholder || label} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ label, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </SelectRoot>
          );
        }}
        rules={{
          required,
          validate: (value) => {
            const validOptions = options.map((option) => option.value);
            return validOptions.includes(value) || "Invalid option selected";
          },
        }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
