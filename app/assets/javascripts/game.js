(function(root){
  var AsteroidsGame = root.AsteroidsGame = (root.AsteroidsGame || {});

  var Game = AsteroidsGame.Game = function(ctx, level, lives, points){
    this.ctx = ctx;

    this.dimX = 800;
    this.dimY = 600;
    lives === undefined ? this.lives = 3 : this.lives = lives;
    points === undefined ? this.points = 0 : this.points = points;
    level === undefined ? this.level = 4 : this.level = level;
    this.nextLifeAt = points > 0 ? points * 2 : 1000;
 
    this.ship = new Ship.ship([(this.dimX/2),this.dimY/2], [0,0], 0);
    this.asteroids = this.populateAsteroids(this.level, this.dimX, this.dimY);
    this.bullets = [];
    this.won = false;
    var shipA = this.ship;
    var that = this;
   
    key('w', function() { shipA.power([Math.cos(shipA.angle)*-.02,Math.sin(shipA.angle)*-.02]) });
    key('s', function() { shipA.slowDown() });
    key('a', function() { shipA.turn((Math.PI/6) * -.1) });
    key('d', function() { shipA.turn((Math.PI/6) *.1)});
    // each rotation is 6 degrees
    key('space', function(event) {event.preventDefault(); that.fireBullet() });
  }

  Game.prototype.addAsteroids = function(new_asteroids){
    game.new_asties = new_asteroids;
    var list_of_asteroids = game.asteroids;
    for (var i = 0; i < new_asteroids.length; i++){
      list_of_asteroids.push(game.new_asties[i]);  
    }
    return list_of_asteroids;
  }

  Game.prototype.addPoints = function(points){
    this.points += points;
    this.internalPoints += points;
    this.updateLives();
  }

  Game.prototype.checkAsteroids = function(){
    var that = this;
    if (this.asteroids.length === 0){
      game.won = true;
    }
  }

  Game.prototype.checkCollisions = function(){
    for(var i = 0; i < this.asteroids.length; i++){
      if (this.ship.isCollidedWith(this.asteroids[i])) {
        this.lives -=1;
        if (this.lives < 0){
          this.displayGameOver();
        }
        else{
          this.ship.pos[0] = (this.dimX/2);
          this.ship.pos[1] = (this.dimY/2);
          this.ship.angle = Math.PI/2; 
          this.ship.rotation_increment = 0;
          this.ship.rotation_vel = 0;
        }
      }
    }
  }

  Game.prototype.displayGameOver = function(){
    this.stop();
    ctx.rect(0,0,this.dimX, this.dimY);
    ctx.fillstyle = "red";
    ctx.fill();
  }

  Game.prototype.drawAll = function(){
    this.ctx.clearRect(0, 0, this.dimX, this.dimY);
    this.ctx.save();
    this.ship.draw(this.ctx);
    this.ctx.restore();
    this.drawLives();

    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx);
    }
    for(var i = 0; i < this.bullets.length; i++){
      this.bullets[i].draw(this.ctx);
    }
    this.drawPoints();
  }

  Game.prototype.drawPoints = function(){
    ctx.fillText("Points: " + game.points,10,20);
  }

  Game.prototype.drawLives = function(){
    ctx.fillText("Lives: " + game.lives, 725, 20);
  }

  Game.prototype.fireBullet = function() {
    if(this.bullets.length < 9)
    {
      this.bullets.push(this.ship.fireBullet());  
    }
  }

  Game.prototype.hitAsteroids = function() {
    var that = this;
    for(var i = 0; i < this.bullets.length; i++) {
      for(var j = 0; j < this.asteroids.length; j++) {
        if (this.bullets[i].isCollidedWith(this.asteroids[j]) && this.asteroids[j]){
          this.addPoints(this.asteroids[j].points);
          if (this.asteroids[j].radius > 14){
            var new_asteroids = Asteroids.explode(that.asteroids[j], this.bullets[i]);
            this.asteroids.remove(j);
            that.addAsteroids(new_asteroids);
          }
          else{
            this.asteroids.remove(j);
          }
          this.bullets.remove(i);
        }
      }
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

  Game.prototype.populateAsteroids = function(n, dimX, dimY){
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

   Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  Game.prototype.remove_bullet = function(){
    for(var i = 0; i < this.bullets.length; i++){
      this.bullets[i].lifespan -= 50;
      if(this.bullets[i].lifespan <= 0){
        this.bullets.remove(i);
      }
    }
  }
  // thanks to http://stackoverflow.com/a/9815010

  Game.prototype.remove_out_of_bounds = function(){
    for(var i = 0; i < this.bullets.length; i++){
      this.bullets[i].relocate();
    }
    for(var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].relocate();
    }
  }

  Game.prototype.restart = function(increment){
     this.setLevel();
  }

  Game.prototype.rotateShip = function(){
    this.ship.rotate(this.ship.rotation_increment);
  }

  Game.prototype.setLevel = function(){
    alert('proceeding to the next level...')
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
    game = new AsteroidsGame.Game(ctx, level, this.lives, this.points);
    game.start();
  }

  Game.prototype.start = function(){
    var game = this;
    this.timer_id = window.setInterval(function() {game.step()}, 100)
  }

  // some of these methods should call each other
  Game.prototype.step = function(){
    if(game.won === false){
      this.checkAsteroids();
      this.move();
      this.remove_bullet();
      this.drawAll();
      this.rotateShip();
      this.ship.relocate();
      this.ship.turn(0);
      this.checkCollisions();
      this.hitAsteroids();
      this.remove_out_of_bounds();
   
    }
    if(game.won === true){
      game.stop();
      this.restart();
    }
  }

  Game.prototype.stop = function(){
    window.clearInterval(this.timer_id);
  }

  Game.prototype.updateLives = function(){
    if(this.points >= this.nextLifeAt){
      this.lives += 1;
      this.nextLifeAt *= 2;
    }
  }
})(this);

// TODO: add sationary_object 
// increment lives based on points