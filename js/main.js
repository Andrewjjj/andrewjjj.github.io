// import { resolve } from "path";

// import { BFS } from "BFS.js";
// import {Queue} from "/algorithms/Queue.js";

var START_NODE = [12,10];
var END_NODE = [38,10];
var startNode;
var endNode;
var stopFlag=false;
var running=false;

let GRID_WIDTH = 51;
let GRID_HEIGHT = 21;

let ANIMATION_SPEED = 4;

// var startDragVar = false;
var startDragWall = false;
var mouseDown = false;
let startNodeDrag = false;
let endNodeDrag = false;

const nodeBox = new NodeBox();
console.log("Start")
init();

function init(){
    try{
        initializeGrid();
        setupStartEndNode();

    } catch(err){console.log(err)}
}

function initializeGrid(){
    const gridContainer = document.getElementById('grid-container');
    var nodeContainer=[];
    for(let row=0; row<GRID_HEIGHT; row++){
        let rowContainer = createGridRow();
        let nodeRow=[];
        for(let col=0; col<GRID_WIDTH; col++){
            let node = new Node(col, row);
            let div = createGridPiece(row, col);
            addDivEventListener(div);
            // div.addEventListener("mousedown", switchWall);
            // div.addEventListener("mouseenter", switchWallDrag);
            // div.addEventListener("mouseup", switchWallExit);
            rowContainer.appendChild(div);
            node.setDiv(div);
            nodeRow.push(node);
        }
        nodeContainer.push(nodeRow);
        gridContainer.appendChild(rowContainer);
    }
    nodeBox.set(nodeContainer);
}

function addDivEventListener(div){

    div.onmousedown = (e) => {

        // console.log(window.event);
        e.preventDefault();
        // console.log(e);
        let [x,y] = getDivPostion(e.srcElement.parentElement);
        if(running != true){
            mouseDown = true;
            if(nodeBox.get(x,y).startNode){
                startNodeDrag = true;
                // console.log("This is Start NOde");
            }
            else if(nodeBox.get(x,y).endNode){
                endNodeDrag = true;
                // console.log("This is Start NOde");
            }
            switchWall(x,y);
        }
    }
    div.onmouseenter = (e) => {

        // console.log(window.event);
        // console.log(e);
        e.preventDefault();
        let [x,y] = getDivPostion(e.srcElement);
        if(startNodeDrag){
            let node = nodeBox.get(x, y);
            startNode = node;
            node.setStart();
            // startNode = node;
        }
        else if(endNodeDrag){
            let node = nodeBox.get(x, y);
            endNode = node;
            node.setEnd();
            // endNode = node;
        }
        else if(mouseDown == true){
            switchWall(x,y);
            // console.log("mouse Enter")
        }
    }
    div.onmouseup = (e) => {
        // let [x,y] = getDivPostion(e.srcElement);
        e.preventDefault();
        mouseDown = false;
        startNodeDrag = false;
        endNodeDrag = false;
    }
    div.onmouseleave = (e) => {
        e.preventDefault();
        let [x,y] = getDivPostion(e.srcElement);
        if(startNodeDrag){
            // console.log(nodeBox.get(x, y).div)
            nodeBox.get(x, y).resetNode();
        }
        else if(endNodeDrag){
            // console.log(nodeBox.get(x, y).div)
            nodeBox.get(x, y).resetNode();
        }
        // console.log("Leaving");
    }
}

function getDivPostion(div){
    let x = div.getAttribute("colnum");
    let y = div.getAttribute("rownum");
    return [x,y];
}

