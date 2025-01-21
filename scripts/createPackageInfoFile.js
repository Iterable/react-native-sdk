/**
 * This script creates a build info file for safe reading of package.json, no
 * matter the file structure
 */
const packageJS = require('../package.json');
const path = require('path');
const fs = require('node:fs');

const filePath = path.join(__dirname, '../src/itblBuildInfo.ts');

const content = `export const buildInfo = {
  version: '${packageJS.version}',
};
`;

const createPackageInfoFile = () => {
  console.log('CREATING PACKAGE INFO FILE');
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      console.log('DONE');
      if (err) {
        console.error(err);
        reject(err);
      } else {
        // file written successfully
        resolve();
      }
    });
  });
};

module.exports = { createPackageInfoFile };

// try {
//   fs.writeFileSync(filePath, content);
//   // file written successfully
// } catch (err) {
//   console.error(err);
// }
