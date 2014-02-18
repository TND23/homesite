(function(root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var Game = AsteroidsGame.Game = function(ctx, level){
    this.ctx = ctx;
    this.dimX = 800;
    this.dimY = 600;
    if (level === undefined){
      this.level = 4; 
    }
    else{
      this.level = level;
    }
    this.ship = new Ship.ship([this.dimX/2,this.dimY/2], [0,0]);
    this.asteroids = this.addAsteroids(this.level, this.dimX, this.dimY);
    this.bullets = [];
    this.won = false;
    var shipA = this.ship;
    var that = this;

    key('w', function() { shipA.power([0,-0.01]) });
    key('a', function() { shipA.power([-0.01,0]) });
    key('s', function() { shipA.power([0,0.01]) });
    key('d', function() { shipA.power([0.01,0]) });

    key('space', function() { that.fireBullet() });
    }

    Game.prototype.addAsteroids = function(n, dimX, dimY){
      var asteroids = [];
      for (var i = 0; i < n; i++){
        var candidateAsteroid = Asteroids.randomAsteroid(dimX, dimY);
        if (!candidateAsteroid.isCollidedWith(this.ship)){
          asteroids.push(candidateAsteroid);
        }
        else {
          i--;
        }
      }
      return asteroids;
    }

    Game.prototype.draw = function(){

      this.ctx.clearRect(0, 0, this.dimX, this.dimY);
   

      for(var i = 0; i < this.asteroids.length; i++){
        this.asteroids[i].draw(this.ctx);
      }
      this.ship.draw(this.ctx);
      for(var i = 0; i < this.bullets.length; i++){
        this.bullets[i].draw(this.ctx);
      }

    }

    Game.prototype.move = function(){
      for(var i = 0; i < this.asteroids.length; i++){
        this.asteroids[i].move(300);
      }
      this.ship.move(100);
      for(var i = 0; i < this.bullets.length; i++){
        this.bullets[i].move(300);
      }

    }

    // thanks to http://stackoverflow.com/a/9815010
    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };

    //check to see if the asteroid is in the canvas
    Game.prototype.remove_out_of_bounds = function(){
      for(var i = 0; i < this.bullets.length; i++){
        if(this.bullets[i].pos[0] >= this.dimX + 20
          || this.bullets[i].pos[1] >= this.dimY + 20
            || this.bullets[i].pos[0] <= 0 -20){
          this.bullets.remove(i);
        }
      }
      for(var i = 0; i < this.asteroids.length; i++){
        if(this.asteroids[i].pos[0] >= this.dimX + 20
          || this.asteroids[i].pos[1] >= this.dimY + 20
            || this.asteroids[i].pos[0] <= 0 -20
              || this.asteroids[i].pos[1] <= 0 -20){
          this.asteroids.remove(i);
        }
      }
    }

    Game.prototype.checkCollisions = function(){
      for(var i = 0; i < this.asteroids.length; i++){
        if (this.ship.isCollidedWith(this.asteroids[i])) {
          this.stop();
        }
      }
    }

    Game.prototype.fireBullet = function() {
      this.bullets.push(this.ship.fireBullet());
    }

    Game.prototype.hitAsteroids = function() {
      for(var i = 0; i < this.bullets.length; i++) {
        for(var j = 0; j < this.asteroids.length; j++) {
          if (this.bullets[i].isCollidedWith(this.asteroids[j]) && this.asteroids[j]){
            this.bullets.remove(i);
            this.asteroids.remove(j);
          }
        }
      }
    }

    Game.prototype.orthogonal_vectors = function(vect) {
       return [[-vect[1], vect[0]], [vect[1], vect[0]]]
    }

    Game.prototype.checkAsteroids = function(){
      var that = this;
      if (this.asteroids.length === 0){
        game.won = true;
      }
    }

    Game.prototype.step = function(){
      if(game.won === false){
        this.move();
        this.draw();
        this.checkCollisions();
        this.hitAsteroids();
        this.remove_out_of_bounds();
        this.checkAsteroids();
      }
      if(game.won === true){
        game.stop();
        this.restart();
      }
    }

    Game.prototype.start = function(){
      var game = this;
      this.timer_id = window.setInterval(function() {game.step()}, 100)
    }

    Game.prototype.restart = function(increment){
       this.setLevel();
    }

    Game.prototype.setLevel = function(){
      var level = this.level;
      if(level < 11){
        level = 12; 
      }
      if(level < 18 && level >= 12){
        level += 3;
      }
      if (level === 18){
        level += 5;
      }
      if(level >= 24){
        level += 8;
      }
      game = new AsteroidsGame.Game(ctx, level);
      game.start();
    }

    Game.prototype.stop = function(){
      window.clearInterval(this.timer_id);
    }


})(this);