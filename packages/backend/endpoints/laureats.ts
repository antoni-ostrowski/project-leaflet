import { Effect, Schema } from "effect"
import { Router } from "express"

import { nobels } from ".."
import { effectifyPromise } from "../utils"

const router = Router()

const laureatsListSchema = Schema.Struct({
  category: Schema.optional(Schema.String),
  year: Schema.optional(Schema.NumberFromString),
  country: Schema.optional(Schema.String),
  search: Schema.optional(Schema.String)
})

router.get("/", async (req, res) => {
  const program = Effect.gen(function* () {
    const searchParams = yield* Schema.decodeUnknownEffect(laureatsListSchema)(req.query)

    const query: Record<string, unknown> = {}

    if (searchParams.category) {
      query["prizes.category"] = { $regex: searchParams.category, $options: "i" }
    }

    if (searchParams.year) {
      query["prizes.year"] = searchParams.year
    }

    if (searchParams.country) {
      query["bornCountryCode"] = searchParams.country.toUpperCase()
    }

    if (searchParams.search) {
      query.$or = [
        { firstname: { $regex: searchParams.search, $options: "i" } },
        { surname: { $regex: searchParams.search, $options: "i" } }
      ]
    }

    yield* Effect.logInfo({ searchParams, query })

    const laureates = yield* effectifyPromise(() => nobels.find(query).toArray())

    return laureates
  })

  const result = await Effect.runPromise(program)
  res.json(result)
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  const program = Effect.gen(function* () {
    const query = { id: id }
    const nobel = yield* effectifyPromise(() => nobels.findOne(query))
    if (!nobel) {
      res.status(404).json("lauratee not found")
    }
    return nobel
  })

  res.send(await Effect.runPromise(program))
})

export const laureatsRouter = router
