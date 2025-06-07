import { gql } from '@apollo/client';

export const GET_CONTACT_FORM = gql`
  query ContactForm {
    ContactForm {
        emailHeading
        contactName
        contactEmail
        text
        nameLabel
        namePlaceholder
        emailLabel
        emailPlaceholder
        phoneLabel
        phonePlaceholder
        messageLabel
        messagePlaceholder
    }
  }
`;