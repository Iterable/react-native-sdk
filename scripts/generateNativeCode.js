const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Generate native code
console.log('Generating native code...');
execSync('npx react-native codegen', {
  cwd: rootDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    RCT_NEW_ARCH_ENABLED: '1',
  },
});
