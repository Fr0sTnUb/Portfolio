import { useRive, useStateMachineInput } from 'rive-react'

/**
 * RiveAnimation Component
 * 
 * @param {string} src - URL or path to the .riv file
 * @param {string} stateMachine - Name of the state machine (optional)
 * @param {string} artboard - Name of the artboard (optional)
 * @param {object} className - Additional CSS classes
 * @param {object} style - Inline styles
 * @param {boolean} autoplay - Whether to autoplay the animation
 * @param {function} onLoad - Callback when animation loads
 * @param {function} onLoadError - Callback when animation fails to load
 */
const RiveAnimation = ({
  src,
  stateMachine,
  artboard,
  className = '',
  style = {},
  autoplay = true,
  onLoad,
  onLoadError,
  ...props
}) => {
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine,
    artboard,
    autoplay,
    onLoad,
    onLoadError,
  })

  return (
    <RiveComponent
      className={className}
      style={style}
      {...props}
    />
  )
}

export default RiveAnimation

/**
 * Hook to control Rive animation inputs
 * 
 * @param {object} rive - Rive instance from useRive hook
 * @param {string} stateMachine - Name of the state machine
 * @param {string} inputName - Name of the input to control
 * @returns {object} - Input controller
 */
export const useRiveInput = (rive, stateMachine, inputName) => {
  return useStateMachineInput(rive, stateMachine, inputName)
}

