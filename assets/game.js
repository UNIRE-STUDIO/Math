import GameLoop from "./gameLoop.js";

export let GameStates = {MENU: 0, LEVEL_SELECTION: 1, READYTOPLAY: 2, PLAY: 3, PAUSE: 4, GAMEOVER: 5, WIN: 6};

export default class Game
{
    constructor()
    {
        new GameLoop(this.update.bind(this), this.render.bind(this));
        this.currentState = GameStates.MENU;
        this.changeState(GameStates.MENU);
    }
    
    changeState(state){
        switch (state) {
            case GameStates.MENU:
                this.currentState = GameStates.MENU;  
            break;
            case GameStates.LEVEL_SELECTION:
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

