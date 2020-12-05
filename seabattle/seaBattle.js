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

function render(id){
    let name = id;
    let place = document.getElementById(id); //document.getElementById("playersField")
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
                if (playersField.getStatus(i-1,j)===1){
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col' style = 'background-color:black; padding-top:8%; border:1px solid black;'></div>`);
                }else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
            }
        } else if (name==='enemyTable'){
            for (let j=0;j<10;j++) {
                if( enemyTable.getStatus(i-1,j)===3){
                    row.insertAdjacentHTML('afterbegin', `<div id='col${c}${j}'class='col' style = 'background-color:red; padding-top:8%; border:1px solid black;'></div>`);
                }else if(enemyTable.getStatus(i-1,j)===4){
                    row.insertAdjacentHTML('afterbegin', `<div id='col${c}${j}'class='col' style = 'background-color:gray; padding-top:8%; border:1px solid black;'></div>`);
                }else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col${c}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
            }
        } else {
            console.log('error');
        }
        row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
        c--;
    }
}
function afterRender(id){
    let name = id;

    if(name==='playersField'){
            for (let j=0;j<10;j++) {
                for (let i=0;i<10;i++){
                    if (playersField.getStatus(i,j)===1){
                        let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'black';
                    }else if(playersField.getStatus(i,j)===3){
                        let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'red';
                    }else if(playersField.getStatus(i,j)===4){
                        let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'gray';
                    }else{
                        let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'white';
                    }
                }
            }
    } else if (name==='enemyTable'){
            for (let j=0;j<10;j++) {
                for (let i=0;i<10;i++){
                    if(enemyTable.getStatus(i,j)===3){
                        let neededPixel = document.getElementById(`col${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'red';
                    }else if(enemyTable.getStatus(i,j)===4){
                        let neededPixel = document.getElementById(`col${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'gray';
                    }else{
                        let neededPixel = document.getElementById(`col${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'white';
                    }
                }
            }
    } else {
        console.log('error');
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
    this.getStatus= function(digit, letter){  //digit -row letter - column
        if (typeof(enemyTable.field[digit][letter])==='object'){
            return 1;
        }else{
            switch (enemyTable.field[digit][letter]){
                case 'none':
                    return 0;
                case 'bui':
                    return 2;
                case 'killedShip':
                    return 3;
                case 'missedShot':
                    return 4;
            }
        }
    },
    this.shipMaker= function(size){          
        let ship = new createShip();
        let column = null;
        let row = null;
        let checker = [ [-1,0], [0,-1], [0,1], [1,0] ];
        let x = 0;
        let y = 0;
        let a = 0;
        do {
        column = getRandomInt(9);
        row = getRandomInt(9);
        //console.log(row, column);
        } while (this.field[row][column] !== 'none');

        if (size===1){       
        this.field[row][column] = ship;
        ship.coordinatesX = column;
        ship.coordinatesY = row;
            
        }/*else if (size===2){
            if (this.field[row][column] = 'none'){
                for(let i = 0;i<1;i++){
                    this.field[row][column] = ship;
                    for(let z = 0;z<4;z++){
                        x = checker[z][0];     
                        y = checker[z][1];
                        if ([row+x][column+y]==='none'){
                            this.field[row+x][column+y] = ship;
                        }else{
                            a++;
                        }
                        if (a==4){
                            this.field[row][column] = 'none';
                            i--;
                        }
                    }
                }
            }
        }*/
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
                if(this.field[row+y][column+x] = 'none'){
                this.field[row+y][column+x] = 'bui';
                }
            }
        }
    }
}
function shot(val){
    let digit = val.replace(/\D/g, "")-1;
    let letter = val.replace(/[^а-я]/gi, ""); 
    let alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';
    letter = alphabet.indexOf(letter);
    let status = enemyTable.getStatus(digit, letter);
    console.log(status);
    if (status===1){
        enemyTable.field[digit][letter] = 'killedShip';
    }else{
        enemyTable.field[digit][letter] = 'missedShot';
    }
}
let enemyTable = new tableMaker('enemyTable');
let playersField = new tableMaker('playersField');
enemyTable.makeElements();
playersField.makeElements();
console.log(enemyTable.field)
for (let p=0;p<4;p++){
    enemyTable.buiMaker(enemyTable.shipMaker(1));
}
for (let w=0;w<4;w++){
    playersField.buiMaker(playersField.shipMaker(1));
}
//playersField.shipMaker(2);
console.log(playersField.field);
render('enemyTable');
render('playersField');
console.log(document.getElementById('shotinput').value)
let btn = document.getElementById('shot');

btn.onclick = function(){
    shot(document.getElementById('shotinput').value);
    afterRender('enemyTable');
    console.log(enemyTable.field);
}

/*
сделать многопалубные корабли
*/
