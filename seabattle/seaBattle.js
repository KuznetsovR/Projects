function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

//function makeShip(coordinates){ makeShip(this.elements[getRandomInt(99)])
//    ship.coordinates = coordinates;
//    ship.status = 1;
//    return ship;
//}

let table = {
    elements:[],
    shipList:[],
    makeElements: function(){                           // делает элементы, которые являются координатами
        let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
        for(i=0;i<10;i++){
            for(j=0;j<10;j++){
                this.elements.push(i+1 + alphabet[j]);
            }
        }
    },
    checkElement: function(value){
        if(ship.coordinates===value){
            return 1;           //there is
        }else{
            return 0;           //there is not
        }
    },
    setShip: function(){
        ship.coordinates = this.elements[getRandomInt(99)];          //это переводит числа в ячейки
        ship['status'] = 1;
        this.shipList.push(ship);
        console.log(ship.coordinates)

        console.log(this.shipList)
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
        let digits = value.replace(/\D/g, "");
        let letters = value.replace(/[^а-я]/gi, ""); 
        let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
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
//ship.setCoordinates('1а');
//console.log(table.elements);
//console.log(table.checkElement('1а'));
table.setShip();
table.setShip();
console.log(getRandomInt(99));
console.log(getRandomInt(99));
