import { createEnv } from "@t3-oss/env-core"
import { Schema } from "effect"

export const env = createEnv({
  clientPrefix: "VITE_",

  client: {
    VITE_FLAG_BASE_URL: Schema.toStandardSchemaV1(Schema.String),
    VITE_BACKEND_URL: Schema.toStandardSchemaV1(Schema.String)
  },

  runtimeEnv: {
    ...process.env,
    ...import.meta.env
  },

  emptyStringAsUndefined: true
})
