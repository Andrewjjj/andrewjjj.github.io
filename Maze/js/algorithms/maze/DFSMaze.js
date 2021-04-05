function DepthFirstSearchMaze(width, height){
    console.log(width, height);
    let startX = parseInt(Math.random()*width);
    let startY = parseInt(Math.random()*height);
    while(startX%2==0){
        startX = parseInt(Math.random()*width);
    }
    while(startY%2==0){
        startY = parseInt(Math.random()*height);
    }
    // console.log(startX, startY);
    let node = nodeBox.get(startX, startY);
    // let visitArray = createWall(width, height);
    
    while(node.startNode || node.endNode){
        startX = parseInt(Math.random()*width);
        startY = parseInt(Math.random()*height);
        node = nodeBox.get(startX, startY);
    }
    // console.log(node);
    let visitArray=[];
    visitArray.push(node);

    let stack = new Stack();
    stack.push(node);
    node.wall = false;
    temp = node;
    // let a=10;
    while(!stack.isEmpty()){
        node = stack.pop();
        let betweenNode = getNodesInBetween(node, temp)
        // console.log(betweenNode)
        if(node.isWall()){
            betweenNode.wall = false;
            node.wall = false;
            visitArray.push(betweenNode);
            visitArray.push(node);
        }
        temp = node;
        
        // let randomDirection = parseInt(Math.random()*4);
        let randomDirectionArray = shuffle([0,1,2,3]);
        // console.log(randomDirection);
        for(let directionVar of randomDirectionArray){
            
            // console.log("In 2")
            // console.log(node)
            switch(directionVar){
                case 0:
                    //Left
                    if(node.x-2 < 1){
                        // console.log("4")
                        continue;
                    }
                    if(nodeBox.get(node.x-2, node.y).isWall()){
                        // nodeBox.get(node.x-2, node.y).wall = false;
                        // nodeBox.get(node.x-1, node.y).wall = false;
                        // visitArray.push(nodeBox.get(node.x-1, node.y));
                        // visitArray.push(nodeBox.get(node.x-2, node.y));
                        stack.push(nodeBox.get(node.x-2, node.y));
                    }
                    break;
                case 1:
                    //UP
                    if(node.y-2 < 1){
                        // console.log("4")
                        continue;
                    }
                    if(nodeBox.get(node.x, node.y-2).isWall()){
                        // nodeBox.get(node.x, node.y-1).wall = false;
                        // nodeBox.get(node.x, node.y-2).wall = false;
                        // visitArray.push(nodeBox.get(node.x, node.y-1));
                        // visitArray.push(nodeBox.get(node.x, node.y-2));
                        stack.push(nodeBox.get(node.x, node.y-2));
                    }
                    break;
                case 2:
                    //Right
                    if(node.x+2 > width-1){
                        // console.log("4")
                        continue;
                    }
                    if(nodeBox.get(node.x+2, node.y).isWall()){
                        // nodeBox.get(node.x+2, node.y).wall = false;
                        // nodeBox.get(node.x+1, node.y).wall = false;
                        // visitArray.push(nodeBox.get(node.x+1, node.y));
                        // visitArray.push(nodeBox.get(node.x+2, node.y));
                        stack.push(nodeBox.get(node.x+2, node.y));
                    }
                    break;
                case 3:
                    //Down
                    if(node.y+2 > height-1){
                        // console.log("4")
                        continue;
                    }
                    if(nodeBox.get(node.x, node.y+2).isWall()){
                        // nodeBox.get(node.x, node.y+2).wall = false;
                        // nodeBox.get(node.x, node.y+1).wall = false;
                        // visitArray.push(nodeBox.get(node.x, node.y+1));
                        // visitArray.push(nodeBox.get(node.x, node.y+2));
                        stack.push(nodeBox.get(node.x, node.y+2));
                    }
                    break;
                default:
                    break;                                 
            }
        }
        // console.log(visitArray);
        // let neighborNodes = getAllNeighborNodes(node);
        
        // node = neighborNodes[randomDirection];
        // stack.push(node);
        // node.visitWall();  
    }
    return visitArray;

    // node.setWall();
}
function getNodesInBetween(node1, node2){
    if(node1 == node2) return node1;

    if(node1.x == node2.x){
        if(node1.y < node2.y){
            return nodeBox.get(node1.x, node1.y+1);
        }
        else{
            return nodeBox.get(node1.x, node1.y-1);
        }
    }
    else{
        if(node1.x < node2.x){
            return nodeBox.get(node1.x+1, node1.y);
        }
        else{
            return nodeBox.get(node1.x-1, node1.y);
        }
    }
}

function shuffle(arr){
    return arr.sort(() => Math.random()-0.5);
}

function createWall(width, height){
    let x=0,y=0;
    let visitArray = [];
    while(x<width){
        let node = nodeBox.get(x,y);
        if(!node.startNode && !node.endNode){
            // nodeBox.get(x, y).setWall();
            visitArray.push(node);
        }
        x++;
    }
    while(y<height){
        let node = nodeBox.get(x,y);
        if(!node.startNode && !node.endNode){
            // nodeBox.get(x, y).setWall();
            visitArray.push(node);
        }
        y++;
    }
    while(x>0){
        let node = nodeBox.get(x,y);
        if(!node.startNode && !node.endNode){
            // nodeBox.get(x, y).setWall();
            visitArray.push(node);
        }
        x--;
    }
    while(y>0){
        let node = nodeBox.get(x,y);
        if(!node.startNode && !node.endNode){
            // nodeBox.get(x, y).setWall();
            visitArray.push(node);
        }
        y--;
    }
    return visitArray;

}