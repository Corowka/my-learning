const fs = require('fs');
const readline = require("readline-sync");

function randInt(a, b) {
    return Math.round(a + Math.random() * (b - a))
}

function createInputFile(fileName, nums = { n: 10000, range: { min: 0, max: 1000 } }) {
    fs.writeFile(fileName,
        `${nums.n}\n` + Array.from({ length: nums.n }, () => randInt(nums.range.min, nums.range.max)).join('\n')
        , (err) => {
            if (err) throw err;
        });
}

function readInputFile(fileName) {
    try {
        const data = fs.readFileSync(fileName, 'utf-8').split('\n');
        data.shift();
        return data;
    } catch (e) {
        console.log(e);
    }
}

function sortData(data, reversed = false) {
    if (reversed)
        return data.sort((a, b) => b - a)
    return data.sort((a, b) => a - b)
}

function writeOutputFile(fileName, data) {
    fs.writeFile(fileName,
        `${data.length}\n` + (Array.from({ length: data.length }, (_, index) => data[index])).join('\n')
        , (err) => {
            if (err) throw err;
        });
}

function checkOutputSort(fileName) {
    const data = readInputFile('output.txt');
    const test = ((data[0].split('=')[1]) === 'true') ? (a, b) => a >= b : (a, b) => a <= b;
    for (let i = 1; i < data.length - 2; i++) {
        if (!test(+data[i], +data[i+1])) {
            console.log(data[i], data[i + 1], test(data[i], data[i+1]))
            console.log(`ERROR: BAD_SORT ${data[0]}`);
            return;
        }
    }
    console.log(`SORT IS GOOD: ${data[0]}`);
}

function menu() {
    let nums = readInputFile('input.txt');
    quit: while (true) {
        console.log(`
    1. Записать числа в файл в порядке возрастания.
    2. Записать числа в файл в порядке убывания.
    3. Проверить сортировку.
        `)
        console.log('Введите пункт меню:');
        const n = readline.prompt();
        switch (n) {
            case '1':
                writeOutputFile('output.txt',
                    ['reversed=false'].concat(sortData(nums))
                );  break quit;
            case '2':
                writeOutputFile('output.txt',
                    ['reversed=true'].concat(sortData(nums, reversed = true))
                );  break quit;
            case '3':
                checkOutputSort('output.txt');
                break quit;
            default:
                console.log('Такого пункта не существует! Попробуйте ещё раз.')
        }
    }
}

menu();
