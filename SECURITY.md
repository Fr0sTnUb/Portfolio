# Security Checklist for Public Repository

## ✅ Protected Files (in .gitignore)
These files should NEVER be committed to git:

- `server/.env` - Contains sensitive credentials (SMTP passwords, API keys)
- `server/messages.json` - Contains user-submitted contact form data
- All `.env` files in any location
- `node_modules/` - Dependencies (too large anyway)

## 🔒 Sensitive Information to Keep Private

### Environment Variables (server/.env)
- `SMTP_USER` - Your email address
- `SMTP_PASS` - Your email app password (⚠️ VERY SENSITIVE)
- `CONTACT_EMAIL` - Your contact email
- `MESSAGES_PASSWORD` - Password for messages API endpoint
- `CORS_ORIGIN` - Allowed origins (can be public but good to protect)

### Never Commit:
- ❌ Actual passwords or API keys
- ❌ Real email addresses in code (use environment variables)
- ❌ Contact form submissions (messages.json)
- ❌ Production database credentials
- ❌ AWS access keys or secrets
- ❌ OAuth client secrets
- ❌ SSL certificates or private keys

## ✅ Safe to Commit

These are fine to keep public:
- ✅ Code files (.js, .jsx, .css, etc.)
- ✅ Configuration files (package.json, vite.config.js)
- ✅ README files and documentation
- ✅ `.env.example` files (template without real values)
- ✅ Public assets (images, fonts)

## 🔍 Before Pushing to GitHub

1. **Check what you're committing:**
   ```bash
   git status
   ```

2. **Verify sensitive files are ignored:**
   ```bash
   git check-ignore server/.env server/messages.json
   ```

3. **Review your changes:**
   ```bash
   git diff
   ```

4. **If you accidentally committed secrets:**
   - See: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository

## 📝 Current Status

✅ `.gitignore` properly configured
✅ No hardcoded secrets in code (all use `process.env`)
✅ `.env` file exists locally but is ignored
✅ `messages.json` exists locally but is ignored

## ⚠️ If Secrets Were Previously Committed

If you ever committed `.env` or secrets before:

1. **Remove from git history:**
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch server/.env" \
     --prune-empty --tag-name-filter cat -- --all
   ```

2. **Force push (⚠️ WARNING: This rewrites history):**
   ```bash
   git push origin --force --all
   ```

3. **Rotate all exposed secrets** (change passwords, regenerate API keys)

## 🛡️ Best Practices

1. Always use environment variables for secrets
2. Use `.env.example` as a template (committed, without real values)
3. Review `git status` before every commit
4. Use GitHub Secrets for CI/CD pipelines
5. Regularly audit what's in your repository

