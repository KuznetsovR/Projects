/* Общее:
    Не хватает пробелов во многих местах, вокруг операторов и т. д.                     - надо делать для читабельности?
    После каждого стейтмента надо ставить точку с запятой, а не запятую
    Значения аттрибутов хтмл-элементов принято оборачивать в двойные кавычки,
        даже если они задаются в строке в жс 
    inline-стили (когда задаешь стили через аттрибут style), лучше заменить на
        css-классы, тем более, что они у тебя повторяются в разных элементах
        так будет проще и быстрее менять стилизацию
    я заметил лишний код, который никогда не выполняется, в функции afterRender,
        проверь вызовы других методов/функций, может какие-то ещё условия никогда не выполняются
        и можно спокойно вычистить лишнее ветвление и лишний код
*/

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

// Это конструктор, а не просто функция, возвращающая объект, и вызывается она с new
// значит и называть его надо не как функцию, а как класс, например Ship
function createShip() {
    /*
        Начальные значения полей нужно передавать аргументами в конструктор
        т. е. должно быть что-то вроде
        function Ship(x, y, status, size) {
            this.coordinatesX = x;
            ...
        }
        const ship = new Ship(x, y, status, size)
    */
    this.coordinatesX = null,
        this.coordinatesY = null,
        this.status = null,
        this.size = null;
};

