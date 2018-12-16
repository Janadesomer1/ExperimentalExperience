const scene1 = document.getElementById("scene1");
const button1 = document.getElementById("button1");

const scene2 = document.getElementById("scene2");
const button2 = document.getElementById("button2");

const skip = document.getElementById("skip");
const start = document.getElementById("start");

button1.addEventListener("click", function(){
    scene1.remove();
});

button2.addEventListener("click", function(){
    scene2.remove();
});

skip.addEventListener("click", function(){
    scene1.remove();
    scene2.remove();
});

start.addEventListener("click", function(){
    skip.remove();
});