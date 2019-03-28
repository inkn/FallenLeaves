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

    
}

function initLeaves() {

    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load('textures/leaves/leaf1.png');
    var material = new THREE.PointsMaterial({
        size: 1,
        map: sprite1,
        depthTest: false,
        transparent: true
    });


    var leaves = new THREE.Points(tree.children[0].geometry, material)
}

