/**
 * This script creates a build info file for safe reading of package.json, no
 * matter the file structure
 */
const packageJS = require('../package.json');
const path = require('path');
const fs = require('node:fs');

const filePath = path.join(__dirname, '../src/itblBuildInfo.ts');

const content = `/**
 * This file is generated by scripts/createPackageInfoFile.js
 * It contains the version of the package
 */
export const buildInfo = {
  version: '${packageJS.version}',
};
`;

const createPackageInfoFile = () => {
  console.log('Creating `itblBuildInfo.ts`');
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log('Finished creating `itblBuildInfo.ts`');
        // file written successfully
        resolve();
      }
    });
  });
};

module.exports = { createPackageInfoFile };
