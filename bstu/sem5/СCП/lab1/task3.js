function randInt(a, b) {
    return Math.round(a + Math.random() * (0.5 + b - a));
}

function createWord(n) {
    const alph = [];
    for (let i = 'a'.charCodeAt(); i < 'z'.charCodeAt(); i++) {
        const letter = String.fromCharCode(i);
        if (!"aeiouy".includes(letter)) {
            alph.push(letter);
        }
    }
    return Array.from({length: n}, () => alph[randInt(0, alph.length)]).join('');
}

console.log(createWord(100
    ));