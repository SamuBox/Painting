var cols=5;
var rows=4;
//original 4,5
var siz=50;
var mov_size = 2; //how many squares to jump
 
var content = [];

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

function make2Darray(cols,rows){
	var arr = new Array(rows);
	for(var i = 0;i<cols;i++){
		arr[i] = new Array(cols);
	}
	return arr;
}

function setup() {
	createCanvas(600, 600);
	content = make2Darray(cols,rows);
	var N = cols*rows/2;
	var cont =0;
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

function movs(i,j,content){
	//up
	var newJ =j, newI=i;
	if(j>mov_size-1)
		newJ=j-2;
	else {
		newJ = (rows-1)-(mov_size-1-j);
	}
	if (check(content[i][j],content[newI][newJ]))
		fill(255,0,0);
	else
		fill(255,255,255);


}
//TODO: rows and columns are inverted, fix before continuing PLZ
function draw() {
	background(255);
	for(var i = 0;i<rows;i++){
		for(var j = 0;j<cols;j++){
			var x = i * siz;
			var y = j * siz;
			//fill gives a color to everything under it, or until the next fill
			//color a rectangle
			// if(i==0)
			// 	fill(255,0,0);
			// else
			// 	fill(255,255,255);
			movs(j,i,content);
			rect(y,x,siz,siz);
			//black for numbers
			fill(0,0,0);
			text(content[j][i],y+siz/2 ,x + siz/2);

		}
	}//terminamos de pintar

}
