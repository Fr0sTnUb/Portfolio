# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. "Cannot find module" or "UNMET DEPENDENCY" Error

**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
```

If that doesn't work, try:
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

### 2. Lenis Import Error

**Error:** `Cannot find module 'lenis'` or `'lenis' is not defined`

**Solution:**
Make sure Lenis is installed:
```bash
npm install lenis
```

If still failing, check `src/hooks/useLenis.js` has:
```javascript
import Lenis from 'lenis'
```

---

### 3. GSAP ScrollTrigger Not Working

**Error:** Cards not stacking or animations broken

**Solutions:**

a) Make sure GSAP is properly installed:
```bash
npm install gsap
```

b) Check `src/components/Skills.jsx` imports:
```javascript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
```

c) Clear browser cache and hard refresh (Ctrl+Shift+R)

---

### 4. Smooth Scrolling Not Working

**Problem:** Scroll feels normal, not smooth

**Possible Causes:**

a) **Lenis not initialized** - Check browser console for errors

b) **CSS conflict** - Make sure `styles.css` has:
```css
html {
  /* scroll-behavior: smooth; */ /* Should be commented */
}

html.lenis {
  height: auto;
}
```

c) **Browser Extension** - Try disabling extensions or test in incognito mode

---

### 5. Port 5173 Already in Use

**Error:** `Port 5173 is in use`

**Solution:**
```bash
# Kill the process using the port (Windows)
npx kill-port 5173

# Or specify a different port
npm run dev -- --port 3000
```

---

### 6. React Hooks Error

**Error:** "Rendered more hooks than during the previous render"

**Solution:**
This usually means conditional hooks. Check that all `useEffect`, `useState` etc. are called in the same order every render.

Make sure you're not calling hooks inside conditions:
```javascript
// ❌ BAD
if (someCondition) {
  useEffect(() => {}, [])
}

// ✅ GOOD
useEffect(() => {
  if (someCondition) {
    // logic here
  }
}, [])
```

---

### 7. CORS or Module Resolution Errors

**Error:** Module resolution failed or CORS error

**Solution:**

a) Check `vite.config.js` exists and has:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

b) Restart the dev server:
```bash
# Stop the server (Ctrl+C)
# Start again
npm run dev
```

---

### 8. CSS Not Loading

**Problem:** No styles visible

**Solutions:**

a) Make sure `src/styles.css` exists

b) Check `src/main.jsx` imports it:
```javascript
import './styles.css'
```

c) Clear browser cache

---

### 9. Build Fails

**Error:** Build command fails

**Solutions:**

a) Check for TypeScript errors (even though we're using .jsx)
```bash
npm run build
```

b) Look for console.log or import errors in the output

c) Try cleaning and rebuilding:
```bash
rm -rf dist node_modules
npm install
npm run build
```

---

### 10. Skills Cards Not Appearing

**Problem:** Skills section is blank or cards don't show

**Solutions:**

a) Open browser console (F12) - check for errors

b) Verify `src/components/Skills.jsx` has the skillsData array

c) Check ScrollTrigger initialization:
```javascript
// Should be at the top of Skills.jsx
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}
```

d) Add a small delay in useEffect (already implemented):
```javascript
setTimeout(() => {
  // ScrollTrigger code
}, 100)
```

---

### 11. Theme Toggle Not Working

**Problem:** Theme doesn't change

**Solution:**

a) Check browser console for errors

b) Verify localStorage is enabled in your browser

c) Check `src/hooks/useTheme.js` is imported in `App.jsx`

d) Clear localStorage:
```javascript
// In browser console
localStorage.clear()
```

---

### 12. Navigation Links Not Scrolling

**Problem:** Clicking nav links doesn't scroll

**Solution:**

a) Check that Lenis is initialized (console should show no errors)

b) Verify anchor links have correct format:
```jsx
<a href="#skills">Skills</a>  // ✅ Correct
<a href="skills">Skills</a>   // ❌ Missing #
```

c) Check `useLenis.js` has the click handler

---

## Still Having Issues?

### Quick Debug Checklist:

1. ✅ Run `npm install` 
2. ✅ Check `package.json` has all dependencies
3. ✅ Open browser console (F12) - look for red errors
4. ✅ Check terminal for build errors
5. ✅ Try incognito/private browsing mode
6. ✅ Clear browser cache (Ctrl+Shift+Delete)
7. ✅ Restart dev server (Ctrl+C then `npm run dev`)

### Get More Info:

**See detailed error logs:**
```bash
npm run dev --verbose
```

**Check versions:**
```bash
node --version   # Should be 16+
npm --version    # Should be 8+
```

### Common Terminal Commands:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Browser Compatibility

Make sure you're using a modern browser:
- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

---

## Performance Tips

If experiencing lag:

1. **Disable browser extensions** temporarily
2. **Close other tabs** (especially heavy ones)
3. **Check CPU usage** - close background apps
4. **Update your browser** to latest version
5. **Use hardware acceleration** (usually enabled by default)

---

## Need More Help?

If you're still stuck:

1. Copy the **exact error message** from console
2. Note what **action triggered it**
3. Check the **browser console** (F12) for details
4. Share the error for specific help

Most issues are resolved by:
- Running `npm install`
- Clearing browser cache
- Restarting the dev server

Good luck! 🚀

