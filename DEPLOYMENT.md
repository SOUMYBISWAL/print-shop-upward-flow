# Deployment Guide for PrintLite

## AWS Amplify Deployment

### 1. Build Configuration

The project is configured with the correct build settings in `amplify.yml`:

- **Build command**: `npm run build`
- **Build output directory**: `dist/public`
- **Node.js version**: Use Node.js 18 or higher

### 2. Environment Variables

For production deployment, you may need these environment variables:

```bash
NODE_ENV=production
# Add any other environment variables your app needs
```

### 3. Rewrite Rules for SPA

The project includes rewrite rules to handle client-side routing:

- `client/public/_redirects` - For Netlify-style deployments
- `client/public/.htaccess` - For Apache servers
- `amplify.yml` - Contains the build configuration

### 4. AWS Amplify Console Setup

1. In AWS Amplify Console, connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist/public`
   - Node.js version: 18 or higher
3. Add environment variables if needed
4. Deploy!

### 5. Troubleshooting 404 Errors

If you get 404 errors on routes like `/upload` or `/cart`:

1. **Check baseDirectory**: Ensure it's set to `dist/public` in amplify.yml
2. **Verify rewrite rules**: Make sure the `_redirects` file is in `client/public/`
3. **Clear cache**: Sometimes you need to clear CloudFront cache
4. **Check build output**: Ensure `index.html` exists in `dist/public/`

### 6. Build Process

The build process:
1. Runs `npm ci` to install dependencies
2. Runs `npm run build` which:
   - Builds the frontend with Vite to `dist/public`
   - Builds the backend with esbuild to `dist/index.js`
3. Serves static files from `dist/public`

### 7. Platform-Specific Notes

- **AWS Amplify**: Use the provided `amplify.yml`
- **Netlify**: The `_redirects` file will handle routing
- **Vercel**: Add a `vercel.json` with rewrite rules if needed
- **GitHub Pages**: May need additional configuration for SPAs

## Local Development

Run locally with:
```bash
npm run dev
```

This starts both the frontend (Vite) and backend (Express) servers.