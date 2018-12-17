const scene = document.getElementById("scene");
//const skip = document.getElementById("skip");
const aud = document.getElementById("myAudio1");

const audio2 = document.createElement('audio');
const audio3 = document.createElement('audio');
const audio4 = document.createElement('audio');
const experience = document.createElement('a');

const skipButton = document.getElementById("skip");

const bleep = new Audio();
bleep.src = "../assets/music/bleep.mp3";

const handleHoverSound = () => {
    bleep.play();
    console.log("Uwe button word gehovered");
};
skipButton.addEventListener("mouseenter",handleHoverSound);


// CHANGE SCENE AFTER DONE
const handleEnded = () => {
    console.log("scene1 ended");
    scene.src = "../assets/img/scene2.png";
    scene.classList.add("spin");

    audio2.src = '../assets/music/marshall2.mp3';
    audio2.play();
    audio2.addEventListener('ended',handleEnded2);
};

const handleEnded2 = () => {
    scene.classList.remove("spin");
    console.log("scene2 ended");
    scene.src = "../assets/img/scene3.png";
    scene.classList.add("spin");

    audio3.src = '../assets/music/marshall3.mp3';
    audio3.play();
    audio3.addEventListener('ended',handleEnded3);
};

const handleEnded3 = () => {
    scene.classList.add("spin");
    console.log("scene3 ended = laatste scene");
    scene.src = "../assets/img/scene4.png";

    audio4.src = '../assets/music/marshall4.mp3'
    audio4.play();
    audio4.addEventListener('ended',handleEnded4);
};

const handleEnded4 = () => {
    scene.classList.remove("spin");
    experience.href = "game.html";
    experience.title = "start experience";
    experience.classList.add("experience");
};

aud.addEventListener('ended', handleEnded);