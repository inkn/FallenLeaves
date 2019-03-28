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

    // 叶子范围
    for (var i = 0; i < 100; i++) {
        var x = Math.random() * 500 - 250;
        var y = Math.random() * 300 + 400;
        var z = Math.random() * 500 - 250;
        vertices.push(x, y, z);
    }
    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    parameters = [
        [
            [1.0, 0.2, 0.5], sprite2, 20
        ],
        [
            [0.95, 0.1, 0.5], sprite2, 15
        ],
        [
            [0.90, 0.05, 0.5], sprite4, 10
        ],
        [
            [0.85, 0, 0.5], sprite4, 8
        ],
        [
            [0.80, 0, 0.5], sprite4, 5
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
        particles.verticesNeedUpdate = true

        scene.add(particles);
        leaves.push(particles)
    }
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

    var geom = new THREE.Geometry()

    // 样式化粒子的材质
    var marterial = new THREE.PointsMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        vertexColors: vertexColors,
        sizeAttenuation: sizeAttenuation,
        color: color,
        map: textures[0],
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
    cloud = new THREE.Points(geom, marterial)
    cloud.verticesNeedUpdate = true

    scene.add(cloud)
}