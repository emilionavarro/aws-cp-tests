
let questions = require('./test-3.json').concat(require('./test-2.json')).concat(require('./test-1.json'))
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let questionIndex = 0;
let readyForNext = false;

console.log('\033[2J');
console.log("\x1b[31m%s\x1b[0m", `Question ${questionIndex + 1}`);
console.log("\x1b[33m%s\x1b[0m", questions[questionIndex].questionText);
questions[questionIndex].options.forEach((o, i) => console.log(o));

process.stdin.on('keypress', function (chunk, key) {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    }
    if (readyForNext) {
        if (questionIndex === questions.length - 1) {
            console.log('\033[2J');
            console.log('nice');
            process.exit();
        }
        questionIndex++;
        console.log('\033[2J');
        console.log("");
        console.log("\x1b[31m%s\x1b[0m", `Question ${questionIndex + 1}`);
        console.log("\x1b[33m%s\x1b[0m", questions[questionIndex].questionText);
        questions[questionIndex].options.forEach(o => {
            console.log(o);
        });
    } else {
        let incorrectOptionsMode = false;

        questions[questionIndex].explanation.forEach(e => {
            if (String(e).toLowerCase().includes("incorrect")) {
                incorrectOptionsMode = true;
            }

            if (incorrectOptionsMode) {
                console.log("\x1b[31m%s\x1b[0m", e)
            } else {
                console.log("\x1b[32m%s\x1b[0m", e)
            }
        });
    }

    readyForNext = !readyForNext;
});