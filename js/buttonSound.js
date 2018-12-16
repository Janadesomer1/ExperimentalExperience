const main = document.getElementsByClassName("main");

const bleep = new Audio();
bleep.src = "./assets/music/bleep.mp3";


main.addEventListener("mouseover", function sound(){
    bleep.play();
    console.log("in eventlistener");
})

