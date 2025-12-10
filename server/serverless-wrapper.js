// Serverless wrapper for Express app
// This file is used when deploying to AWS Lambda via Serverless Framework
// 
// NOTE: To use this, install serverless-http:
//   cd server
//   npm install serverless-http --save

// This will only work if serverless-http is installed
// If not installed, you'll get an error - that's expected if you're not using serverless
import serverless from 'serverless-http';
import app from './index.js';

export const handler = serverless(app);

