"use client";
import type {
  FormFieldBlock,
  Form as FormType,
} from "@payloadcms/plugin-form-builder/types";

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import RichText from "@/lexical-components/RichText";
import { Button } from "@/components/ui/buttons/button";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import { fields } from "./fields";
import { sanitizeFormSubmission } from "@/utils/helpers/sanitizeFormSubmission";
import { gql, useMutation } from "@apollo/client";

const FORM_SUBMISSION = gql`
  mutation CreateFormSubmission($mutationData: mutationFormSubmissionInput!) {
    createFormSubmission(data: $mutationData) {
      id
    }
  }
`;

export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form: FormType;
  introContent?: SerializedEditorState;
};

export const Form: React.FC<
  {
    id?: string;
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: {
      id: formID,
      confirmationMessage,
      confirmationType,
      redirect,
      submitButtonLabel,
    } = {},
    introContent,
  } = props;

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
    criteriaMode: "all",
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [createSubmission, { data, loading, error: mutationError }] =
    useMutation(FORM_SUBMISSION);
  const router = useRouter();

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      const submitForm = async () => {
        const rawData = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        const dataToSend = {
          form: formID,
          submissionData: sanitizeFormSubmission(rawData),
        };

        console.log(dataToSend);

        createSubmission({ variables: { mutationData: dataToSend } });

        if (confirmationType === "redirect" && redirect) {
          const { url } = redirect;

          const redirectUrl = url;

          if (redirectUrl) router.push(redirectUrl);
        }
      };

      void submitForm();
    },
    [formID, createSubmission, confirmationType, redirect, router]
  );

  return (
    <div className="container my-16 sm:my-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-36 items-center">
        {enableIntro && introContent && (
          <RichText data={introContent} enableGutter={false} />
        )}
        <div
          className={`p-4 lg:p-6 bg-gray-100 shadow-xl rounded-lg w-full lg:max-w-[48rem] justify-self-center ${enableIntro && introContent ? "order-last" : "lg:col-span-2"}`}
        >
          <FormProvider {...formMethods}>
            {mutationError && (
              <div>{`Submission error! ${mutationError.message}`}</div>
            )}
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    const Field: React.FC<any> =
                      fields?.[field.blockType as keyof typeof fields];
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>

              <Button
                disabled={loading && !data}
                form={formID}
                type="submit"
                size="full"
                variant="secondary"
              >
                {loading && !data && <p>Submitting, please wait...</p>}
                {!loading && submitButtonLabel}
              </Button>
            </form>

            {!loading && data && confirmationType === "message" && (
              <RichText className="mt-3" data={confirmationMessage} />
            )}
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
