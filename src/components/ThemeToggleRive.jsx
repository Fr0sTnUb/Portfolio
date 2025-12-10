import { useTheme } from '../hooks/useTheme'

/**
 * Modern Theme Toggle Switch
 * Smooth animated toggle between light and dark modes
 */
const ThemeToggleRive = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={`theme-toggle-switch ${isDark ? 'dark' : 'light'}`}
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          <div className="theme-toggle-icon theme-toggle-sun">
            <i className="ri-sun-line"></i>
          </div>
          <div className="theme-toggle-icon theme-toggle-moon">
            <i className="ri-moon-line"></i>
          </div>
        </div>
      </div>
    </button>
  )
}

export default ThemeToggleRive

