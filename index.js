import { quizData } from "./data/quizData.js";
import generateChart from "./scripts/chart.js";

const nextBtn = document.querySelector('#nextBtn');
const questionCountDisplay = document.querySelector('#questionCountDisplay');

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
    console.log(currAnswer)
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

const styleChartText = (hasPassed) => {
    const chartText = document.querySelector('#chartText');

     if(hasPassed) {
        const statusText = document.querySelector('#statusText');
        statusText.style.color = '#00ffff';
     } else {
         chartText.innerHTML = `<div class="top">
                                    <p>Too bad!</p>
                                    <p id="statusText">You failed the exam</p>
                                </div>
                                <p class="bottom">Keep calm though and have a go next time.</p>`

        const statusText = document.querySelector('#statusText')
        statusText.style.color = '#d20094';
     }
}

const fetchAndDisplayResults = (resultsArr, score) => {
    const correctCountDisplay = document.querySelector('#correctCountDisplay');
    const wrongCountDisplay = document.querySelector('#wrongCountDisplay');

    const correctPercentage = ((100 * score) / quizData.length).toFixed(2);
    const wrongPercentage = (100 - ((100 * score) / quizData.length)).toFixed(2);

    const correctPercentageDisplay = document.querySelector('#correctPercentageDisplay');
    const wrongPercentageDisplay = document.querySelector('#wrongPercentageDisplay');

    correctPercentageDisplay.innerHTML = `${correctPercentage}%`;
    wrongPercentageDisplay.innerHTML = `${wrongPercentage}%`

    correctCountDisplay.innerHTML = `${score}/${quizData.length} questions`
    wrongCountDisplay.innerHTML = `${quizData.length - score}/${quizData.length} questions`

    const wrong = quizData.length - score;
    const hasPassed = correctPercentage >= 60 ? true : false;

    

     generateChart(wrong, score);
     styleChartText(hasPassed)
}

const createResults = () => {
    const results = [];
    let score = 0;

    for(let i = 0; i < quizData.length; i++) {
            if (answers[i]) {
                results.push({
                    'question': quizData[i].question,
                    'correct': quizData[i].correct_answer,
                    'givenAnswer': answers[i]
                })
            } else {
                results.push({
                    'question': quizData[i].question,
                    'correct': quizData[i].correct_answer,
                    'givenAnswer': 'No Answer'
                })
            }

            
    }

    for(let result of results) {
        if(result.correct === result.givenAnswer) {
            score++;
        }
    }

    console.log(results)

    fetchAndDisplayResults(results, score);
}

const nextQuestion = () => {

    if(currAnswer) {
        answers.push(currAnswer);
    }
    currAnswer = 'No answer';
    questionCount++
    const quizBlocks = quizShowcase.children;

    for(let child of quizBlocks) {
        child.style.display = 'none';
    }

    if(questionCount >= 0 && questionCount < quizData.length) {
        quizBlocks[questionCount].style.display = 'flex';
        console.log(questionCount, quizBlocks[questionCount], quizBlocks.length)

        questionCountDisplay.innerHTML = `Question ${questionCount}<span>/${quizData.length}</span>`        
    } 

    if(questionCount === quizData.length) {
        document.querySelector('#benchmarkContainer').classList.add('hide')
        document.querySelector('#resultsContainer').classList.remove('hide')
        
        createResults()
    }

}

const startQuiz = () => {

    createQuestions(quizData);
    nextQuestion()
}


nextBtn.addEventListener('click', nextQuestion);
startQuiz()

export {nextQuestion}
