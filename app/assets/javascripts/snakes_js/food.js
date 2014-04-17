(function(window){

	var Food = window.Food = (window.Food || {});
	var Foodstuffs = Food.food = function(){
		this.list = [];
	}

	Foodstuffs.prototype.generate = function(){
		var x = Math.floor(Math.random() * 19);
		var y = Math.floor(Math.random() * 19);
		this.pos = [x,y];
		return this;
	}

	Foodstuffs.prototype.die = function(){
		this.list.pop();
	}
})(this);