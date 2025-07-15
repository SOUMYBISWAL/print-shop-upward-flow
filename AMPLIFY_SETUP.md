# AWS Amplify Setup Guide for PrintLite

This guide will help you set up AWS Amplify backend for your PrintLite application.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI installed and configured
3. Node.js and npm installed

## Step 1: Install Amplify CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
```

## Step 2: Initialize Amplify Project

```bash
amplify init
```

Choose the following options:
- Project name: printlite
- Environment name: dev
- Default editor: Visual Studio Code
- App type: javascript
- Framework: react
- Source directory: client/src
- Build directory: dist
- Build command: npm run build
- Start command: npm run dev

## Step 3: Add Storage (S3)

```bash
amplify add storage
```

Choose:
- Content (Images, audio, video, etc.)
- Provide a friendly name: printliteStorage
- Provide bucket name: printlite-files-bucket
- Who should have access: Auth and guest users
- What kind of access for Auth users: Create/update, read, delete
- What kind of access for guest users: Create/update, read, delete

## Step 4: Add Authentication (Optional)

```bash
amplify add auth
```

Choose:
- Default configuration
- Username
- No advanced settings

## Step 5: Deploy Backend

```bash
amplify push
```

## Step 6: Configure Environment Variables

After deployment, Amplify will generate configuration. Copy the values to your `.env` file:

```env
VITE_AWS_REGION=us-east-1
VITE_AWS_S3_BUCKET=printlite-files-bucket-dev
VITE_AWS_IDENTITY_POOL_ID=us-east-1:your-identity-pool-id
VITE_AWS_USER_POOL_ID=us-east-1_your-user-pool-id
VITE_AWS_USER_POOL_WEB_CLIENT_ID=your-web-client-id
```

## Step 7: Test File Upload

1. Start your application: `npm run dev`
2. Go to the upload page
3. Upload a test file
4. Check your S3 bucket to confirm the file was uploaded

## File Structure in S3

Files will be organized as:
```
orders/
  ├── temp-{timestamp}/
  │   ├── {timestamp}-filename1.pdf
  │   └── {timestamp}-filename2.pdf
  └── ORD-{orderid}/
      ├── {timestamp}-filename1.pdf
      └── {timestamp}-filename2.pdf
```

## Security Notes

1. Files are uploaded with guest access level
2. URLs are pre-signed and expire after 1 hour
3. File keys include timestamps to prevent conflicts
4. Orders are organized by folders for easy management

## Troubleshooting

1. **Authentication errors**: Ensure your Identity Pool allows guest access
2. **File upload fails**: Check bucket permissions and CORS settings
3. **Environment variables not working**: Ensure they start with `VITE_`
4. **Build errors**: Make sure all Amplify packages are installed

## Production Deployment

1. Create a production environment: `amplify env add prod`
2. Deploy production backend: `amplify push`
3. Update environment variables for production
4. Set up CI/CD pipeline for automated deployments

## Cost Considerations

- S3 storage costs depend on file size and retention
- Free tier includes 5GB of storage
- Consider lifecycle policies for old files
- Monitor usage in AWS Cost Explorer