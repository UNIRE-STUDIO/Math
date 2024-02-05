import UI_Element from "./ui_element";

export let UISections = {MENU: 0, LEVEL_SELECTION: 1, READYTOPLAY: 2, PLAY: 3, PAUSE: 4, GAMEOVER: 5, WIN: 6};

export default class UI_Controller
{
    constructor()
    {
        this.ui_elements = [
            new UI_Element([document.getElementById("main-menu"),
                document.getElementById("header-label")], true),
            new UI_Element([document.getElementById("back-button"),
                document.getElementById("select-level-label")])];
    }

    turnOnSection(section)
    {
        this.ui_elements.forEach(element => {
            element.turnOff();
        });
        this.ui_elements[section].turnOn();
    }

    
}