import { Point } from "./types"
import EllipticCurve from "./elliptic-curve"

export default class EllipticCrypt {

    private E: EllipticCurve
    private G: Point
    private alphabet: Map<string, Point>

    constructor(E: EllipticCurve, G: Point, alphabet: Map<string, Point>) {
        this.E = E
        this.G = G
        this.alphabet = alphabet
    }


    private encryptLetter(k: number, Pb: Point, letter: string) {
        const C1 = this.E.multiply(k, this.G)
        const alphabetPoint: Point | null = this.alphabet.get(letter) || null
        const C2 = this.E.sum(this.E.multiply(k, Pb), alphabetPoint)
        return { C1, C2 }
    }


    encrypt(k: number[], Pb: Point, message: string) {
        const encrypted = []
        for (let i = 0; i < message.length; i++) {
            if (this.alphabet.has(message.charAt(i))) {
                encrypted.push(this.encryptLetter(k[i], Pb, message.charAt(i)))
            }
        }
        return encrypted
    }

    private getAlphabetKeyByValue(value: Point | null) {
        if (value === null) {
            return null
        }
        for (const pair of Array.from(this.alphabet.entries())) {
            const [letter, pt] = pair
            if (pt.x === value.x && pt.y === value.y) {
                return letter
            }
        }
        return null
    }


    private decryptLetter(nb: number, encryptedPair: { C1: Point | null, C2: Point | null }) {
        const { C1, C2 } = encryptedPair
        const C = this.E.multiply(nb, C1)
        const Cm = this.E.reverse(C)
        const Ca = this.E.sum(C2, Cm)
        const letter = this.getAlphabetKeyByValue(Ca)
        return letter
    }


    decrypt(nb: number, encrypted: { C1: Point | null; C2: Point | null; }[]) {
        let message = ""
        for (let i = 0; i < encrypted.length; i++) {
            const letter = this.decryptLetter(nb, encrypted[i])
            message += (letter) ? letter : "_"
        }
        return message
    }


}
