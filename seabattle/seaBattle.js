function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function createShip(){
    this.coordinatesX=null,
    this.coordinatesY=null,
    this.status= null,
    this.getstatus = function () {
        return this.status;
    },
    this.getCoordinates = function(){
        if(this.coordinates==null){
            return 1;
        }else{
            return this.coordinates;
        }
    }
}
let table = {
    field:[],
    arr:[
        [-1,-1],
        [-1,0],
        [-1,1],
        [0,-1],
        [0,1],
        [1,-1],
        [1,0],
        [1,1]
    ],
    makeElements: function(){                           // делает элементы, которые являются координатами
        for (i=0;i<10;i++){
            this.field[i] = [];    
            for (j=0;j<10;j++) {
                this.field[i][j] = 'none';
            }
        }
    },
    shipChecker: function(coordinates){
        let digit = coordinates.replace(/\D/g, "")-1;
        let letter = coordinates.replace(/[^а-я]/gi, ""); 
        let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
        letter = alphabet.indexOf(letter);
        if (this.field[digit][letter]==="ship"){
            ship.status === 0;
            this.field[digit][letter] = 'killedShip';
            console.log('Killed');
        } else {
            console.log('Miss');
        }
    },
    shipMaker: function(){
        let ship = new createShip();
        let column = null;
        let row = null;
        do {
        column = getRandomInt(9);
        row = getRandomInt(9);
        //console.log(row, column);
        } while (this.field[row][column] !== 'none');       
        this.field[row][column] = ship;
        ship.coordinatesX = column;
        ship.coordinatesY = row;
        return ship;
    },
    buiMaker: function(ship){
        let x = 0;
        let y = 0;
        let column = ship.coordinatesX;
        let row = ship.coordinatesY;
        //console.log(row, column);
        for(p=0;p<8;p++){
            x = this.arr[p][0];     
            y = this.arr[p][1];
            if (((0<=column+x)&&(column+x<10)) && ((0<=row+y)&&(row+y<10))) {
                this.field[row+y][column+x] = 'bui';
            }
        }
    },
    render: function (place) {
        console.log(table.field);
        for (let i=0;i<10;i++) {
            place.insertAdjacentHTML('afterbegin', `<div id='row${i}'class='row'></div>`);
            row = document.getElementById(`row${i}`);
            row.insertAdjacentHTML('afterbegin', `<div id='col${i}0'class='col'>${i}</div>`);
            for (let j=0;j<10;j++) {
                row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col'>${table.field[i][j]}</div>`);
            }
            row.insertAdjacentHTML('afterbegin', `<div id='col${i}11'class='col'>${i}</div>`);
        }

        console.log(place);
        //place.a   
    }
}
/*
let ship = {
    coordinatesX:null,
    coordinatesY:null,
    status: null,
    getstatus: function () {
        return this.status;
    },
    getCoordinates: function(){
        if(this.coordinates==null){
            return 1;
        }else{
            return this.coordinates;
        }
    }
}
*/
table.makeElements();
table.buiMaker(table.shipMaker());
table.buiMaker(table.shipMaker());
table.buiMaker(table.shipMaker());
table.buiMaker(table.shipMaker());
//table.shipChecker('1б');
console.log(table.field);
table.render(document.getElementById("battlefield"));


// 1) получить col.length
// 2) получить row.length
// 3) arr x foreach row 
// 4) arr y foreach col 
