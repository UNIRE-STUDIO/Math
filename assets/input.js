//GameScreens = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, GAMEOVER: 5, WIN: 6};

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
        document.getElementById("key-b").onclick = () => this.backspaceEvent();
        document.getElementById("key-b").addEventListener('keydown', e => {if (e.code == "Enter") e.preventDefault();});
        
        document.getElementById("key-minus").onclick = () => this.minusEvent();

        // Pause wrapper ------------------------------------------------
        document.getElementById("pause-wrapper-resume-button").onclick = () => this.resume_click();
        document.getElementById("pause-wrapper-levels-button").onclick = () => this.backButton_click();
        document.getElementById("pause-wrapper-restart-button").onclick = () => this.restart_click();
        // --------------------------------------------------------------
        // Game Over wrapper----------------------------------------------
        document.getElementById("game-over-wrapper-restart-button").onclick = () => this.restart_click();
        document.getElementById("game-over-wrapper-next-button").onclick = () => this.nextLevelEvent();
        // --------------------------------------------------------------
        
        this.changeScreenEvent;
        this.turnOnLevelEvent;

        this.numKeyEvent;
        this.backspaceEvent;
        this.enterEvent;
        this.minusEvent;
        this.nextLevelEvent;
    }

    backButton_click()
    {
        this.changeScreenEvent(-1);
    }

    levelsButton_click()
    {
        this.changeScreenEvent(1); // LEVEL_SELECTION
    }

    levels_click(id)
    {
        this.turnOnLevelEvent(id);
    }

    pause_click()
    {
        this.changeScreenEvent(3);
    }

    restart_click()
    {
        this.changeScreenEvent(2, 1); // Параметр 1 - начать уровень заново
    }

    resume_click()
    {
        this.changeScreenEvent(2, 2); // Параметр 2 - продолжить игру на уровне с сохранением результата
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

            if (e.code === "Enter" || e.code === "NumpadEnter")
            {
                this.enterEvent();
            }

            if (e.code === "Minus" || e.code === "NumpadSubtract")
            {
                this.minusEvent();
            }
        }
    }

    setKeyup(e)
    {

    }
    
}