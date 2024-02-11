import GameLoop from "./gameLoop.js";
import Input from "./input.js";
import UI_Controller from "./ui_controller.js";
export let GameStates = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, GAMEOVER: 4, WIN: 5};

export default class Game
{
    constructor()
    {
        this.ui_controller = new UI_Controller();
        this.currentState;
        this.changeState(0);
        new GameLoop(this.update.bind(this), this.render.bind(this));
        new Input(GameStates, this.changeState.bind(this), this.turnOnLevel.bind(this));
        this.levelManager;
    }

    changeState(state)
    {
        switch (state) {
            case GameStates.MENU:
                this.ui_controller.turnOnSection(GameStates.MENU);
                this.currentState = GameStates.MENU;
            break;
            case GameStates.LEVEL_SELECTION:
                this.ui_controller.turnOnSection(GameStates.LEVEL_SELECTION);
                this.currentState = GameStates.LEVEL_SELECTION;
            break;
            case GameStates.PLAY:
                this.ui_controller.turnOnSection(GameStates.PLAY);
                this.ui_controller.startTimer();
                this.currentState = GameStates.PLAY;
            break;
            case GameStates.PAUSE:
                this.ui_controller.turnOnSection(GameStates.PAUSE);
                this.currentState = GameStates.PAUSE;
            break;
        
            default:
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

