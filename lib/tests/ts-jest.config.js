const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const cwd = process.cwd();

function projPath(...args) {
  return path.join(cwd, ...args);
}

function toolPath(...args) {
  return path.join(__dirname, '..', ...args);
}

const transformPath = toolPath('../scripts/jestPreprocessor.js');

const componentSetupFiles = [
  './tests/setup.ts', // User setup ts file
  './tests/setup.js', // User setup js file
].filter(subPath => {
  const filePath = projPath(subPath);
  if (fs.existsSync(filePath)) {
    console.log(
      chalk.yellow('Test setup file:'),
      filePath
    );
    return true;
  }
  return false;
});

module.exports = {
  verbose: true,
  rootDir: cwd,
  setupFiles: [
    toolPath('./tests/setup.js'), // tools setup
    ...componentSetupFiles,
  ],
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node'],
  modulePathIgnorePatterns: ['/examples/'],
  moduleFileExtensions: [
    'js', 'jsx',
    'ts', 'tsx',
  ],
  
  testMatch: [
    '**/tests/**/*.spec.js?(x)',
    '**/tests/**/*.spec.ts?(x)',
  ],
  transform: {
    '\\.jsx?$': transformPath,
    '\\.tsx?$': transformPath,
  },
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  transformIgnorePatterns: [
    '/examples/',
    '/build/',
    'node_modules/[^/]+?/(?!(es|node_modules)/)'
  ],
  collectCoverageFrom: [
    '**/src/**.{js,jsx,ts,tsx}',
    "!**/node_modules/**",
  ],
};