export type Point = { x: number, y: number } 


export const task1 = (lines: {x1: number, x2: number}[]): number => {
    
    const x1 = lines.map(item => ({x: item.x1, flag: false}))
    const x2 = lines.map(item => ({x: item.x2, flag: true}))
    const x = x1.concat(x2).sort((a, b) => a.x - b.x)

    let lens = 0
    let c = 0
    for (let i = 0; i < x.length; i++) {
        if (c && i) {
            lens += (x[i].x - x[i - 1].x)
        }
        if (x[i].flag) {
            ++c
        } else {
            --c
        }
    }

    return lens
}


export const task2 = (lines: [number, number][]): number => {

    lines = lines.sort((a, b) => a[0] - b[0])

    const stack: [number, number][] = []

    for (let i = 0; i < lines.length; i++) {
        if (stack.length === 0 || lines[i][0] > stack[stack.length - 1][1]) {
            stack.push(lines[i])
        }
        if (stack[stack.length - 1][1] < lines[i][1]) {
            stack[stack.length - 1][1] = lines[i][1]
        }
    }

    const len = stack.reduce((sum, item) => (sum + item[1] - item[0]), 0)

    return len
}


export const task3 = (p1: Point, p2: Point, p3: Point): {S2: number, S: number, isClockWise: boolean} => {

    const S2 = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x)
    const S = Math.abs(S2) / 2
    const isClockWise = S2 > 0

    return {S2, S, isClockWise}
}

export const task4 = (A: Point, B: Point, C: Point, D: Point): boolean => {

    const isBoundingBox = (A: Point, B: Point, C: Point, D: Point): boolean => {
        if (A.x > B.x) [A.x, B.x] = [B.x, A.x]
        if (C.x > D.x) [C.x, D.x] = [D.x, C.x]
        if (A.y > B.y) [A.y, B.y] = [B.y, A.y] 
        if (C.y > D.y) [C.y, D.y] = [D.y, C.y] 
        return Math.max(A.x, C.x) <= Math.min(B.x, D.x) && 
               Math.max(A.y, C.y) <= Math.min(B.y, D.y)
    }

    const S2_ABC: number = task3(A, B, C).S2
    const S2_ABD: number = task3(A, B, D).S2
    const S2_CDA: number = task3(C, D, A).S2
    const S2_CDB: number = task3(C, D, B).S2

    const isLess1 = S2_ABC * S2_ABD <= 0
    const isLess2 = S2_CDA * S2_CDB <= 0

    return isBoundingBox(A, B, C, D) && isLess1 && isLess2
}


export const task4_ = (A: Point, B: Point, C: Point, D: Point): boolean => {

    const A1 = A.y - B.y
    const B1 = B.x - A.x
    const C1 = -A1 * A.x - B1 * A.y
    const A2 = C.y * D.y
    const B2 = D.x - C.x 
    const C2 = -A2 * C.x - B2 * C.y

    const det = (A11: number, A12: number, A21: number, A22: number): number => {
        return A11 * A22 - A12 * A21 
    }

    const Zn = det(A1, B1, A2, B2)

    if (Zn != 0) {
        const x = -det(C1, B1, C2, B2) * 1 / Zn
        const y = -det(A1, C1, A2, C2) * 1 / Zn
        const btw1 = Math.min(A.x, B.x) <= x + 1e-9 && x <= Math.max(A.x, B.x) + 1e-9
        const btw2 = Math.min(A.y, B.y) <= y + 1e-9 && y <= Math.max(A.y, B.y) + 1e-9
        const btw3 = Math.min(C.x, D.x) <= x + 1e-9 && x <= Math.max(C.x, D.x) + 1e-9
        const btw4 = Math.min(C.y, D.y) <= y + 1e-9 && y <= Math.max(C.y, D.y) + 1e-9
        return btw1 && btw2 && btw3 && btw4
    } 

    const detEqZero1 = det(A1, C1, A2, C2) == 0
    const detEqZero2 = det(B1, C1, B2, C2) == 0
    
    const isBoundingBox = (A: Point, B: Point, C: Point, D: Point): boolean => {
        if (A.x > B.x) [A.x, B.x] = [B.x, A.x]
        if (C.x > D.x) [C.x, D.x] = [D.x, C.x]
        if (A.y > B.y) [A.y, B.y] = [B.y, A.y] 
        if (C.y > D.y) [C.y, D.y] = [D.y, C.y] 
        return Math.max(A.x, C.x) <= Math.min(B.x, D.x) && 
               Math.max(A.y, C.y) <= Math.min(B.y, D.y)
    }

    return isBoundingBox(A, B, C, D) && detEqZero1 && detEqZero2
}


export const task5 = (P: Point, Q: Point) => {

    const A = P.y - Q.y
    const B = Q.x - P.x 
    const C = -A * P.x - B * P.y

    return {A, B, C}
}


export const task6 = (P1: Point, Q1: Point, P2: Point, Q2: Point) => {
    const {A: A1, B: B1, C: C1} = task5(P1, Q1)
    const {A: A2, B: B2, C: C2} = task5(P2, Q2)
    const detAB = A1 * B2 - A2 * B1
    if (detAB === 0) {
        return {x: null, y: null}
    }
    const x = - (C1 * B2 - C2 * B1) / detAB
    const y = - (A1 * C2 - A2 * C1) / detAB
    return {x, y}
}


export const task7 = (P1: Point, Q1: Point, P2: Point, Q2: Point) => {
    
    const {x, y} = task6(P1, Q1, P2, Q2)

    if (x === null && y === null) {
        return {x, y}
    }
    
    const belong = (O: Point, P: Point, Q: Point) => {
        const {A, B, C} = task5(P, Q)
        return A * O.x + B * O.y + C === 0
    } 

    const O: Point = {x, y}

    return (belong(O, P1, Q1) && belong(O, P2, Q2))
}

export const task8 = (poligon: Point[]) => {
    return Math.abs(poligon.reduce((S, p, i, poligon) => {
        const p1 = i ? poligon[i-1] : poligon[poligon.length-1]
        const p2 = p
        return S + (p1.x - p2.x) * (p1.y + p2.y) 
    }, 0)) / 2
}

export const task9 = (r: number, A: number, B: number, C:number): Point[] | Point | null => {
    const x0 = - A * C / (A )
    const y0 = - B * C / (A * A + B * B)
    if (C * C > r * r * (A * A + B * B) + 1e-9) {
        return null 
    } else if (Math.abs(C * C - r * r * (A * A + B * B)) < 1e-9) {
        return {x: x0, y: y0}
    } else {
        const d = r * r - C * C / (A * A + B * B)
        
    }
    
    return null
}