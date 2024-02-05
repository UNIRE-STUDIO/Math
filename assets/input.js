//GameStates = {MENU: 0, LEVEL_SELECTION: 1, READYTOPLAY: 2, PLAY: 3, PAUSE: 4, GAMEOVER: 5, WIN: 6};

export default class Input
{
    constructor(gameStates, changeState)
    {
        document.getElementById("levels-button").onclick = () => this.levelsButton_click();
        document.getElementById("back-button").onclick = () => this.backButton_click();
        document.getElementsByClassName("levels") // туууут
        this.changeState = changeState;
        this.gameStates = gameStates;
    }

    backButton_click()
    {
        this.changeState(-1);
    }

    levelsButton_click()
    {
        this.changeState(this.gameStates.LEVEL_SELECTION);
    }

    
}