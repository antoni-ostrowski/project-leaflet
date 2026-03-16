import { env } from "@/env"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Laureate } from "backend/schemas"
import { Effect } from "effect"
import { FetchHttpClient, HttpClient } from "effect/unstable/http"

export interface LaureatesFilters {
  category?: string
  search?: string
  country?: string
}

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasMore: boolean
}

interface LaureatesResponse {
  data: Laureate[]
  pagination: PaginationInfo
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
        const result = json as unknown as LaureatesResponse
        return result.data
      }).pipe(Effect.provide(FetchHttpClient.layer))

      return await Effect.runPromise(program)
    },
    queryKey: ["laureates", filters]
  })
}

const PAGE_SIZE = 50

export function useListLaureatesInfinite(filters: LaureatesFilters = {}) {
  return useInfiniteQuery({
    queryKey: ["laureates", "infinite", filters, PAGE_SIZE],
    queryFn: async ({ pageParam = 1 }) => {
      const program = Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient
        const params = new URLSearchParams()
        if (filters.category) params.append("category", filters.category)
        if (filters.search) params.append("search", filters.search)
        if (filters.country) params.append("country", filters.country)
        params.append("page", String(pageParam))
        params.append("limit", String(PAGE_SIZE))

        const url = `${env.VITE_BACKEND_URL}/api/laureats?${params.toString()}`

        const response = yield* client.get(url)
        const json = yield* response.json
        return json as unknown as LaureatesResponse
      }).pipe(Effect.provide(FetchHttpClient.layer))

      return await Effect.runPromise(program)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1
      }
      return undefined
    }
  })
}