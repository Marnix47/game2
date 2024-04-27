new p5(function(c){

    let cam;
    let blocks;
    g.blocks = blocks;
    c.setup = function(){
        g.c = c
        c.createCanvas(1920,1080,c.WEBGL)
        c.angleMode(c.DEGREES)
        c.normalMaterial();
        cam = c.createCamera();
        g.cam = cam
        c.setCamera(cam);
        c.perspective(60, c.width/c.height, .1, 100000);
        g.gameState = "setup"
    }

    c.draw = function(){
        c.clear();
        c.background("skyblue");
        // c.background("black");
        c.orbitControl();
        if(c.keyIsDown(c.LEFT_ARROW)){
            // c.background("skyblue");
            // g.cam.setPosition(0, 500, 0);
            // g.camera.orientation.x -= 1;
            console.log(cam.eyeX, cam.eyeY, cam.eyeZ);
            cam.setPosition(100,-900,800);
        }
        if(g.gameState === "setup"){
            g.gameState = "playing";

            setNewWorld();
        }
        renderWorld();

    }


})

function setNewWorld(){
    const c = g.c;
    resetBlocks();
    placeTrees();
    console.log(g.gameState);
    // g.cameraPos.position = {x:5000, y:-1500, z:5000};

}

function resetBlocks(){
    var blocks = [];
    for(var i = 0; i < 100; i++){
        blocks.push([]);
        for(var j = 0; j < 100; j++){
            blocks[i].push([]);
            for(var k = 0; k < 100; k++){
                blocks[i][j][k] = undefined;
            }
        }
    }
    perlin.seed();
    
    for(var i = 0; i < 100; i++){
        for(var j = 0; j < 100; j++){
            let height = parseInt((perlin.get(i/20, j/20) + 1) * 4.5);
            blocks[i][height][j] = new Block({name: "grass", position: {x:i, y:height, z:j}});
            for(var k = height - 1; k >= 0; k--){
                if(k === 0){
                    blocks[i][k][j] = new Block({name:"bedrock", position: {x:i, y:k, z:j}})
                } else if(height - j > 2){
                    blocks[i][k][j] = new Block({name: "stone", position: {x:i, y:k, z:j}})
                } else {
                    blocks[i][k][j] = new Block({name:"dirt", position: {x:i, y:k, z:j}})
                }
            }
        }
    }
    g.blocks = blocks;
}

function placeTrees(){
	for(var i = 0; i < 100; i++){
		createTree(Math.round(Math.random() * 99), Math.round(Math.random() * 99))
	}
	
}

function createTree(x, z){
    var blocks = g.blocks;
    const tree = [["wood", {x:0, y:0, z:0}], ["wood", {x:0, y:1, z:0}], ["leaf", {x:-1,y:2,z:0}],
    ["leaf", {x:0,y:2,z:-1}], ["leaf", {x:0,y:2,z:1}], ["leaf", {x:1, y:2, z:0}], ["leaf", {x:0,y:3,z:0}]];
    var blocks = g.blocks;
    for(var height = 8; height > 0; height--){
        if(blocks[x][height][z] !== undefined){
            height++;
            break;
        }
    }
    // console.log(height);
    for(var block of tree){
        // console.log(block);
        try{
            // console.log(blocks[x + block[1].x][height + block[1].y][block[1].z + z])

            blocks[x + block[1].x][height + block[1].z][block[1].y + z] = new Block({name: block[0], position: {
                x: x + block[1].x,
                y: height + block[1].y,
                z: z + block[1].z
            }});
        } catch{}
    }
    g.blocks = blocks;
}