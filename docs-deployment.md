# Documentation Deployment Setup

This document explains how to set up automatic documentation deployment to Netlify when merging to master or when using the "docs" label on pull requests.

## Overview

The project uses GitHub Actions to automatically build and deploy documentation to Netlify in two scenarios:

1. **Production Deployment**: When changes are merged to the master branch
2. **Preview Deployment**: When a pull request has the "docs" label

The documentation is generated using TypeDoc and includes API documentation, coverage reports, and interactive navigation.

## Deployment Triggers

### Production Deployment
- Automatically triggers on pushes to `master` or `main` branches
- Deploys to the production Netlify site
- Updates the main documentation URL

### Preview Deployment
- Triggers on pull requests with the "docs" label
- Creates a preview deployment for testing documentation changes
- Adds a comment to the PR with the preview URL
- Perfect for reviewing documentation changes before merging

## How to Use Preview Deployments

1. Create a pull request with documentation changes
2. Add the "docs" label to the pull request
3. The workflow will automatically build and deploy a preview
4. Check the PR comments for the preview URL
5. Review the changes and merge when ready

## Setup Instructions

### 1. Netlify Setup

1. Go to [Netlify](https://netlify.com) and sign in
2. Create a new site (or use an existing one)
3. Note down your **Site ID** from the site settings
4. Generate a **Personal Access Token**:
   - Go to User Settings → Applications → Personal access tokens
   - Create a new token with appropriate permissions

### 2. GitHub Secrets Configuration

Add the following secrets to your GitHub repository:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Add these repository secrets:

   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

### 3. Workflow Configuration

The deployment workflow is configured in `.github/workflows/deploy-docs.yml` and will:

- Trigger on pushes to `master` and `main` branches (production)
- Trigger on pull requests with the "docs" label (preview)
- Build documentation using `yarn docs`
- Deploy the generated docs to Netlify
- Add appropriate comments with deployment status

### 4. Netlify Configuration

The `netlify.toml` file configures:
- Publish directory (`docs`)
- Redirect rules for better navigation
- Cache headers for static assets
- Security headers

## Manual Deployment

You can manually trigger documentation deployment by:

1. Going to Actions tab in your GitHub repository
2. Selecting "Deploy Documentation to Netlify" workflow
3. Clicking "Run workflow"

## Local Documentation Development

To build documentation locally:

```bash
# Install dependencies
yarn install

# Generate documentation
yarn docs

# View documentation (served from ./docs directory)
# You can use any static file server, for example:
npx serve docs
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are installed and TypeDoc configuration is correct
2. **Deployment fails**: Verify Netlify secrets are correctly set in GitHub repository settings
3. **Missing documentation**: Ensure TypeDoc is properly configured in `typedoc.config.mjs`
4. **Preview not deploying**: Make sure the "docs" label is added to the pull request

### Checking Deployment Status

- View deployment logs in GitHub Actions
- Check Netlify dashboard for deployment status
- Review commit/PR comments for deployment notifications

## Documentation Structure

The generated documentation includes:
- API reference for all exported functions and classes
- Type definitions and interfaces
- Coverage reports (if configured)
- Interactive navigation and search
- External links to React documentation
