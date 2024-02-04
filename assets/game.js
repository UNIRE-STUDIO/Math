import GameLoop from "./gameLoop.js";
import Input from "./input.js";
import UI from "./ui.js";

export let GameStates = {MENU: 0, LEVEL_SELECTION: 1, READYTOPLAY: 2, PLAY: 3, PAUSE: 4, GAMEOVER: 5, WIN: 6};

export default class Game
{
    constructor()
    {
        new GameLoop(this.update.bind(this), this.render.bind(this));
        new Input(GameStates, this.changeState.bind(this));
        this.ui = new UI();
        
        this.currentState = GameStates.MENU;
        this.changeState(GameStates.MENU);
    }
    
    changeState(state){
        switch (state) {
            case GameStates.MENU:
                this.ui.mainMenuActive(true);
                this.ui.backButtonActive(false);
                this.currentState = GameStates.MENU;  
            break;
            case GameStates.LEVEL_SELECTION:
                this.ui.mainMenuActive(false);
                this.ui.backButtonActive(true);
                this.currentState = GameStates.LEVEL_SELECTION;    
            break;
            case GameStates.READYTOPLAY:
                this.currentState = GameStates.READYTOPLAY;  
            break;
            case GameStates.PLAY:
                this.currentState = GameStates.PLAY;  
            break;
            case GameStates.PAUSE:
                this.currentState = GameStates.PAUSE;  
            break;
            case GameStates.GAMEOVER:
                this.currentState = GameStates.GAMEOVER;  
            break;
            case GameStates.WIN:
                this.currentState = GameStates.WIN;  
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

