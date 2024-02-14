
export default class ProgressBar 
{
    constructor(tag) 
    {
        this.object = document.getElementById(tag);
    }
  
    syncState(width) 
    {
        this.object.style.width = width;
    }
}

