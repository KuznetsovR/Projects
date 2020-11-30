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
let yourTable = {
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
        let c = 10;
        console.log(yourTable.field);
        let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
        for (let i=0;i<12;i++) {
            place.insertAdjacentHTML('afterbegin', `<div id='row${i}'class='row'></div>`);
            row = document.getElementById(`row${i}`);
            if(i===0||i===11){
                let alphabetFor = 9;
                for (let t=0;t<12;t++) {
                    if (t===0||t===11){
                        row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-left:1%'></div>`);
                    }else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-left:1%'>${alphabet[alphabetFor]}</div>`);
                    alphabetFor--;
                    }
                }
                continue;
            }
            row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
            for (let j=0;j<10;j++) {
                if (yourTable.field[i-1][j]!=='none' && yourTable.field[i-1][j]!=='bui'){
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col' style = 'background-color:black; padding-top:8%; border:1px solid black;'></div>`); //${yourTable.field[i][j]}
                }               
                /*else if (enemyyourTable.field[i][j]=='bui'){ 
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col' style = 'background-color:green; padding-top:8%; border:1px solid black;'></div>`); //${yourTable.field[i][j]}
                }*/
                else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
                
            }
            row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
            c--;
        }
        console.log(place);
    }
}
let enemyTable = {
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
        let c = 10;
        console.log(enemyTable.field);
        let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
        for (let i=0;i<12;i++) {
            place.insertAdjacentHTML('afterbegin', `<div id='row${i}'class='row'></div>`);
            row = document.getElementById(`row${i}`);
            if(i===0||i===11){
                let alphabetFor = 9;
                for (let t=0;t<12;t++) {
                    if (t===0||t===11){
                        row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-left:1%'></div>`);
                    }else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-left:1%'>${alphabet[alphabetFor]}</div>`);
                    alphabetFor--;
                    }
                }
                continue;
            }
            row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
            for (let j=0;j<10;j++) {
                if (enemyTable.field[i-1][j]!=='none' &&enemyTable.field[i-1][j]!=='bui'){
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col' style = 'background-color:black; padding-top:8%; border:1px solid black;'></div>`); //${enemyTable.field[i][j]}
                }               
                /*else if (enemyTable.field[i][j]=='bui'){ 
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col' style = 'background-color:green; padding-top:8%; border:1px solid black;'></div>`); //${enemyTable.field[i][j]}
                }*/
                else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
                
            }
            row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
            c--;
        }
        console.log(place);
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
enemyTable.makeElements();
yourTable.makeElements();

for (let p=0;p<4;p++){
    enemyTable.buiMaker(enemyTable.shipMaker());
}
for (let w=0;w<4;w++){
    yourTable.buiMaker(yourTable.shipMaker());
}
//enemyTable.shipChecker('1б');
//console.log(enemyTable.field);
enemyTable.render(document.getElementById("enemyField"));
yourTable.render(document.getElementById("playersField"));
