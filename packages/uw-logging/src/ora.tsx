interface OraOpts {
  hideCursor: boolean
  spinner: {
    frames: string[]
    interval: number
  }
  text?: string
}

export const oraOpts = (text: string): OraOpts => ({
  hideCursor: false,
  spinner: {
    frames: ["-", "+", "-"],
    interval: 80,
  },
  text,
})
