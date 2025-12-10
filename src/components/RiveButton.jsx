import { useRive, useStateMachineInput } from 'rive-react'
import { useEffect, useRef } from 'react'

/**
 * Interactive Rive Button Component
 * Animates on hover and click
 * 
 * @param {string} src - URL or path to the .riv file
 * @param {string} stateMachine - Name of the state machine
 * @param {string} hoverInput - Name of the hover input
 * @param {string} clickInput - Name of the click input
 * @param {object} children - Button content
 * @param {function} onClick - Click handler
 * @param {object} className - Additional CSS classes
 */
const RiveButton = ({
  src,
  stateMachine = 'State Machine 1',
  hoverInput = 'Hover',
  clickInput = 'Pressed',
  children,
  onClick,
  className = '',
  ...props
}) => {
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine,
    autoplay: true,
  })

  const hoverInputRef = useStateMachineInput(rive, stateMachine, hoverInput)
  const clickInputRef = useStateMachineInput(rive, stateMachine, clickInput)

  const handleMouseEnter = () => {
    if (hoverInputRef) {
      hoverInputRef.value = true
    }
  }

  const handleMouseLeave = () => {
    if (hoverInputRef) {
      hoverInputRef.value = false
    }
  }

  const handleClick = (e) => {
    if (clickInputRef) {
      clickInputRef.value = true
      setTimeout(() => {
        if (clickInputRef) {
          clickInputRef.value = false
        }
      }, 200)
    }
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      className={`rive-button ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      <RiveComponent className="rive-button-animation" />
      {children && <span className="rive-button-content">{children}</span>}
    </button>
  )
}

export default RiveButton

