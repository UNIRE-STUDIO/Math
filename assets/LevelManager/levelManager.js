export default class levelManager
{
    constructor()
    {
      this.timerBar = new ProgressBar(45, 45, "timer-bar");
      this.timerBar.startTo();
    }

    startTo(step = 0.1) 
    {
        if (this.intervalCode !== 0) return;
        this.intervalCode = setInterval(() => {
          if (this.now - step < 0) 
          {
            this.end();
            return;
          }
          this.now -= step;
          this.syncState()
        }, 100)
    }
    end() {
    this.now = 0;
    clearInterval(this.intervalCode);
    this.intervalCode = 0;
    this.syncState();
    }

    startTimer()
    {
        this.timerBar = new ProgressBar(45, 45, "timer-bar");
        //arg1 -> step length
        //arg2 -> time(ms)
        this.timerBar.startTo();
    }

    addTimeBonus()
    {

    }
}