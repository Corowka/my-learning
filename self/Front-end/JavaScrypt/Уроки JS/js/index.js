function isPolindrom(value) {
    value = (typeof(value) !== 'string') ? String(value) : value;
    let strLen = value.length;
    let strHalfLen = Math.floor(strLen / 2);
    for (let i = 0; i < strHalfLen; i++) {
        if (value[i] !== value[strLen - 1 - i])
            return false;
    }
    return true;
}

function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

let fibonacci_ = function(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

let fibonacci__ = n => (n < 2) ? n : fibonacci(n - 1) + fibonacci(n - 2);

function findShort(words) {
    let shortest_word = '';
    let curent_word = '';
    let min_len = Infinity;
    let len = 0;
    let size = words.length;
    for (let i = 0; i < size; i++) {
        if ('A' <= words[i] && words[i] <= 'z') {
            curent_word += words[i];
            len++;
        } else {
            if (curent_word != '' && min_len > len) {
                shortest_word = curent_word;
                min_len = len;
            }
            curent_word = '';
            len = 0;
        }
    }
    return shortest_word;
}

var toInitials = fullName => {
    let initials = '';
    let size = fullName.length;
    initials += fullName[0] + '.';
    for (let i = 2; i < size; i++)
        if (fullName[i] == ' ')
            initials += ' ' + fullName[i + 1].toUpperCase() + '.';
    return initials;
}

var sumDidgits = didgit => {
    if (typeof(didgit) != 'string')
        didgit = String(didgit);
    let sum = 0;
    let size = didgit.length;
    for (let i = 0; i < size; i++)
        if ('0' <= didgit[i] && didgit[i] <= '9') {
            sum += didgit[i] - '0';
            console.log(didgit[i]);
        }
    return sum;
}

function minMax(array) {
    let size = array.length;
    let minMaxArr = [Infinity, 0];
    for (let i = 0; i < size; i++) {
        console.log(array[i]);
        if (array[i] < minMaxArr[0])
            minMaxArr[0] = array[i];
        if (array[i] > minMaxArr[1])
            minMaxArr[1] = array[i];
    }
    return minMaxArr;
}

function accum(str) {
    let repeats = 2;
    let size = str.length;
    let resault = str[0].toUpperCase();
    for (let i = 1; i < size; i++) {
        resault += '-';
        resault += str[i].toUpperCase();
        for (let j = 1; j < repeats; j++)
            resault += str[i].toLowerCase();
        repeats++;
    }
    return resault;
}