function render(id) {
    const place = document.getElementById(id); //document.getElementById("playersField")
    let c = 10;
    for (let i = 0; i < 12; i++) {
        // Каждый раз, когда ты вызываешь insertAdjacentHTML (или задаешь innerHTML),
        // дерево DOM строится и рендерится заново, что очень затратно.
        // Поэтому нужно постараться собрать в этой функции одну большую строку и её уже засунуть в place
        place.insertAdjacentHTML('afterbegin', `<div id='row${i}'class='row'></div>`);
        let row = document.getElementById(`row${i}`);
        if (i === 0 || i === 11) {
            let alphabetFor = 9;
            for (let t = 0; t < 12; t++) {
                if (t === 0 || t === 11) {
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-left:1%'></div>`);
                } else {
                    row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-left:1%'>${alphabet[alphabetFor]}</div>`);
                    alphabetFor--;
                }
            }
            continue;
        }
        row.insertAdjacentHTML('afterbegin', `<div id='col${i}'class='col' style='margin-top:1%'>${c}</div>`);
        if (id === 'playersField') {
            for (let j = 0; j < 10; j++) {
                if (playersField.getStatus(playersField, i - 1, j) === 1) {
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col' style = 'background-color:black; padding-top:8%; border:1px solid black;'></div>`);
                } else {
                    row.insertAdjacentHTML('afterbegin', `<div id='col-1${c}${j}'class='col'style= 'padding-top:8%; border:1px solid black;'></div>`);
                }
            }
        } else if (id === 'enemyTable') {
            for (let j = 0; j < 10; j++) {
                if (enemyTable.getStatus(enemyTable, i - 1, j) === 3) {
                    row.insertAdjacentHTML('afterbegin', `<div id='col${c}${j}'class='col' style = 'background-color:red; padding-top:8%; border:1px solid black;'></div>`);
                } else if (enemyTable.getStatus(enemyTable, i - 1, j) === 4) {
                    row.insertAdjacentHTML('afterbegin', `<div id='col${c}${j}'class='col' style = 'background-color:gray; padding-top:8%; border:1px solid black;'></div>`);
                } else {
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

function afterRender(id) {
    if (id === 'playersField') {
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 10; i++) {
                if (playersField.getStatus(playersField, i, j) === 1) {
                    // напрашивается дополнительная функция для выбора элемента по координатам
                    let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                    neededPixel.style.backgroundColor = 'black';
                } else if (playersField.getStatus(playersField, i, j) === 3) {
                    let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                    neededPixel.style.backgroundColor = 'red';
                } else if (playersField.getStatus(playersField, i, j) === 4) {
                    let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                    neededPixel.style.backgroundColor = 'gray';
                } else {
                    let neededPixel = document.getElementById(`col-1${i+1}${9-j}`);
                    neededPixel.style.backgroundColor = 'white';
                }
            }
        }
    } else if (id === 'enemyTable') {
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 10; i++) {
                if (enemyTable.getStatus(enemyTable, i, j) === 3) {
                    let neededPixel = document.getElementById(`col${i+1}${9-j}`);
                    neededPixel.style.backgroundColor = 'red';
                } else if (enemyTable.getStatus(enemyTable, i, j) === 4) {
                    let neededPixel = document.getElementById(`col${i+1}${9-j}`);
                    neededPixel.style.backgroundColor = 'gray';
                } else {
                    let neededPixel = document.getElementById(`col${i+1}${9-j}`);
                    neededPixel.style.backgroundColor = 'white';
                }
            }
        }
    } else {
        // лучше тогда уж throw Error('информативное сообщение')
        console.log('error');
    }
}

// Это тоже похоже на класс, например под названием Table               - да но я делал через прототипирование, задание такое было
function tableMaker(value) {
    this.id = value,
        this.field = [],
        this.arr = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ],
        this.makeElements = function () { // делает элементы, которые являются координатами
            for (i = 0; i < 10; i++) {
                // Лучше this.field[i].push([])
                this.field[i] = [];
                for (j = 0; j < 10; j++) {
                    // this.field[i].push('none');
                    this.field[i][j] = 'none';
                }
            }
        },
        /*
            Все использования этой функции очень плохо читаются, приходится каждый раз лезть сюда и смотреть, что значит тот или иной код
            Лучше добавить, например, статичное поле классу Table с объектом с названиями этих статусов, например
            Table.Status = Object.freeze({
                none: 0,
                ...
                missedShot: 4
            }
            Тогда можно будет писать так
            if (playersField.getStatus(i, j) === Table.Status.missedShot)
            Зачем в этот метод кидать аргумент table? Просто обращайся внутри неё к this
        */
        this.getStatus = function (table, digit, letter) { //digit -row letter - column
            if (digit < 0 || digit > 9 || letter < 0 || letter > 9) {
                return 'error'
            } else if (typeof (table.field[digit][letter]) === 'object') {
                return 1;
            } else {
                switch (table.field[digit][letter]) {
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
        // Методы принято называть глаголами, например makeShip - ок
        this.shipMaker = function (size) {

            let ship = new createShip();
            let column = null;
            let row = null;
            let checker = [[-1, 0], [0, -1], [0, 1], [1, 0]];
            let x = 0;
            let y = 0;
            let a = 0;
            /* идентичный цикл ещё пониже, напрашивается вынести его в отдельный метод, например
                this.getRandomEmptyCell = function () {
                    ...
                    return {column, row};
                }
                let {column, row} = this.getRandomEmptyCell();
            */
            do {
                column = getRandomInt(10);
                row = getRandomInt(10);
            } while (this.getStatus(this, row, column) !== 0);

            if (size === 1) {
                this.field[row][column] = ship;
                ship.coordinatesX = column;
                ship.coordinatesY = row;
                ship.size = size;
                return ship;
                // при выполнении условия делается return, так что этот else не нужен
                // просто сдвинь все внутри него влево
            } // Тут не уходит в бесконечный цикл? beg вроде не меняется вообще - не меняется, но сама функция останавливается на return(261)
            for (let beg = 0; beg < 1; beg) {
                column = [];
                row = [];
                do {
                    column[0] = getRandomInt(10);
                    row[0] = getRandomInt(10);
                } while (this.getStatus(this, row[0], column[0]) !== 0);
                for (let mid = 0; mid < 4; mid++) {
                    x = checker[mid][0];
                    y = checker[mid][1];
                    for (let count = 1; count < size; count) {
                        //console.log(this.getStatus(this, (row[count-1]+x), (column[count-1]+y)));
                        if (this.getStatus(this, (row[count - 1] + x), (column[count - 1] + y)) === 0) {
                            column[count] = column[count - 1] + y;
                            row[count] = row[count - 1] + x;
                            count++;
                            if (count === size) {
                                ship.coordinatesX = column;
                                ship.coordinatesY = row;
                                for (let shipSetter = 0; shipSetter < size; shipSetter++) {
                                    let neededRow = row[shipSetter];
                                    let neededColumn = column[shipSetter]
                                    this.field[neededRow][neededColumn] = ship;
                                }
                                ship.size = size;
                                return ship;
                            }
                        } else {
                            break;
                        }
                    }
                }

            }
        },
        this.buiMaker = function (ship) {
            let x = 0;
            let y = 0;
            if (ship.size === 1) {
                let column = ship.coordinatesX;
                let row = ship.coordinatesY;
                for (p = 0; p < 8; p++) {
                    x = this.arr[p][0];
                    y = this.arr[p][1];
                    if (((0 <= column + x) && (column + x < 10)) && ((0 <= row + y) && (row + y < 10))) {
                        if (this.field[row + y][column + x] === 'none') {
                            this.field[row + y][column + x] = 'bui';
                        }
                    }
                }
            } else {
                for (let sizeCount = 0; sizeCount < ship.size; sizeCount++) {
                    let column = ship.coordinatesX[sizeCount];
                    let row = ship.coordinatesY[sizeCount];
                    for (p = 0; p < 8; p++) {
                        x = this.arr[p][0];
                        y = this.arr[p][1];
                        if (((0 <= column + x) && (column + x < 10)) && ((0 <= row + y) && (row + y < 10))) {
                            if (this.field[row + y][column + x] === 'none') {
                                this.field[row + y][column + x] = 'bui';
                            }
                        }
                    }
                }
            }
        }
}
function shot(table, val) {
    let digit = null;
    let letter = null;
    if (val==='none'){
        digit = getRandomInt(10);
        letter = alphabet[getRandomInt(10)];
    }else{
        digit = val.replace(/\D/g, "") - 1;
        letter = val.replace(/[^а-я]/gi, "");
    }
    letter = alphabet.indexOf(letter);
    let status = table.getStatus(table, digit, letter);
    if (status === 1|| status === 3) {
        table.field[digit][letter] = 'killedShip';
        return status;
    } else {
        table.field[digit][letter] = 'missedShot';
        return status;
    }
}


const alphabet = 'абвгдежзиклмнопрстуфхцчшщъыьэюя';

let enemyTable = new tableMaker('enemyTable');
let playersField = new tableMaker('playersField');
enemyTable.makeElements();
playersField.makeElements();
console.log(enemyTable.field)
for (let p = 0; p < 4; p++) {
    enemyTable.buiMaker(enemyTable.shipMaker(1));
}
for (let w = 0; w < 4; w++) {
    playersField.buiMaker(playersField.shipMaker(1));
}

for (let ship2 = 0; ship2 < 3; ship2++) {
    playersField.buiMaker(playersField.shipMaker(2));
}
for (let ship2e = 0; ship2e < 3; ship2e++) {
    enemyTable.buiMaker(enemyTable.shipMaker(2));
}
for (let ship3 = 0; ship3 < 2; ship3++) {
    playersField.buiMaker(playersField.shipMaker(3));
}
for (let ship3e = 0; ship3e < 2; ship3e++) {
    enemyTable.buiMaker(enemyTable.shipMaker(3));
}

playersField.buiMaker(playersField.shipMaker(4));
enemyTable.buiMaker(enemyTable.shipMaker(4));

render('enemyTable');
render('playersField');
afterRender('playersField');

let btn = document.getElementById('shot');
btn.onclick = function () {
    let popad = shot(enemyTable, document.getElementById('shotinput').value);
    if(popad===1){
        afterRender('enemyTable');
        return;
    }else{
        afterRender('enemyTable');
    }
    let popadE = shot(playersField, 'none');
    while (popadE===1){
        popadE = shot(playersField, 'none');
    }
    afterRender('playersField');
    console.log(enemyTable.field);
}
