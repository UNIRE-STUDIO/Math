import UI_Element from "./ui_element.js";

export let UISections = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, GAMEOVER: 4, WIN: 5};

export default class UI_Controller
{
    constructor()
    {
        this.currentSection;
        this.ui_elements = [
            new UI_Element([document.getElementById("main-menu"),
                            document.getElementById("header-label")],true),
            new UI_Element([document.getElementById("back-button"),
                            document.getElementById("select-level-label"),
                            document.getElementById("levels-grid")]),
            new UI_Element([document.getElementById("game-panel"),
                            document.getElementById("level-label"),
                            document.getElementById("pause-button"),
                            document.getElementById("score-label")])];
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

    
}