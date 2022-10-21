import { nextQuestion } from "../index.js";

class Timer {
    constructor(durationDisplay, nextBtn, callbacks) {
        this.durationDisplay = durationDisplay;
        this.nextBtn = nextBtn;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.nextBtn.addEventListener('click', this.next);

        this.durationDisplay.innerText = '20';
    }

    startTimer = () => {
        if (this.onStart) {
            this.onStart(this.timeLeft)
        }

        this.interval = setInterval(this.tick, 50)
    }

    resetTimer = () => {
        clearInterval(this.interval)
        this.timeLeft = 20;
    }

    next = () => {
        this.resetTimer();
        this.startTimer();
    }

    tick = () => {
        if (this.timeLeft <= 0) {
            if (this.onComplete) {
                this.onComplete();
            }
            this.next()
            nextQuestion()
            
        } else {
            this.timeLeft = this.timeLeft - 0.05
            if (this.onTick) {
                this.onTick(this.timeLeft);
            }
        }
    }

    get timeLeft() {
        return parseFloat(this.durationDisplay.innerText)
    }

    set timeLeft(time) {
        if(this.timeLeft < 10) {
            this.durationDisplay.style.left = '35%'
            this.durationDisplay.classList.add('warning')
        } else {
            this.durationDisplay.style.left = '33%';
            this.durationDisplay.classList.remove('warning')
        }
        this.durationDisplay.innerText = time.toFixed(2)
    }
}


const durationDisplay = document.querySelector('.durationDisplay')
const nextBtn = document.querySelector('#nextBtn')
const timerCircle = document.querySelector('#timerCircle')

const perimeter = timerCircle.getAttribute('r') * 2 * Math.PI;
timerCircle.setAttribute('stroke-dasharray', perimeter)

let timerDuration;
const newTimer  = new Timer(durationDisplay, nextBtn, {
    onStart(duration) {
        timerDuration = duration;
    },
    onTick(timeLeft) {
        timerCircle.setAttribute('stroke-dashoffset',
        perimeter * timeLeft / timerDuration) - perimeter
    },
    onComplete() {
        this.resetTimer()
    }
});

newTimer.startTimer()