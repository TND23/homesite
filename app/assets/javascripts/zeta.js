(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var inherits = function(child, parent) {
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    var COLOR = "#AAAAAA";
    var minSize = .5;
    // asteroids are randomly between .5 and 1 of RADIUS size
    var RADIUS = 20 * ((minSize * Math.random()) + minSize);
    MovingObjects.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  };

  inherits(Asteroid, root.MovingObjects.MovingObject);

  var randomAsteroid = Asteroids.randomAsteroid = function(dimX, dimY){
    
    var STARTING_VELOCITY = 0.01;
    
    var starting_pos = [Math.random()*dimX, Math.random()*dimY];
    var in_random_direction = Math.random() > 0.5 ? -1 : 1;

    var starting_vel = [Math.random()*STARTING_VELOCITY*in_random_direction,
      Math.random()*STARTING_VELOCITY*in_random_direction];
    return new Asteroid(starting_pos, starting_vel);
  }
})(this);