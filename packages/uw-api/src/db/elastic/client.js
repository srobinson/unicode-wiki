import elastic from 'elasticsearch'
import { Client } from '../../../config'

export const index = 'unicode-wiki'

// TODO: fix warning
// https://github.com/moll/js-promise-defer/blob/master/index.js
export default new elastic.Client({
  host: Client.search.url,
  apiVersion: '2.3',
  log: 'info',
  sniffOnStart: true,
  sniffInterval: 60000,
  defer: () => {
    var resolve, reject
    var promise = new Promise(function() {
      resolve = arguments[0]
      reject = arguments[1]
    })
    return {
      resolve: resolve,
      reject: reject,
      promise: promise
    }
  }
})

export const formatResponse = (response) => {
  const hits = response.hits.hits
  const source = hits.map(hit => hit._source)
  return source
}

// TODO exception handling
export const formatError = (e) => {
  console.error(e) // eslint-disable-line
  if (e.status === 404) {
    // do something
  }
  else {
    // do something
  }
}


// https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll

// const hits = []
//
// export const scroll = query => searchClient.search({
//   index,
//   type: 'scan',
//   search_type: 'scan',
//   scroll: '2s',
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
// }, function getMoreUntilDone(error, response) {
//   // collect the title from each response
//   response.hits.hits.forEach(function(hit) {
//     hits.push(hit)
//   })
//
//   if (response.hits.total !== hits.length) {
//     // now we can call scroll over and over
//     searchClient.scroll({
//       scrollId: response._scroll_id,
//       scroll: '2s'
//     }, getMoreUntilDone)
//   }
//   else {
//     console.log('every hit', hits)
//   }
// })

// export default {
//   search,
//   suggest,
// }
