import client, { formatResponse, formatError } from '../client'

const index = 'unicode-wiki'
const type = 'codepoints'

export const getByCP = (cp) => client.search({
  index,
  type,
  body: {
    query: {
      ids: {
        values: [cp]
      }
    }
  }
})
.then(result => formatResponse(result))
.catch(e => formatError(e))

export const getByUCP = (ucp) => {
  const cp = parseInt(ucp, 16)
  return getByCP(cp)
}

export const getByRange = (range = '0100..0200', page = 1, perPage = 20) => {
  const from = parseInt(range.split('..')[0], 16)
  const to = parseInt(range.split('..')[1], 16)
  return client.search({
    index,
    type,
    from: (page - 1) * perPage,
    size: perPage,
    body: {
      query: {
        'constant_score': {
          filter: {
            range: {
              cp: {
                gte: from,
                lte: to
              }
            }
          }
        }
      }
    }
  })
  .then(result => formatResponse(result))
  .catch(e => formatError(e))
}

export const suggest = (text) => client.suggest({
  index,
  type,
  body: {
    suggest: {
      text,
      completion: {
        field: 'suggest',
        size: 20,
        unicode_aware: true // eslint-disable-line
      }
    }
  }
})
.then(resoonse => {
  const suggestions = resoonse.suggest[0].options
  const results = suggestions.sort((a, b) => {
    if (a.text < b.text) return -1
    if (a.text > b.text) return 1
    return 0
  })
  .map(s => s.text)
  return results
})
.catch(e => formatError(e))


// export const suggest = text => searchClient.suggest({
//   index,
//   type,
//   body: {
//     suggest: {
//       text,
//       completion: {
//         field: 'suggest',
//         size: 1024,
//         unicode_aware: true // eslint-disable-line
//       }
//     }
//   }
// })
//
// export const search = query => searchClient.search({
//   index,
//   type,
//   body: {
//     query: {
//       match: {
//         suggest: {
//           query,
//           operator: 'and'
//         }
//       }
//     }
//   }
// })
//
// export const range = (start, end) => searchClient.search({
//   index,
//   type,
//   body: {
//     query: {
//       constant_score: { // eslint-disable-line
//         filter: {
//           range: {
//             cp: {
//               gte: start,
//               lte: end
//             }
//           }
//         }
//       }
//     }
//   }
// })


export default {
  getByCP,
  getByUCP,
  getByRange
}
