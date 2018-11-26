// tslint:disable:no-any
abstract class DomainError extends Error {
  public message: string
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

type ResourceNotFoundMeta = {
  resource: string
  query?: object
}

export class ResourceNotFoundException extends DomainError {
  meta: ResourceNotFoundMeta
  constructor(resource: string, query?: object) {
    super(`Resource ${resource} was not found.`)
    this.meta = {resource, query}
    Object.setPrototypeOf(this, ResourceNotFoundException.prototype)
  }
}

export class ApiException extends DomainError {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, ApiException.prototype)
  }
}

export class InternalException extends DomainError {
  error: Error
  requestId?: string
  constructor(error: Error) {
    super(error.message)
    this.error = jsonifyError(error)
    Object.setPrototypeOf(this, InternalException.prototype)
  }
}

export interface ExpressError {
  error: object
  statusCode: number
}

export const jsonifyError = (value: any) => {
  try {
    if (typeof value === "object") {
      return destroyCircular(value, [])
    }
    if (typeof value === "function") {
      // JSON.stringify discards functions. We do too, unless a function is thrown directly.
      return `[Function: ${value.name || "anonymous"}]`
    }
  } catch (e) {
    console.log(e)
  }

  return value
}

const destroyCircular = (from: any, seen: any[]) => {
  const to = Array.isArray(from) ? [] : {}

  seen.push(from)

  for (const key of Object.keys(from)) {
    const value = from[key]

    if (typeof value === "function") {
      continue
    }

    if (!value || typeof value !== "object") {
      to[key] = value
      continue
    }

    if (!seen.includes(from[key])) {
      to[key] = destroyCircular(from[key], seen.slice())
      continue
    }

    to[key] = "[Circular]"
  }

  const commonProperties = ["name", "message", "stack", "code"]

  for (const property of commonProperties) {
    if (typeof from[property] === "string") {
      to[property] = from[property]
    }
  }

  return to
}
