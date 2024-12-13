import { calcVector } from "../search/calc-vertor";
import { text } from "./text"

export type Base = {
  chunks: string[]
  vectors: number[][];
  dictionary: Map<string, number>[];
  totalDictionary: Map<string, number>
  chunkAmount: number;
};

const plainTotalText = text.replace(/[^а-яА-Яa-zA-Z0-9\s]+/g, '').toLowerCase();

const sentences = text.split(/\s*[.!?,]\s*/).filter(s => s)
const chunkSize = 32
const chunkAmount = sentences.length - chunkSize

export function getChunk(start: number) {
  let chunk = ""
  for (let i = start * chunkSize; i < start * chunkSize + chunkSize; i++) {
    chunk += sentences[i] + " "
  }
  return chunk
}

const chunks = []
for (let i = 0; i < chunkAmount; i++) {
  chunks.push(getChunk(i))
}

const dictionary = chunks.map(s => new Map<string, number>())
for (let i = 0; i < chunks.length; i++) {
  const plainText = chunks[i].replace(/[^а-яА-Яa-zA-Z0-9\s]+/g, '').toLowerCase();
  const words = plainText.split(" ")
  for (let j = 0; j < words.length; j++) {
    if (dictionary[i].has(words[j])) {
      const count = dictionary[i].get(words[j])! + 1
      dictionary[i].set(words[j], count)
    } else {
      dictionary[i].set(words[j], 1)
    }
  }
}

const totalDictionary = new Map<string, number>()
for (const d of dictionary) {
  for (const [key, value] of d) {
    totalDictionary.set(key, (totalDictionary.get(key) || 0) + value);
  }
}

export const keys = Array.from(totalDictionary.keys()).sort()
export const nkArr = keys.map(key => dictionary.filter(d => d.get(key) || 0).length)

console.log(totalDictionary.size)
console.log(chunkAmount)

export const vectors: number[][] = []
for (let i = 0; i < chunkAmount; i++) {
  vectors.push(calcVector(dictionary, totalDictionary, chunks[i]))
}

export const base = {
  vectors,
  chunks,
  dictionary,
  totalDictionary,
  chunkAmount
}

