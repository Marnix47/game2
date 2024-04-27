
const blockSize = g.blockSize;
class Block{
    constructor(props){
        //{props}: {name: string, position: {x: int, y: int, z: int}}
        this.name = props.name;
        this.gridPosition = props.position;
        this.planePosition = {
            x: props.position.x * blockSize,
            y: -1 * props.position.y * blockSize,
            z: props.position.z * blockSize
        };
        switch(props.name){
            case "grass":
                this.mineTime = .5;
                this.color = "green";
                break;
        };
    }
}