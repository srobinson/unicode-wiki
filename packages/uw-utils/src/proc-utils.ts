// tslint:disable:no-any no-invalid-this

export const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function debounce<F extends Function>(func: F, wait: number): F {
  let timeoutID: number

  if (!Number.isInteger(wait)) {
    console.log("Called debounce without a valid number")
    wait = 300
  }

  // conversion through any necessary as it wont satisfy criteria otherwise
  return <F>(<any>function(this: any, ...args: any[]) {
    clearTimeout(timeoutID)
    const context = this

    timeoutID = window.setTimeout(function() {
      func.apply(context, args)
    }, wait)
  })
}
