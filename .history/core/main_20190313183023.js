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

draw()

console.log('aaaaaaaaa')