function switchWall(x,y){
    // e.preventDefault();
    // console.log(e);
    // let div = e.srcElement;
    // console.log(div);
    // startDragVar = true;
    // let y = div.getAttribute("rownum");
    // let x = div.getAttribute("colnum");
    console.log("SWITCHWALL")
    let node = nodeBox.get(x, y);
    console.log(node);
    node.switchWall();
    // if(node )
}
// var qq;
// function switchWallDrag(e){
//     // e.preventDefault();
//     console.log("DragEnter")
//     let div = e.srcElement.parentElement;
//     console.log(div.classList);
//     if(div.classList.contains("grid-box")){
//         console.log("Yes!")
//         let y = div.getAttribute("rownum");
//         let x = div.getAttribute("colnum");
//         console.log(x, y);
//         let node = nodeBox.get(x, y);
//         node.switchWall();
//     }
//     else{
//         console.log("NOPE!")
//     }
// }

function switchWallExit(e){
    // startDragVar = false;
}

function setupStartEndNode(){
    // console.log(START_NODE);
    startNode = nodeBox.get(START_NODE[0], START_NODE[1]);
    endNode = nodeBox.get(END_NODE[0],END_NODE[1]);
    // const startNodeDiv = getDivAtIndex(startNode.x, startNode.y);
    // const endNodeDiv = getDivAtIndex(endNode.x, endNode.y);
    startNode.setStart();
    endNode.setEnd();
    // setNodeColor(startNode, '#7DCEA0');
    // setNodeColor(endNode, "#BB8FCE");
}

function setNodeColor(node, color){
    node.div.setAttribute('style', 'background-color: ' + color);
}

function getDivAtIndex(x, y){
    const gridContainer = document.getElementById('grid-container');
    return gridContainer.children[y].children[x];
}

function reset(){
    if(running == true){
        running = false;
    }
    for(let nodeRow of nodeBox.nodeBox){
        for(let node of nodeRow){
            // console.log(node);
            node.reset();
        }
    }

}

// var qq;
// function startBFS(){
//     disableButtons();
//     // reset();
//     let [visitArray, valid] = BFS(startNode, endNode, null, null);
//     let pathArray = [];
//     if(valid){
//         pathArray = shortestPath(startNode, endNode);
//     }
//     animate(visitArray, pathArray)
//     .then(() => {
//         if(!valid) alert("No Valid Path Found!")
//         enableButtons();
//     })
// }

function stopAnimation(){
    if(running == true){
        stopFlag = true;
    }
}

function startSearch(searchMethod){
    disableButtons();
    let visitArray, valid, pathArray=[];
    if(searchMethod == "BFS"){
        [visitArray, valid] = BFS(startNode, endNode);
    }
    else if(searchMethod == "BidirectionalBFS"){
        [visitArray, valid] = BidirectionalBFS(startNode, endNode);
        console.log("Valid?!")
        console.log(visitArray);
        console.log(valid);
    }
    else if(searchMethod == "DFS"){
        [visitArray, valid] = DFS(startNode, endNode);
    }
    else if(searchMethod == "Dijkstra"){
        [visitArray, valid] = Dijkstra(startNode, endNode);
    }

    if(valid){
        console.log("Valid")
        // console.log()
        try{
        pathArray = shortestPath(startNode, endNode);
        }catch(err){console.log(err)}
        console.log("Valid Pass")
    }
    animateSearch(visitArray, pathArray)
    .then(() => {
        if(!valid) alert("No Valid Path Found!")
        enableButtons();
    })    
}

function startBidirectionalBFS(){
    disableButtons();
    let visitArray, valid, pathArray=[];
    [visitArray, valid] = BidirectionalBFS(startNode, endNode);
    console.log(visitArray);
    if(valid){
        pathArray = shortestPathBidirectional(startNode, endNode, visitArray[visitArray.length-1]);
    }
    animateSearch(visitArray, pathArray)
    .then(() => {
        if(!valid) alert("No valid path foundd!!!23");
    })
}

function resetWall(){
    for(let nodeRow of nodeBox.nodeBox){
        for(let node of nodeRow){
            if(node.isWall()){
                node.setNormal();
            }
        }
    }
}

