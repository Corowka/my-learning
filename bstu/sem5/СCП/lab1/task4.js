
const text = `
    Римская империя — период развития древней римской государственности,
    особенностью которой является самовластная форма правления. 
    Это единственное государство в истории, в границы которого входили
    все земли побережья Средиземного моря. Период существования империи 
    считается от времени правления Октавиана Августа до распада страны на 
    Западную и Восточную империи. Этот период продолжался с 27 года до н. э.
    по 395 год н. э. Римская империя правила 422 года.
`;

class TextAnalyser {

    static isLetter(c) {
        c = c.toLowerCase();
        return 'а' <= c && c <= 'я';
    }

    static isVowel(c) {
        return "аоуэыеёиюя".includes(c);
    }

    static isSpace(c) {
        return c == ' ';
    }

    static getLetterCount(text) {
        let count = 0;
        for (const letter of text) {
            if (TextAnalyser.isLetter(letter)) {
                count++;
            }
        }
        return count;
    }

    static getСonditionCount(condition, text) {
        let count = 0;
        for (const letter of text) {
            if (condition(letter)) {
                count++;
            }
        }
        return count;
    }

}

console.log(`Количество букв: ${TextAnalyser.getСonditionCount(TextAnalyser.isLetter, text)}`)
console.log(`Количество гласных букв: ${TextAnalyser.getСonditionCount(TextAnalyser.isVowel, text)}`)
console.log(`Количество пробелов: ${TextAnalyser.getСonditionCount(TextAnalyser.isSpace, text)}`)
