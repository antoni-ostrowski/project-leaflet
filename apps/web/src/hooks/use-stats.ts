import { env } from "@/env"
import { useQuery } from "@tanstack/react-query"
import { Effect } from "effect"
import { FetchHttpClient, HttpClient } from "effect/unstable/http"

interface CategoryStat {
  category: string
  count: number
}

interface CountryStat {
  _id: string
  itemCount: number
  countryCode: string
}

interface YearStat {
  _id: string
  itemCount: number
}

export function useCategoryStats() {
  return useQuery({
    queryKey: ["stats", "categories"],
    queryFn: async () => {
      const program = Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient
        const response = yield* client.get(`${env.VITE_BACKEND_URL}/api/stats/categories`)
        const json = yield* response.json
        return json as unknown as CategoryStat[]
      }).pipe(Effect.provide(FetchHttpClient.layer))
      return await Effect.runPromise(program)
    }
  })
}

export function useCountryStats() {
  return useQuery({
    queryKey: ["stats", "countries"],
    queryFn: async () => {
      const program = Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient
        const response = yield* client.get(`${env.VITE_BACKEND_URL}/api/stats/countries`)
        const json = yield* response.json
        return json as unknown as CountryStat[]
      }).pipe(Effect.provide(FetchHttpClient.layer))
      return await Effect.runPromise(program)
    }
  })
}

export function useYearStats() {
  return useQuery({
    queryKey: ["stats", "years"],
    queryFn: async () => {
      const program = Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient
        const response = yield* client.get(`${env.VITE_BACKEND_URL}/api/stats/years`)
        const json = yield* response.json
        return json as unknown as YearStat[]
      }).pipe(Effect.provide(FetchHttpClient.layer))
      return await Effect.runPromise(program)
    }
  })
}