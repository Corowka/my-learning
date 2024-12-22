import * as tf from "@tensorflow/tfjs"
import { readImage } from "../utils/readImage"
import { writeImage } from "../utils/writeImage"

interface EncodeProps {
  image: string
  message: string
  width: number
  height: number
  chanel: number
}

export const encode = async ({
  image,
  message,
  width,
  height,
  chanel,
}: EncodeProps): Promise<string> => {
  const img = await readImage(image, width, height)

  const messageBits = message.length * 8
  const imageBits = width * height * chanel

  if (messageBits !== imageBits) {
    return ""
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      for (let k = 0; k < chanel; k++) {
        const n = i * width * chanel + j * chanel + k
        const m = (n - (n % 8)) / 8
        const code = message.charCodeAt(m)
        const bit = (code & (1 << n % 8)) >> n % 8
        img[i][j][k] = img[i][j][k] & ~bit
        console.log(img[i][j][k])
      }
    }
  }

  const newImage = await writeImage(img)

  return newImage
}
