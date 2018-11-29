function DomUIManager() {

    const instructionsContainer = document.getElementById("instructionsContainer");
    console.log("Welcome in the DOMUIManager");

    document.startGame = startGame;
    
    this.showUI = function() {
        instructionsContainer.classList.remove("fade");
    }

    function startGame() {        
        instructionsContainer.classList.add("fade");
        //sceneManager.introScreenClosed();
        //disablingDiv.style.display = 'block';
        console.log("Mission started");

        startTimeOut();
    }

    function startTimeOut() {
        setTimeout( () => countDownContainer.innerText = "3", 1000 )
        setTimeout( () => countDownContainer.innerText = "2", 2000 )
        setTimeout( () => countDownContainer.innerText = "1", 3000 )

        setTimeout( () => { 
            countDownContainer.innerText = "0"
            eventBus.post(startCountDownFinishedEvent)
        }, 4000 )

        setTimeout( () => {
            countDownContainer.innerText = ""
            countDownContainer.classList.add("fade")
            instructionsContainer.style.display = "none"
        }, 4500 )
    }

    console.log("startTimeOut");

}

