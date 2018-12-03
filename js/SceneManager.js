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
    const sceneSubjects = createSceneSubjects(scene);

    function buildScene() {
        const scene = new THREE.Scene();
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
        const controls = new THREE.OrbitControls(camera);
        controls.enableDamping = true;
        controls.campingFactor = 0.25;
        controls.enableZoom = true;
        return controls;
    }

    function createSceneSubjects(scene,camera) {
        const sceneSubjects = [
            new SceneSubject(scene,camera),
            new AstronautEnvironment(scene),
            new Particles(scene),
            new Lights(scene),
            new LensFlare(scene),
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

    this.introScreenClosed = function() {
        eventBus.post(introScreenClosed)
    }
}