/**
 * 初始化
 */


var width, height
var controlType = '默认模式'

var scene

function initScene() {
    scene = new THREE.Scene()
}

var camera

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000)
    camera.position.set(739, 85, -229)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
}

var renderer

function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setSize(width, height)

    // 告诉渲染器需要渲染阴影
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap //比默认的清晰

    document.body.appendChild(renderer.domElement)
}

var light

function initLight() {

    light = new THREE.HemisphereLight(0xffffff, 0xffffff);
    light.position.set(0, 200, 0);
    scene.add(light);
    light = new THREE.DirectionalLight(0x333333);
    light.position.set(0, 200, 100);
    light.castShadow = true;

    scene.add(light);
}

var skys = []

function initModel() {


    //辅助工具
    var helper = new THREE.AxisHelper(10)
    scene.add(helper)



    // ground
    var textureLoader = new THREE.TextureLoader();

    // 加载纹理贴图
    var groundTexture = textureLoader.load('./textures/terrain/Ground_01.png');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(15, 15);
    groundTexture.anisotropy = 16;

    // 加载法线贴图
    var groundNormalTexture = textureLoader.load('./textures/terrain/Ground_01_nmp.png');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(15, 15);
    groundTexture.anisotropy = 16;

    var groundMaterial = new THREE.MeshPhongMaterial({
        map: groundTexture, // 普通颜色纹理贴图
        normalMap: groundNormalTexture, //法线贴图
        //设置深浅程度，默认值(1,1)。
        normalScale: new THREE.Vector2(1.2, 1.2),
    }); //材质对象Material

    var ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), groundMaterial);
    ground.position.y = 0;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);


    // 树

    var fbx_loader = new THREE.FBXLoader();
    fbx_loader.load('./models/tree3/tree.fbx', function (object) {
        // mixer = new THREE.AnimationMixer(object);
        // var action = mixer.clipAction(object.animations[0]);
        // action.play();
        // object.traverse(function (child) {
        //     if (child.isMesh) {
        //         child.castShadow = true;
        //         child.receiveShadow = true;
        //     }
        // });
        object.scale.multiplyScalar(.5) // 模型缩放大小
        object.castShadow = true
        object.receiveShadow = true
        scene.add(object);
        console.log(object)
    });

    // 石头

    fbx_loader.load('./models/stone/stone.fbx', function (object) {

        object.position.set(1000, -400, 0)
        object.scale.multiplyScalar(.1)
        object.castShadow = true
        object.receiveShadow = true
        scene.add(object);
        console.log(object)
    });



    // skybox
    var path1 = './textures/sky1/'
    var path2 = './textures/sky2/'
    var path3 = './textures/sky3/'
    var path4 = './textures/sky4/'
    format = '.jpg';
    var urls1 = [
        path1 + 'px' + format, path1 + 'nx' + format,
        path1 + 'py' + format, path1 + 'ny' + format,
        path1 + 'pz' + format, path1 + 'nz' + format,
    ]

    var urls2 = [
        path2 + 'px' + format, path2 + 'nx' + format,
        path2 + 'py' + format, path2 + 'ny' + format,
        path2 + 'pz' + format, path2 + 'nz' + format,
    ]
    var urls3 = [
        path3 + 'px' + format, path3 + 'nx' + format,
        path3 + 'py' + format, path3 + 'ny' + format,
        path3 + 'pz' + format, path3 + 'nz' + format,
    ]
    var urls4 = [
        path4 + 'px' + format, path4 + 'nx' + format,
        path4 + 'py' + format, path4 + 'ny' + format,
        path4 + 'pz' + format, path4 + 'nz' + format,
    ]

    var sky1 = new THREE.CubeTextureLoader().load(urls1);
    var sky2 = new THREE.CubeTextureLoader().load(urls2);
    var sky3 = new THREE.CubeTextureLoader().load(urls3);
    var sky4 = new THREE.CubeTextureLoader().load(urls4);
    skys.push(sky1)
    skys.push(sky2)
    skys.push(sky3)
    skys.push(sky4)

    scene.background = sky1; //作为背景贴图

}



var leaves = []
var leaves2 = []

