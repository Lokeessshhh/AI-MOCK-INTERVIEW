import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
  url: "postgresql://neondb_owner:npg_Bk9RY5gGMZlj@ep-raspy-pond-a5f0khl0-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  }
});
