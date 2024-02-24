//GameStates = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, GAMEOVER: 5, WIN: 6};

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
        document.getElementById("pause-button").onclick = () => this.pause_click();

        document.addEventListener('keydown', (e) => this.setKeydown(e)); 
        document.addEventListener('keyup', (e) => this.setKeyup(e));
        for (let i = 0; i < 10; i++) 
        {
            document.getElementById("key-"+i).onclick = () => this.setKeydown({key:i});

            // Отменяем действие при фокусировке
            document.getElementById("key-"+i).addEventListener('keydown', e => {if (e.code == "Enter") e.preventDefault();}); 
        }
        document.getElementById("key-b").onclick = () => this.setKeydown({code:"Backspace"});
        document.getElementById("key-b").addEventListener('keydown', e => {if (e.code == "Enter") e.preventDefault();});

        // Pause panel ------------------------------------------------
        document.getElementById("pause-panel-resume-button").onclick = () => this.resume_click();
        document.getElementById("pause-panel-levels-button").onclick = () => this.backButton_click();
        
        // ------------------------------------------------------------
        
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

    pause_click()
    {
        this.changeStateEvent(3);
    }

    resume_click()
    {
        this.changeStateEvent(2);
    }

    setKeydown(e)
    {   
        let num = parseInt(e.key);
        if (!isNaN(num))
        {
            this.numKeyEvent(num);
        }
        {
            if (e.code === "Backspace")
            {
                this.backspaceEvent();
            }

            if (e.code === "Enter")
            {
                this.enterEvent();
            }
        }
    }

    setKeyup(e)
    {

    }
    
}