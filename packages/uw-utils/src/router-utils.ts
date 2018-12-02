export const delayedPush = (pushit: () => void, delay: number) => {
  if (typeof document !== undefined) {
    document.body.setAttribute("data-animate", "out")
  }
  setTimeout(() => pushit(), delay)
}