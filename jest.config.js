module.exports = {
  roots: ['<rootDir>/__test__/'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: { '\\.tsx?$': 'ts-jest' },
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/__test__/tsconfig.json',
      isolatedModules: true,
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!<rootDir>/src/utils/devLog.ts'],
  coverageDirectory: '<rootDir>/coverage/',
}
