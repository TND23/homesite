(function(window){

	var Snakey = window.Snake = (window.Snake || {});
	var Snake = Snakey.Snake = function(){
								// N      E      S       W
		this.dir = [[-1,0], [0,1], [1,0], [0,-1]];
		this.move_dir = [-1,0];
		this.segments = [[7,7], [8,7], [9,7]];
		this.head = this.segments[0];
		this.ateSelf = false;
		this.outOfBounds = false;
		this.tail = this.segments[2];
		this.segments.forEach(function(segment){
			segment.move_dir = [-1,0];
		})
	};

	Snake.prototype.updateSegmentDirection = function(){

		for (var i = this.segments.length - 1; i > 0; i--){
			// if there is no direction, set it to north
			if (this.segments[i].move_dir === undefined){
				this.segments[i].move_dir = this.move_dir;
			} else { 
				//otherwise, the direction of each segment is set to the direction of the segment in front of it,
				this.segments[i].move_dir = this.segments[i-1].move_dir;
			}	
		}
		this.segments[0].move_dir = this.move_dir;
	}

	Snake.prototype.move = function(){
		for (var i = 0; i < this.segments.length; i++){
			this.segments[i][0] += this.segments[i].move_dir[0];
			this.segments[i][1] += this.segments[i].move_dir[1];
		}
	}

	Snake.prototype.turn = function(move_dir){
		this.move_dir = move_dir;
		// called on key_press or translate
	}

	Snake.prototype.eat = function(){
		var new_segment = [this.tail[0] - this.tail.move_dir[0], this.tail[1] - this.tail.move_dir[1]];
		new_segment.move_dir = this.tail.move_dir;
		this.tail = new_segment;
		this.segments.push(new_segment);
	}

	Snake.prototype.checkHitSelf = function(){
		var potential_arr = this.segments;
		for (var i = 0; i < potential_arr.length; i++){
			var current_segment = potential_arr[i];
			for (var j = i+1; j < potential_arr.length; j++){
				var next_segment = potential_arr[j];
				if (current_segment[0] == next_segment[0] && current_segment[1] == next_segment[1]){
					this.ateSelf = true;
				}
			}
		}
	}
	Snake.prototype.checkOutOfBounds = function(){
		if (this.head[0] > 19 || this.head[0] < 0 ||this.head[1] > 19 || this.head[1] < 0){
			this.outOfBounds = true;
		}
	}

})(this);

// eat, plus, coords class