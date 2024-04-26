import { randomRange, getTimeFormat } from "../general.js";
import Сountdown from "./сountdown.js";
import SaveManager from "../saveManager.js";

export default class LevelManager
{
    constructor(input)
    {
        this.сountdown = new Сountdown(45, 45, "timer-bar", "timer-lable");
        this.сountdown.timeoutEvent = this.gameOver.bind(this);
        this.expressionLable = document.getElementById("expression-lable");
        this.scoreLable = document.getElementById("score-lable");
        this.answerLable = document.getElementById("answer-lable");
        this.sublevelLable = document.getElementById("sublevel-lable");
        this.typeOfLevel = {Addition: 0, Subtraction: 1};
        this.countLevels = 2; // Посчитать автоматически
        
        this.score = 0;
        this.currentLevel;
        this.currentSubLevel = 1;
        this.answer = 0;
        this.countRightAnswer = 0;
        this.countWrongAnswer = 0;

        this.input = input;
        this.input.numKeyEvent = this.setNumKey.bind(this);
        this.input.backspaceEvent = this.setBackspace.bind(this);
        this.input.enterEvent = this.setAnswer.bind(this);
        this.input.minusEvent = this.setMinus.bind(this);

        this.isLockInputKey = false;
        this.isPause = false;
        this.isLevelWithNegativeNum = false;

        // Присваивает класс Game
        this.gameOverEvent;
        this.saveManager;
        
        // Game over lables
        this.recordScoreLable = document.getElementById("record-lable");
        this.gameOverScoreLable = document.getElementById("game-over-score-lable");
        this.gameOverSublevelLable = document.getElementById("game-over-sublevel-lable");
        this.gameOverLabel = document.getElementById("game-over-lable");
        this.rightAnswerLable = document.getElementById("right-answer-lable");
        this.wrongAnswerLable = document.getElementById("wrong-answer-lable");
        this.gameTimeLable = document.getElementById("game-time-lable");

        this.levelLables = ["A+B=?", "A-B=?", "A±B=?"]
    }

    startLevel(level)
    {
        this.currentLevel = level;
        this.score = 0;
        this.currentSubLevel = 1;
        this.answer = 0;
        this.countRightAnswer = 0;
        this.countWrongAnswer = 0;
        this.isPause = false;

        // На каких уровнях нужно добавить минус в клавиатуру
        if (level == 1)
        {
            this.isLevelWithNegativeNum = true;
            document.getElementById("key-minus").innerHTML = "-";
        }
        else
        {
            this.isLevelWithNegativeNum = false;
            document.getElementById("key-minus").innerHTML = "";
        } 

        this.countRightAnswer;
        this.sublevelLable.innerHTML = "Уровень:" + this.currentSubLevel + "/10";

        this.сountdown.setReset();
        this.сountdown.startTo();
        this.nextExpression();
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
                max = this.currentSubLevel * 20 - 1;
                this.answer = randomRange(2, max);
                first = randomRange(1, this.answer);
                second = this.answer - first;
                this.expressionLable.innerHTML = first + " + " + second + " = ";
                break;
        
            case this.typeOfLevel.Subtraction:
                max = this.currentSubLevel * 20;
                second = randomRange(1, max);
                first = randomRange(1, max);
                this.answer = first - second;
                this.expressionLable.innerHTML = first + " - " + second + " = ";
                break;
        }
    }

    setNumKey(num)
    {   // Если длина строки больше четырёх или блокировка ввода или пауза или первым (и единственным) знаком стоит ноль
        if (this.answerLable.innerHTML.length > 4 
            || this.isLockInputKey 
            || this.isPause 
            || this.answerLable.innerHTML === "0") return;
        this.answerLable.innerHTML += num;

        if (this.answerLable.innerHTML.length >= this.answer.toString().length)
        {
            this.setAnswer();
        }
    }

    setMinus()
    {
        if (this.answerLable.innerHTML.length > 4 
            || this.isLockInputKey 
            || this.isPause 
            || this.answerLable.innerHTML.includes("-")
            || !this.isLevelWithNegativeNum
            || this.answerLable.innerHTML === "0") return;
        this.answerLable.innerHTML = "-" + this.answerLable.innerHTML;
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
            this.score += 10 * this.currentSubLevel;
            this.scoreLable.innerHTML = this.score;
            
            // Если рекорд, то сохраняем
            if (this.score > this.saveManager.records[this.currentLevel])
            {
                let newRecords = this.saveManager.records;
                newRecords[this.currentLevel] = this.score;
                this.saveManager.saveRecords(newRecords);
            }

            if (++this.countRightAnswer % 5 == 0)
            {
                this.currentSubLevel++;
                this.sublevelLable.innerHTML = "Уровень:" + this.currentSubLevel + "/10";
            }
            this.answerLable.style.color = '#0EAD58';
            setTimeout(() => {
                this.nextExpression();
                this.answerLable.style.color = '#000000';
            }, 800);
            
            this.сountdown.addTime(5);
        }
        else    // Неправильный ответ -------------------------------------
        {
            this.countWrongAnswer++;
            this.answerLable.style.color = '#D02A11';
            setTimeout(() => {
                this.nextExpression();
                this.answerLable.style.color = '#000000';
            }, 800);
            this.сountdown.addTime(-5);
        }
    }

    setPause()
    {
        this.isPause = true;
        this.сountdown.setPause();
    }

    setResume()
    {
        this.isPause = false;
        this.сountdown.startTo();
    }

    setRestart()
    {
        this.startLevel(this.currentLevel);
    }

    gameOver()
    {
        console.log("game-over");
        this.gameOverLabel.innerHTML = this.levelLables[this.currentLevel];
        this.gameOverScoreLable.innerHTML = this.score;
        this.rightAnswerLable.innerHTML = this.countRightAnswer;
        this.wrongAnswerLable.innerHTML = this.countWrongAnswer;
        this.gameOverSublevelLable.innerHTML = this.currentSubLevel + "/10<br/>Уровень";
        this.gameTimeLable.innerHTML = getTimeFormat(this.сountdown.gameTime);
        this.recordScoreLable.innerHTML = this.saveManager.records[this.currentLevel];

        
        this.gameOverEvent();
    }
}