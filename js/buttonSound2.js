const backButton = document.getElementById("back");

const bleep = new Audio();
bleep.src = "../assets/music/bleep.mp3";

const handleHoverSound = () => {
    bleep.play();
    console.log("Uwe button word gehovered");
};

backButton.addEventListener("mouseenter",handleHoverSound);