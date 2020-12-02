function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

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
};

function render(id, table){
    let name = id;
    let place = document.getElementById(id); //document.getElementById("playersField")
    let object = table;  //this is field
    let c = 10;
    let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
    for (let i=0;i<12;i++) {
        place.insertAdjacentHTML('afterbegin', `<div id='row${i}'class='row'></div>`);
        let row = document.getElementById(`row${i}`);
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
        if(name==='playersField'){
            for (let j=0;j<10;j++) {
                if (typeof(object.field[i-1][j])==='object'){
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col' style = 'background-color:black; padding-top:8%; border:1px solid black;'></div>`); //${enemyTable.field[i][j]}
                }               
                /*else if (enemyTable.field[i][j]=='bui'){ 
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col' style = 'background-color:green; padding-top:8%; border:1px solid black;'></div>`); //${enemyTable.field[i][j]}
                }*/
                else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
            }
        } else if (name==='enemyTable'){
            for (let j=0;j<10;j++) {
                row.insertAdjacentHTML('afterbegin', `<div id='col${c}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
            }
        } else {
            console.log('error');
        }
        row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
        c--;
    }
}

function tableMaker(value){
    this.id = value,
    this.field=[],
    this.arr=[
        [-1,-1],
        [-1,0],
        [-1,1],
        [0,-1],
        [0,1],
        [1,-1],
        [1,0],
        [1,1]
    ],
    this.makeElements= function(){                           // делает элементы, которые являются координатами
        for (i=0;i<10;i++){
            this.field[i] = [];    
            for (j=0;j<10;j++) {
                this.field[i][j] = 'none';
            }
        }
    },
    this.shipChecker= function(coordinates){
        let digit = coordinates.replace(/\D/g, "")-1;
        let letter = coordinates.replace(/[^а-я]/gi, ""); 
        let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
        letter = alphabet.indexOf(letter);
        if (typeof(enemyTable.field[digit][letter])==='object'){
            //ship.status === 0;
            enemyTable.field[digit][letter] = 'killedShip';
            let returnArr = ['Killed', digit, letter]
            return returnArr;
        } else {
            let returnArr = ['Miss', digit, letter]
            return returnArr;
        }
    },
    this.shipMaker= function(){
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
    this.buiMaker= function(ship){
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
    }
}
function shot(){
    let val = document.getElementById('shotinput').value;
    let condition = enemyTable.shipChecker(val);
    let rowShot = String(condition[1]+1);
    let columnShot = String(9-condition[2]);
    let coordinatesShot = rowShot + columnShot;
    let id = `col${coordinatesShot}`;
    let shot = document.getElementById(id);
    if (condition[0]==='Killed'){
        shot.style.backgroundColor = 'black';
    }else if (condition[0]==='Miss'){
        shot.style.backgroundColor = 'gray';
    }
}
/*
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
                /*else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
                
            }
            row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
            c--;
        }
        console.log(place);
    }
*/
let enemyTable = new tableMaker('enemyTable');
let playersField = new tableMaker('playersField');
enemyTable.makeElements();
playersField.makeElements();
console.log(enemyTable.field)
for (let p=0;p<4;p++){
    enemyTable.buiMaker(enemyTable.shipMaker());
}
for (let w=0;w<4;w++){
    playersField.buiMaker(playersField.shipMaker());
}

render(enemyTable.id, enemyTable);
render(playersField.id, playersField);

let btn = document.getElementById('shot');
btn.onclick = function(){
    shot();
}

/*
сделать многопалубные корабли
*/
