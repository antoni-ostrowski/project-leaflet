import { env } from "@/env"
import { useQuery } from "@tanstack/react-query"
import { Laureate } from "backend/schemas"
import { Effect } from "effect"
import { FetchHttpClient, HttpClient } from "effect/unstable/http"

export interface LaureatesFilters {
  category?: string
  search?: string
  country?: string
}

export function useListLaureates(filters: LaureatesFilters = {}) {
  return useQuery({
    queryFn: async () => {
      const program = Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient
        const params = new URLSearchParams()
        if (filters.category) params.append("category", filters.category)
        if (filters.search) params.append("search", filters.search)
        if (filters.country) params.append("country", filters.country)
        
        const queryString = params.toString()
        const url = `${env.VITE_BACKEND_URL}/api/laureats${queryString ? `?${queryString}` : ""}`
        
        const response = yield* client.get(url)
        const json = yield* response.json
        const data: Laureate[] = json as unknown as Laureate[]
        return data
      }).pipe(Effect.provide(FetchHttpClient.layer))
      
      return await Effect.runPromise(program)
    },
    queryKey: ["laureates", filters]
  })
}