//helper function-> return <DOMelement>
export function elt(type, prop, ...childrens) {
    let elem = document.createElement(type);
    if (prop) Object.assign(elem, prop);
    for (let child of childrens) {
      if (typeof child == "string") elem.appendChild(document.createTextNode(child));
      else elem.appendChild(elem);
    }
    return elem;
}

export default class ProgressBar {
    constructor(now, min, max, options) {
      this.dom = elt("div", {
        className: "progress-bar"
      });
      this.min = min;
      this.max = max;
      this.intervalCode = 0;
      this.now = now;
      this.syncState();
      if(options.parent){
        document.querySelector(options.parent).appendChild(this.dom);
      } 
      else document.body.appendChild(this.dom)
    }
  
    syncState() {
      this.dom.style.width = this.now + "%";
    }
  
    startTo(step, time) {
      if (this.intervalCode !== 0) return;
      this.intervalCode = setInterval(() => {
        if (this.now - step < this.min) {
          this.now = this.min;
          this.syncState();
          clearInterval(this.interval);
          this.intervalCode = 0;
          return;
        }
        this.now -= step;
        this.syncState()
      }, time)
    }
    end() {
      this.now = this.min;
      clearInterval(this.intervalCode);
      this.intervalCode = 0;
      this.syncState();
    }
}

