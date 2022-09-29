export const sleep = (milliSeconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, milliSeconds)
  })
}
