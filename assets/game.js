/*
    - Прибавлять скорость ракетки к горизонтальной скорости мяча
    - Исправить баг с уничтожением блока к которому шарик не касался
    - Мобильная версия
    - Плавное движение ракетки ☻

*/
// ЗАГРУЗКА ИЗОБРАЖЕНИЙ ...........................................



// ПОЛУЧАЕМ ССЫЛКИ НА HTML ОБЪЕКТЫ ................................



// ЗАГРУЗКА ДОКУМЕНТА ..........................................
var uagent = navigator.userAgent.toLowerCase();
document.addEventListener('DOMContentLoaded', function () 
{
    game.changeState(GameStates.MENU);
});

// ПОЛЬЗОВАТЕЛЬСКИЙ ВВОД ..........................................


// СУЩНОСТИ ....................................................................

var config = {
    
}

// Состояния в которых игра может находиться
const GameStates = {MENU: 0, LEVEL_SELECTION: 1, READYTOPLAY: 2, PLAY: 3, PAUSE: 4, GAMEOVER: 5, WIN: 6}

var game = {
    currentState: GameStates.MENU,
    
    changeState(state){
        switch (state) {
            case GameStates.MENU:
                game.currentState = GameStates.MENU;  
            break;
            case GameStates.LEVEL_SELECTION:
                game.currentState = GameStates.LEVEL_SELECTION;    
            break;
            case GameStates.READYTOPLAY:
                game.currentState = GameStates.READYTOPLAY;  
            break;
            case GameStates.PLAY:
                game.currentState = GameStates.PLAY;  
            break;
            case GameStates.PAUSE:
                game.currentState = GameStates.PAUSE;  
            break;
            case GameStates.GAMEOVER:
                game.currentState = GameStates.GAMEOVER;  
            break;
            case GameStates.WIN:
                game.currentState = GameStates.WIN;  
            break;
            default:
                break;
        }
    },
    
}


// ИГРОВОЙ ЦИКЛ ................................................................

var glManager = {
    ms_per_update: 17,    // Интервал между вычислениями
    fps: 0,
    elapsed: 0,            // Счетчик времени между кадрами
    currentTime: 0,
    pervious: Date.now(),
    lag: 0.0,

    gameLoop() {

        // Текущее вермя
        glManager.currentTime = Date.now();
        glManager.elapsed = glManager.currentTime - glManager.pervious; // Время между предыдущим и текущим кадром
        glManager.pervious = glManager.currentTime;             // Сохраняем время текущего кадра
        glManager.lag += glManager.elapsed;                     // Суммированное время между кадрами

        update();
        glManager.lag -= glManager.elapsed;
        /*
        // При накоплении лагов, змейка начнёт отставать на несколько итераций т.е перемещений
        // с помощью этого цикла мы нагоняем змейку к её нужному положению
        */
        while (glManager.lag >= glManager.ms_per_update) {
            update();
            glManager.lag -= glManager.ms_per_update;
        }

        // Рендерим кадр с нужны интервалом (glManager.ms_per_update)
        render();

        requestAnimFrame(glManager.gameLoop);
    },
}

function update() {
    if (game.currentState != GameStates.READYTOPLAY &&
        game.currentState != GameStates.PLAY) return;

}

function render() {
    if (game.currentState != GameStates.READYTOPLAY &&
        game.currentState != GameStates.PLAY &&
        game.currentState != GameStates.PAUSE) return;
    clearCanvas();
}