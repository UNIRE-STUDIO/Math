import Timer from "./timer.js";

export default class LevelManager
{
    constructor()
    {
        this.timer = new Timer(120, 120, "timer-bar", "timer-lable");
    }

    startTimer()
    {
        this.timer.startTo();
    }

    addTimeBonus()
    {

    }
}