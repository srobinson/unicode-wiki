import { MockList } from 'graphql-tools'
import casual from 'casual'

const mocks = {
  Int: () => casual.integer(0, 1000),
  Chart: () => ({
    key: () => casual.word,
    title: () => casual.title
  }),
  Charts: () => ({
    tyoe: () => casual.word,
    charts: () => new MockList([1, 100])
  }),
  RootQuery: () => ({
    charts: (o, args) => {
      return { ...args }
    }
  })
}

export default mocks
