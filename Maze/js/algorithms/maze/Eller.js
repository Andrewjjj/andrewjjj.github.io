function EllersAlgorithm(width, height){
    let visitArray=[];
    let nodeSetNumber = 0;
    for(let y=1; y<height-1; y++){
        if(y%2==1){
            let prev = nodeBox.get(1, y);
            if(y==1){
                for(let x=1; x<width-1; x+=2){
                    let node = nodeBox.get(x,y);
                    let betweenNode = getNodesInBetween(node, prev);
                    node.wall = false;
                    // node.setNumber = nodeSetNumber;
                    visitArray.push(node);
                    if(Math.random()>0.5 && prev != node){
                        betweenNode.wall = false;
                        betweenNode.setNumber = prev.setNumber
                        node.setNumber = prev.setNumber;
                        visitArray.push(betweenNode);
                    }
                    else{
                        node.setNumber = nodeSetNumber;
                        nodeSetNumber++;
                    }
                    prev = node;
                }
            }
            else if (y==height-2){
                for(let x=1; x<width-1; x++){
                    let node = nodeBox.get(x,y);
                    node.wall = false;
                    visitArray.push(node);
                }
            }
            else{
                for(let x=1; x<width-1; x+=2){
                    let node = nodeBox.get(x,y);
                    let aboveNode = nodeBox.get(x, y-1);
                    node.wall = false;
                    visitArray.push(node);
                    if(aboveNode.wall == false){
                        node.setNumber = aboveNode.setNumber;
                    }
                    else{
                        node.setNumber = nodeSetNumber++;
                    }
                }
                for(let x=1; x<width-1; x+=2){
                    let node = nodeBox.get(x,y);
                    if(node.wall == true){
                        node.wall = false;
                        visitArray.push(node);
                        node.setNumber = nodeSetNumber++;
                    }
                }
                let prev = nodeBox.get(1, y);
                for(let x=1; x<width-1; x++){
                    let node = nodeBox.get(x,y);
                    let betweenNode = getNodesInBetween(node, prev);
                    if(node.setNumber != prev.setNumber && Math.random()>0.5){
                        betweenNode.wall = false;
                        visitArray.push(betweenNode);
                        node.setNumber = prev.setNumber;
                    }
                }
            }

            // Check Set Number Match
            for(let x=1; x<width-2; x++){
                let currNode = nodeBox.get(x,y)
                let nextNode = nodeBox.get(x+1,y)
                if(!currNode.isWall() && !nextNode.isWall()){
                    nextNode.setNumber = currNode.setNumber;
                }
            }
        }
        else{
            let set = new Set();
            for(let x=1; x<width-1; x+=2){
                let aboveNode = nodeBox.get(x, y-1);
                set.add(aboveNode.setNumber);
            }
            console.log(set);
            
            for(let x=1; x<width-1; x+=2){
                let aboveNode = nodeBox.get(x, y-1);
                let node = nodeBox.get(x,y);
                if(Math.random()>0.5){
                    if(aboveNode.wall == false){
                        node.wall = false;
                        visitArray.push(node);
                        node.setNumber = aboveNode.setNumber;
                        set.delete(node.setNumber);
                    }
                }
            }
            while(set.size > 0){
                console.log("H")
                for(let x=1; x<width-1; x+=2){
                    let aboveNode = nodeBox.get(x, y-1);
                    if(set.has(aboveNode.setNumber) && Math.random()>0.5){
                        let node = nodeBox.get(x,y);
                        node.wall = false;
                        visitArray.push(node);
                        console.log(node.div);
                        node.setNumber = aboveNode.setNumber;
                        set.delete(node.setNumber);
                    }
                }

            }
            
        }
    }
    return visitArray;
}