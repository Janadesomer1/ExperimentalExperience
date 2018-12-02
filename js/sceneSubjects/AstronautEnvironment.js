function AstronautEnvironment(scene, constraints,camera) {

    // set up forked web audio context, for multiple browsers
    // window. is --> For Safari browser
    const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 512;
    let frequencyData = new Uint8Array(analyser.frequencyBinCount); 
    let source;

    // const minDecibels = -90;
    // analyser.maxDecibels = -10;

    //var gainNode = audioCtx.createGain();

    const loader = new THREE.ObjectLoader();

    //astronaut model inladen
    loader.load("./models/model.json",
        function (obj) {
            // var light = new THREE.PointLight(0xffffff, 3, 1000);
            // light.position.set(20, 20, 20);
            obj.position.y += -0.5;
            obj.rotation.x += -1.5;
            scene.add(obj);
        }
    );

    //mountain environment model inladen
    loader.load("./models/mountains.json",
        function (obj) {
            obj.position.y += -2;
            obj.rotation.y += -0.5;
            obj.scale.set(10, 4, 10);
            scene.add(obj);
        }
    );


    //microphone opvragen in de browser
    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia wordt ondersteund wahoow');
        
        navigator.mediaDevices.getUserMedia(constraints)
          .then(
            stream => {
              source = audioCtx.createMediaStreamSource(stream);
              source.connect(analyser);
              analyser.connect(audioCtx.destination);
            })
            .catch(err => {
                console.log(`Ge hebt een gUM foutje: ${err}`);
                })
            } else {
                console.log('getUserMedia werkt niet in deze browser!');
            }




    this.update = function (time) {
        //updateAstronautHeight(time);
        }
}