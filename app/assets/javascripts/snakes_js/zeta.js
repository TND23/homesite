(function(window){
	var Board = window.Board = (SnakeGame.Board || {});

	var GameBoard = Board.GameBoard = function(){
		this.snake_divs = [];
		this.normal_mode = true;
	};

	GameBoard.prototype.create = function(body){
		for (var i = 0; i < 20; i++){
			var oldDiv = document.createElement("div");
			this.makeRow(oldDiv);
			document.body.appendChild(oldDiv);
			for (var j = 0; j < 20; j++){
				var newDiv = document.createElement("div");
				this.makeBox(newDiv, i, j);
				oldDiv.appendChild(newDiv);
			}
		}
	}

	GameBoard.prototype.getSnakeDivs = function(segments){
		// reset them to empty
		this.snake_divs = [];
		var that = this;
		segments.forEach(function(segment){
			var current_div = document.getElementById(segment.toString());
			that.snake_divs.push(current_div);
		})
		return this.snake_divs;
	}

	GameBoard.prototype.getFood = function(pos){
		var food_div = document.getElementById(pos.toString());
		return food_div;
	}	

	GameBoard.prototype.setMode = function(mode){
		if (mode == "rainbow"){
			game.board.rainbow_mode = true;
			game.board.obn_mode = false;
			game.board.normal_mode = false;
			game.board.obn_mode2 = false;
		}
		if (mode == "normal"){
			game.board.normal_mode = true;
			game.board.rainbow_mode = false;
			game.board.obn_mode = false;
			game.board.obn_mode2 = false;

		}
		if (mode == "obn"){
			game.board.obn_mode = true;
			game.board.rainbow_mode = false;
			game.board.normal_mode = false;
			game.board.obn_mode2 = false;
		}

		if (mode == "obn2"){
			game.board.obn_mode2 = true;
			game.board.rainbow_mode = false;
			game.board.normal_mode = false;
			game.board.obn_mode = false;
		} 
	}	
	
	GameBoard.prototype.erase = function(divs){
		if (this.rainbow_mode === true){
			var red = Math.ceil(Math.random() * 255);
			var green = Math.ceil(Math.random() * 255);
			var blue = Math.ceil(Math.random() * 255);
			divs.forEach(function(div){
				div.style.backgroundColor = "rgb(" +  red + "," + green +"," + blue +")";
			})
		}
		if (this.obn_mode === true){
				divs.forEach(function(div){
				div.style.backgroundColor = "green";
			})
		}
		if (this.obn_mode2 === true){
				divs.forEach(function(div){
				div.style.backgroundColor = "red";
			})
		}
		if(this.normal_mode === true){
			divs.forEach(function(div){
				div.style.backgroundColor = "white";
			})
		}
	}

	GameBoard.prototype.drawFood = function(div){
		div.style.backgroundColor = "red";
	}

	GameBoard.prototype.drawSnake = function(divs){
		divs.forEach(function(div){
			div.style.backgroundColor = "green";
		})
	}

	GameBoard.prototype.makeBox = function(div, i, j){
		div.style.width = "20px";
		div.style.height = "20px";
		div.style.borderColor = "black";
		div.style.border = "1px"
		div.style.borderStyle = "solid";
		div.style.float = "left";
		div.id = i.toString() + "," + j.toString();
	}

	GameBoard.prototype.makeRow = function(div){
		div.style.width = "440px";
		div.style.height = "22px";
	}
})(this);