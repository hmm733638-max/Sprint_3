module.exports = {
  preset: 'jest-expo',

  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
    '**/?(*.)+(spec|test).ts',
    '**/?(*.)+(spec|test).tsx',
  ],

  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

  coverageDirectory: 'coverage',

  clearMocks: true,

  restoreMocks: true,
};
