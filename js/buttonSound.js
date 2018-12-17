const startButton = document.getElementById("startButton");
const storyButton = document.getElementById("storyButton");

const bleep = new Audio();
bleep.src = "./assets/music/bleep.mp3";

const handleHoverSound = () => {
    bleep.play();
    console.log("Uwe button word gehovered");
};

startButton.addEventListener("mouseenter",handleHoverSound);
storyButton.addEventListener("mouseenter",handleHoverSound);

