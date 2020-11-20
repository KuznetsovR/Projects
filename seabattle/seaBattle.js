let table = {
    elements:[],
    makeElements: function(){
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
ship.setCoordinates('1а');
console.log(table.elements);
console.log(table.checkElement('1а'));

//console.log(ship.getCoordinates())