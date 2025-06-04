const fs = require('fs');
const path = require('path');

const architecture = process.argv[2];

if (!architecture || !['old', 'new'].includes(architecture)) {
  console.error('Please specify architecture: old or new');
  process.exit(1);
}

// Update package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);
packageJson.newArchEnabled = architecture === 'new';
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Update Android gradle.properties
const gradlePropertiesPath = path.join(
  __dirname,
  'android',
  'gradle.properties'
);
let gradleProperties = fs.readFileSync(gradlePropertiesPath, 'utf8');
gradleProperties = gradleProperties.replace(
  /newArchEnabled=.*/,
  `newArchEnabled=${architecture === 'new'}`
);
fs.writeFileSync(gradlePropertiesPath, gradleProperties);

console.log(`Switched to ${architecture} architecture configuration`);
console.log('Please run the following commands to rebuild:');
console.log('1. yarn clean');
console.log(`2. yarn build:${architecture}-arch`);
