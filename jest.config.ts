export default {
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },

  testMatch: ['**/*.spec.ts'],

  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
