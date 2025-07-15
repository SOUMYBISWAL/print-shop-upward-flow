import { Amplify } from 'aws-amplify';

export const amplifyConfig = {
  Auth: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_AWS_USER_POOL_WEB_CLIENT_ID,
  },
  Storage: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    bucket: import.meta.env.VITE_AWS_S3_BUCKET,
    identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID,
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_AWS_GRAPHQL_ENDPOINT,
      region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
};

export const configureAmplify = () => {
  // Only configure if we have the required environment variables
  if (import.meta.env.VITE_AWS_S3_BUCKET && import.meta.env.VITE_AWS_IDENTITY_POOL_ID) {
    Amplify.configure(amplifyConfig);
  }
};