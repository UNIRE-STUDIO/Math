export default class input
{
    constructor(changeState)
    {
        document.getElementById("levels-button").click = () => this.levelsButton_click();
        this.changeState = changeState;
    }

    levelsButton_click()
    {
        this.changeState();
    }
}