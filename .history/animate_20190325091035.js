/**
 * 动画
 */


function animate() {
    render()
    //更新性能插件
    stats.update()

    //更新控制器
    //controls.update()
    if (controlType === '默认模式') {
        controls.update()
    } else {
        control()
    }



    //根据 datGUI 更新相关位置
    args = {
        'change sky': false,
        cameraX: camera.position.x,
        cameraY: camera.position.y,
        cameraZ: camera.position.z,
    }




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

        object2.rotation.y = 0.8 * time * (i < 4 ? i + 1 : -(i + 1));

        object2.position.y -= 3 + Math.random(1)
        // object2.rotation.z += 1
        if (object2.position.y < -500) {
            object2.position.y = Math.random(200) + 500
        }

    }

}

function control() {
    if (controls.isLocked === true) {
        //获取到控制器对象
        var control = controls.getObject();
        //获取刷新时间
        var delta = clock.getDelta();


        if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta;

        //根据速度值移动控制器
        control.translateX(velocity.x * delta);
        control.translateY(velocity.y * delta);
        control.translateZ(velocity.z * delta);

    }
}