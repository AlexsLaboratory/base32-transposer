import type { JestConfigWithTsJest } from "ts-jest";
const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: ["default", "jest-teamcity"]
}

export default config;