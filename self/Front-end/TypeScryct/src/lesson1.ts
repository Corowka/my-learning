let message: string = 'Hello, World!';
console.log(message);

let num: number = 1;
console.log(num);
let str: string = 'Hello, World!';
console.log(str);
let bool: boolean = false;
console.log(bool);
let arr: number[] = [1, 2, 3];
console.log(arr);

let user: {
    name: string;
    age: number;
    gender: string;
};
user = { name: 'John', age: 12, gender: 'Male' };
console.log(user);

let sum: (a: number, b: number) => number;
sum = function (a: number, b: number) { return a + b; };
console.log(sum(1, 2));

let big: bigint = 9324234234234234234n;
console.log(big);

let firstName: string = `Олеся`;
let title: string = `Веб-программист`;
let profile: string = `Меня зовут ${firstName}. 
Я ${title}`;
console.log(profile);

let obj: {} = 'dsfsd';
console.log(obj)

let arrStr: string[] = ['name', 'age', 'gender'];
arrStr.push('email');
console.log(arrStr);

let arrNum: Array<number> = [1, 2, 3];
console.log(arrNum);

let Color: [number, number, number] = [255, 255, 255];
console.log(Color);

enum mark { bed = 10, middle, good, theBest };
let myMark: mark = mark.theBest;
console.log(myMark)

function print(str: string): void { console.log(str); }
print('something')

function throwError(msg: string): never { throw new Error(msg); }
// throwError('just kidding')

function notAll(a: number): boolean {
    if (a === 1) return true;
    throwError('NEVER!!');
}
let res: boolean = notAll(1);

type char = string;
let chr: char = 'asfddsfsdf'
console.log(chr);

type большие_числа = number | string;
let n: большие_числа = 1324234324;
console.log(n)

let cs: 'cs1.6' | 'cs:source' | 'cs:go' | 'cs2' = 'cs2';
console.log(cs)

function isTeamAWin(teamA: number, teamB: number): boolean {
    return teamA > teamB;
}
let getScoreDifference: (teamA: number, teamB: number) => number =
    function (x: number, y: number): number {
        return Math.abs(x - y)
    }
const [teamA, teamB] = [13, 7];
console.log(isTeamAWin(teamA, teamB))
console.log(getScoreDifference(teamA, teamB));

function f(x1: number, x2: number, x3 = 3, x4: number = 4, x5?: number, ...rest: number[]): number {
    console.log(`x5: ${x5}`);
    console.log(`rest: ${rest}`)
    if (x5 !== undefined) {
        return x1 + x2 ** 2 + x3 * x4 + x5 ** -1;
    }
    return x1 + x2 ** 2 + x3 * x4;
}
console.log(f(1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
console.log(f(1, 2));

function sumAB(a: number, b: number): number;
function sumAB(a: string, b: string): string;
function sumAB(a: any, b: any): any {
    return a + b;
}

function sumAB_C(a: number, b: number, c?: number): number {
    if (c) {
        return a + b + c;
    }
    return a + b;
}
console.log(sumAB_C(1, 2, 3));


abstract class Figure {
    readonly name: string = "figure";
    abstract getSquare(): number;
    abstract getPerimeter(): number;
}

class Circle extends Figure {
    readonly name: string = "circle";
    private R: number;

    constructor(r: number) {
        super();
        this.R = r;
    }

    getSquare() {
        return this.R ** 2 * Math.PI;
    }

    getPerimeter() {
        return 2 * Math.PI * this.R;
    }
}

class Square extends Figure {
    readonly name: string = "square";
    private a: number;

    constructor(A: number) {
        super();
        this.a = A;
    }

    getSquare() {
        return this.a ** 2;
    }

    getPerimeter() {
        return 4 * this.a;
    }
}

const circle: Circle = new Circle(10);
console.log(circle.name);
console.log(circle.getSquare());
console.log(circle.getPerimeter());
const square: Square = new Square(10);
console.log(square.name);
console.log(square.getSquare());
console.log(square.getPerimeter());

interface User {
    login: string;
    password: string;
    email?: string;
}

const guest: User = { login: '', password: '', email: '' };
console.log(guest);

interface Controller {
    (direction: string, speed: number): string;
}

let run: Controller = function (direction: string, speed: number): string {
    return `run ${direction} with speed: ${speed}m/c`;
};
console.log(run('straight', 2.1));

interface Length {
    length: number;
    metric: string;
}
class Side implements Length {
    length: number;
    metric: string;

    constructor(length: number, metric: string) {
        this.length = length;
        this.metric = metric;
    }
    getSide(): string {
        return `${this.length}${this.metric}`;
    }
}
const side: Side = new Side(10, 'sm');
console.log(side.getSide());

enum ButtonState {
    'pressed',
    'unpressed'
}

interface Clickable {
    click(): void;
}

interface Pressable extends Clickable {
    press(): void;
    unpress(): void;
}

class Button implements Pressable {
    private state: ButtonState;

    constructor(state: ButtonState) {
        this.state = state;
    }

    click(): void {
        this.state = ButtonState.pressed;
        this.state = ButtonState.unpressed;
        console.log('this button was clicked');
    }

    press(): void {
        this.state = ButtonState.pressed;
        console.log('this button was pressed');
    }

    unpress(): void {
        this.state = ButtonState.unpressed;
        console.log('this button was unpressed');
    }
}
const button: Button = new Button(ButtonState.unpressed);
button.press();
button.unpress();
button.click();

interface Cat {
    meow(): void;
}
interface Dog {
    bark(): void;
}
type CatDog = Cat & Dog;

function isFigure(obj: any): boolean {
    return obj instanceof Figure;
}
function hasMethod(obj: any, method: string): boolean {
    return method in obj;
}
function isType(obj: any, type: string): boolean {
    return typeof obj === type;
}
console.log(isFigure(circle));
console.log(hasMethod(circle, 'getSquare'));
console.log(isType('str', 'string'));

let a: Figure = new Circle(10);
let b = (a as Square).name;
console.log(b);
let c: Figure = new Circle(10);
let d = (<Square>a).name;
console.log(d);

function getNetPrice(price: number, discount: number, format: boolean): number | string {
    let netPrice = price * (1 - discount);
    return format ? `${netPrice} руб.` : netPrice;
}
console.log(getNetPrice(10, .3324234, true) as string);
console.log(<number>getNetPrice(10, .3324234, false));
console.log(typeof getNetPrice(10, .3324234, false));

function concat<T extends string | number>(a: T, b: T): string {
    return a.toString() + b.toString()
} 
console.log(concat(1, 2));
console.log(concat('1', '2'));

function prop<T extends object, K extends keyof T>(a: T, b: K): any {
    return a[b];
}
console.log(prop({ name: 'Иван' }, 'name'));

class Parameter<T extends string | number> {
    private _param: T;

    constructor(param: T) {
        this._param = param;
    }

    get value(): T {
        return this._param; 
    }

    set value(value: T) {
        this._param = value;
    }
}
const parameter: Parameter<number> = new Parameter(123423423);
console.log(parameter.value);

interface hash<T extends string | number> {
    value: T;
    type: string;
}
type hashStr = hash<string>;
let h: hashStr = {value: 'adsfdfsf', type: 'string'};
console.log(h);

