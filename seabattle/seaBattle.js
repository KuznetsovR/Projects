function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function createShip(){                               
    this.coordinatesX=null,
    this.coordinatesY=null,
    this.status= null,
    this.size= null;
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
                if (playersField.getStatus(playersField, i-1,j)===1){
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col' style = 'background-color:black; padding-top:8%; border:1px solid black;'></div>`);
                }else{
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
            }
        } else if (name==='enemyTable'){
            for (let j=0;j<10;j++) {
                if( enemyTable.getStatus(enemyTable, i-1,j)===3){
                    row.insertAdjacentHTML('afterbegin', `<div id='col${c}${j}'class='col' style = 'background-color:red; padding-top:8%; border:1px solid black;'></div>`);
                }else if(enemyTable.getStatus(enemyTable, i-1,j)===4){
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
                    if (playersField.getStatus(playersField, i,j)===1){
                        let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'black';
                    }else if(playersField.getStatus(playersField, i,j)===3){
                        let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'red';
                    }else if(playersField.getStatus(playersField, i,j)===4){
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
                    if(enemyTable.getStatus(enemyTable, i,j)===3){
                        let neededPixel = document.getElementById(`col${i+1}${9-j}`);
                        neededPixel.style.backgroundColor = 'red';
                    }else if(enemyTable.getStatus(enemyTable, i,j)===4){
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
    this.getStatus= function(table, digit, letter){  //digit -row letter - column
        if(digit<0||digit>9||letter<0||letter>9){
            return 'error'
        }else if (typeof(table.field[digit][letter])==='object'){
            return 1;
        }else{
            switch (table.field[digit][letter]){
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
        column = getRandomInt(10);
        row = getRandomInt(10);
        } while (this.getStatus(this, row, column) !== 0);

        if (size===1){       
            this.field[row][column] = ship;
            ship.coordinatesX = column;
            ship.coordinatesY = row;
            ship.size=size;
            return ship;   
        }else{
            for(let beg=0;beg<1;beg){
                column = [];
                row = [];
                do {
                    column[0] = getRandomInt(10);
                    row[0] = getRandomInt(10);
                } while (this.getStatus(this, row[0], column[0]) !== 0);             
                for(let mid=0;mid<4;mid++){
                    x = checker[mid][0];     
                    y = checker[mid][1];
                    for(let count=1;count<size;count) {
                        //console.log(this.getStatus(this, (row[count-1]+x), (column[count-1]+y)));
                        if(this.getStatus(this, (row[count-1]+x), (column[count-1]+y)) === 0){
                            column[count] = column[count-1] + y;
                            row[count] = row[count-1] + x;
                            count++;
                            if (count===size){
                                ship.coordinatesX = column;
                                ship.coordinatesY = row;
                                for(let shipSetter=0;shipSetter<size;shipSetter++){
                                    let neededRow = row[shipSetter];
                                    let neededColumn = column[shipSetter]
                                    this.field[neededRow][neededColumn] = ship;
                                }
                                ship.size=size;
                                return ship;
                            }
                        }else{
                            break;
                        }
                    }
                }
                
            }
            
        }
        /*
        
        else if (size===2){
            for(let count=0;count<1;count) {
                column = getRandomInt(9);
                row = getRandomInt(9);                
                    let dir = getRandomInt(4);
                    x = checker[dir][0];     
                    y = checker[dir][1];
                    if((row+x>=0&&row+x<=9)&&(column+y>=0&&column+y<=9)&&(this.getStatus(this, row, column) === 0)&&(this.getStatus(this, (row+x), (column+y)) === 0)){
                        count++;
                    }
            }
            console.log(row, column, row+x, column+y)
            this.field[row][column] = ship;
            ship.coordinatesX = [column];
            ship.coordinatesY = [row];
            this.field[row+x][column+y] = ship;
            ship.coordinatesX.push(column+y);
            ship.coordinatesY.push(row+x);
            ship.size = 2;
            return ship;
        }*/
    },
    this.buiMaker= function(ship){
        let x = 0;
        let y = 0;
        if(ship.size===1){
            let column = ship.coordinatesX;
            let row = ship.coordinatesY;
            for(p=0;p<8;p++){
                x = this.arr[p][0];     
                y = this.arr[p][1];
                if (((0<=column+x)&&(column+x<10)) && ((0<=row+y)&&(row+y<10))) {
                    if(this.field[row+y][column+x] === 'none'){
                    this.field[row+y][column+x] = 'bui';
                    }
                }
            }
        }else{
            for(let sizeCount = 0; sizeCount<ship.size;sizeCount++){
                let column = ship.coordinatesX[sizeCount];
                let row = ship.coordinatesY[sizeCount];
                for(p=0;p<8;p++){
                    x = this.arr[p][0];     
                    y = this.arr[p][1];
                    if (((0<=column+x)&&(column+x<10)) && ((0<=row+y)&&(row+y<10))) {
                        if(this.field[row+y][column+x] === 'none'){
                        this.field[row+y][column+x] = 'bui';
                        }
                    }
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
    console.log(enemyTable);
    let status = enemyTable.getStatus(enemyTable, digit, letter);
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

for (let ship2=0;ship2<3;ship2++){
    playersField.buiMaker(playersField.shipMaker(2));
}
for (let ship2e=0;ship2e<3;ship2e++){
    enemyTable.buiMaker(enemyTable.shipMaker(2));
}
for (let ship3=0;ship3<2;ship3++){
    playersField.buiMaker(playersField.shipMaker(3));
}
for (let ship3e=0;ship3e<2;ship3e++){
    enemyTable.buiMaker(enemyTable.shipMaker(3));
}

playersField.buiMaker(playersField.shipMaker(4));
enemyTable.buiMaker(enemyTable.shipMaker(4));

render('enemyTable');
render('playersField');
let btn = document.getElementById('shot');

btn.onclick = function(){
    shot(document.getElementById('shotinput').value);
    afterRender('enemyTable');
    console.log(enemyTable.field);
}

/*
сделать многопалубные корабли
*/
