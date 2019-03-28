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
   // leavesFalling()

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
    points.geometry.vertices.forEach(function(v) {
        if (v.y >= -7) {
          v.x = v.x - v.velocityX
          v.y = v.y - v.velocityY
        }
        if (v.x <= -150 || v.x >= 150) v.velocityX = v.velocityX * -1
      })
    
      points.geometry.verticesNeedUpdate = true
}

/**
 * 落叶落下过程
 */
function falling() {
    var time = Date.now() * 0.0005;  //776780865  大约每秒 + 1


    for (let i = 0; i < leaves.length; i++) {
        var vertices = leaves[i];
        vertices.rotation.y = 0.35*time * (i < 4 ? i + 1 : -(i + 1));
        vertices.geometry.vertices.forEach(v => {
           
            v.y -= Math.random()*3*0.05 + 0.05
            v.x -= v.velocityX
            v.z -= v.velocityX
            if(v.y< -10) {
                v.y = Math.random() * 300 + 400
                v.x = Math.random() * 300 - 150
                v.z = Math.random() * 300 - 150

                v.velocityX = THREE.Math.randFloat(-0.3, 0.3)
                v.velocityY = THREE.Math.randFloat(0.1, 0.3)
            }
       
        })

        // 设置实时更新网格的顶点信息
        vertices.geometry.verticesNeedUpdate = true

    }


}