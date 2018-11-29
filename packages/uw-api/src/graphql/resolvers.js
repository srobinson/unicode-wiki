import chart from '../db/elastic/queries/chart'
import codepoint from '../db/elastic/queries/codepoint'

const resolvers = {
  RootQuery: {
    charts() {
      return chart.getCharts()
    },
    chart(root, {key}) {
      return chart.getByKey(key)
    },
    codepoint(root, {ucp}) {
      return codepoint.getByUCP(ucp)
    },
    codepoints(root, {range}) {
      return codepoint.getByRange(range)
    },
    suggest(root, {text}) {
      return codepoint.suggest(text)
    }
  },
  Codepoint: {
    color(codepoint) {
      return codepoint.color
    },
    charts(codepoint) {
      return codepoint.charts
    },
    k(codepoint) {
      return codepoint.k
    }
  },
}

export default resolvers
