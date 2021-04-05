class Stack {
    constructor(){
        this.data=[];
    }

    push(data){
        this.data.push(data);
    }

    pop(){
        return this.data.pop();
    }

    top(){
        return (!this.isEmpty() ? this.data[0] : undefined);
    }

    isEmpty(){
        return (this.data.length==0);
    }
}