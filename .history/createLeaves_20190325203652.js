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
        var x = Math.random() * 500 - 100;
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

function initLeave() {
    var leaf = {

        "size": 2,

        "transparent": true,

        "opacity": 0.6,

        "vertexColors": true,

        "color": 0xffffff,

        "sizeAttenuation": true,

        "rotateSystem": false,
    }
    
    createParticles(leaf.size, leaf.transparent, leaf.opacity, leaf.vertexColors, leaf.sizeAttenuation, leaf.color);





}

function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {

    var textureLoader = new THREE.TextureLoader()
    var textures = []
    var texture1 = textureLoader.load('textures/leaves/leaf1.png')
    var texture2 = textureLoader.load('textures/leaves/leaf2.png')
    var texture3 = textureLoader.load('textures/leaves/leaf3.png')
    var texture4 = textureLoader.load('textures/leaves/leaf4.png')
    textures.push(texture1)
    textures.push(texture2)
    textures.push(texture3)
    textures.push(texture4)

    // 存放粒子数据的网格

    var geom = new THREE.geometry()

    // 样式化粒子的材质
    var marterial1 = new THREE.PointsMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        vertexColors: vertexColors,
        sizeAttenuation: sizeAttenuation,
        color: color,
        map: textures[Math.floor(Math.random() * 4)],
        depthTest: false // 解决透明度问题
    })

    var range = 120
    for (var i = 0; i < 15000; i++) {
        // 添加顶点的坐标
        var particle = new THREE.Vector3(Math.random * range - range / 2, Math.random * range - range / 2, Math.random() * range - range / 2)
        particle.velocityY = 0.1 + Math.random() / 5
        particle.velocityX = (Math.random() - 0.5) / 3
        geom.vertices.push(particle);
        var color = new THREE.Color(0xffffff)
        geom.colors.push(color)
    }

    // 生成模型，添加到场景中
    cloud = new THREE.Points(geom, material)
    cloud.verticesNeedUpdate = true

    scene.add(cloud)
}