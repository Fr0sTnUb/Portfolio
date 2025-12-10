// Error diagnostic script
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking for common errors...\n');

const errors = [];

// Check 1: Server dependencies
console.log('1. Checking server dependencies...');
try {
  const serverPkg = JSON.parse(readFileSync(join(__dirname, 'server/package.json')));
  const required = ['express', 'cors', 'dotenv'];
  const missing = required.filter(dep => !serverPkg.dependencies?.[dep]);
  if (missing.length > 0) {
    errors.push(`❌ Missing server dependencies: ${missing.join(', ')}`);
    console.log(`   Fix: cd server && npm install`);
  } else {
    console.log('   ✅ Server dependencies OK');
  }
} catch (e) {
  errors.push(`❌ Cannot read server/package.json: ${e.message}`);
}

// Check 2: Frontend dependencies
console.log('\n2. Checking frontend dependencies...');
try {
  const frontendPkg = JSON.parse(readFileSync(join(__dirname, 'package.json')));
  if (!frontendPkg.devDependencies?.concurrently) {
    errors.push('⚠️  concurrently not installed (needed for dev:full)');
    console.log('   Fix: npm install');
  } else {
    console.log('   ✅ Frontend dependencies OK');
  }
} catch (e) {
  errors.push(`❌ Cannot read package.json: ${e.message}`);
}

// Check 3: Serverless wrapper (optional)
console.log('\n3. Checking serverless wrapper (optional)...');
try {
  const wrapperExists = existsSync(join(__dirname, 'server/serverless-wrapper.js'));
  if (wrapperExists) {
    // Try to check if serverless-http would be available
    const serverPkg = JSON.parse(readFileSync(join(__dirname, 'server/package.json')));
    if (!serverPkg.dependencies?.['serverless-http']) {
      console.log('   ⚠️  serverless-http not installed (only needed for AWS Lambda)');
      console.log('   This is OK if you\'re not using serverless deployment');
    } else {
      console.log('   ✅ Serverless wrapper OK');
    }
  }
} catch (e) {
  console.log('   ⚠️  Could not check serverless wrapper');
}

// Check 4: API files
console.log('\n4. Checking API integration files...');
const apiFiles = [
  'src/services/api.js',
  'src/config/api.js',
  'server/index.js'
];

apiFiles.forEach(file => {
  if (existsSync(join(__dirname, file))) {
    console.log(`   ✅ ${file}`);
  } else {
    errors.push(`❌ Missing: ${file}`);
  }
});

// Check 5: Import statements
console.log('\n5. Checking import statements...');
try {
  const heroFile = readFileSync(join(__dirname, 'src/components/Hero.jsx'), 'utf-8');
  if (heroFile.includes("import apiService")) {
    console.log('   ✅ Hero.jsx imports API service');
  } else {
    errors.push('❌ Hero.jsx missing API service import');
  }
  
  const connectFile = readFileSync(join(__dirname, 'src/components/Connect.jsx'), 'utf-8');
  if (connectFile.includes("import apiService")) {
    console.log('   ✅ Connect.jsx imports API service');
  } else {
    errors.push('❌ Connect.jsx missing API service import');
  }
} catch (e) {
  errors.push(`❌ Error checking imports: ${e.message}`);
}

// Summary
console.log('\n' + '='.repeat(50));
if (errors.length === 0) {
  console.log('✅ No critical errors found!');
  console.log('\nTo test: npm run dev:full');
} else {
  console.log('❌ Found errors:');
  errors.forEach(err => console.log(`   ${err}`));
  console.log('\nPlease fix these errors before proceeding.');
}
console.log('='.repeat(50));

