import {gql} from "apollo-boost"

export const CODEPOINTS_SUGGEST = (prefix: string) => gql`
  query {
    suggest(prefix: "${prefix}")
  }
`
