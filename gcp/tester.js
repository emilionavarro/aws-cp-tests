
let questions = require('./test-1.json');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let questionIndex = 0;
let readyForNext = false;

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

questions = shuffle(questions);
const clearScreen = () => console.log('\033[2J');
const getColorLoggerAndLog = (color) => (msg) => console.log(`${color}%s\x1b[0m`, msg);
const logRed = (msg) => getColorLoggerAndLog('\x1b[31m')(msg);
const logGreen = (msg) => getColorLoggerAndLog('\x1b[32m')(msg);
const logYellow = (msg) => getColorLoggerAndLog('\x1b[33m')(msg);

clearScreen();
logRed(`Question ${questionIndex + 1}`)

logYellow(questions[questionIndex].questionText);
questions[questionIndex].options.forEach((o, i) => console.log(`${i} -> ${o.replace('\n\n', '')}`));


process.stdin.on('keypress', function (chunk, key) {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    }
    if (readyForNext) {
        if (questionIndex === questions.length - 1) {
            clearScreen();
            console.log('nice');
            process.exit();
        }
        questionIndex++;
        clearScreen();
        console.log("");
        logRed(`Question ${questionIndex + 1}`);
        logYellow(questions[questionIndex].questionText);
        questions[questionIndex].options.forEach((o, i) => console.log(`${i} -> ${o.replace('\n\n', '')}`));

    } else {
        if (questions[questionIndex].options[chunk] === questions[questionIndex].correct) {
            console.log('');
            logGreen('************');
            logGreen('* Correct! *');
            logGreen('************');
            console.log('');
        } else {
            console.log('');
            logRed('**************');
            logRed('* Incorrect! *');
            logRed('**************');
            console.log('');
        }
        logYellow('Your answer: ' + questions[questionIndex].options[chunk]);
        logGreen('Correct answer: ' + questions[questionIndex].correct);
        logYellow('Explanation: ' + questions[questionIndex].explanation);
    }

    readyForNext = !readyForNext;
});