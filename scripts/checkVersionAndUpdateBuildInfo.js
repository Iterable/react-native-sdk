/**
 * Pre-commit script that checks if package.json version has changed
 * and updates build info if necessary
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '../package.json');
const buildInfoPath = path.join(__dirname, '../src/itblBuildInfo.ts');

// Read current package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Read current build info file
let buildInfoVersion = null;
if (fs.existsSync(buildInfoPath)) {
  const buildInfoContent = fs.readFileSync(buildInfoPath, 'utf8');
  const versionMatch = buildInfoContent.match(/version:\s*['"`]([^'"`]+)['"`]/);
  if (versionMatch) {
    buildInfoVersion = versionMatch[1];
  }
}

console.log(`Current package.json version: ${currentVersion}`);
console.log(`Current build info version: ${buildInfoVersion}`);

// Check if versions are different
if (currentVersion !== buildInfoVersion) {
  console.log('Version mismatch detected. Updating build info...');

  try {
    // Run the build info update
    execSync('yarn add_build_info', { stdio: 'inherit' });

    // Check if the file was actually modified
    const gitStatus = execSync('git status --porcelain src/itblBuildInfo.ts', { encoding: 'utf8' });

    if (gitStatus.trim()) {
      console.log('Build info file was updated. Adding to commit...');
      execSync('git add src/itblBuildInfo.ts', { stdio: 'inherit' });
      console.log('Build info file has been staged for commit.');
    } else {
      console.log('Build info file was not modified.');
    }
  } catch (error) {
    console.error('Error updating build info:', error.message);
    process.exit(1);
  }
} else {
  console.log('Version is up to date. No build info update needed.');
}
