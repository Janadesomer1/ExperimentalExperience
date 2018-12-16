const scene = document.getElementById("scene");
const skip = document.getElementById("skip");

skip.addEventListener("click", function () {
    skip.remove();
});

let myScenes = ['../assets/img/scene1.png','../assets/img/scene3.png'];
const totalScenes = myScenes.length;
let imageIndex = 0;

const aud = document.getElementsByClassName("myAudio").onended = onended;

const ended = () => {
    console.log("facking ended");
};

let changeScene = () => {
    scene.setAttribute("src", myScenes[imageIndex]);

    imageIndex++;
    console.log(imageIndex);

    if (imageIndex > totalScenes) {
        imageIndex = 1;
    };
}

    setTimeout(() => {
        changeScene();
        console.log("In the timer");
    }, 1500);
