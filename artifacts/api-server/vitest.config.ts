import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Run test files alongside source — no separate __tests__ dir needed
    include: ["src/**/*.test.ts"],
  },
});
