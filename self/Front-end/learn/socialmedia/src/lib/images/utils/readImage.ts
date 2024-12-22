import * as tf from "@tensorflow/tfjs"

export const readImage = async (
  dataUrl: string,
  width: number,
  height: number,
): Promise<number[][][]> => {
  return new Promise((resolve, reject) => {
    const img = new Image(width, height)
    img.onload = async () => {
      try {
        const tensor = await tf.browser.fromPixels(img)
        const arr = await tensor.array()
        resolve(arr)
      } catch (error) {
        reject(error)
      }
    }
    img.onerror = (error) => reject(error)
    img.src = dataUrl
  })
}
