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

//CODE HERSCHRIJVEN IN KLASSES


function AstronautEnvironment(scene) {

    const loader = new THREE.ObjectLoader();
    const mesh = new THREE.Object3D();
    this.mesh = mesh;

    //astronaut model inladen
    loader.load("./models/model.json",
        function (obj) {
            obj.position.y += -2;
            obj.rotation.x += -1.5;
            obj.rotation.z += -3;
            mesh.add(obj);
        }
    );

    //mountain environment model inladen
    loader.load("./models/tall-mountains.json",
        function (obj) {
            obj.position.y += -6;
            obj.rotation.y += -1;
            obj.scale.set(10, 5, 10);
            scene.add(obj);
        }
    );

    this.update = function (time) {
        }
}