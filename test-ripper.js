let questions = document.getElementsByClassName("panel-body")[0].children
let questionParts = Array.from(questions).map(question => {
    let questionParts = question.children[0].children;
    let headerParts = questionParts[0].children;
    let correct = headerParts[0].innerText;
    let questionText = headerParts[2].innerText;

    let options = Array.from(questionParts[1].children).map(c => c.innerText);
    let explanation = Array.from(questionParts[2].children[1].children).map(c => c.innerText);

    return {
        correct, questionText, options, explanation
    }
})