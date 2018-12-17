function SceneManager(canvas) {

    const clock = new THREE.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls();
    const sceneSubjects = createSceneSubjects(scene,camera);


    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color().setHSL( 0.51, 0.4, 0.01 );
        return scene;
    }

    function buildRender({
        width,
        height
    }) {
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        return renderer;
    }

    function buildCamera({
        width,
        height
    }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 90;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = 6.5;
        camera.position.x = -12;
        return camera;
    }

    function buildControls() {
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.campingFactor = 0.25;
        controls.enableZoom = true;
        return controls;
    }

    function createSceneSubjects(scene,camera) {

        let astronautEnvironment = new AstronautEnvironment(scene,camera, renderer.domElement);
        scene.add(astronautEnvironment.mesh);
        const sceneSubjects = [
            astronautEnvironment,
            new Particles(scene),
            new Lights(scene),
            new LensFlare(scene),
        ];
        return sceneSubjects;
    }
    this.update = function () {

        let speed = Date.now() * 0.0005;
        camera.position.x = Math.cos(speed) * 10;
        camera.position.z = Math.sin(speed) * 10;
      
        camera.lookAt(scene.position); //0,0,0
        
        controls.update();
        const elapsedTime = clock.getElapsedTime();

        for (let i = 0; i < sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    }

    this.onWindowResize = function () {
        const {
            width,
            height
        } = canvas;
        screenDimensions.width = width;
        screenDimensions.height = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    this.introScreenClosed = function() {
        eventBus.post(introScreenClosed)
    }
}