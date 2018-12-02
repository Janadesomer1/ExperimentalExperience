function SceneManager(canvas) {

    const clock = new THREE.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const constraints = {
        audio: true,
    }

    const scene = buildScene();
    //const audio = buildAudio();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = buildControls();
    const sceneSubjects = createSceneSubjects(scene,constraints);

    function buildScene() {
        const scene = new THREE.Scene();
        //scene.background = new THREE.Color("#000000");
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
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = 8;
        return camera;
    }

    function buildControls() {
        const controls = new THREE.OrbitControls(camera);
        controls.enableDamping = true;
        controls.campingFactor = 0.25;
        controls.enableZoom = true;
        return controls;
    }



    function createSceneSubjects(scene, constraints) {
        const sceneSubjects = [
            new SceneSubject(scene),
            new AstronautEnvironment(scene, constraints),
            new Particles(scene),
            new Lights(scene),
        ];
        return sceneSubjects;
    }

    this.update = function () {
        controls.update();
        const elapsedTime = clock.getElapsedTime();
        //const deltaTime = clock.getDelta()

        for (let i = 0; i < sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        // for(let i=0; i<timeDependentShaders.length; i++)
        // timeDependentShaders[i].uniforms['time'].value = deltaTime



        renderer.render(scene, camera);
        //composer.render(deltaTime)
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
        //composer.setSize(width, height);
    }
}