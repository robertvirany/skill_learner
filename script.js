document.addEventListener("DOMContentLoaded", loadQuestions);

function addQuestion() {
    const questionInput = document.getElementById("questionInput");
    const questionText = questionInput.value.trim();
    if (questionText) {
        const question = {
            id: Date.now(),
            text: questionText,
            answer: ""
        };
        const questions = getQuestions();
        questions.push(question);
        saveQuestions(questions);
        questionInput.value = "";
        renderQuestions();
    }
}

function renderQuestions() {
    const questionsList = document.getElementById("questionsList");
    questionsList.innerHTML = "";
    const questions = getQuestions();
    questions.forEach(question => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${question.text}</span>
            <input type="text" placeholder="Enter answer here" value="${question.answer}" oninput="updateAnswer(${question.id}, this.value)">
        `;
        questionsList.appendChild(li);
    });
}

function updateAnswer(id, answer) {
    const questions = getQuestions();
    const question = questions.find(q => q.id === id);
    if (question) {
        question.answer = answer;
        saveQuestions(questions);
    }
}

function getQuestions() {
    const questions = localStorage.getItem("questions");
    return questions ? JSON.parse(questions) : [];
}

function saveQuestions(questions) {
    localStorage.setItem("questions", JSON.stringify(questions));
}

function loadQuestions() {
    renderQuestions();
}
