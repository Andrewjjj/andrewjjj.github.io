function RandomizedPrim(width, height){
    let visitArray=[];
    let node = getRandomNodeLocation(width, height);
    node.wall = false;
    visitArray.push(node);
    
    let frontierArray = getAllNeighborNodesDouble(node);
    while(frontierArray.length > 0){
        let randomIndex = parseInt(Math.random()*frontierArray.length);
        let randomNode = frontierArray[randomIndex];
        frontierArray.splice(randomIndex,1);

        node = findClosestNormalNodeDouble(randomNode);
        let betweenNode = getNodesInBetween(node, randomNode);
        visitArray.push(node);
        node.wall=false;
        visitArray.push(randomNode);
        randomNode.wall = false;
        visitArray.push(betweenNode);
        betweenNode.wall = false;
        for(let node of getAllNeighborNodesDouble(randomNode)){
            if(!frontierArray.includes(node)){
                frontierArray.push(node)
            }
        }
    }
    return visitArray;
}

function getDirection(node, wallNode){
    if (node.y - wallNode.y == 1) return 0;
    else if(node.x - wallNode.x == -1) return 1;
    else if (node.y - wallNode.y == -1) return 2;
    else if (node.x - wallNode.x == 1) return 3;
}

function getRandomNearestNeighborNodes(randomNode){
    let neighborsList = getAllNeighborNodesDouble(randomNode);
    shuffle(neighborsList);
    for(let node of neighborsList){
        if(node.wall == true){
            return node;
        }
    }
};

function getAllNeighborNodesDouble(node){
    let neighborsList = [];
    let neighbors = 0;
    
    if(node.x > 1){
        if(nodeBox.get(node.x-2, node.y).wall == true){
            neighborsList.push(nodeBox.get(node.x-2, node.y));
        }
    }
    if(node.y > 1){
        if(nodeBox.get(node.x, node.y-2).wall == true){
            neighborsList.push(nodeBox.get(node.x, node.y-2));
        }
    }
    if(node.x != GRID_WIDTH-2){
        if(nodeBox.get(node.x+2, node.y).wall == true){
            neighborsList.push(nodeBox.get(node.x+2, node.y));
        }
    }
    if(node.y != GRID_HEIGHT-2){
        if(nodeBox.get(node.x, node.y+2).wall == true){
            neighborsList.push(nodeBox.get(node.x, node.y+2));
        }
    }
    return neighborsList;
}

function findClosestNormalNodeDouble(node){
    let neighborsList = [];
    if(node.x > 2){
        if(nodeBox.get(node.x-2, node.y).wall == false){
            neighborsList.push(nodeBox.get(node.x-2, node.y));
        }
    }
    if(node.y > 2){
        if(nodeBox.get(node.x, node.y-2).wall == false){
            neighborsList.push(nodeBox.get(node.x, node.y-2));
        }
    }
    if(node.x < GRID_WIDTH-2){
        if(nodeBox.get(node.x+2, node.y).wall == false){
            neighborsList.push(nodeBox.get(node.x+2, node.y));
        }
    }
    if(node.y < GRID_HEIGHT-2){
        if(nodeBox.get(node.x, node.y+2).wall == false){
            neighborsList.push(nodeBox.get(node.x, node.y+2));
        }
    }
    return neighborsList[parseInt(Math.random()*neighborsList.length)];
}

function shuffle(arr){
    return arr.sort(() => Math.random()-0.5);
}

function getRandomNodeLocation(width, height) {
    let randX = parseInt(Math.random()*width);
    let randY = parseInt(Math.random()*height);
    while(randX%2==0){
        randX = parseInt(Math.random()*width);
    }
    while(randY%2==0){
        randY = parseInt(Math.random()*height);
    }
    return nodeBox.get(randX, randY);
}
