import { randomRange } from "../general.js";
import Timer from "./timer.js";

export default class LevelManager
{
    constructor(input)
    {
        this.timer = new Timer(45, 45, "timer-bar", "timer-lable");
        this.timer.timeoutEvent = this.gameOver.bind(this);
        this.expressionLable = document.getElementById("expression-lable");
        this.scoreLable = document.getElementById("score-lable");
        this.answerLable = document.getElementById("answer-lable");
        this.subLevelLable = document.getElementById("sub-level-lable");
        this.typeOfLevel = {Addition: 0, Subtraction: 1};
        this.score = 0;
        
        this.currentLevel;
        this.currentSubLevel = 1;
        this.answer = 0;
        this.countRightAnswer = 0;

        this.input = input;
        this.input.numKeyEvent = this.setNumKey.bind(this);
        this.input.backspaceEvent = this.setBackspace.bind(this);
        this.input.enterEvent = this.setAnswer.bind(this);

        this.isLockInputKey = false;
        this.isPause = false;

        this.gameOverEvent;
    }

    startLevel(level)
    {
        this.currentLevel = level;
        this.timer.startTo();
        this.nextExpression();
    }

    addTimeBonus()
    {

    }

    nextExpression()
    {
        this.isLockInputKey = false;
        this.answerLable.innerHTML = "";
        let max;
        let second;
        let first;
        switch (this.currentLevel) 
        {
            case this.typeOfLevel.Addition:
                // max = (this.currentLevel + 2) * 10 - 1;
                // this.answer = randomRange(1, max);
                // first = max - this.answer;
                // second = this.answer - first;
                // this.expressionLable.innerHTML = first + " + " + second + " = ";
                // console.log(this.answer);
                max = (this.currentSubLevel + 1) * 10 - 1;
                this.answer = randomRange(2, max);
                first = randomRange(1, this.answer);
                second = this.answer - first;
                this.expressionLable.innerHTML = first + " + " + second + " = ";
                break;
        
            case this.typeOfLevel.Addition:

                break;
        }
    }

    setNumKey(num)
    {
        if (this.answerLable.innerHTML.length > 3 || this.isLockInputKey || this.isPause) return;
        this.answerLable.innerHTML += num;

        if (this.answerLable.innerHTML.length >= this.answer.toString().length)
        {
            this.setAnswer();
        }
    }

    setBackspace()
    {
        if (this.isPause) return;
        let length = this.answerLable.innerHTML.length;
        this.answerLable.innerHTML = this.answerLable.innerHTML.slice(0, length-1);
    }

    setAnswer()
    {
        if (this.isPause) return;
        this.isLockInputKey = true;
        if (this.answer == this.answerLable.innerHTML) // Правильный ответ
        {
            //this.countRightAnswer++;
            if (++this.countRightAnswer % 5 == 0)
            {
                this.currentSubLevel++;
                this.subLevelLable.innerHTML = "Уровень:" + this.currentSubLevel + "/10";
            }
            setTimeout(() => {
                this.nextExpression();
            }, 600);
            
            this.timer.addTime(5);
        }
        else
        {
            setTimeout(() => {
                this.nextExpression();
            }, 600);
            this.timer.addTime(-5);
        }

    }

    setPause()
    {
        this.isPause = true;
        this.timer.setPause();
    }

    setResume()
    {
        this.isPause = false;
        this.timer.startTo();
    }

    setReset()
    {
        this.timer.setReset();
    }

    gameOver()
    {
        console.log("gameover");
        this.gameOverEvent();
    }
}