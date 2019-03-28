var leaves = []
var leaves2 = []

function initLeaves() {

    var geometry = new THREE.Geometry();
    var vertices = [];
    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load('textures/leaves/leaf1.png');
    var sprite2 = textureLoader.load('textures/leaves/leaf2.png');
    var sprite3 = textureLoader.load('textures/leaves/leaf3.png');
    var sprite4 = textureLoader.load('textures/leaves/leaf4.png');

    // 叶子范围
    for (var i = 0; i < 100; i++) {
        var x = Math.random() * 500 - 250
        var y = Math.random() * 400 + 300
        var z = Math.random() * 500 - 250
        geometry.vertices.push(new THREE.Vector3(x, y, z))
    }
    // geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    // geometry.vertices = vertices
    parameters = [
        [
            sprite2, 20
        ],
        [
            sprite2, 15
        ],
        [
            sprite4, 10
        ],
        [
            sprite4, 8
        ],
        [
            sprite4, 5
        ]
    ];
    var materials = [];
    for (let i = 0; i < parameters.length; i++) {
        var sprite = parameters[i][0];
        var size = parameters[i][1];
        materials[i] = new THREE.PointsMaterial({
            size: size,
            map: sprite,
            // depthTest: false,
            transparent: true
        });

        var particles = new THREE.Points(geometry, materials[i]);

        particles.rotation.y = Math.random() * 6;
        particles.verticesNeedUpdate = true

        scene.add(particles);
        leaves.push(particles)
    }
}


const particleCount = 15000
let points
let material
const textureLoader = new THREE.TextureLoader()
const snowTexture = textureLoader.load('textures/leaves/leaf2.png')

function initLeaves() {

    const geometry = new THREE.Geometry()

    material = new THREE.PointsMaterial({
        size: 5,
        map: snowTexture,
        blending: THREE.AdditiveBlending,
        // depthTest: false, // 遮蔽效果
        transparent: true,
        //   opacity: 0.5
    })
    const range = 300
    for (let i = 0; i < particleCount; i++) {
        const x = THREE.Math.randInt(-range / 2, range / 2)
        const y = THREE.Math.randInt(0, range * 20)
        const z = THREE.Math.randInt(-range / 2, range / 2)
        const point = new THREE.Vector3(x, y, z)
        point.velocityX = THREE.Math.randFloat(-0.16, 0.16)
        point.velocityY = THREE.Math.randFloat(0.1, 0.3)
        geometry.vertices.push(point)
    }

    points = new THREE.Points(geometry, material)
    scene.add(points)


}