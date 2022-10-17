import { quizData } from "./data/quizData.js";

const createQuestions = (arrData) => {
    const quizShowcase = document.querySelector('#quizShowcase');

    for(let question of arrData) {
        const questionBlock = document.createElement('div');
        questionBlock.classList = 'q-block';
        questionBlock.innerHTML = `<p class='q-category'>${question.category}</p>
                                <p class='q-text'>${question.question}</p>`;

        const options = [question.correct_answer, ...question.incorrect_answers];
        const questionOptions = document.createElement('div');
        questionOptions.classList = 'q-options';

        for(let option of options) {
            questionOptions.innerHTML += `<span class='q-option'>${option}</span>`
        }

        questionBlock.appendChild(questionOptions);
        quizShowcase.appendChild(questionBlock);
    }

    document.body.appendChild(quizShowcase);
}

const startQuiz = () => {
    createQuestions(quizData)
}

startQuiz()
