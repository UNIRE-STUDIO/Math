import ProgressBar from "./progressbar.js";
import UI_Element from "./ui_element.js";

export let UISections = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, GAMEOVER: 4, WIN: 5};

export default class UI_Controller
{
    constructor()
    {
        this.currentSection;
        this.ui_elements = [
            new UI_Element([document.getElementById("main-menu"),           // Меню
                            document.getElementById("header-label"),
                            document.getElementById("menu-wrapper")],true),
            new UI_Element([document.getElementById("back-button"),         // Уровни
                            document.getElementById("select-level-label"),
                            document.getElementById("levels-grid"),
                            document.getElementById("menu-wrapper")]),
            new UI_Element([document.getElementById("game-panel"),          // Интерфейс игры
                            document.getElementById("level-label"),
                            document.getElementById("pause-button"),
                            document.getElementById("score-label")])];

        this.timerBar;
    }

    turnOnSection(section)
    {
        if (this.currentSection == section) return;
        this.ui_elements.forEach(element => {
            element.turnOff();
        });
        this.ui_elements[section].turnOn();
        this.currentSection = section;
    }

    startTimer()
    {
        this.timerBar = new ProgressBar(45, 45, "timer-bar");
        //arg1 -> step length
        //arg2 -> time(ms)
        this.timerBar.startTo();
    }

    addTimeBonus()
    {

    }
    
}