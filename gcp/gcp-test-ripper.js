let questions = document.getElementsByClassName("detailed-result-panel--detailed-result-panel--lQcl7")[0].children;
let questionParts = Array.from(questions).map(question => {
    let parts = question.children[0].children;
    if (parts.length < 4) {
        return null;
    } else {
        let options = Array.from(parts[3].children).map(x => x.innerText);
        let correct = options.find(x => x.toLowerCase().includes("(correct)")).replace("(Correct)", "").replace("\n", "");
        let questionText = parts[2].innerText;
        let explanation = parts[4].children[1].innerText;
        const formattedOptions = options.map(x => x.replace("(Correct)", "").replace("\n", ""));
        return { options: formattedOptions, correct, questionText, explanation };

    }
}).filter(x => x !== null);
JSON.stringify(questionParts);