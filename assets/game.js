import GameLoop from "./gameLoop.js";
import Input from "./input.js";
import UI_Controller from "./ui_controller.js";
import LevelManager from "./LevelManager/levelManager.js";
export let GameStates = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, GAMEOVER: 4, WIN: 5};

export default class Game
{
    constructor()
    {
        this.ui_controller = new UI_Controller();
        this.currentState;
        this.changeState(4);
        new GameLoop(this.update.bind(this), this.render.bind(this));
        this.input = new Input();
        this.input.changeStateEvent = this.changeState.bind(this);
        this.input.turnOnLevelEvent = this.turnOnLevel.bind(this);

        this.levelManager = new LevelManager(this.input); // Создавать сразу?
        this.levelManager.gameOverEvent = this.changeState.bind(this, GameStates.GAMEOVER);
    }

    changeState(state)
    {
        if (state != -1) this.ui_controller.turnOnSection(state);
        switch (state) {
            case GameStates.MENU:
                this.currentState = GameStates.MENU;
            break;
            case GameStates.LEVEL_SELECTION:
                if (this.currentState == GameStates.PAUSE)
                {
                    this.levelManager.setReset();
                }
                this.currentState = GameStates.LEVEL_SELECTION;
            break;
            case GameStates.PLAY:
                if (this.currentState != GameStates.PAUSE)
                    this.levelManager.startLevel(0);
                else
                    this.levelManager.setResume();

                this.currentState = GameStates.PLAY;
            break;
            case GameStates.PAUSE:
                this.levelManager.setPause();

                this.currentState = GameStates.PAUSE;
            break;
            case GameStates.GAMEOVER:

                this.currentState = GameStates.GAMEOVER;
            break;
            case -1:
                if (this.currentState == GameStates.LEVEL_SELECTION) this.changeState(GameStates.MENU);
                if (this.currentState == GameStates.PAUSE) this.changeState(GameStates.LEVEL_SELECTION);
            break;
        }
    }

    turnOnLevel(id)
    {
        this.changeState(GameStates.PLAY);
    }

    update()
    {   
        
    }   

    render()
    {

    }
}

new Game();

