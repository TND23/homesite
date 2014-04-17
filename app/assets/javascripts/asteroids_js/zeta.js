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
    var RADIUS = 40 * ((minSize * Math.random()) + minSize);
    this.radius = RADIUS;
    var points = Math.round(1000/this.radius);
    MovingObjects.MovingObject.call(this, pos, vel, RADIUS, COLOR, points);
  };

  inherits(Asteroid, root.MovingObjects.MovingObject);

  var randomAsteroid = Asteroids.randomAsteroid = function(dimX, dimY){   

    var STARTING_VELOCITY = 0.02;
    var starting_pos = [Math.random()*dimX, Math.random()*dimY];
    var in_random_direction = Math.random() > 0.5 ? -1 : 1;
    var starting_vel = [Math.random()*STARTING_VELOCITY*in_random_direction,
                        Math.random()*STARTING_VELOCITY*in_random_direction];
    return new Asteroid(starting_pos, starting_vel);
  }

  var explode = Asteroids.explode = function(asteroid, bullet){
    if (asteroid.radius > 23){
      var asteroids = [];
      var bullet_x_dir = bullet.vel[0];
      var bullet_y_dir = bullet.vel[1];
      var asteroid_child_a = new Asteroid([asteroid.pos[0]+10,asteroid.pos[1]-10], [asteroid.vel[0]+(.06*bullet_x_dir),asteroid.vel[1]+(.06*bullet_y_dir)]);
      asteroid_child_a.radius = asteroid.radius / 2;
      var asteroid_child_b = new Asteroid([asteroid.pos[0],asteroid.pos[1]], [asteroid.vel[0]+(.06*bullet_x_dir),asteroid.vel[1]+(.06*bullet_y_dir)]);
      asteroid_child_b.radius = asteroid.radius / 2;
      asteroids.push(asteroid_child_a);
      asteroids.push(asteroid_child_b);
      return asteroids;
    }
    else{
      return 0;
    }
  }

})(this);

// TODO: make into polygons (?)
// TODO: Add points to asteroids
