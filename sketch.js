//TODO fix jumping into a new dimension
//TODO veticalmente tambien pasa, hay que dar opcion de rellenar los cuadros vertical u horizontal
//TODO check that at least one of rows and cols is an even number so every square has a possible pair
var cols=4;
var rows=5;
//original painting: 4,5
var siz=50; // size of the squares
var mov_size = 2; //how many squares to jump
var content = [];

const directions = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
}

function make2Darray(cols,rows){
	var arr = new Array(cols);
	for(var i = 0;i<cols;i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

function setup() {
	createCanvas(600, 600);
	content = make2Darray(cols,rows);
	var N = cols*rows/2;
	var cont =0;
  //TODO filling the content horizontally, add option to fill vertically
	for(var i = 0;i<rows;i++){
		for(var j = 0;j<cols;j++){
			//content[i][j] = random(255);
			if(cont ==N)
				cont=0;
			content[j][i] =cont;
			cont++;
		}
	}
}

function check(oriCont, newCont){
	return oriCont==newCont;
}

function getNewRow(j, dir){
	var newRow;
	if(dir==directions.UP){
		if(j>mov_size-1) //go straight up
			newRow=j-mov_size;
		else { //go down
			newRow = (rows-1)-(mov_size-1-j);
		}
	}
	else if(dir==directions.DOWN){
		if(j+mov_size<=rows-1) //go straight down
			newRow=j+mov_size;
		else { // go up
			newRow = 0 +  mov_size - 1 - ((rows-1)-j);
		}
	}
	//else{} TODO throw exceptcion
	return newRow;

}

function getNewCol(i, dir){
	if(dir==directions.RIGHT){
		var newCol;
		if(i+mov_size<=cols-1) //go straight right
			newCol=i+mov_size;
		else { //go into the left part
			newCol = 0 +  mov_size - 1 - ((cols-1)-i);
		}

	}
	if(dir==directions.LEFT){
		var newCol;
		if(i>mov_size-1) //go straight right
			newCol=i-mov_size;
		else { //go into the left part
			newCol = (cols-1)-(mov_size-1-i);
		}

	}

	return newCol;

}

function movs(i,j,content){
	var newJ , newI;

	newJ = getNewRow(j,directions.UP);
	newI = getNewCol(i,directions.LEFT);
	//fill gives a color to everything under it, until the next fill
	if (check(content[i][j],content[newI][newJ]))
		fill(255,0,0);
	else
		fill(255,255,255);


}

function draw() {
	background(255);
	for(var i = 0;i<cols;i++){
		for(var j = 0;j<rows;j++){
			var x = i * siz;
			var y = j * siz;
			movs(i,j,content);
			rect(x,y,siz,siz);
			//black for numbers
			fill(0,0,0);
			text(content[i][j],x+siz/2 ,y + siz/2);
		}
	}
}
