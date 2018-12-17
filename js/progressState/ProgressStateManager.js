function ProgressStateManager() {

    //const maxLives = 4

    // this.gameConstants = {
    //     monolithRadius: 25,
    //     minRadius: 50,
    //     maxRadius: 200,
    //     baseLevelHeight: 15,
    //     secondLevelHeight: 25,

    //     turretsHeight: 20,

    //     speedStep: 0,
    // }

    this.gameState = {
        enableUserInput: false,
        marshallHeight: 0
    }

    eventBus.subscribe( introScreenClosed, () => this.gameState.enableUserInput = true )
    eventBus.subscribe( startCountDownFinishedEvent, () => {
        this.gameConstants.speedStep = 0.0000008;
    } )

    eventBus.subscribe(gameOverEvent, () => {
        this.gameState.playerHeightLevel = 0        
        this.gameState.enableUserInput = false
    })

    this.update = function(time) {
    }
}