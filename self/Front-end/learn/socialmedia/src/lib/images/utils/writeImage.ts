import { Tensor3D, browser, tensor3d } from "@tensorflow/tfjs"

export const writeImage = async (arr: number[][][]): Promise<string> => {
  const img = await browser.toPixels(
    tensor3d(arr, [arr.length, arr[0].length, arr[0][0].length], "int32"),
  )
  const canvas = document.createElement("canvas")
  canvas.width = arr.length
  canvas.height = arr[0].length
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    return ""
  }
  const imageData = new ImageData(img, arr.length, arr[0].length)
  ctx.putImageData(imageData, 0, 0)
  const image = new Image()
  image.src = canvas.toDataURL()
  ctx.drawImage(image, arr.length, arr[0].length)
  return canvas.toDataURL()
}
