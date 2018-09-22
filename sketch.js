//TODO check that at least one of rows and cols is an even number so every square has a possible pair
var cols=6;
var rows=6;
//original Pairs: 4,5
var siz=50; // size of the squares
var mov_size = 2; //how many squares to jump
var content = [];
var nDirections = 4 //how many directions, there are 4 for 2d, maybe more in 3d?

const directions = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
}

function make2Darray(cols,rows){
	var arr = new Array(rows);
	for(var i = 0;i<rows;i++){
		arr[i] = new Array(cols);
	}
	return arr;
}

function setup() {
	createCanvas(600, 600);
	content = make2Darray(cols,rows);
	var N = cols*rows/2; // N is half of all the squares, to assign everyne a pair
	var cont =0;

	for(var i = 0;i<rows;i++){
		for(var j = 0;j<cols;j++){
			if(cont ==N)
				cont=0;
			content[i][j] =cont;
			cont++;
		}
	}
  //drawPairs();
}

function drawPairs(){
  var N = cols*rows/2;
  var cont = 0;

  for(var i = 0;i<rows && cont<N ;i++){
    for(var j = 0;j<cols && cont < N;j++){
      fill(255,255,255);
      drawRect(i,j);
    }
  }

  moves = getEveryMove();
  for(var i = 0;i<rows && cont<N ;i++){
    for(var j = 0;j<cols && cont < N;j++){
      var RGB = getRandomColor();
      movs(moves,i,j,content,RGB);
      fill(RGB[0],RGB[1],RGB[2]); //original rect will always have a color
      drawRect(i,j);
      cont++; //only calculate half the squares
    }
  }
}

function drawRect(i,j){
  var y = i * siz;
  var x = j * siz;
  rect(x,y,siz,siz);
  //black font for numbers
  fill(0,0,0);
  text(content[i][j],x+siz/2 ,y + siz/2);
}

//gets every posible move for the square (0,0)
function getEveryMove(){
    //an array with every direction
    //dir = [UP,DOWN,LEFT,RIGTH]
    dir = [nDirections];

    dir[0] = directions.UP;
    dir[1] = directions.DOWN;
    dir[2] = directions.LEFT;
    dir[3] = directions.RIGHT;

    //pure moves (just up, down, left or rigth)
    //m stands for move
    var possibleMoves = [];

    for(var m=0;m<4;m++){
      if(m<2){// up or down
        newI=getNewRow(0,dir[m]);
        if (content[0][0] == content[newI][0]){
          possibleMoves.push({ row: dir[m], col: null});
        }
      }
      else{//left of rigth
        newJ = getNewCol(0,dir[m]);
        if (content[0][0] == content[0][newJ]){
          possibleMoves.push({ row: null, col: dir[m]});
        }
      }
    }
    //diagonal moves
    //m1 stans for movement in y axis, 0 for up 1 for down
    for(var m1=0;m1<2;m1++){
      newI=getNewRow(0,dir[m1]);
      for(var m2=2;m2<4;m2++){ //m2 stands for movement in x axis, 2 for left 3 for rigth
        newJ = getNewCol(0,dir[m2]);
        if (content[0][0] == content[newI][newJ])
          possibleMoves.push({ row: dir[m1], col: dir[m2]});
      }
    }
    var size = possibleMoves.length;
    for(var i = 0; i<size; i++)
      addOpositeMoves(possibleMoves,i);
    return possibleMoves;
}

function addOpositeMoves(moves,i){

  if(moves[i].col==null){ // up or down
    if(moves[i].row == directions.UP)
      moves.push({ row: directions.DOWN, col: null});
    else
      moves.push({ row: directions.UP, col: null});
  }
  else if(moves[i].row==null){ //left or rigth
    if(moves[i].col == directions.LEFT)
      moves.push({ row: null, col: directions.RIGHT});
    else
      moves.push({ row: null, col: directions.LEFT});
  }
  else{ //diagonal
    if(moves[i].row==directions.UP){ // down
      if(moves[i].col == directions.LEFT)
        moves.push({ row: directions.DOWN, col: directions.RIGHT});
      else
        moves.push({ row: directions.DOWN, col: directions.LEFT});
    }
    else{ // up
      if(moves[i].col == directions.LEFT)
        moves.push({ row: directions.UP, col: directions.RIGHT});
      else
        moves.push({ row: directions.UP, col: directions.LEFT});
    }
  }
}

function movs(moves, i,j,content,RGB){
	var newJ , newI;
  var encontrado = false;
  var elem = 0;
  while(elem<moves.length && !encontrado){
    newJ= getNewCol(j,moves[elem].col);
    newI= getNewRow(i,moves[elem].row);
    if(moves[elem].row != null && moves[elem].col != null) // diagonal move
       encontrado = giveColor(i,j,newI,newJ,RGB,encontrado);
    else{ // pure move
       if(moves[elem].row != null) //up or down
         encontrado = giveColor(i,j,newI,j,RGB,encontrado);
       else // left or rigth
         encontrado = giveColor(i,j,i,newJ,RGB,encontrado);
     }
    elem++;
  }
}

//gives color to square pair
function giveColor(i,j,newI,newJ,RGB, encontrado){
  if (content[i][j] == content[newI][newJ]){
    fill(RGB[0],RGB[1],RGB[2]);   //fill gives a color to everything under it, until the next fill
    drawRect(newI,newJ);
    return true;
  }
	else{ // if it doenst match , the pair gets painted white
    console.log('WARNING, NO MATCH IN ', i, j);
    fill(255,255,255);
    drawRect(i,j);
    return false;
  }
}

function getNewRow(j, dir){
  if(dir==null) return j;
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
	else
    console.log('wrong direction in getNewRow ',dir);
	return newRow;

}

function getNewCol(i, dir){
  if(dir==null) return i;
	if(dir==directions.RIGHT){
		var newCol;
		if(i+mov_size<=cols-1) //go straight right
			newCol=i+mov_size;
		else { //go varo the left part
			newCol = 0 +  mov_size - 1 - ((cols-1)-i);
		}

	}
	else if(dir==directions.LEFT){
		var newCol;
		if(i>mov_size-1) //go straight left
			newCol=i-mov_size;
		else { //go varo the left part
			newCol = (cols-1)-(mov_size-1-i);
		}
	}
  else
    console.log('wrong direction in getNewCol ',dir);

	return newCol;
}


//returns a random size 3 RGB array
function getRandomColor(){
  var RGB = new Array(3);
  for(var i=0;i<3;i++)
    RGB[i] =  Math.floor((Math.random() * 255));
  return RGB;
}

function draw() {
	//background(255);
  drawPairs();

}
