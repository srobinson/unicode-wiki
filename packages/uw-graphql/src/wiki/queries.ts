import {gql} from "apollo-boost"
import {CATEGORY_TYPE} from "@uw/domain"

export const CATEGORY_BY_TYPE = (type: CATEGORY_TYPE) => gql`
  query {
    categoryByType(type: "${type}") {
      childRanges {
        from
        to
      }
      index
      key
      level
      parent
      range {
        from
        to
      }
      title
    }
  }
`
