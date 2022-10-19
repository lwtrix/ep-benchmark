import { quizData } from "./data/quizData.js";
const nextBtn = document.querySelector('#nextBtn');
const resultsContainer = document.querySelector('#resultsContainer');
let questionCount = -1;
let currAnswer;
const answers = [];



const selectOption = (e) => {
    // console.log(quizData[questionCount].correct_answer)
    // console.log(questionCount)

    // if(e.target.textContent == quizData[questionCount].correct_answer) {
    //     console.log('correct')
    // } else {
    //     console.log('incorrect')
    // }

    currAnswer = e.target.textContent;

    const optionsElements = document.querySelectorAll('.q-option');

    for(let option of optionsElements) {
        option.classList.remove('selected')
    }

    e.target.classList.add('selected')
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

const displayResults = (resultsArr, score) => {
    const correctCountDisplay = document.querySelector('#correctCountDisplay');
    const wrongCountDisplay = document.querySelector('#wrongCountDisplay');

    const correctPercentage = (100 * score) / quizData.length;
    const wrongPercentage = ((100 * score) / quizData.length) - 100;

    const correctPercentageDisplay = document.querySelector('#correctPercentageDisplay');
    const wrongPercentageDisplay = document.querySelector('#wrongPercentageDisplay');

    correctPercentageDisplay.innerHTML = `${correctPercentage}%`;
    wrongPercentageDisplay.innerHTML = `${wrongPercentage}%`

    correctCountDisplay.innerHTML = `${score}/${quizData.length} questions`
    wrongCountDisplay.innerHTML = `${quizData.length - score}/${quizData.length} questions`

}

const createResults = () => {
    const results = [];
    let score = 0;

    for(let i = 0; i < quizData.length; i++) {
            results.push({
                'question': quizData[i].question,
                'correct': quizData[i].correct_answer,
                'givenAnswer': answers[i]
            })
    }

    for(let result of results) {
        if(result.correct === result.givenAnswer) {
            score++;
        }
    }

    displayResults(results, score)
}

const nextQuestion = () => {
    if(currAnswer) {
        answers.push(currAnswer);
    }

    questionCount++
    const quizBlocks = quizShowcase.children;

    for(let child of quizBlocks) {
        child.style.display = 'none';
    }

    if(questionCount >= 0 && questionCount < quizData.length) {
        quizBlocks[questionCount].style.display = 'flex';
        console.log(questionCount, quizBlocks[questionCount], quizBlocks.length)
    } 

    if(questionCount === quizData.length) {
        document.querySelector('#benchmarkContainer').classList.add('hide')
        document.querySelector('#resultsContainer').classList.remove('hide')
        // switchResults()
        createResults()
    }

}

const startQuiz = () => {
    createQuestions(quizData);
    nextQuestion()
}


nextBtn.addEventListener('click', nextQuestion);
startQuiz()

