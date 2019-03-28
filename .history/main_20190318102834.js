

function animate() {
    render()
    //更新性能插件
    stats.update()

    //更新控制器
    controls.update()

    //根据 datGUI 更新相关位置
    args = {
        'change sky': false,
        cameraX: camera.position.x,
        cameraY: camera.position.y,
        cameraZ: camera.position.z,
    }



    sphere.position.x = args.sphereX
    sphere.position.y = args.sphereY
    sphere.position.z = args.sphereZ

    falling()

    requestAnimationFrame(animate)
}

function draw() {
    width = window.innerWidth
    height = window.innerHeight

    initScene()
    initCamera()
    initRenderer()
    initLeaves()
    initLight()
    initModel()
    initStats()
    initControls()
    initDatGui()

    animate()
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
        var x = Math.random() * 2000 - 1000;
        var y = Math.random() * 1000 - 200;
        var z = Math.random() * 2000 - 1000;
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
        var y = Math.random() * 1000 ;
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

function falling() {
    var time = Date.now() * 0.0005;


    for (let i = 0; i < leaves.length; i++) {
        var object = leaves[i];

        object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));

        object.position.y -= 1
        if (object.position.y < -800) {
            object.position.y = Math.random(200) + 600
        }

    }

    for (let i = 0; i < leaves2.length; i++) {
        var object2 = leaves2[i];

        object2.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));

        object2.position.y -=  3 + Math.random(1)
        // object2.rotation.z += 1
        if (object2.position.y < -500) {
            object2.position.y = Math.random(200) + 500
        }

    }

}
