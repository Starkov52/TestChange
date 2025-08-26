
import type {Config} from 'jest';

const config: Config = {

  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  transform: { "^.+\\.ts$": "ts-jest" },   
  moduleFileExtensions: ["ts", "js"],
  collectCoverage: false,
  testMatch: ["**/__tests__/**/*.test.ts"], 
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  
};

export default config;
