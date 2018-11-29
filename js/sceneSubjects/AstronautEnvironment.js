function AstronautEnvironment(scene, constraints) {

    const loader = new THREE.ObjectLoader();

    loader.load("./models/model.json",
        function (obj) {
            var light = new THREE.PointLight(0xffffff, 3, 1000);
            light.position.set(20, 20, 20);
            obj.position.y += -0.5;
            obj.rotation.x += -1.5;
            scene.add(obj, light);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% van het astronaut model ingeladen');
        },
        function (err) {
            console.error('astronaut model niet ingeladen');
        }
    );

    loader.load("./models/environment2.json",
        function (obj) {
            obj.position.y += -2;
            obj.rotation.y += -0.5;
            obj.scale.set(10, 4, 10);
            scene.add(obj);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% van de environment ingeladen');
        },
        function (err) {
            console.error('astronaut model niet ingeladen');
        }
    );



    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported wahoow');
        const constraints = {
          audio: true
        };


        navigator.mediaDevices.getUserMedia(constraints)
          .then(
            stream => {
              source = audioCtx.createMediaStreamSource(stream);
            })
          .catch(err => {
            console.log(`The following gUM error occured: ${err}`);
          })
      } else {
        console.log('getUserMedia not supported on your browser!');
      }





        // navigator.mediaDevices.getUserMedia(constraints)
        //     .then(function(stream) {
        //         const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        // })
        // .catch(function(err) {
        //     console.log('GetUserMedia could not be called!')
        // });


    this.update = function (time) {
        //momenteel nog leeg
    }
}