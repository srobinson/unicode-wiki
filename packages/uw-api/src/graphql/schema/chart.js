export const ChartSchema = `
type Chart {
  type: String!
  key: String!
  range: String!
}
`
export const ChartQuery = `
  chart(key: String): Chart
  charts: [Chart]
`
