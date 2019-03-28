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
    //leavesFalling()

    requestAnimationFrame(animate)
}



function control() {
    if (controlType === '漫游模式' && controls.isLocked === true) {

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

        controls.getObject().translateX( velocity.x * delta*speed );
        controls.getObject().translateY( velocity.y * delta );
        controls.getObject().translateZ( velocity.z * delta*speed );
        if ( controls.getObject().position.y < 80 ) {
            velocity.y = 0;
            controls.getObject().position.y = 80;
            canJump = true;
        }
        prevTime = time;

    }
}

function leavesFalling() {
    var vertices = cloud.geometry.vertices
    vertices.forEach(v => {
        v.y -= v.velocityY
        v.x -= v.velocitX
        if(v.y <= -60) v.y = 500
        if(v.x<= -20 || v.x>=20) v.velocityX*= -1

        // 设置实时更新网格的顶点信息

        cloud.geometry.verticesNeedUpdate = true
    })
}

/**
 * 落叶落下过程
 */
function falling() {
    var time = Date.now() * 0.0005;  //776780865  大约每秒 + 1


    for (let i = 0; i < leaves.length; i++) {
        var vertices = leaves[i];

        vertices.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
        vertices.geometry.vertices.forEach(v => {
            v.y -= Math.random()*5*0.5 -0.1
            v.x -= Math.random()*5*0.5 -0.1
            v.z -= Math.random()*5*0.5 -0.1
            if(v.y< -100) v.y = Math.random() * 400 + 300
            if(v.x< -500) v.x = Math.random() * 400 - 200
            if(v.z< -500) v.z = Math.random() * 400 - 200
        })

        // 设置实时更新网格的顶点信息
        vertices.geometry.verticesNeedUpdate = true

    }


}