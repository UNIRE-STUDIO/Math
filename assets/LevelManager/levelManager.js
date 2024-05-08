import { randomRange, getTimeFormat } from "../general.js";
import Сountdown from "./сountdown.js";
import SaveManager from "../saveManager.js";

export default class LevelManager
{
    constructor(input)
    {
        this.сountdown = new Сountdown(45, 45, "timer-bar", "timer-label");
        this.сountdown.timeoutEvent = this.gameOver.bind(this);
        this.scoreLabel = document.getElementById("score-label");
        this.sublevelLabel = document.getElementById("sublevel-label");
        this.typeOfLevel = {Addition: 0, Subtraction: 1, AddOrSub: 2, AddOrSubWithUnknown: 3, AddAndAdd: 4, AddAndSub: 5};
        this.countLevels = 2; // Посчитать автоматически

        this.operand1Label = document.getElementById("operand1-label");
        this.operator1Label = document.getElementById("operator1-label");
        this.operand2Label = document.getElementById("operand2-label");
        this.operator2Label = document.getElementById("operator2-label");
        this.operand3Label = document.getElementById("operand3-label");
        this.answerLabel = document.getElementById("answer-label");
        
        this.score = 0;
        this.currentLevel;
        this.currentSubLevel = 1;
        this.rightAnswer = 0;
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
        this.isLevelWithUnknown = false;

        // Присваивает класс Game
        this.gameOverEvent;
        this.saveManager;
        
        // Game over labels
        this.recordScoreLabel = document.getElementById("record-label");
        this.gameOverScoreLabel = document.getElementById("game-over-score-label");
        this.gameOverSublevelLabel = document.getElementById("game-over-sublevel-label");
        this.gameOverLabel = document.getElementById("game-over-label");
        this.rightAnswerLabel = document.getElementById("right-answer-label");
        this.wrongAnswerLabel = document.getElementById("wrong-answer-label");
        this.gameTimeLabel = document.getElementById("game-time-label");

        this.levelLabels = ["A+B=?", "A-B=?", "A±B=?", "A±?=C", "A+B-C=?"]
    }

    startLevel(level)
    {
        this.currentLevel = level;
        this.score = 0;
        this.currentSubLevel = 1;
        this.rightAnswer = 0;
        this.countRightAnswer = 0;
        this.countWrongAnswer = 0;
        this.isPause = false;
        this.operand3Label.innerHTML = "";
        this.operator2Label.innerHTML = "";

        // На каких уровнях нужно добавить минус в клавиатуру
        if (level == 1 || level == 2 || level == 5)
        {
            this.isLevelWithNegativeNum = true;
            document.getElementById("key-minus").innerHTML = "-";
        }
        else
        {
            this.isLevelWithNegativeNum = false;
            document.getElementById("key-minus").innerHTML = "";
        } 

        if (level == 3)
        {
            this.isLevelWithUnknown = true;   
        }
        else
        {
            this.isLevelWithUnknown = false;
        }

        this.countRightAnswer;
        this.sublevelLabel.innerHTML = "Уровень:" + this.currentSubLevel + "/10";

        this.сountdown.setReset();
        this.сountdown.startTo();
        this.nextExpression();
    }

    nextExpression()
    {
        this.isLockInputKey = false;
        this.answerLabel.innerHTML = "";
        let max;
        let second;
        let first;
        let third;
        switch (this.currentLevel) 
        {
            case this.typeOfLevel.Addition:
                switch (this.currentSubLevel) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        max = this.currentSubLevel * 20; // 100
                        break;
                    case 6: max = 200; break;
                    case 7: max = 400; break;
                    case 8: max = 600; break;
                    case 9: max = 800; break;
                    case 10: max = 1000; break;
                    default:
                        max = this.currentSubLevel * 100;
                        break;
                }
                this.rightAnswer = randomRange(2, max);
                first = randomRange(1, this.rightAnswer);
                second = this.rightAnswer - first;

                this.operand1Label.innerHTML = first;
                this.operator1Label.innerHTML = " + ";
                this.operand2Label.innerHTML = second;
                break;
            case this.typeOfLevel.Subtraction:
                switch (this.currentSubLevel) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        max = this.currentSubLevel * 20; // 100
                        break;
                    default:
                        max = this.currentSubLevel * 40; // 10 lvl = 400 
                        break;
                }
                second = randomRange(1, max);
                first = randomRange(1, max);
                this.rightAnswer = first - second;

