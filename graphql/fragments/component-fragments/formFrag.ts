import { gql } from "@apollo/client";

export const FORM_FRAGMENT = gql`
  fragment FormBlockFields on FormBlock {
    id
    blockType
    blockName
    form {
      id
      title
      fields {
        ... on Checkbox {
          id
          blockType
          blockName
          name
          label
          width
          required
          defaultCheckValue: defaultValue
        }
        ... on Email {
          id
          blockType
          blockName
          name
          label
          width
          required
          placeholder
        }
        ... on Text {
          id
          blockType
          blockName
          name
          label
          width
          required
          defaultTextValue: defaultValue
          placeholder
          isPhoneNumber
        }
        ... on Textarea {
          id
          blockType
          blockName
          name
          label
          width
          required
          defaultTextAreaValue: defaultValue
          placeholder
        }
        ... on Select {
          id
          blockType
          blockName
          name
          label
          width
          defaultSelectValue: defaultValue
          placeholder
          options {
            id
            label
            value
          }
          required
        }
        ... on State {
          id
          blockType
          blockName
          name
          label
          width
          required
        }
        ... on Country {
          id
          blockType
          blockName
          name
          label
          width
          required
        }
        ... on Message {
          id
          blockType
          blockName
          message
        }
        ... on Number {
          id
          blockType
          blockName
          name
          label
          width
          defaultNumberValue: defaultValue
          required
        }
      }
      submitButtonLabel
      confirmationType
      confirmationMessage
      redirect {
        url
      }
      emails {
        id
        emailTo
        cc
        bcc
        replyTo
        emailFrom
        subject
        message
      }
    }
    enableIntro
    introContent
  }
`;
