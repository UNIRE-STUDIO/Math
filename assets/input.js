//GameStates = {MENU: 0, LEVEL_SELECTION: 1, READYTOPLAY: 2, PLAY: 3, PAUSE: 4, GAMEOVER: 5, WIN: 6};

export default class Input
{
    constructor(gameStates, changeState, turnOnLevel)
    {
        document.getElementById("levels-button").onclick = () => this.levelsButton_click();
        document.getElementById("back-button").onclick = () => this.backButton_click();
        let levelsButton = document.getElementsByClassName("levels");
        for (let i = 0; i < levelsButton.length; i++) {
            levelsButton[i].onclick = () => this.levels_click(i);
        }
        this.changeState = changeState;
        this.gameStates = gameStates;
        this.turnOnLevel = turnOnLevel;
    }

    backButton_click()
    {
        this.changeState(-1);
    }

    levelsButton_click()
    {
        this.changeState(this.gameStates.LEVEL_SELECTION);
    }

    levels_click(id)
    {
        this.turnOnLevel(id);
    }

    
}