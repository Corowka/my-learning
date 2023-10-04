var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var message = 'Hello, World!';
console.log(message);
var num = 1;
console.log(num);
var str = 'Hello, World!';
console.log(str);
var bool = false;
console.log(bool);
var arr = [1, 2, 3];
console.log(arr);
var user;
user = { name: 'John', age: 12, gender: 'Male' };
console.log(user);
var sum;
sum = function (a, b) { return a + b; };
console.log(sum(1, 2));
var big = 9324234234234234234n;
console.log(big);
var firstName = "\u041E\u043B\u0435\u0441\u044F";
var title = "\u0412\u0435\u0431-\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0438\u0441\u0442";
var profile = "\u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 ".concat(firstName, ". \n\u042F ").concat(title);
console.log(profile);
var obj = 'dsfsd';
console.log(obj);
var arrStr = ['name', 'age', 'gender'];
arrStr.push('email');
console.log(arrStr);
var arrNum = [1, 2, 3];
console.log(arrNum);
var Color = [255, 255, 255];
console.log(Color);
var mark;
(function (mark) {
    mark[mark["bed"] = 10] = "bed";
    mark[mark["middle"] = 11] = "middle";
    mark[mark["good"] = 12] = "good";
    mark[mark["theBest"] = 13] = "theBest";
})(mark || (mark = {}));
;
var myMark = mark.theBest;
console.log(myMark);
function print1(str) { console.log(str); }
print1('something');
function throwError(msg) { throw new Error(msg); }
// throwError('just kidding')
function notAll(a) {
    if (a === 1)
        return true;
    throwError('NEVER!!');
}
var res = notAll(1);
var chr = 'asfddsfsdf';
console.log(chr);
var n = 1324234324;
console.log(n);
var cs = 'cs2';
console.log(cs);
function isTeamAWin(teamA, teamB) {
    return teamA > teamB;
}
var getScoreDifference = function (x, y) {
    return Math.abs(x - y);
};
var _a = [13, 7], teamA = _a[0], teamB = _a[1];
console.log(isTeamAWin(teamA, teamB));
console.log(getScoreDifference(teamA, teamB));
function f(x1, x2, x3, x4, x5) {
    if (x3 === void 0) { x3 = 3; }
    if (x4 === void 0) { x4 = 4; }
    var rest = [];
    for (var _i = 5; _i < arguments.length; _i++) {
        rest[_i - 5] = arguments[_i];
    }
    console.log("x5: ".concat(x5));
    console.log("rest: ".concat(rest));
    if (x5 !== undefined) {
        return x1 + Math.pow(x2, 2) + x3 * x4 + Math.pow(x5, -1);
    }
    return x1 + Math.pow(x2, 2) + x3 * x4;
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
var Figure = /** @class */ (function () {
    function Figure() {
        this.name = "figure";
    }
    return Figure;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(r) {
        var _this = _super.call(this) || this;
        _this.name = "circle";
        _this.R = r;
        return _this;
    }
    Circle.prototype.getSquare = function () {
        return Math.pow(this.R, 2) * Math.PI;
    };
    Circle.prototype.getPerimeter = function () {
        return 2 * Math.PI * this.R;
    };
    return Circle;
}(Figure));
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(A) {
        var _this = _super.call(this) || this;
        _this.name = "square";
        _this.a = A;
        return _this;
    }
    Square.prototype.getSquare = function () {
        return Math.pow(this.a, 2);
    };
    Square.prototype.getPerimeter = function () {
        return 4 * this.a;
    };
    return Square;
}(Figure));
var circle = new Circle(10);
console.log(circle.name);
console.log(circle.getSquare());
console.log(circle.getPerimeter());
var square = new Square(10);
console.log(square.name);
console.log(square.getSquare());
console.log(square.getPerimeter());
var guest = { login: '', password: '', email: '' };
console.log(guest);
var run = function (direction, speed) {
    return "run ".concat(direction, " with speed: ").concat(speed, "m/c");
};
console.log(run('straight', 2.1));
var Side = /** @class */ (function () {
    function Side(length, metric) {
        this.length = length;
        this.metric = metric;
    }
    Side.prototype.getSide = function () {
        return "".concat(this.length).concat(this.metric);
    };
    return Side;
}());
var side = new Side(10, 'sm');
console.log(side.getSide());
var ButtonState;
(function (ButtonState) {
    ButtonState[ButtonState["pressed"] = 0] = "pressed";
    ButtonState[ButtonState["unpressed"] = 1] = "unpressed";
})(ButtonState || (ButtonState = {}));
var Button = /** @class */ (function () {
    function Button(state) {
        this.state = state;
    }
    Button.prototype.click = function () {
        this.state = ButtonState.pressed;
        this.state = ButtonState.unpressed;
        console.log('this button was clicked');
    };
    Button.prototype.press = function () {
        this.state = ButtonState.pressed;
        console.log('this button was pressed');
    };
    Button.prototype.unpress = function () {
        this.state = ButtonState.unpressed;
        console.log('this button was unpressed');
    };
    return Button;
}());
var button = new Button(ButtonState.unpressed);
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
var a = new Circle(10);
var b = a.name;
console.log(b);
var c = new Circle(10);
var d = a.name;
console.log(d);
function getNetPrice(price, discount, format) {
    var netPrice = price * (1 - discount);
    return format ? "".concat(netPrice, " \u0440\u0443\u0431.") : netPrice;
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
var Parameter = /** @class */ (function () {
    function Parameter(param) {
        this._param = param;
    }
    Object.defineProperty(Parameter.prototype, "value", {
        get: function () {
            return this._param;
        },
        set: function (value) {
            this._param = value;
        },
        enumerable: false,
        configurable: true
    });
    return Parameter;
}());
var parameter = new Parameter(123423423);
console.log(parameter.value);
var h = { value: 'adsfdfsf', type: 'string' };
console.log(h);
