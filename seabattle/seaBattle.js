function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

let table = {
    field:[],
    makeElements: function(){                           // делает элементы, которые являются координатами
        for (i=0;i<10;i++){
            this.field[i] = [];    
            for (j=0;j<10;j++) {
                this.field[i][j] = 'none';
            }
        }
        console.log(this.field); 
    },

    shipMaker: function(){
        
        do {
        let column = getRandomInt(9);
        let row = getRandomInt(9);
        console.log(column);
        console.log(row);
        } while (this.field[column][row] !== 'none');       //problem
        this.field[column][row] = 'ship';
        

        //let digit = coordinates.replace(/\D/g, "");
        //let letter = coordinates.replace(/[^а-я]/gi, ""); 
        //let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
        //letter = alphabet.indexOf(letter);
        //console.log(letter);
        //let column = 
        //ship1
    },
    buiMaker: function(column, row){
        let x = 0;
        let buis = [
            [-1,-1],
            [-1,0],
            [-1,1],
            [0,-1],
            [0,1],
            [1,-1],
            [1,0],
            [1,1]
        ]
        for(i=0;i<9;i++){
            x = buis[i][0];     //problem
            y = buis[i][1];
            console.log(x);
            if (((0<=column+x)&&(column+x<10)) && ((0<=column+y)&&(column+y<10))) {
                this.field[column+x][row+y] = 'bui';
            }
        }
    }
}

let ship = {
    coordinates:null ,
    status: null,
    getstatus: function () {
        return this.status;
    },
    setstatus: function(value) {
        switch(value) {
            case 1:             //alive
            case 0:             // not alive
                this.status = value;
                return 0;
            default:
                return 1;
        }
    },
    getCoordinates: function(){
        if(this.coordinates==null){
            return 1;
        }else{
            return this.coordinates;
        }
    },
    setCoordinates: function(value){
        
        digits = parseInt(digits);
        if(digits<=10&&alphabet.indexOf(letters)<=9){
            this.coordinates = digits + letters;
            return 0;
        } else{
            return 1;
        }
    }
}

table.makeElements();
table.buiMaker(4, 4);
//table.shipMaker();
console.log(table.field);
//table.setShip();
