//helper function-> return <DOMelement>

export default class ProgressBar {
    constructor(max, now, tag) {
      this.intervalCode = 0;
      this.now = now;
      this.max = max;
      this.object = document.getElementById(tag);
      this.syncState();
    }
  
    syncState() {
      this.object.style.width = (this.now / this.max * 100) + "%";
    }
  
    startTo(step = 0.1) {
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
}

