export const delay = (callback: () => any, ms: number) => {
  return new Promise((resolve) => 
    setTimeout(() => { resolve(callback()) }, ms
  ))
}