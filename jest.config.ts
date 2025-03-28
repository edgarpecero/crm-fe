import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
};

export default config;

// babel.config.js
// module.exports = {
//   presets: [
//     'next/babel',
//     '@babel/preset-env',
//     "@babel/preset-typescript",
//     ['@babel/preset-react', {runtime: 'automatic'}],
//   ],
// };