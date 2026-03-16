import { Data, Effect, Option, pipe, Schema, SchemaTransformation } from "effect"

/**
 * Creates an Effect from a Promise, handling errors and logging.
 *
 * @template A - The success type of the promise.
 * @template E - The custom error type to throw on promise rejection.
 * @template R - The context/environment required by the promise factory (if any).
 * @param {() => Promise<A>} promiseFactory - A function that returns the Promise to be wrapped.
 * @param {(cause: unknown, message: string) => E} errorFactory - A function to map the unknown promise rejection cause to your specific error type E.
 * @param {string} [errorMessage] - An optional custom error message. Defaults to "Promise failed".
 * @returns {Effect.Effect<A, E, R>} An Effect that resolves to the promise's success value, or your custom error E.
 */
export function effectifyPromise<A, E, R = never>(
  promiseFactory: () => Promise<A>,
  errorFactory: (obj: { cause: unknown; message: string }) => E = (a) => new ServerError(a) as E,
  errorMessage: string = "Promise failed"
): Effect.Effect<A, E, R> {
  return pipe(
    Effect.tryPromise({
      try: promiseFactory,
      catch: (cause) => errorFactory({ cause, message: errorMessage })
    }),
    Effect.tapError((error) => Effect.logError("Effectified Promise Error:", errorMessage, error))
  )
}

export class ServerError extends Data.TaggedError("ServerError")<{
  message?: string
  cause?: unknown
}> {
  constructor(args?: { message?: string; cause?: unknown }) {
    super({
      message: args?.message ?? "Server error",
      cause: args?.cause
    })
  }
}

export const LaureateSchema = Schema.Struct({
  _id: Schema.String,
  id: Schema.NumberFromString,
  firstname: Schema.String,
  surname: Schema.String,

  // Built-in DateTime transformations
  born: Schema.DateTimeUtcFromString,
  died: Schema.OptionFromNullOr(Schema.DateTimeUtcFromString),

  bornCountry: Schema.String,
  bornCountryCode: Schema.String,
  bornCity: Schema.String,

  diedCountry: Schema.OptionFromNullOr(Schema.String),
  diedCountryCode: Schema.OptionFromNullOr(Schema.String),

  gender: Schema.Union([Schema.Literal("male"), Schema.Literal("female")]),
  prizes: Schema.Array(
    Schema.Struct({
      year: Schema.NumberFromString,
      category: Schema.String,
      share: Schema.NumberFromString,
      motivation: Schema.String,
      affiliations: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          city: Schema.String,
          country: Schema.String
        })
      )
    })
  )
})
export type Laureate = typeof LaureateSchema.Type
