/**
 * 动画
 */


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

/**
 * 落叶落下过程
 */
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
