function Dijkstra(startNode, endNode, crossBool) {
    let queue = new Queue();
    let visitArray=[];
    queue.enqueue(startNode);
    startNode.distance = 0;
    visitArray.push(startNode);
    while(true){
        let queueSize = queue.length();
        if(queueSize == 0) return [visitArray, false];
        // let endNodeNeighbors = getAllNeighborNodes(endNode);
        while(queueSize--){
            let node = queue.dequeue();
            node.visit();

            if(node == endNode) return [visitArray, true]; 
            // Goto the vertex with the shortest distance
            let neighborNodes = getAllNeighborNodes(node);
            //
            for(let n of neighborNodes){
                if(n.visited == false && n.isWall() == false){
                    if(node.distance + 1 < n.distance){
                        n.distance = node.distance + 1;
                        n.prev = node;
                    }
                    queue.enqueue(n);
                    n.visit();
                    visitArray.push(n);
                }
            }
        }
    }
}

function neighborsAllVisited(node){
    let neighborNodes = getAllNeighborNodes(node);
    let count=0;
    for(let n of neighborNodes){
        if(n.visited == true || n.isWall()) count++;
    }
    return count==4;
}

function getAllNeighborNodes(node, crossBool=false){
    let neighborsList=[];
    
    // Turns Clockwise
    if(node.x != 0){
        // console.log("1")
        // if(node.y != GRID_HEIGHT && crossBool == true){
        //     if(nodeBox.get(node.x-1, node.y+1)){
        //         neighborsList.push(nodeBox.get(node.x-1, node.y+1));
        //     }
        // }
        if(nodeBox.get(node.x-1, node.y)){
            neighborsList.push(nodeBox.get(node.x-1, node.y));
        }
        // if(node.y != 0 && crossBool == true){
        //     if(nodeBox.get(node.x-1, node.y-1)){
        //         neighborsList.push(nodeBox.get(node.x-1, node.y-1));
        //     }
        // }
    }
    if(node.y != 0){
        // console.log("2")
        if(nodeBox.get(node.x, node.y-1)){
            neighborsList.push(nodeBox.get(node.x, node.y-1));
        }
    }
    if(node.x != GRID_WIDTH-1){
        // console.log("3")
        // if(node.y != 0 && crossBool == true){
        //     if(nodeBox.get(node.x+1, node.y-1)){
        //         neighborsList.push(nodeBox.get(node.x+1, node.y-1));
        //     }
        // }
        if(nodeBox.get(node.x+1, node.y)){
            neighborsList.push(nodeBox.get(node.x+1, node.y));
        }
        // if(node.y != GRID_HEIGHT && crossBool == true){
        //     if(nodeBox.get(node.x+1, node.y+1)){
        //         neighborsList.push(nodeBox.get(node.x+1, node.y+1));
        //     }
        // }
    }
    if(node.y != GRID_HEIGHT-1){
        // console.log("4")
        if(nodeBox.get(node.x, node.y+1)){
            neighborsList.push(nodeBox.get(node.x, node.y+1));
        }
    }
    return neighborsList;
}