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
        this.typeOfLevel = {Addition: 0, Subtraction: 1};
        this.score = 0;
        this.currentLevel;
        this.currentSubLevel;
        this.answer = 0;

        this.input = input;
        this.input.numKeyEvent = this.setNumKey.bind(this);
        this.input.backspaceEvent = this.setBackspace.bind(this);
        this.input.enterEvent = this.setAnswer.bind(this);
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
                max = (this.currentLevel + 2) * 10 - 1;
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
        if (this.answerLable.innerHTML.length > 2) return; // 8 с учётом символов пробела
        this.answerLable.innerHTML += num;

        if (this.answerLable.innerHTML.length >= this.answer.toString().length)
        {
            this.setAnswer();
        }
    }

    setBackspace()
    {
        let length = this.answerLable.innerHTML.length;
        this.answerLable.innerHTML = this.answerLable.innerHTML.slice(0, length-1);
    }

    setAnswer()
    {
        if (this.answer == this.answerLable.innerHTML) // Правильный ответ
        {
            this.nextExpression();
            this.timer.addTime(5);
        }
        else
        {
            this.nextExpression();
            this.timer.addTime(-5);
        }
    }

    gameOver()
    {
        console.log("gameover");
    }
}