import { Point } from "./types"
import EllipticCurve from "./elliptic-curve"

export default class EllipticSignature {

    private E: EllipticCurve
    private G: Point
    private n: number

    constructor(E: EllipticCurve, G: Point, n: number) {
        this.E = E
        this.G = G
        this.n = n
    }


    sign(k: number, e: number, d: number) {
        const kG = this.E.multiply(k, this.G)
        if (kG === null) {
            return null
        }
        const r = this.E.modP(kG.x, this.n)
        const z = this.E.modP(this.E.xgcd(k, this.n).x, this.n)
        const s = this.E.modP(z * (e + d * r), this.n)
        return { r, s }
    }


    verify(e: number, r: number, s: number, Q: Point) {
        if ((r < 1 || r >= this.n) || (s < 1 || s >= this.n)) {
            return null
        }
        const v = this.E.xgcd(s, this.n).x % this.n
        const u1 = this.E.modP(e * v, this.n)
        const u2 = this.E.modP(r * 3, this.n)
        const u1G = this.E.multiply(u1, this.G)
        const u2Q = this.E.multiply(u2, Q)
        const pt = this.E.sum(u1G, u2Q)
        if (pt === null) {
            return null
        }
        const X = this.E.modP(pt.x, this.n)
        if (r === X) {
            return true
        }
        return false
    }

}