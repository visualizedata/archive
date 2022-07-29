/* eslint-env node */
/** @type {import('jest').config} */
const config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^~/(.*)$': '<rootDir>/app/$1',
    '^vue$': 'vue',
  },
  moduleFileExtensions: ['js', 'mjs', 'vue', 'json'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  testMatch: ['./**/*.test.(mjs|js)'],
  transform: {
    '.*\\.(mjs|js)$': ['babel-jest', { configFile: './.babelrc' }],
    '.*\\.(vue)$': '@vue/vue3-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
}

export default config
