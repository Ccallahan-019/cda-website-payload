import { gql } from '@apollo/client';

export const DIOCESES_ACCORDIAN_FRAGMENT = gql`
  fragment DiocesesAccordianBlockFields on DiocesesAccordianBlock {
    blockType
    blockName
    id
    richText
    dioceses {
        dioceseName
        dioceseWebsite
        dioceseLocation {
            dioceseAddress
            dioceseCity
            dioceseState
            dioceseZipcode
        }
        diocesePhoneNumber
        info
    }
  }
`;