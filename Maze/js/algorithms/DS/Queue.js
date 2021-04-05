class Queue {
    constructor(){
        this.data=[];
    }
    enqueue(e){
        this.data.push(e);
    }

    dequeue(){
        // console.log(this.data);
        return this.data.shift();
    }
    
    front(){
        return (!this.isEmpty() ? this.data[0] : undefined);
    }

    isEmpty(){
        return (this.data.length == 0);
    }

    length(){
        return this.data.length;
    }
}