function initLeaves() {

    var geometry = new THREE.BufferGeometry();
    var vertices = [];
    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load('textures/leaves/leaf1.png');
    var sprite2 = textureLoader.load('textures/leaves/leaf2.png');
    var sprite3 = textureLoader.load('textures/leaves/leaf3.png');
    var sprite4 = textureLoader.load('textures/leaves/leaf4.png');

    for (var i = 0; i < 100; i++) {
        var x = Math.random() * 200 - 100;
        var y = Math.random() * 100 - 20;
        var z = Math.random() * 200 - 100;
        vertices.push(x, y, z);
    }
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    parameters = [
        [
            [1.0, 0.2, 0.5], sprite1, 20
        ],
        [
            [0.95, 0.1, 0.5], sprite2, 15
        ],
        [
            [0.90, 0.05, 0.5], sprite3, 10
        ],
        [
            [0.85, 0, 0.5], sprite4, 8
        ],
        [
            [0.80, 0, 0.5], sprite1, 5
        ]
    ];
    var materials = [];
    for (let i = 0; i < parameters.length; i++) {
        var sprite = parameters[i][1];
        var size = parameters[i][2];
        materials[i] = new THREE.PointsMaterial({
            size: size,
            map: sprite,
            depthTest: false,
            transparent: true
        });

        var particles = new THREE.Points(geometry, materials[i]);

        particles.rotation.y = Math.random() * 6;

        scene.add(particles);
        leaves.push(particles)
    }

    // 第二组落叶

    var geometry2 = new THREE.BufferGeometry();
    var vertices2 = [];
    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load('textures/leaves/leaf1.png');
    var sprite2 = textureLoader.load('textures/leaves/leaf2.png');
    var sprite3 = textureLoader.load('textures/leaves/leaf3.png');
    var sprite4 = textureLoader.load('textures/leaves/leaf4.png');

    for (var i = 0; i < 100; i++) {
        var x = Math.random() * 2000 - 1000;
        var y = Math.random() * 1000;
        var z = Math.random() * 2000 - 1000;
        vertices2.push(x, y, z);
    }
    geometry2.addAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3));
    parameters2 = [
        [
            [1.0, 0.2, 0.5], sprite1, 20
        ],
        [
            [0.95, 0.1, 0.5], sprite2, 15
        ],
        [
            [0.90, 0.05, 0.5], sprite3, 10
        ],
        [
            [0.85, 0, 0.5], sprite4, 8
        ],
        [
            [0.80, 0, 0.5], sprite1, 5
        ],
        [
            [0.95, 0.1, 0.5], sprite2, 15
        ],
        [
            [0.90, 0.05, 0.5], sprite3, 10
        ],
    ];
    var materials2 = [];
    for (let i = 0; i < parameters2.length; i++) {

        var sprite = parameters2[i][1];
        var size = parameters2[i][2];
        materials2[i] = new THREE.PointsMaterial({
            size: size,
            map: sprite,

            depthTest: false,
            transparent: true
        });

        var particles2 = new THREE.Points(geometry2, materials[i]);

        particles2.rotation.y = Math.random() * 6;

        scene.add(particles2);
        leaves2.push(particles2)
    }



}



// 插件

//初始化性能插件
var stats

function initStats() {

    stats = new Stats()
    document.body.appendChild(stats.dom)

}

// 用户交互插件，鼠标按住旋转， 鼠标右键按住平移，滚轮缩放
var controls

function initControls() {
    controls = new THREE.OrbitControls(camera, renderer.domElement)


    // 旋转速度
    controls.rotateSpeed = 5
    // 变焦速度
    controls.zoomSpeed = 3
    //是否开启右键拖拽
    controls.enablePan = true
    // 平移速度
    controls.panSpeed = 1.8
    // 是否不变焦
    controls.enableZoom = false

    // 是否开启移动惯性
    controls.enablestaticMoving = false
    // 动态阻尼系数（灵敏度）
    controls.dampingFactor = 0.3

    //是否可以缩放
    controls.enableZoom = true
    //是否自动旋转
    controls.autoRotate = false
    //设置相机距离原点的最远距离
    controls.minDistance = 10
    //设置相机距离原点的最远距离
    controls.maxDistance = 5000


    // controls.addEventListener('change', render)
}

// 漫游方式
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();

var speed = 5; //控制器移动速度
var upSpeed = 200; //控制跳起时的速度

function initControlsManyou() {

    controls = new THREE.PointerLockControls(camera)


    controls.getObject().scale.multiplyScalar(.01)
    camera.scale.multiplyScalar(100)
    controls.getObject().position.y = 60;
    controls.getObject().position.x = 100;
    scene.add(controls.getObject());

    document.body.addEventListener('keydown', function (e) {
        if (e.keyCode === 16) {
            speed = 10
        }

    }, false);

    document.body.addEventListener('keyup', function (e) {
        if (e.keyCode === 16) {
            speed = 5
        }

    }, false);

    document.body.addEventListener('mousedown', function () {
        if (controlType === '漫游模式') {
            controls.lock();
        }

    }, false);

    document.body.addEventListener('mouseup', function () {
        if (controlType === '漫游模式') {
            controls.unlock();
        }

    }, false);

    var onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;
            case 37: // left
            case 65: // a
                moveLeft = true;
                break;
            case 40: // down
            case 83: // s
                moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                moveRight = true;
                break;
            case 32: // space
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;
        }
    };
    var onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;
            case 37: // left
            case 65: // a
                moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);


}

// 初始化 dat.gui 插件
var datGui, args

function initDatGui() {

    // 声明一个包装需要修改参数的容器对象
    args = {
        changesky: changeSkybox,
        controlType: '默认模式',
    }

    datGui = new dat.GUI()


    datGui.add(args, 'changesky').name('变换天气')
    var type = datGui.add(args, 'controlType', ['默认模式', '漫游模式']).name('交互模式')
    type.onFinishChange(function (value) {
        controlType = value
        controls = null
        camera = null
        if (value === '默认模式') {
            initCamera()
            initControls()
        } else {
            initCamera()

            initControlsManyou()
        }

    })

}

var skyI = 0

function changeSkybox() {
    skyI++
    if (skyI >= skys.length) {
        skyI = 0
    }
    scene.background = skys[skyI]

}


function render() {
    renderer.render(scene, camera)
}

function init() {
    initScene()
    initCamera()
    initRenderer()
    initLeaves()
    initLight()
    initModel()
    initStats()

    initControls()


    initDatGui()
}