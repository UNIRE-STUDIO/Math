import { randomRange } from "../general.js";
import Timer from "./timer.js";

export default class LevelManager
{
    constructor()
    {
        this.timer = new Timer(60, 60, "timer-bar", "timer-lable");
        this.expressionLable = document.getElementById("expression-lable");
        this.scoreLable = document.getElementById("score-lable");
        this.typeOfLevel = {Addition: 0, Subtraction: 1};
        this.score = 0;
        this.currentLevel;
        this.currentSubLevel;
        this.answer = 0;
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
                this.answer = randomRange(1, max);
                first = randomRange(1, this.answer);
                second = this.answer - first;
                this.expressionLable.innerHTML = first + " + " + second + " = ";
                console.log(this.answer);
                break;
        
            case this.typeOfLevel.Addition:

                break;
        }
    }

    setAnswer()
    {

    }
}