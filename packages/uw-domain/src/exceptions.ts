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
  constructor(e: Error) {
    super(e.message)
    this.error = e
    Object.setPrototypeOf(this, InternalException.prototype)
  }
}

export interface ExpressError {
  error: object
  statusCode: number
}
