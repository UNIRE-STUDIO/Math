export default class UI
{
    constructor()
    {
        this.mainMenu = document.getElementById("main-menu");
        this.backButton = document.getElementById("back-button");
        this.headerLabel = document.getElementById("header-label");
        this.selectLevelLabel = document.getElementById("select-level-label");
    }

    mainMenuActive(active)
    {
        if (active) 
        {
            this.mainMenu.style.display = "flex";
            this.headerLabel.style.display = "block";
            return;
        }
        else
        {
            this.mainMenu.style.display = "none";
            this.headerLabel.style.display = "none";
        }
    }

    backButtonActive(active)
    {
        if (active) 
        {
            this.backButton.style.display = "block";
        }
        else
        {
            this.backButton.style.display = "none";
        }
    }


}