function startDFSMaze(){
    reset();
    let wallArray=coverWall(GRID_WIDTH, GRID_HEIGHT);
    console.log(wallArray)
    let pathArray=DepthFirstSearchMaze(GRID_WIDTH-1, GRID_HEIGHT-1);
    animateMaze(wallArray, pathArray);
    
}

function startEllerMaze(){
    reset();
    let wallArray=coverWall(GRID_WIDTH, GRID_HEIGHT);
    // console.log("WallArr")
    // console.log(wallArray)
    let pathArray = EllersAlgorithm(GRID_WIDTH, GRID_HEIGHT);
    // console.log("PathArr")
    // console.log(pathArray)
    animateMaze(wallArray, pathArray);
    // testAnimate(arr);
}

function startKruskalMaze(){
    reset();
    let wallArray = coverWall(GRID_WIDTH, GRID_HEIGHT);
    let pathArray = RandomizedKruskal(GRID_WIDTH, GRID_HEIGHT);
    animateMaze(wallArray, pathArray);
}

function coverWall(width, height){
    let visitArray=[];
    for(let col=0; col<width; col++){
        for(let row=0; row<height; row++){
            let node = nodeBox.get(col, row);
            if(!node.startNode && !node.endNode){
                visitArray.push(node);
                node.wall = true;
            }
        }
    }
    return visitArray;
}

async function animateMaze(wallArray, pathArray){
    running = true;
    let v = 0;
    for(let e of wallArray){
        if(running == false){
            reset();
            return;
        }
        v++;
        if (v%GRID_HEIGHT == 0) {
            await sleep(ANIMATION_SPEED);
        }
        // console.log(e);
        e.animateWall();
    }
    for(let e of pathArray){
        if(running == false){
            reset();
            return;
        }
        await sleep(ANIMATION_SPEED);
        e.animateNormal();
    }
    // await sleep(1000);
    running = false;
}

async function animateSearch(visitArray, pathArray){
    running = true;
    for(let e of visitArray){
        if(running == false){
            reset();
            return;
        }
        await sleep(ANIMATION_SPEED);
        // console.log(e);
        e.animateVisit();
    }
    for(let e of pathArray){

        if(running == false){
            reset();
            return;
        }
        await sleep(ANIMATION_SPEED);
        e.animatePath();
    }
    await sleep(1000);
    running = false;
}

function disableButtons(){
    let buttons = [
        document.getElementById("beginMazeBtn"),
        document.getElementById("beginSearchBtn"),
        // document.getElementById("DijkstraBtn"),
    ]
    // console.log(buttons);
    for(let button of buttons){
        button.disabled = true;
    }
}

function enableButtons(){
    let buttons = [
        document.getElementById("beginMazeBtn"),
        document.getElementById("beginSearchBtn"),
    ]
    for(let button of buttons){
        button.disabled = false;
    }
}

async function testAnimate(array){
    for(let e of array){
        // if(running == false){
        //     reset();
        //     return;
        // }
        await sleep(ANIMATION_SPEED);
        // console.log(e);
        e.animateVisit();
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
// async function animateVisitNode(visitArray){

// }

function createGridPiece(row, col){
    const div = document.createElement('div');
    div.setAttribute('class', 'grid-box');
    div.setAttribute('rowNum', row);
    div.setAttribute('colNum', col);
    return div;
}

function createGridRow(){
    const div = document.createElement('div');
    div.setAttribute('class', 'grid-row');
    return div;
}



// let e=window.event;
// window.event;

// pauseEvent(e);
// function pauseEvent(e){
//     if(e.stopPropagation) e.stopPropagation();
//     if(e.preventDefault) e.preventDefault();
//     e.cancelBubble=true;
//     e.returnValue=false;
//     return false;
// }

document.onselectstart = new Function ("return false")
window.onmouseup = (e) => {
    mouseDown = false;
}
// if (window.sidebar) {
//   document.onmousedown = disableselect
//   document.onclick = reEnable
// }

