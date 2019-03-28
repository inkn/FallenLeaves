var leaves = []
var leaves2 = []

function initLeaves() {

    
    var vertices = [];
    var textureLoader = new THREE.TextureLoader();
    var sprite1 = textureLoader.load('textures/leaves/leaf1.png');
    var sprite2 = textureLoader.load('textures/leaves/leaf2.png');
    var sprite3 = textureLoader.load('textures/leaves/leaf3.png');
    var sprite4 = textureLoader.load('textures/leaves/leaf4.png');

   
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


        var geometry = new THREE.Geometry();
        // 叶子范围
        for (var i = 0; i < 100; i++) {
            var x = Math.random() * 500 - 250
            var y = Math.random() * 400 + 300
            var z = Math.random() * 500 - 250
            geometry.vertices.push(new THREE.Vector3(x, y, z))
        }

        
        var sprite = parameters[i][0];
        var size = parameters[i][1];
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