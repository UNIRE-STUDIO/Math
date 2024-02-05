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
        new Input(GameStates, this.changeState.bind(this));
    }

    changeState(state)
    {
        switch (state) {
            case GameStates.MENU:
                this.ui_controller.turnOnSection(0);
                this.currentState = GameStates.MENU;
            break;
            case GameStates.LEVEL_SELECTION:
                this.ui_controller.turnOnSection(1);
                this.currentState = GameStates.LEVEL_SELECTION;
            break;
            case GameStates.PLAY:
            
            break;
            case GameStates.PAUSE:
            
            break;
        
            default:
                if (this.currentState == GameStates.LEVEL_SELECTION) this.changeState(GameStates.MENU);
                break;
        }
    }

    update()
    {   
        
    }   

    render()
    {

    }
}

new Game();

