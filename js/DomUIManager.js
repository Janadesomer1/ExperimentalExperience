function DomUIManager() {
    const instructionsContainer = document.getElementById("instructionsContainer");
    console.log("Welcome in the DOMUIManager");

    document.startGame = startGame;
    
    this.showUI = function() {
        instructionsContainer.classList.remove("fade");
    }

    function startGame() {        
        instructionsContainer.classList.add("fade");
        console.log("Mission started");
    }

    console.log("startTimeOut");

}

