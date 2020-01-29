function RandomizedKruskal(width, height){
    let setNumberSet = new Set();
    let visitArray = makeNormalEdges(width, height, setNumberSet);
    // let stackArray=[];
    let wallSet=getWallEdges(width, height);
    // let a=true;
    while(true){
        // a=false
        // console.log("IN")
        for(let n of wallSet){
            if(Math.random() > 0.5 && wallSet.has(n) &&!isSameSetNeighbors(n)){
                n.wall = false;
                visitArray.push(n);
                converConnectedNodeToSet(n);
                // visitArray.push(converConnectedNodeToSet(n));
                wallSet.delete(n);
            }
        }

        let checkSet = new Set();
        for(let y=1; y<height-1; y++){
            for(let x=1; x<width-1; x++){
                let node = nodeBox.get(x,y);
                // console.log(node);
                if(!node.isWall()){
                    checkSet.add(node.setNumber);
                }
            }
        }
        // console.log(checkSet);
        if(checkSet.size==1) break;
    }
    // console.log("Done");
    // console.log(setNumberSet);
    return visitArray;
}

function makeNormalEdges(width, height, set){
    let visitArray=[]
    let nodeSetNumber = 0;
    for(let y=1; y<height-1; y+=2){
        for(let x=1; x<width-1; x+=2){
            let node = nodeBox.get(x,y);
            node.wall = false;
            visitArray.push(node);
            node.setNumber = nodeSetNumber;
            set.add(nodeSetNumber++);
        }
    }
    return visitArray;
}

function getWallEdges(width, height){
    let nodeSet= new Set();
    for(let y=1; y<height-1; y++){
        for(let x=1; x<width-1; x++){
            if(y%2==0 && x%2==1){
                nodeSet.add(nodeBox.get(x,y))
            }
            if(y%2==1 && x%2==0){
                nodeSet.add(nodeBox.get(x,y))
            }
        }
    }
    return nodeSet;
}

function converConnectedNodeToSet(node){
    // Problem = node will be null
    let stack = new Stack();
    let visitArray = [];
    stack.push(node);
    visitArray.push(node);
    let nodeSetNumber;

    for(let n of getAllNeighborNodes(node)){
        if(n.setNumber != null){
            nodeSetNumber = n.setNumber;
            break;
        }
    }


    while(!stack.isEmpty()){
        let node = stack.pop();
        // console.log(node.div);
        visitArray.push(node);
        node.wall = false;
        node.setNumber = nodeSetNumber;
        let neighborNodes = getAllNeighborNodes(node);
        for(let n of neighborNodes){
            if(n.setNumber != nodeSetNumber && !n.isWall()){
                stack.push(n);
            } 
        }
    }
    return visitArray;
}

function isSameSetNeighbors(node){
    let nodeX = node.x;
    let nodeY = node.y;
    // let leftNode;
    // let rightNode;
    // let topNode;
    // let bottomNode;
    if(!nodeBox.get(nodeX-1, nodeY).isWall() && !nodeBox.get(nodeX+1, nodeY).isWall()){
        return (nodeBox.get(nodeX-1, nodeY).setNumber == nodeBox.get(nodeX+1, nodeY).setNumber)
    }
    else if(!nodeBox.get(nodeX, nodeY+1).isWall() && !nodeBox.get(nodeX, nodeY-1).isWall()){
        return (nodeBox.get(nodeX, nodeY+1).setNumber == nodeBox.get(nodeX, nodeY-1).setNumber) 
    }
    return false;
}