import ProgressBar from "./progressbar.js";

export default class Timer
{
    constructor(max, now, barTag, lableTag)
    {
        this.timerBar = new ProgressBar(barTag);
        this.lable = document.getElementById(lableTag);
        this.intervalCode = 0;
        this.now = now;
        this.max = max;
        this.syncState();
        this.timeoutEvent;

        this.isPause = false;
    }

    syncState()
    {
        this.timerBar.syncState((this.now / this.max * 100) + "%");
        this.lable.innerHTML = Math.floor(this.now / 60) + ":" + Math.round(this.now % 60);
    }
    
    startTo(step = 1) 
    {
        if (this.intervalCode !== 0) return;
        if (this.isPause)
        {
            this.isPause = false;
        }
        else
        {
            this.now = this.max;
        }
        this.syncState();
        this.intervalCode = setInterval(() => {
          if (this.now - step < 0) 
          {
            this.end();
            return;
          }
          this.now -= step;
          this.syncState();
        }, 1000)
    }

    addTime(time)
    {
        if (this.now + time > this.max)
        {
            this.now = this.max;
            return;
        }
        if (time < 0 && this.now + time <= 0)
        {
            this.end();
            return;
        }
        this.now += time;
        this.syncState();
    }

    setPause()
    {
        this.isPause = true;
        clearInterval(this.intervalCode);
        this.intervalCode = 0;
    }

    setReset()
    {
        clearInterval(this.intervalCode);
        this.intervalCode = 0;
        this.isPause = false;
    }

    end() 
    {
        this.now = 0;
        this.syncState();
        clearInterval(this.intervalCode);
        this.intervalCode = 0;
        this.timeoutEvent();
    }

}