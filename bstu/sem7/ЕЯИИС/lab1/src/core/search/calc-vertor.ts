import { base, keys, nkArr } from "../docs/base";

export function calcVector(dictionary: Map<string, number>[], totalDictionary: Map<string, number>, chunk: string): number[] {

  const plainText = chunk.replace(/[^а-яА-Яa-zA-Z0-9\s]+/g, '').toLowerCase();

  const dict = new Map<string, number>()
  const words = plainText.split(" ")
  for (let j = 0; j < words.length; j++) {
    if (dict.has(words[j])) {
      const count = dict.get(words[j])! + 1
      dict.set(words[j], count)
    } else {
      dict.set(words[j], 1)
    }
  }

  let w: number[] = Array.from({ length: totalDictionary.size }, () => 0)
  for (const key of dict.keys()) {
    const ndk = dict.get(key) || 0
    const n = dictionary.length
    let vectorSumTemp = 0
    for (let j = 0; j < keys.length; j++) {
      const ndj = dict.get(keys[j]) || 0
      const n = dictionary.length
      vectorSumTemp += Math.pow(ndj * Math.log(n / nkArr[j]), 2)
    }
    const vectorSum = Math.sqrt(vectorSumTemp)
    const idx = keys.indexOf(key)
    w[idx] = (ndk * Math.log(n / nkArr[idx])) / vectorSum
  }

  return w
} 