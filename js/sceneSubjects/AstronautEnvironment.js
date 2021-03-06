// class Astronaut {
//     constructor() {
//         const loader = new THREE.ObjectLoader();
//         this.mesh = new THREE.Object3D();

//         loader.load("./models/model.json",
//         (obj) => {
//             obj.position.y += -2;
//             obj.rotation.x += -1.5;
//             obj.rotation.z += -3;
//             this.mesh.add(obj);
//         }
//     );
//     }
// } 

//I tried via module.exports onderaan maar kreeg dan fouten op de import :(


function AstronautEnvironment(scene) {

	const decibelMeter = document.getElementById("decibelMeter");
	const decibelMeterVisual = document.getElementById("decibelMeterVisual")

	//get Microphone
	navigator.getUserMedia = navigator.getUserMedia ||
  	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia;

	if (navigator.getUserMedia) {
		navigator.getUserMedia({
			audio: true
		  },
	  
		  function(stream) {
			console.log("Uw audio komt erin! Is it a 10/20?");
			audioContext = new AudioContext();
			analyser = audioContext.createAnalyser();
			microphone = audioContext.createMediaStreamSource(stream);
			javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
	  
			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;
	  
			microphone.connect(analyser);
			analyser.connect(javascriptNode);
			javascriptNode.connect(audioContext.destination);

	  
	  
			javascriptNode.onaudioprocess = function(camera) {
				let array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				let values = 0;
	  
				let length = array.length;
				for (let i = 0; i < length; i++) {
				  values += (array[i]);
				}
	  
				let average = values / length;

				update(average,camera);
			  }
		  },
		  function(err) {
			console.log("Ge hebt een foutje namelijk: " + err.name)
		  });
	  } else {
		console.log("getUserMedia werkt ier nie!");
	  }
      
      
    const loader = new THREE.ObjectLoader();
    const mesh = new THREE.Object3D();
    this.mesh = mesh;

    //astronaut model inladen
    loader.load("../models/model.json",
        function (obj) {
            obj.position.y += -2;
            obj.rotation.x += -1.5;
            obj.rotation.z += -3;
            mesh.add(obj);
        }
    );

    //mountain environment model inladen
    loader.load("../models/tall-mountains.json",
        function (obj) {
            obj.position.y += -6;
            obj.rotation.y += -1;
            obj.scale.set(10, 5, 10);
            scene.add(obj);
        }
    );


    const update = (average) => {
		decibelMeter.innerText = "Say -aaa- as long as possible";

		if(average > 10){
			decibelMeter.innerText = Math.round(mesh.position.y)*100/100 + " " + "miles travelled with your lung capacity";
			mesh.position.y += 0.04;
		}else {
			mesh.position.y -= 0.03;
			if(mesh.position.y = 0){
				mesh.position.set(0, 0, 0);
			}
		}
	}

    this.update = function (time) {
		
        }
}