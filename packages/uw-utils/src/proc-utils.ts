export const sleep = (mills: number) => {
  const now = new Date().getTime()
  while (new Date().getTime() < now + mills) {
    // no-op
  }
}
