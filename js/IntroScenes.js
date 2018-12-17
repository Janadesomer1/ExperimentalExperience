const scene = document.getElementById("scene");
const skip = document.getElementById("skip");
const aud = document.getElementById("myAudio1");

const audio2 = document.createElement('audio');
const audio3 = document.createElement('audio');
const audio4 = document.createElement('audio');
const experience = document.createElement('a');

skip.addEventListener("click", function () {
    skip.remove();
});

// CHANGE SCENE AFTER DONE
const handleEnded = () => {
    console.log("scene1 ended");
    scene.src = "../assets/img/scene2.png";

    audio2.src = '../assets/music/marshall2.mp3';
    audio2.play();
    audio2.addEventListener('ended',handleEnded2);
};

const handleEnded2 = () => {
    console.log("scene2 ended");
    scene.src = "../assets/img/scene3.png";
    audio3.src = '../assets/music/marshall3.mp3'
    audio3.play();
    audio3.addEventListener('ended',handleEnded3);
};

const handleEnded3 = () => {
    console.log("scene3 ended = laatste scene");
    scene.src = "../assets/img/scene4.png";
    audio4.src = '../assets/music/marshall4.mp3'
    audio4.play();
    audio4.addEventListener('ended',handleEnded4);
};

const handleEnded4 = () => {
    experience.href = "game.html";
    experience.title = "start experience";
    experience.classList.add("experience");
};

aud.addEventListener('ended', handleEnded);