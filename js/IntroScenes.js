const scene = document.getElementById("scene");
const skip = document.getElementById("skip");
const aud = document.getElementById("myAudio1");
const audio2 = document.createElement('audio');

skip.addEventListener("click", function () {
    skip.remove();
});

// CHANGE SCENE AFTER DONE
const handleEnded = () => {
    console.log("scene1 ended");
    scene.src = "../assets/img/scene2.png";
    
    audio2.src = '../assets/music/bleep.mp3';
    audio2.play();
    audio2.addEventListener('ended',handleEnded2);
};

const handleEnded2 = () => {
    console.log("scene2 ended");
    scene.src = "../assets/img/scene3.png";
    audio2.src = '../assets/music/Storyline_final.mp3'
    audio2.play();
};

aud.addEventListener('ended', handleEnded);