                this.operand1Label.innerHTML = first;
                this.operator1Label.innerHTML = " - ";
                this.operand2Label.innerHTML = second;
                break;
            case this.typeOfLevel.AddOrSub:
                switch (this.currentSubLevel) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        max = this.currentSubLevel * 20; // 100
                        break;
                    default:
                        max = this.currentSubLevel * 40; // 10 lvl = 400 
                        break;
                }
                if (randomRange(0,2) == 0){
                    this.rightAnswer = randomRange(2, max);
                    first = randomRange(1, this.rightAnswer);
                    second = this.rightAnswer - first;

                    this.operator1Label.innerHTML = " + ";
                }
                else
                {
                    second = randomRange(1, max);
                    first = randomRange(1, max);
                    this.rightAnswer = first - second;

                    this.operator1Label.innerHTML = " - ";
                }
                this.operand1Label.innerHTML = first;
                this.operand2Label.innerHTML = second;
                break;
            case this.typeOfLevel.AddOrSubWithUnknown:
                switch (this.currentSubLevel) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        max = this.currentSubLevel * 20; // 100
                        break;
                    default:
                        max = this.currentSubLevel * 40; // 10 lvl = 400 
                        break;
                }
                if (randomRange(0,2) == 0){
                    let answer = randomRange(2, max);
                    first = randomRange(1, answer);
                    this.rightAnswer = answer - first;

                    this.operator1Label.innerHTML = " + ";
                    this.answerLabel.innerHTML = answer;
                }
                else
                {
                    this.rightAnswer = randomRange(1, max);
                    first = randomRange(1, max);
                    let answer = first - this.rightAnswer;

                    this.operator1Label.innerHTML = " - ";
                    this.answerLabel.innerHTML = answer;
                }
                this.operand2Label.innerHTML = "?";
                this.operand1Label.innerHTML = first;
                break;
            case this.typeOfLevel.AddAndAdd:
                switch (this.currentSubLevel) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        max = this.currentSubLevel * 20; // 100
                        break;
                    case 6: max = 200; break;
                    case 7: max = 400; break;
                    case 8: max = 600; break;
                    case 9: max = 800; break;
                    case 10: max = 1000; break;
                    default:
                        max = this.currentSubLevel * 100;
                        break;
                }
                this.rightAnswer = randomRange(3, max);
                let firstSecondSum = randomRange(2, this.rightAnswer);
                third = this.rightAnswer - firstSecondSum;
                first = randomRange(1, firstSecondSum);
                second = firstSecondSum - first;

                this.operator1Label.innerHTML = " + ";
                this.operator2Label.innerHTML = " + ";
                this.operand1Label.innerHTML = first;
                this.operand2Label.innerHTML = second;
                this.operand3Label.innerHTML = third;
                break;
            case this.typeOfLevel.AddAndSub:
                switch (this.currentSubLevel) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        max = this.currentSubLevel * 20; // 100
                        break;
                    default:
                        max = this.currentSubLevel * 40; // 10 lvl = 400 
                        break;
                }
                if (randomRange(0,2) == 0){
                    this.rightAnswer = randomRange(3, max);
                    let firstSecondSum = randomRange(2, this.rightAnswer);
                    third = this.rightAnswer - firstSecondSum;
                    first = randomRange(1, firstSecondSum);
                    second = firstSecondSum - first;

                    this.operator2Label.innerHTML = " + ";
                }
                else {
                    let firstSecondSum = randomRange(2, max);
                    third = randomRange(1, max);
                    this.rightAnswer = firstSecondSum - third;
                    first = randomRange(1, firstSecondSum);
                    second = firstSecondSum - first;

                    this.operator2Label.innerHTML = " - ";
                }
                this.operator1Label.innerHTML = " + ";
                this.operand1Label.innerHTML = first;
                this.operand2Label.innerHTML = second;
                this.operand3Label.innerHTML = third;
                break;
        }
    }

    setNumKey(num)
    {   
        // Если длина строки больше четырёх или блокировка ввода или пауза или первым (и единственным) знаком стоит ноль
        let checkLabel = this.isLevelWithUnknown ? this.operand2Label : this.answerLabel;
        if (checkLabel.innerHTML == "?") this.operand2Label.innerHTML = "";
        if (this.isLockInputKey 
            || this.isPause 
            || checkLabel.innerHTML.length > 4 
            || checkLabel.innerHTML === "0") return;

        checkLabel.innerHTML += num;

        if (checkLabel.innerHTML.length >= this.rightAnswer.toString().length)
        {
            this.setAnswer();
        }
    }

    setMinus()
    {
        if (this.answerLabel.innerHTML.length > 4 
            || this.isLockInputKey 
            || this.isPause 
            || this.answerLabel.innerHTML.includes("-")
            || !this.isLevelWithNegativeNum
            || this.answerLabel.innerHTML === "0") return;
        this.answerLabel.innerHTML = "-" + this.answerLabel.innerHTML;
        if (this.answerLabel.innerHTML.length >= this.rightAnswer.toString().length)
        {
            this.setAnswer();
        }
    }

    setBackspace()
    {
        if (this.isPause) return;
        let checkLabel = this.isLevelWithUnknown ? this.operand2Label : this.answerLabel;
        let length = checkLabel.innerHTML.length;
        checkLabel.innerHTML = checkLabel.innerHTML.slice(0, length-1);
        if (this.operand2Label.innerHTML.length == "") this.operand2Label.innerHTML = "?";
    }

    setAnswer()
    {
        if (this.isPause) return;
        this.isLockInputKey = true;
        let checkLabel = this.isLevelWithUnknown ? this.operand2Label : this.answerLabel;
        if (this.rightAnswer == checkLabel.innerHTML) // Правильный ответ
        {
            this.score += 10 * this.currentSubLevel;
            this.scoreLabel.innerHTML = this.score;
            
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
                this.sublevelLabel.innerHTML = "Уровень:" + this.currentSubLevel + "/10";
            }
            checkLabel.style.color = '#0EAD58';
            setTimeout(() => {
                this.nextExpression();
                checkLabel.style.color = '#000000';
            }, 800);
            
            this.сountdown.addTime(5);
        }
        else    // Неправильный ответ -------------------------------------
        {
            this.countWrongAnswer++;
            checkLabel.style.color = '#D02A11';
            setTimeout(() => {
                this.nextExpression();
                checkLabel.style.color = '#000000';
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
        this.gameOverLabel.innerHTML = this.levelLabels[this.currentLevel];
        this.gameOverScoreLabel.innerHTML = this.score;
        this.rightAnswerLabel.innerHTML = this.countRightAnswer;
        this.wrongAnswerLabel.innerHTML = this.countWrongAnswer;
        this.gameOverSublevelLabel.innerHTML = this.currentSubLevel + "/10<br/>Уровень";
        this.gameTimeLabel.innerHTML = getTimeFormat(this.сountdown.gameTime);
        this.recordScoreLabel.innerHTML = this.saveManager.records[this.currentLevel];

        
        this.gameOverEvent();
    }
}