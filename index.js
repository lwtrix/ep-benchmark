import { quizData } from "./data/quizData.js";
const nextBtn = document.querySelector('#nextBtn');
let questionCount = -1;

const selectOption = (e) => {
    console.log(quizData[questionCount].correct_answer)
    console.log(questionCount)

    if(e.target.textContent == quizData[questionCount].correct_answer) {
        console.log('correct')
    } else {
        console.log('incorrect')
    }
}

const createQuestions = (arrData) => {
    const quizShowcase = document.querySelector('#quizShowcase');

    for(let question of arrData) {
        const questionBlock = document.createElement('div');
        questionBlock.classList = 'q-block';
        questionBlock.style.display = 'none';
        questionBlock.innerHTML = `<p class='q-category'>${question.category}</p>
                                <p class='q-text'>${question.question}</p>`;

        const options = [question.correct_answer, ...question.incorrect_answers];
        const questionOptions = document.createElement('div');
        questionOptions.classList = 'q-options';

        for(let option of options) {
            questionOptions.innerHTML += `<span class='q-option'}>${option}</span>`
        }        
    
        questionBlock.appendChild(questionOptions);
        quizShowcase.appendChild(questionBlock);
    }

    const optionsElements = document.querySelectorAll('.q-option');
    for(let option of optionsElements) {
        option.addEventListener('click', selectOption)
    }

    
}

const nextQuestion = () => {
    questionCount++
    const quizBlocks = quizShowcase.children;

    for(let child of quizBlocks) {
        child.style.display = 'none';
    }

    if(questionCount >= 0) {
        quizBlocks[questionCount].style.display = 'flex';
        console.log(questionCount, quizBlocks[questionCount], quizBlocks.length)
        if(questionCount === quizBlocks.length - 1) {
            nextBtn.setAttribute('disabled', '')
        }
    } 

}

const startQuiz = () => {
    createQuestions(quizData);
    nextQuestion()
}


nextBtn.addEventListener('click', nextQuestion);
startQuiz()

