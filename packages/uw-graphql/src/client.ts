// tslint:disable:no-any
import ApolloClient, {gql} from "apollo-boost"
import fetch from "node-fetch"

const URL = process.env.GRAPHQL_URL || "http://localhost:4000"

export const apolloClient = new ApolloClient({
  fetch: fetch as any,
  fetchOptions: {
    fetch: fetch as any,
  },
  uri: URL,
})

const PAGINATED_CODEPOINTS = `
  _links{
    href
    rel
    type
  }
  docs{
    index
    cp
    block{
      key
      name
      value
    }
    block_header
    block_subheader
    font
    general_category{
      key
      name
      value
    }
    name
    name_v1
  }
  hasNextPage
  hasPrevPage
  nextPage
  page
  prevPage
`

export const CODEPOINTS_BY_CATEGORY_KEY = (category: string, key: string, page: number = 1) => gql`
  query {
    codepointsByCategoryKey(category: "${category}", key: "${key}", page: ${page || 1}) {
      ${PAGINATED_CODEPOINTS}
    }
  }
`

export const CODEPOINTS_SEARCH = (q: string) => gql`
query {
  search(q: "${q}"){
    ${PAGINATED_CODEPOINTS}
  }
}
`
