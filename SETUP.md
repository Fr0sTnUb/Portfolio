# 🚀 Quick Setup Guide

## Getting Started with Your React Portfolio + Lenis

### Step 1: Install Dependencies

Open your terminal in the Portfolio directory and run:

```bash
npm install
```

This will install:
- React 18
- Vite
- GSAP 3.12.5 (with ScrollTrigger)
- Lenis 1.0.42 (smooth scrolling)
- All dev dependencies

### Step 2: Start Development Server

```bash
npm run dev
```

Vite will start the dev server and show you a URL like:
```
➜  Local:   http://localhost:5173/
```

Open that URL in your browser!

### Step 3: Explore the Features

**Smooth Scrolling:**
- Notice how buttery smooth the scroll is? That's Lenis!
- Click any navigation link - smooth animated scroll to sections
- Scroll through the Skills section to see the card stacking effect

**Skills Section:**
- Scroll down to see cards stack beautifully
- Hover over any card to reveal the detailed tools
- Each card has unique colors and animations

**Theme Toggle:**
- Click the sun/moon icon in the header
- Your preference is saved in localStorage
- Works with system dark/light mode

### Step 4: Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

## 🎨 Customization Tips

### Update Your Content

1. **Personal Info**: Edit `src/components/Hero.jsx`
2. **Skills**: Edit the `skillsData` array in `src/components/Skills.jsx`
3. **Projects**: Edit the `projects` array in `src/components/Projects.jsx`
4. **Social Links**: Update in `Hero.jsx` and `Connect.jsx`

### Customize Colors

Open `src/styles.css` and modify the CSS custom properties in `:root`:

```css
:root {
  --bg-primary: /* your color */;
  --text-primary: /* your color */;
  /* etc... */
}
```

### Adjust Lenis Settings

Edit `src/hooks/useLenis.js` to customize scroll behavior:

```javascript
const lenis = new Lenis({
  duration: 1.2,        // Scroll duration
  easing: ...,          // Easing function
  smoothWheel: true,    // Enable smooth wheel scrolling
  // More options...
})
```

### Modify GSAP Animations

Skills card animations are in `src/components/Skills.jsx`:

```javascript
ScrollTrigger.create({
  trigger: card,
  start: 'top 160px',  // When animation starts
  end: 'bottom 80px',   // When animation ends
  scrub: 0.5,          // Smoothness (0-1)
  // ...
})
```

## 📁 File Structure

```
src/
├── components/       # All React components
├── hooks/           
│   ├── useLenis.js      # Lenis smooth scroll setup
│   ├── useTheme.js      # Theme management
│   └── useScrollAnimation.js
├── App.jsx          # Main component
├── main.jsx         # React entry
└── styles.css       # All styles + Lenis CSS
```

## 🐛 Troubleshooting

**Scrolling feels choppy?**
- Clear your browser cache
- Check if you have browser extensions interfering
- Try a different browser

**Cards not animating?**
- Check browser console for errors
- Make sure all dependencies installed: `npm install`
- Refresh the page

**Build fails?**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

## 🎯 Pro Tips

1. **Performance**: Lenis + GSAP is optimized for 60fps
2. **Mobile**: Smooth scroll works on desktop; native on mobile (as intended)
3. **Accessibility**: All animations respect `prefers-reduced-motion`
4. **SEO**: Built with semantic HTML for better SEO

## 📚 Resources

- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [GSAP ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)

---

**Need help?** Check the main README.md for more details!

Happy coding! 🎉

