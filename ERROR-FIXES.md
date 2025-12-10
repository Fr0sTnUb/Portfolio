# Common Errors and Fixes

## Error: Cannot find module 'serverless-http'

**Location**: `server/serverless-wrapper.js`

**Cause**: The serverless wrapper is optional and only needed for AWS Lambda deployment.

**Fix**: 
- If you're NOT using AWS Lambda/Serverless, you can ignore this file
- If you ARE using Serverless, install it:
  ```bash
  cd server
  npm install serverless-http --save
  ```

## Error: Cannot find module 'cross-env'

**Location**: `server/package.json` production script

**Cause**: cross-env is not installed but used in production script.

**Fix**:
```bash
cd server
npm install cross-env --save-dev
```

Or use Windows-compatible command:
```bash
# Windows PowerShell
$env:NODE_ENV="production"; node index.js
```

## Error: Port 3000 already in use

**Cause**: Another process is using port 3000.

**Fix**:
- Stop the other process
- Or change port in `server/.env`:
  ```
  PORT=3001
  ```

## Error: API connection failed

**Cause**: Backend server is not running.

**Fix**:
1. Start the backend: `npm run server:dev`
2. Or run both: `npm run dev:full`
3. Check backend is running: http://localhost:3000/api/health

## Error: Module not found in frontend

**Cause**: Missing dependencies or import path issue.

**Fix**:
```bash
npm install
```

## Error: CORS error in browser

**Cause**: Backend CORS not configured for frontend URL.

**Fix**: Update `server/.env`:
```
CORS_ORIGIN=http://localhost:5173
```

## Testing the Setup

Run this to check for errors:
```bash
node test-setup.js
```

## Getting Help

If you encounter an error:
1. Check the error message carefully
2. Check if the required service is running
3. Verify all dependencies are installed
4. Check environment variables are set correctly

