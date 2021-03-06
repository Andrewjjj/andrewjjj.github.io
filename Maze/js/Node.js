// Lol @ the name tho.

class NodeBox{
    constructor(){
        this.nodeBox=[];
        this.startNodePos;
        this.endNodePos;
    }

    set(nodeBox){
        this.nodeBox=nodeBox;
    }

    get(x, y){
        return this.nodeBox[y][x];
    }

    setStartNodePos(){

    }
    setEndNodePos(){

    }

    DEBUG_show(){
        for(let nodeRow of this.nodeBox){
            for(let node of nodeRow){
                console.log(node.setNumber == null)
                if(node.setNumber != null){
                    node.div.innerText = node.setNumber;
                }
            }
        }
    }
}

class NodeAnimator {
    constructor(node, state){
        this.node = node;
        this.state = state;
    }
}

class Node {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.visited = false;
        this.div;
        this.divChild
        this.prev;
        this.next;
        this.wall = false;
        this.wallVisited = false;
        this.startNode = false;
        this.endNode = false;
        this.distance = Infinity;

        this.visited1 = false;
        this.visited2 = false;

        this.setNumber = null;
        this.init11 = null;
    }

    setDiv(div){
        this.div = div;
        this.divChild = document.createElement('div');
        this.divChild.style.display = 'block';
        this.divChild.style.width = "1.8vw";
        this.divChild.style.height = "1.8vw";
        this.divChild.className += " node";
        this.div.appendChild(this.divChild);
    }

    visit(){
        this.visited = true;
    }

    visitWall(){
        this.wallVisited = true;
    }

    animateQueue(){
        this.divChild.className += "queueNode";
    }

    animateVisit(){
        if(this.startNode == false && this.endNode == false){
            this.divChild.className += " visitedNode";
        }
       
        // console.log("Animate");
        // this.div.className += "visitedNode";
    }

    animatePath(){
        this.divChild.className += " pathNode";
    }

    animateWall(){
        this.divChild.className = this.divChild.className.replace(" node", " wallNode");
    }

    animateNormal(){
        this.divChild.className = this.divChild.className.replace(" wallNode", " node");
    }

    reset(){
        this.visited = false;
        if(!this.startNode && !this.endNode){
            this.divChild.className = " node";
        }
        this.prev = null;
        this.wall = false;
        this.wallVisited = false;
        this.distance = Infinity;
        this.visited = false;

        this.visited1 = false;
        this.visited2 = false;
        this.setNumber = null;
        if(this.startNode){
            this.setStart();
        }
        if(this.endNode){
            this.setEnd();
        }
    }

    switchWall(){
        console.log("switchwall")
        if(this.startNode == false && this.endNode == false){
            console.log("2")
            this.wall = (this.wall != true);
            if(this.wall == true){
                console.log("3")
                this.divChild.className = this.divChild.className.replace(" node", " wallNode");

            }
            else{
                console.log("4")
                this.divChild.className = this.divChild.className.replace(" wallNode", " node");
            }
        }
    }

    isWall(){
        return (this.wall == true)
    }

    setWall(){
        this.divChild.className = this.divChild.className.replace(" node", " wallNode");
        this.wall = true;
    }

    setNormal(){
        this.divChild.className = this.divChild.className.replace(" wallNode", " node");
        this.wall = false;
    }

    setStart(){
        this.startNode = true;
        this.divChild.className = "startNode";
    }

    setEnd(){
        this.endNode = true;
        this.divChild.className = "endNode";
    }

    resetNode(){
        this.divChild.className = " node";
        this.startNode = false;
        this.endNode = false;
    }
}