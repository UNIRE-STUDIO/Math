export default class UI_Element
{
    constructor(elements, isActiveStart)
    {
        this.elements = elements;
        this.isActiveStart = isActiveStart;
        this.isActive = !isActiveStart;
        if (this.isActiveStart)
        {
            this.turnOn();
        }
        else
        {
            this.turnOff();
        }
    }

    turnOn()
    {
        if (this.isActive) return;
        for (let i = 0; i < this.elements.lenght; i++) {
            this.elements[i].style.display = "block";
        }
    }

    turnOff()
    {
        if (!this.isActive) return;
        for (let i = 0; i < this.elements.lenght; i++) {
            this.elements[i].style.display = "none";
        }
    }
}