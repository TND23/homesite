(function(window){
	var SnakeGame = window.SnakeGame = (window.SnakeGame || {});

	var TheGame = SnakeGame.Game = function(){
		this.snake = new Snake.Snake();
		this.board = new Board.GameBoard();
		this.food = new Food.food();
		this.last_dir = [-1,0];
		this.state = "play";
		this.timer;
	};

	window.onkeyup = function(e){
		var key = e.keyCode ? e.keyCode : e.which;
		this.key_pressed = key;
		if (key_pressed == 32){
			this.game.state == "play" ? this.game.pause() : this.game.start();
		}
	};
		// this.dir = [[-1,0], [0,1], [1,0], [0,-1]];

	TheGame.prototype.translateKeyPress = function(){
		// up or w NRTH
		var key_pressed = window.key_pressed;
		if (key_pressed == 38 || key_pressed == 87){
			if (this.snake.move_dir[0] != 1 && this.snake.move_dir[1] != 0){
				this.snake.move_dir = this.snake.dir[0];	
			}
		}
		// right or d EAST
		if (key_pressed == 39 || key_pressed == 68){
			if (this.snake.move_dir[0] != 0 && this.snake.move_dir[1] != -1){
				this.snake.move_dir = this.snake.dir[1];
			}
		}
		// down or s SOUTH
		if (key_pressed == 40 || key_pressed == 83){
			if (this.snake.move_dir[0] != -1 && this.snake.move_dir[1] != 0){
				this.snake.move_dir = this.snake.dir[2];
			}
		}
		// left or a WEST
		if (key_pressed == 37 || key_pressed == 65){
			if (this.snake.move_dir[0] != 0 && this.snake.move_dir[1] != 1){
				this.snake.move_dir = this.snake.dir[3];
			}
		}

		return this.snake.move_dir;
	}

	TheGame.prototype.start = function(){
		this.state = "play";
		this.timer = window.setInterval(function(){this.game.step()}, 100);
	};

	TheGame.prototype.checkEats = function(){
		if (this.snake.head[0] == this.food.pos[0]){
			if (this.snake.head[1] == this.food.pos[1]){
				this.snake.eat();
				this.food.die();
			}
		}
	};

	TheGame.prototype.step = function(e){
		this.snake.checkHitSelf();
		if (this.snake.ateSelf == true){
			this.pause();
			alert("You ate yourself");
		}
		this.snake.checkOutOfBounds();
		if (this.snake.outOfBounds == true){
			this.pause();
			alert("You ran out of bounds");
		}

		var foodctx = this;
		var new_dir = this.translateKeyPress(window.key_pressed);
		if (new_dir != this.last_dir){ 
			this.snake.turn(new_dir);
			this.last_dir = new_dir;
		}
		if (this.food.list.length === 0){
			this.food.generate(); 
			this.food.list.push(this.food.pos);
		}
		var food_div = this.board.getFood(foodctx.food.pos);
		var prior_divs = 	this.board.getSnakeDivs(this.snake.segments);
		this.board.erase(prior_divs);
		this.snake.updateSegmentDirection();
		this.checkEats();
		this.snake.move();
		var current_divs = this.board.getSnakeDivs(this.snake.segments);
		this.board.drawFood(food_div);
		this.board.drawSnake(current_divs);
	};

	TheGame.prototype.pause = function(){
		var that = this;
		this.state = "pause";
		window.clearInterval(that.timer);
	};

})(this);