function minimumSwaps(arr) {
  const d = {}
  for (let i = 0; i < arr.length; i++) {}
}

minimumSwaps([7, 1, 3, 2, 4, 5, 6])

// 0   [7, 1, 3, 2, 4, 5, 6]   swap (0,3)
// 1   [2, 1, 3, 7, 4, 5, 6]   swap (0,1)
// 2   [1, 2, 3, 7, 4, 5, 6]   swap (3,4)
// 3   [1, 2, 3, 4, 7, 5, 6]   swap (4,5)
// 4   [1, 2, 3, 4, 5, 7, 6]   swap (5,6)
// 5   [1, 2, 3, 4, 5, 6, 7]

// 0   [7, 1, 3, 2, 4, 5, 6]   swap (0,3)
// 1   [2, 1, 3, 7, 4, 5, 6]   swap (0,1)
// 2   [1, 2, 3, 7, 4, 5, 6]   swap (3,4)
// 3   [1, 2, 3, 4, 7, 5, 6]   swap (4,5)
// 4   [1, 2, 3, 4, 5, 7, 6]   swap (5,6)
// 5   [1, 2, 3, 4, 5, 6, 7]

// console.log(minimumSwaps([1, 3, 2, 4, 5]))

// ------

// function minimumBribes(q) {
//   let ans = 0
//   for (let i = q.length - 1; i >= 0; i--) {
//     if (q[i] - (i + 1) > 2) {
//       ans = "Too chaotic"
//       break
//     }
//     for (let j = Math.max(0, q[i] - 2); j < i; j++) {
//       if (q[j] > q[i]) {
//         ans++
//       }
//     }
//   }
//   console.log(ans)
// }

// minimumBribes([2, 1, 5, 3, 4])
// minimumBribes([2, 5, 1, 3, 4])

// ------

// function rotLeft(a, d) {
//   for (let i = 0; i < d; i++) {
//     let b = a.shift()
//     a.push(b)
//   }
//   return a
// }

// console.log(rotLeft([1, 2, 3, 4, 5], 4))

// function hourglassSum(arr) {
//   let best = undefined
//   for (let i = 0; i < 4; i++) {
//     for (let y = 0; y < 4; y++) {
//       let count =
//         arr[i][y] +
//         arr[i][y + 1] +
//         arr[i][y + 2] +
//         arr[i + 1][y + 1] +
//         arr[i + 2][y] +
//         arr[i + 2][y + 1] +
//         arr[i + 2][y + 2]

//       if (best === undefined) {
//         best = count
//       } else if (count > best) {
//         best = count
//       }
//     }
//   }
//   return best
// }

// const test0 = [
//   [1, 1, 1, 0, 0, 0],
//   [0, 1, 0, 0, 0, 0],
//   [1, 1, 1, 0, 0, 0],
//   [0, 0, 2, 4, 4, 0],
//   [0, 0, 0, 2, 0, 0],
//   [0, 0, 1, 2, 4, 0],
// ]

// const test1 = [
//   [-1, -1, 0, -9, -2, -2],
//   [-2, -1, -6, -8, -2, -5],
//   [-1, -1, -1, -2, -3, -4],
//   [-1, -9, -2, -4, -4, -5],
//   [-7, -3, -3, -2, -9, -9],
//   [-1, -3, -1, -2, -4, -5],
// ]

// console.log(hourglassSum(test0))
// console.log(hourglassSum(test1))

// function repeatedString(s, n) {
//   const acount = str => str.split("").filter(c => c === "a").length
//   const d = Math.floor(n / s.length)
//   const r = n - s.length * d
//   return d * acount(s) + acount(s.substr(0, r))
// }
// repeatedString("aba", 10)
// console.log(repeatedString("a", 1000000000000))

// function jumpingOnClouds(c) {
//   let steps = 0
//   let i = 0
//   while (i < c.length - 1) {
//     if (i + 2 < c.length && c[i + 2] !== 1) {
//       steps++
//       i = i + 2
//     } else {
//       steps++
//       i++
//     }
//   }
//   return steps
// }

// console.log(jumpingOnClouds([0, 0, 1, 0, 0, 1, 0, 0]))

// function countingValleys(n, s) {
//   const answer = s.split("").reduce(
//     (v, d) => {
//       if (d === "U") {
//         v[0]++
//       } else {
//         v[0]--
//         if (v[0] === -1) {
//           v[1]++
//         }
//       }
//       return v
//     },
//     [0, 0],
//   )

//   console.log("answer", answer[1])
// }

// countingValleys(8, "UDDDUDUU")

// function sockMerchant(n, socks) {
//   const answer = Object.values(
//     socks.reduce((allSocks, sock) => {
//       if (sock in allSocks) {
//         allSocks[sock]++
//       } else {
//         allSocks[sock] = 1
//       }
//       return allSocks
//     }, {}),
//   ).reduce((acc, num) => {
//     if (num > 1) {
//       return acc + Math.floor(num / 2)
//     }
//     return acc
//   }, 0)

//   console.log("answer", answer)
//   return answer
// }

// sockMerchant(9, [10, 20, 20, 10, 10, 30, 50, 10, 20])

// console.log((5 / 2).toFixed(0))

// import {gql} from "apollo-boost"
// export {gql}
// export * from "./client"

// const f = s => {
//   let str = ""
//   if (s) {
//     return `f${s}`
//   }
//   return (z = s2 => {
//     str += "o"
//     if (s2) {
//       return `f${str}${s2}`
//     }
//     return z
//   })
// }

// const g = f()()
// const h = g()()
// console.log(g("l") + " " + h("l"))

// let arr = [[1, 2], "__", 4, -1, 6543, [1, 4]]

// arr = [].concat.apply([], arr)

// console.log("arr", arr)

// const m = {}
// const answer = []
// arr.forEach(a => (m[a] = ((m[a] && m[a]) || 0) + 1))
// Object.entries(m)
//   .sort((a, b) => {
//     if (a[1] === b[1]) return 0
//     return a[1] > b[1] ? 1 : -1
//   })
//   .forEach(m => {
//     for (let i = 0; i < m[1]; i++) {
//       if (m[0] > 0) {
//         answer.push(Number.parseInt(m[0]))
//       }
//     }
//   })

// console.log("answer", answer)
