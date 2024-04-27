function renderWorld(){
    const c = g.c;
    var blocks = g.blocks;
    c.stroke("black");
    c.strokeWeight(2);
    // c.noStroke();
    for(var i = 0; i < 100; i++){
        for(var j = 0; j < 100; j++){
            for(var k = 0; k < 100; k++){
                
                var b = blocks[i][j][k];
                if(b !== undefined){
                    // c.push();
                    // c.translate(b.planePosition.x, b.planePosition.y, b.planePosition.z);
                    // c.box(g.blockSize);
                    // c.pop();
                    drawPlanes(i,j,k, getVisiblePlanes(i,j,k), "green");

                }
            }
        }
    }
}

function getVisiblePlanes(x, y, z){
    var blocks = g.blocks;
    const blockSize = g.blockSize;
    const c = g.c;
    var block = blocks[x][y][z];
    //left, right, top, bottom, front, back
    var planesVisible = Array(6).fill(true);
    var closestBlocks = [
        [x - 1, y, z],
        [x + 1, y, z],
        [x, y - 1, z],
        [x, y + 1, z],
        [x, y, z - 1],
        [x, y, z + 1]
    ];
    try{
        // planesVisible = closestBlocks.map((pos) => blocks[pos[0]][pos[1]][pos[2]] === undefined);
    } catch {};
    try{
        for(var i = 0; i < 6; i++){
            if((x == 0 && i == 0) || (x == 99 && i == 1) || (y == 0 && i == 2) || (y == 99 && i == 3) || (z == 0 && i == 4) || (z == 99 && i == 5)){
                continue;
            }
            var pos = closestBlocks[i];
            planesVisible[i] = blocks[pos[0]][pos[1]][pos[2]] === undefined;
        }
    } catch {
        console.error("x", x, "y", y, "z", z)
    }

    const ax = g.cam.eyeX > block.planePosition.x;
    // planesVisible[0] = !ax;
    // planesVisible[1] = ax;
    falsify(0, !ax);
    falsify(1, ax);
    const ay = g.cam.eyeY < block.planePosition.y
    // planesVisible[2] = !ay;
    // planesVisible[3] = ay;
    falsify(2, !ay);
    falsify(3, ay);
    const az = g.cam.eyeZ > block.planePosition.z;
    // planesVisible[4] = !az;
    // planesVisible[5] = az;
    falsify(4, !az);
    falsify(5, az);

    function falsify(index, bool){
        if(planesVisible[index] && !bool){
            planesVisible[index] = false;
        }
    }
    return planesVisible;
}



function drawPlanes(x, y, z, planesVisible, color){
    const c = g.c;
    var planePositions = [
        [x * blockSize - 50, -y * blockSize, z * blockSize],
        [x * blockSize + 50, -y * blockSize, z * blockSize],
        [x * blockSize, -y * blockSize + 50, z * blockSize],
        [x * blockSize, -y * blockSize - 50, z * blockSize],
        [x * blockSize, -y * blockSize, z * blockSize - 50],
        [x * blockSize, -y * blockSize, z * blockSize + 50]
    ];
    for(var i = 0; i < 6; i++){
        if(planesVisible[i] && checkDist(x, y, z)){
            c.push();
            c.translate(...planePositions[i]);
            c.fill(color);
            if(i == 2 || i == 3){
                c.rotateX(90);
            } else if(i < 2){
                c.rotateY(90);
            }
            c.plane(g.blockSize);
            c.pop();
        }
    }
}

function checkDist(x,y,z){
    const c = g.c;
    return c.dist(x * g.blockSize, y * g.blockSize, z * g.blockSize, g.cam.eyeX, g.cam.eyeY, g.cam.eyeZ) < 3000;
}