function AstronautEnvironment(scene) {

    const loader = new THREE.ObjectLoader();

    //astronaut model inladen
    loader.load("./models/model.json",
        function (obj) {
            obj.position.y += -2;
            obj.rotation.x += -1.5;
            obj.rotation.z += -3;
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

    this.update = function (time) {
        }
}