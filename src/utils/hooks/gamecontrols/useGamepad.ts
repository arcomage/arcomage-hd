import { useEffect, useState, useRef } from 'react'

type ButtonState = boolean[]

export type GamepadButtonType = {
  index: number
  name: string
}

type GamepadEventHandler = (button: GamepadButtonType) => void

type GamepadHookProps = {
  onButtonDown?: GamepadEventHandler
  onButtonUp?: GamepadEventHandler
}

const buttonNames = [
  'A',
  'B',
  'X',
  'Y',
  'LB',
  'RB',
  'LT',
  'RT',
  'BACK',
  'START',
  'LSCLICK',
  'RSCLICK',
  'UP',
  'DOWN',
  'LEFT',
  'RIGHT',
  'GUIDE',
]

const getGamepadButtonType = (index: number): GamepadButtonType => {
  return {
    index,
    name: buttonNames[index],
  }
}

// TODO: stick controlled cursor

const useGamepad = ({
  onButtonDown,
  onButtonUp,
}: GamepadHookProps): Gamepad | null => {
  const [gamepad, setGamepad] = useState<Gamepad | null>(null)
  const prevButtonStatesRef = useRef<ButtonState>([])

  useEffect(() => {
    const handleGamepadConnected = (event: GamepadEvent) => {
      setGamepad(event.gamepad)
    }

    const handleGamepadDisconnected = () => {
      setGamepad(null)
    }

    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener(
        'gamepaddisconnected',
        handleGamepadDisconnected,
      )
    }
  }, [])

  useEffect(() => {
    let rafId: number | undefined = undefined
    const updateGamepadState = () => {
      const pads = navigator.getGamepads()
      const currentGamepad = gamepad ? pads[gamepad.index] : null
      if (currentGamepad) {
        const buttons = currentGamepad.buttons.map((b) => b.pressed)

        buttons.forEach((pressed, index) => {
          const prevPressed = prevButtonStatesRef.current[index]

          const gamepadButton = getGamepadButtonType(index)

          if (pressed && !prevPressed) {
            onButtonDown?.(gamepadButton)
          } else if (!pressed && prevPressed) {
            onButtonUp?.(gamepadButton)
          }
        })

        prevButtonStatesRef.current = buttons
      }

      rafId = requestAnimationFrame(updateGamepadState)
    }
    if (gamepad) {
      updateGamepadState()
    }

    return () => {
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [gamepad, onButtonDown, onButtonUp])

  return gamepad
}

export default useGamepad
