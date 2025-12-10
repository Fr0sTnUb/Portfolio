# Rive Animations Usage Guide

This portfolio now supports Rive animations! Here's how to use them.

## Installation

Rive React is already installed. You can add Rive animations in several ways:

## 1. Basic Rive Animation Component

Use the `RiveAnimation` component for simple animations:

```jsx
import RiveAnimation from './components/RiveAnimation'

// In your component:
<RiveAnimation
  src="/path/to/your/animation.riv"
  className="my-rive-animation"
  style={{ width: '200px', height: '200px' }}
  autoplay={true}
/>
```

## 2. Interactive Rive Button

Use the `RiveButton` component for buttons with hover/click animations:

```jsx
import RiveButton from './components/RiveButton'

<RiveButton
  src="/path/to/button-animation.riv"
  stateMachine="State Machine 1"
  hoverInput="Hover"
  clickInput="Pressed"
  onClick={() => console.log('Clicked!')}
  className="my-rive-button"
>
  Click Me
</RiveButton>
```

## 3. Example: Add Rive to Hero Section

```jsx
import RiveAnimation from './components/RiveAnimation'

// In Hero.jsx, add a background animation:
<div className="hero-rive-bg">
  <RiveAnimation
    src="/animations/hero-background.riv"
    autoplay={true}
  />
</div>
```

## 4. Example: Animated Button

```jsx
import RiveButton from './components/RiveButton'

// Replace a regular button:
<RiveButton
  src="/animations/button-animation.riv"
  stateMachine="Button"
  hoverInput="Hover"
  clickInput="Click"
  onClick={() => window.open('https://linkedin.com', '_blank')}
  className="btn btn-primary"
>
  Let's connect
  <i className="ri-arrow-right-up-line"></i>
</RiveButton>
```

## 5. Where to Place Rive Files

1. Create a folder: `public/animations/`
2. Add your `.riv` files there
3. Reference them as: `/animations/your-file.riv`

## 6. Getting Rive Files

- Create animations at [rive.app](https://rive.app)
- Download free animations from [rive.app/community](https://rive.app/community)
- Export as `.riv` files

## 7. Common Use Cases

### Background Animation
```jsx
<RiveAnimation
  src="/animations/background.riv"
  className="hero-rive-bg"
  autoplay={true}
/>
```

### Icon Animation
```jsx
<RiveAnimation
  src="/animations/icon.riv"
  className="rive-icon"
  autoplay={true}
/>
```

### Interactive Element
```jsx
const { RiveComponent, rive } = useRive({
  src: '/animations/interactive.riv',
  stateMachines: 'State Machine 1',
  autoplay: true,
})

const hoverInput = useStateMachineInput(rive, 'State Machine 1', 'Hover')

<div
  onMouseEnter={() => hoverInput && (hoverInput.value = true)}
  onMouseLeave={() => hoverInput && (hoverInput.value = false)}
>
  <RiveComponent />
</div>
```

## Tips

- Keep file sizes small for better performance
- Use state machines for interactive animations
- Test animations on different devices
- Consider using Rive for micro-interactions

## Resources

- [Rive Documentation](https://rive.app/community/doc/2.0/getting-started)
- [Rive React Examples](https://github.com/rive-app/rive-react)
- [Rive Community Animations](https://rive.app/community/)

