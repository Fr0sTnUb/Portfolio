# fr0strated Portfolio - React Version

A modern, interactive portfolio built with React, Vite, and GSAP ScrollTrigger.

## 🚀 Features

- ⚡ **Vite** - Lightning-fast development and builds
- ⚛️ **React 18** - Modern React with hooks
- 🎨 **GSAP ScrollTrigger** - Smooth scroll-based card stacking animations
- 🌊 **Lenis Smooth Scroll** - Buttery smooth scrolling experience
- 🌓 **Dark/Light Theme** - Persistent theme with system preference detection
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🎭 **Hover Interactions** - Skills cards reveal tools on hover
- 🎯 **Smooth Navigation** - Enhanced anchor link scrolling with Lenis

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (Vite will show the URL in terminal)

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 👀 Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Navigation and theme toggle
│   │   ├── Hero.jsx           # Hero section with metrics
│   │   ├── Highlights.jsx     # Key achievements
│   │   ├── About.jsx          # About section
│   │   ├── Skills.jsx         # GSAP ScrollTrigger card stack
│   │   ├── Projects.jsx       # Project showcase
│   │   ├── Labs.jsx           # Experimental projects
│   │   ├── Journey.jsx        # Timeline
│   │   ├── Connect.jsx        # Contact form and links
│   │   └── Footer.jsx         # Footer
│   ├── hooks/
│   │   ├── useTheme.js        # Theme management hook
│   │   └── useScrollAnimation.js  # Scroll reveal hook
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── styles.css             # All styles
├── index-react.html           # HTML template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## 🎨 Key Components

### Skills Component
The skills section uses GSAP ScrollTrigger for a stunning card-stacking effect:
- Cards stack on top of each other as you scroll
- Hover to reveal detailed tools for each category
- Smooth animations with 3D transforms
- 6 unique color schemes for each skill category

### Theme System
- Automatic dark/light mode detection
- Persistent preference in localStorage
- Smooth transitions between themes
- System preference fallback

### Scroll Animations
- IntersectionObserver for section reveals
- GSAP ScrollTrigger for Skills section
- Smooth scroll navigation
- Active nav link highlighting

## 🛠️ Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **GSAP** - Animation library with ScrollTrigger
- **Lenis** - Smooth scroll library (perfectly synced with GSAP)
- **Remix Icon** - Icon library
- **CSS Custom Properties** - Theming system

## 📱 Responsive Breakpoints

- Desktop: > 960px
- Tablet: 540px - 960px
- Mobile: < 540px

## 🎯 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Custom Properties support required

## 🔥 Performance

- Optimized with Vite's build pipeline
- Code splitting ready
- Lazy loading support
- CSS custom properties for efficient theming

## 📝 Customization

All content is stored in component files. To customize:
1. Edit component data arrays (skills, projects, labs, etc.)
2. Update personal links in Hero and Connect components
3. Modify colors in CSS custom properties (`:root` in styles.css)
4. Adjust GSAP animations in Skills.jsx

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and adapt for your own use!

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio.

---

Built with ❤️ by fr0strated

