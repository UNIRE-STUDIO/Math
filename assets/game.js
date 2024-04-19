import GameLoop from "./gameLoop.js";
import Input from "./input.js";
import UI_Controller from "./ui_controller.js";
import LevelManager from "./LevelManager/levelManager.js";
import SaveManager from "./saveManager.js";
export let GameScreens = {MENU: 0, LEVEL_SELECTION: 1, PLAY: 2, PAUSE: 3, GAMEOVER: 4, WIN: 5};

export default class Game
{
    constructor()
    {
        this.ui_controller = new UI_Controller();
        this.currentScreen;
        this.changeScreen(0);

        this.saveManager = new SaveManager(); 

        new GameLoop(this.update.bind(this), this.render.bind(this));

        this.input = new Input();
        this.input.changeScreenEvent = this.changeScreen.bind(this);
        this.input.turnOnLevelEvent = this.turnOnLevel.bind(this);
        this.input.nextLevelEvent = this.nextLevel.bind(this);

        this.levelManager = new LevelManager(this.input); // Создавать сразу?
        this.levelManager.gameOverEvent = this.changeScreen.bind(this, GameScreens.GAMEOVER);
        this.levelManager.saveManager = this.saveManager;
    }

    // изменить экран игры на указанный + дополнительный параметр для уточнения поведения
    changeScreen(screen, parameter = 0)
    {
        // Если нажата НЕ кнопка назад
        if (screen != -1) this.ui_controller.turnOnSection(screen);
        switch (screen) {
            case GameScreens.MENU:
                this.currentScreen = GameScreens.MENU;
            break;
            case GameScreens.LEVEL_SELECTION:
                this.currentScreen = GameScreens.LEVEL_SELECTION;
            break;
            case GameScreens.PLAY:
                if (parameter == 1) this.levelManager.setRestart();
                else if (parameter == 2) this.levelManager.setResume();

                this.currentScreen = GameScreens.PLAY;
            break;
            case GameScreens.PAUSE:
                this.levelManager.setPause();

                this.currentScreen = GameScreens.PAUSE;
            break;
            case GameScreens.GAMEOVER:

                this.currentScreen = GameScreens.GAMEOVER;
            break;
            case -1: // Если нажата кнопка назад
                if (this.currentScreen == GameScreens.LEVEL_SELECTION) this.changeScreen(GameScreens.MENU);
                if (this.currentScreen == GameScreens.PAUSE) this.changeScreen(GameScreens.LEVEL_SELECTION);
                if (this.currentScreen == GameScreens.GAMEOVER) this.changeScreen(GameScreens.LEVEL_SELECTION);
            break;
        }
    }

    turnOnLevel(id)
    {
        this.changeScreen(GameScreens.PLAY);
        this.levelManager.startLevel(id);
    }

    nextLevel()
    {
        // Если следующего уровня не существует
        if ((this.levelManager.currentLevel+1) >= this.levelManager.countLevels) return;
        this.turnOnLevel(this.levelManager.currentLevel+1);
    }

    update()
    {   
        
    }   

    render()
    {

    }
}

new Game();

