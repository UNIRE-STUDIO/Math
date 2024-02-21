//GameStates = {MENU: 0, LEVEL_SELECTION: 1, READYTOPLAY: 2, PLAY: 3, PAUSE: 4, GAMEOVER: 5, WIN: 6};

export default class Input
{
    constructor()
    {
        document.getElementById("levels-button").onclick = () => this.levelsButton_click();
        document.getElementById("back-button").onclick = () => this.backButton_click();
        let levelsButton = document.getElementsByClassName("levels");
        for (let i = 0; i < levelsButton.length; i++) 
        {
            levelsButton[i].onclick = () => this.levels_click(i);
        }
        document.addEventListener('keydown', (e) => this.setKeydown(e)); 
        document.addEventListener('keyup', (e) => this.setKeyup(e));

        this.changeStateEvent;
        this.turnOnLevelEvent;

        this.numKeyEvent;
        this.backspaceEvent;
        this.enterEvent;
    }

    backButton_click()
    {
        this.changeStateEvent(-1);
    }

    levelsButton_click()
    {
        this.changeStateEvent(1); // LEVEL_SELECTION
    }

    levels_click(id)
    {
        this.turnOnLevelEvent(id);
    }

    setKeydown(e)
    {   
        let num = parseInt(e.key);
        if (!isNaN(num))
        {
            this.numKeyEvent(num);
        }

        if (e.code === "Backspace")
        {
            this.backspaceEvent();
        }

        if (e.code === "Enter")
        {
            this.enterEvent();
        }
    }

    setKeyup(e)
    {

    }
    
}