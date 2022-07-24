module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/src/spec/__setup__/test-setup.ts']
}
