Object.defineProperty(window, 'AudioContext', {
  writable: true,
  value: jest.fn(() => ({
    createGain: jest.fn(() => ({
      gain: {
        value: 0,
      },
    })),
  })),
})
