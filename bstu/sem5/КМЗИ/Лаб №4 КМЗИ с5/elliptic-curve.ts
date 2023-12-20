import { Point } from "./types"

export default class EllipticCurve {

    private a: number
    private b: number
    private p: number


    A() { return this.a }
    B() { return this.b }
    P() { return this.p }


    constructor(
        a: number,
        b: number,
        p: number,
    ) {
        this.a = a
        this.b = b
        this.p = p
    }


    modP(value: number, p=this.p) {
        return (value >= 0) ? value % p : p - (-value % p)
    }


    xgcd(a: number, b: number) {
        if (a === 0) {
            return { gcd: b, x: 0, y: 1 }
        }
        const { gcd, x: x1, y: y1 } = this.xgcd(b % a, a)
        const x: number = y1 - Math.floor(b / a) * x1
        const y: number = x1
        return { gcd: b, x, y }
    }


    sum(P: Point | null, Q: Point | null): Point | null {
        if (P === null && Q === null) {
            return null
        }
        if (P === null) {
            return Q
        }
        if (Q === null) {
            return P
        }
        let lm
        if (P.x === Q.x && P.y === Q.y) {
            const demonY = this.modP(3 * P.x ** 2 + this.a)
            const demonX = this.modP(this.xgcd(this.modP(2 * P.y), this.p).x)
            lm = this.modP(demonY * demonX)
        } else {
            const demonY = this.modP(Q.y - P.y)
            const demonX = this.modP(this.xgcd(this.modP(Q.x - P.x), this.p).x)
            lm = this.modP(demonY * demonX)
        }
        const x = this.modP(lm ** 2 - P.x - Q.x)
        const y = this.modP(lm * (P.x - x) - P.y)
        return { x, y } as Point
    }


    multiply(k: number, P: Point | null) {
        let Q: Point | null = null
        for (let i = 0; i < (k >>> 0).toString(2).length; i++) {
            if ((k >> i) & 1) {
                Q = this.sum(P, Q)
            }
            P = this.sum(P, P) 
        }
        return Q
    }


    reverse(P: Point | null) {
        return (P) ? { x: P.x, y: -P.y } : null
    }
}
