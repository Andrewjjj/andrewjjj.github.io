function DFS(startNode, endNode){
    let stack = new Stack();
    let visitStack = new Stack();
    let visitArray = [];
    let prev = startNode;
    stack.push(startNode);
    visitStack.push(startNode);
    while(!stack.isEmpty()){
        let node = stack.pop();
        node.visit();
        // if(node.prev != prev){
        
        console.log(node)
        node.prev = prev;
        prev = node;
        visitArray.push(node);
        console.log(node != startNode)
        
        // }
        if(node == endNode){
            console.log("Found")
            reorganizePathDFS(endNode, visitStack);
            return [visitArray, true];
        }
        // console.log(node);
        let neighborNodes = getAllNeighborNodes(node);
        for (let n of neighborNodes){
            if(n.visited == false && n.isWall() == false){
                stack.push(n);
                visitStack.push(n);
                // n.prev = node;
                // visitArray.push(n);
                
            }
        }
    }
    console.log("Not Found")

    return [visitArray, false];
}

function reorganizePathDFS(endNode, stack){
    let node = endNode;
    let prevNode = node;
    while(!stack.isEmpty()){
        prevNode = stack.pop();
        if(isNeighborNode(node, prevNode)){
            node.prev = prevNode;
        }
        node = prevNode;
    }
    console.log("PATH")
    console.log(endNode);
}

function isNeighborNode(node1, node2){
    return ((Math.abs(node1.x-node2.x)==1 && node1.y == node2.y) || (node1.x==node2.x && Math.abs(node1.y-node2.y)==1))
}


// Fix this
function sortShortestDFS(startNode, endNode){
    var path = [];
    var node = endNode;
    let temp = node;
    path.push(node);
    a=200;
    console.log("G")
    while(node != startNode && a-->0){
        console.log("23")
        node = node.prev;
        while(Math.abs(node.prev.x-temp.x)>1 || Math.abs(node.prev.y-temp.y)>1){
            node = node.prev;
            console.log("45")
            console.log(node);
            console.log(temp);
            a--;
            if(a<0) return;
        }
        path.push(node);
        temp = node;
    }
    // console.log(path)
    return path;
}