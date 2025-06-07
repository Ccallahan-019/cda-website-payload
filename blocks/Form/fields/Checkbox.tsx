import type { CheckboxField } from "@payloadcms/plugin-form-builder/types";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import React from "react";

import { Error } from "./Error";
import { Width } from "./Width";
import Label from "@/components/ui/forms/Label";

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>;
    register: UseFormRegister<FieldValues>;
    defaultCheckValue: boolean;
  }
> = ({ name, defaultCheckValue, errors, label, register, required, width }) => {
  const props = register(name, { required: required });

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <input
          defaultChecked={defaultCheckValue}
          type="checkbox"
          className="w-5 h-5 text-gray-900 border-gray-300 rounded-sm focus:ring-gray-900"
          id={name}
          {...props}
        />
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
      </div>
      {errors[name] && <Error name={name} />}
    </Width>
  );
};
