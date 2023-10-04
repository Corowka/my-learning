"use strict";
let message = 'Hello, World!';
console.log(message);
let num = 1;
console.log(num);
let str = 'Hello, World!';
console.log(str);
let bool = false;
console.log(bool);
let arr = [1, 2, 3];
console.log(arr);
let user;
user = { name: 'John', age: 12, gender: 'Male' };
console.log(user);
let sum;
sum = function (a, b) { return a + b; };
console.log(sum(1, 2));
let big = 9324234234234234234n;
console.log(big);
let firstName = `Олеся`;
let title = `Веб-программист`;
let profile = `Меня зовут ${firstName}. 
Я ${title}`;
console.log(profile);
let obj = 'dsfsd';
console.log(obj);
let arrStr = ['name', 'age', 'gender'];
arrStr.push('email');
console.log(arrStr);
let arrNum = [1, 2, 3];
console.log(arrNum);
let Color = [255, 255, 255];
console.log(Color);
var mark;
(function (mark) {
    mark[mark["bed"] = 10] = "bed";
    mark[mark["middle"] = 11] = "middle";
    mark[mark["good"] = 12] = "good";
    mark[mark["theBest"] = 13] = "theBest";
})(mark || (mark = {}));
;
let myMark = mark.theBest;
console.log(myMark);
function print(str) { console.log(str); }
print('something');
function throwError(msg) { throw new Error(msg); }
// throwError('just kidding')
function notAll(a) {
    if (a === 1)
        return true;
    throwError('NEVER!!');
}
let res = notAll(1);
let chr = 'asfddsfsdf';
console.log(chr);
let n = 1324234324;
console.log(n);
let cs = 'cs2';
console.log(cs);
function isTeamAWin(teamA, teamB) {
    return teamA > teamB;
}
let getScoreDifference = function (x, y) {
    return Math.abs(x - y);
};
const [teamA, teamB] = [13, 7];
console.log(isTeamAWin(teamA, teamB));
console.log(getScoreDifference(teamA, teamB));
function f(x1, x2, x3 = 3, x4 = 4, x5, ...rest) {
    console.log(`x5: ${x5}`);
    console.log(`rest: ${rest}`);
    if (x5 !== undefined) {
        return x1 + x2 ** 2 + x3 * x4 + x5 ** -1;
    }
    return x1 + x2 ** 2 + x3 * x4;
}
console.log(f(1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
console.log(f(1, 2));
function sumAB(a, b) {
    return a + b;
}
function sumAB_C(a, b, c) {
    if (c) {
        return a + b + c;
    }
    return a + b;
}
console.log(sumAB_C(1, 2, 3));
class Figure {
    constructor() {
        this.name = "figure";
    }
}
class Circle extends Figure {
    constructor(r) {
        super();
        this.name = "circle";
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
    constructor(A) {
        super();
        this.name = "square";
        this.a = A;
    }
    getSquare() {
        return this.a ** 2;
    }
    getPerimeter() {
        return 4 * this.a;
    }
}
const circle = new Circle(10);
console.log(circle.name);
console.log(circle.getSquare());
console.log(circle.getPerimeter());
const square = new Square(10);
console.log(square.name);
console.log(square.getSquare());
console.log(square.getPerimeter());
const guest = { login: '', password: '', email: '' };
console.log(guest);
let run = function (direction, speed) {
    return `run ${direction} with speed: ${speed}m/c`;
};
console.log(run('straight', 2.1));
class Side {
    constructor(length, metric) {
        this.length = length;
        this.metric = metric;
    }
    getSide() {
        return `${this.length}${this.metric}`;
    }
}
const side = new Side(10, 'sm');
console.log(side.getSide());
var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["pressed"] = 0] = "pressed";
    ButtonState[ButtonState["unpressed"] = 1] = "unpressed";
})(ButtonState || (ButtonState = {}));
class Button {
    constructor(state) {
        this.state = state;
    }
    click() {
        this.state = ButtonState.pressed;
        this.state = ButtonState.unpressed;
        console.log('this button was clicked');
    }
    press() {
        this.state = ButtonState.pressed;
        console.log('this button was pressed');
    }
    unpress() {
        this.state = ButtonState.unpressed;
        console.log('this button was unpressed');
    }
}
const button = new Button(ButtonState.unpressed);
button.press();
button.unpress();
button.click();
function isFigure(obj) {
    return obj instanceof Figure;
}
function hasMethod(obj, method) {
    return method in obj;
}
function isType(obj, type) {
    return typeof obj === type;
}
console.log(isFigure(circle));
console.log(hasMethod(circle, 'getSquare'));
console.log(isType('str', 'string'));
let a = new Circle(10);
let b = a.name;
console.log(b);
let c = new Circle(10);
let d = a.name;
console.log(d);
function getNetPrice(price, discount, format) {
    let netPrice = price * (1 - discount);
    return format ? `${netPrice} руб.` : netPrice;
}
console.log(getNetPrice(10, .3324234, true));
console.log(getNetPrice(10, .3324234, false));
console.log(typeof getNetPrice(10, .3324234, false));
function concat(a, b) {
    return a.toString() + b.toString();
}
console.log(concat(1, 2));
console.log(concat('1', '2'));
function prop(a, b) {
    return a[b];
}
console.log(prop({ name: 'Иван' }, 'name'));
class Parameter {
    constructor(param) {
        this._param = param;
    }
    get value() {
        return this._param;
    }
    set value(value) {
        this._param = value;
    }
}
const parameter = new Parameter(123423423);
console.log(parameter.value);
let h = { value: 'adsfdfsf', type: 'string' };
console.log(h);
