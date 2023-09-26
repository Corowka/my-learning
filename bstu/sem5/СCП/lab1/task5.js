function split(s, sep=' ') {
    const arr = [];
    let word = '';
    for (let c of s) {
        if (c === sep) {
            arr.push(word)
            word = '';
        } else {
            word += c;
        }
    }
    arr.push(word)
    return arr;
}

const str = 'hello, Java Scrypt!';
console.log(split(str, sep=','));