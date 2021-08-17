
let questions = require('./test-3.json').concat(require('./test-2.json')).concat(require('./test-1.json'))
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let questionIndex = 0;
let readyForNext = false;

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
        let incorrectOptionsMode = false;

        questions[questionIndex].explanation.forEach(e => {
            if (String(e).toLowerCase().includes("incorrect")) {
                incorrectOptionsMode = true;
            }
            incorrectOptionsMode ? logRed(e) : logGreen(e);
        });
    }

    readyForNext = !readyForNext;
});