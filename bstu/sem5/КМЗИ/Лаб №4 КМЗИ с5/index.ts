import { ALPHABET, ALPHABET_ } from "./constants"
import { Point } from "./types"
import EllipticCurve from "./elliptic-curve"
import EllipticCrypt from "./elliptic-crypt"
import EllipticSignature from "./elliptic-signature"

const E = new EllipticCurve(-1, 1, 751)

// Task 1 

{
    console.log("\nTask 1\n")

    const alphabet: Map<string, Point> = new Map(ALPHABET)
    const G: Point = { x: 0, y: 1 }
    const crypto = new EllipticCrypt(E, G, alphabet)

    // const k = [3]
    const Pb: Point = { x: 406, y: 397 }
    // const message = "A"
    const k = [7, 9, 3, 8, 18, 18, 8, 11, 16]
    // const Pb: Point = { x: 188, y: 93 }
    const message = "отступить"
    const encrypted = crypto.encrypt(k, Pb, message)
    console.log(encrypted)
    const nb = 45
    const decrypted = crypto.decrypt(nb, encrypted)
    console.log(decrypted)
}

// Task 2

{
    console.log("\nTask 2\n")

    const alphabet: Map<string, Point> = new Map(ALPHABET_)
    const G: Point = { x: -1, y: 1 }
    const crypto = new EllipticCrypt(E, G, alphabet)
    const encrypted = [
        { C1: { x: 425, y: 663 }, C2: { x: 651, y: 191 } },
        { C1: { x: 188, y: 93 }, C2: { x: 177, y: 562 } },
        { C1: { x: 286, y: 136 }, C2: { x: 603, y: 562 } },
        { C1: { x: 440, y: 539 }, C2: { x: 588, y: 707 } },
        { C1: { x: 72, y: 254 }, C2: { x: 269, y: 187 } },
        { C1: { x: 56, y: 419 }, C2: { x: 49, y: 568 } },
        { C1: { x: 16, y: 416 }, C2: { x: 426, y: 662 } },
        { C1: { x: 425, y: 663 }, C2: { x: 557, y: 28 } },
        { C1: { x: 188, y: 93 }, C2: { x: 149, y: 97 } },
        { C1: { x: 179, y: 275 }, C2: { x: 711, y: 341 } }
    ]
    const nb = 51
    const decrypted = crypto.decrypt(nb, encrypted)
    console.log(decrypted)
}

// Task 3

{
    console.log("\nTask 3\n")

    const P: Point = { x: 70, y: 556 }
    const Q: Point = { x: 56, y: 419 }
    const R: Point = { x: 86, y: 726 }
    const a = E.multiply(2, P) // 2P
    const b = E.multiply(3, Q) // 3Q
    const c = E.sum(a, b)      // 2P + 3Q
    const d = E.reverse(R)     // -R
    const e = E.sum(c, d)      // 2P + 3Q + -R
    console.log(e)
}

// Task 4

{
    console.log("\nTask 4\n")

    const E = new EllipticCurve(-1, 1, 751)
    const P: Point = { x: 39, y: 171 }
    const n = 108
    const nP = E.multiply(n, P)
    console.log(nP)
}

// // Task 5

{
    console.log("\nTask 5\n")

    const G: Point = { x: 416, y: 55 }
    const n = 13
    const e = 3
    const d = 10
    const k = 6

    const signature = new EllipticSignature(E, G, n)
    const sign = signature.sign(k, e, d)
    console.log(sign)
}

// Task 6

{
    console.log("\nTask 6\n")

    const r = 11
    const s = 10
    const e = 3
    const Q: Point = { x: 135, y: 669 }
    const G: Point = { x: 562, y: 89 }
    const n = 13

    const signature = new EllipticSignature(E, G, n)
    const verification = signature.verify(e, r, s, Q)
    console.log(verification)
}