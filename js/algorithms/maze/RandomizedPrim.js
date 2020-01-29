function randomizedPrim(width, height){
    let visitArray=[];
    let node = getRandomNodeLocation(width, height);
    node.wall = false;
    visitArray.push(node);
    
    let queueArray = getAllNeighborNodes(node);

    while(queueArray.length > 0){
        let randomIndex = Math.random()*queueArray.length;
        let randomNode = queueArray[randomIndex];
        queueArray.splice(randomIndex,1);

        
        
    }

}

function getDirection(node, wallNode){
    if (node.y - wallNode.y == 1) return 0;
    else if(node.x - wallNode.x == -1) return 1;
    else if (node.y - wallNode.y == -1) return 2;
    else if (node.x - wallNode.x == 1) return 3;
}