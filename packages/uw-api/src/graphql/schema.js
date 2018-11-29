import { ChartSchema, ChartQuery } from './schema/chart'
import { CodepointSchema, CodepointQuery} from './schema/codepoint'

//
//  Define Schema
// -----------------------------------------------------------------------------

const types = `
${ChartSchema}
${CodepointSchema}

type RootQuery {
  ${ChartQuery}
  ${CodepointQuery}
}

schema {
  query: RootQuery
}
`
export default [types]
