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
