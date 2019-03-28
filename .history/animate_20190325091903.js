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
     
        var time = performance.now();
        var delta = ( time - prevTime ) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveLeft ) - Number( moveRight );
        direction.normalize(); // this ensures consistent movements in all directions
        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
        
        controls.getObject().translateX( velocity.x * delta );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta );
        if ( controls.getObject().position.y < 100 ) {
            velocity.y = 0;
            controls.getObject().position.y = 100;
            canJump = true;
        }
        prevTime = time;

    }
}