// Quick test script to verify setup
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking Portfolio Setup...\n');

// Check if server files exist
const checks = [
  { name: 'Backend server', path: 'server/index.js', required: true },
  { name: 'Backend package.json', path: 'server/package.json', required: true },
  { name: 'API service', path: 'src/services/api.js', required: true },
  { name: 'API config', path: 'src/config/api.js', required: true },
  { name: 'Vite config', path: 'vite.config.js', required: true },
  { name: 'Amplify config', path: 'amplify.yml', required: false },
  { name: 'Deployment guide', path: 'DEPLOYMENT.md', required: false },
];

let allGood = true;

checks.forEach(check => {
  try {
    readFileSync(join(__dirname, check.path));
    console.log(`✅ ${check.name}`);
  } catch (error) {
    if (check.required) {
      console.log(`❌ ${check.name} - MISSING!`);
      allGood = false;
    } else {
      console.log(`⚠️  ${check.name} - Optional, not found`);
    }
  }
});

console.log('\n📦 Checking dependencies...');

try {
  const serverPkg = JSON.parse(readFileSync(join(__dirname, 'server/package.json')));
  const requiredDeps = ['express', 'cors', 'dotenv'];
  const missingDeps = requiredDeps.filter(dep => !serverPkg.dependencies?.[dep]);
  
  if (missingDeps.length > 0) {
    console.log(`❌ Missing server dependencies: ${missingDeps.join(', ')}`);
    console.log('   Run: cd server && npm install');
    allGood = false;
  } else {
    console.log('✅ Server dependencies OK');
  }
} catch (error) {
  console.log('⚠️  Could not check server dependencies');
}

try {
  const frontendPkg = JSON.parse(readFileSync(join(__dirname, 'package.json')));
  if (!frontendPkg.devDependencies?.concurrently) {
    console.log('⚠️  concurrently not installed (needed for dev:full script)');
    console.log('   Run: npm install');
  } else {
    console.log('✅ Frontend dependencies OK');
  }
} catch (error) {
  console.log('⚠️  Could not check frontend dependencies');
}

console.log('\n' + (allGood ? '✅ Setup looks good!' : '❌ Some issues found. Please fix them.'));
console.log('\n📚 Next steps:');
console.log('   1. Test locally: npm run dev:full');
console.log('   2. Read: QUICK-START.md');
console.log('   3. Deploy: Follow DEPLOYMENT.md\n');

