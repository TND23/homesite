(function(root){
  var Ship = root.Ship = (root.Ship || {});

  var inherits = function(child, parent) {
    function Surrogate() {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  }

  var Ship = Ship.ship = function(pos, vel, rotation_vel) {
    var COLOR = "#2233AA";
    var RADIUS = 20;
    this.ENGINE = 0.04;
    this.GUN_SPEED = 0.12;
    this.MAX_SPEED = .06;
    this.top_corner = [0, 0];
    // length of lines
    this.left_corner = -20;
    this.right_corner = 20;
    this.rotation_increment = 0;
    this.angle = Math.PI/2;
    this.rotation_vel = rotation_vel;
    MovingShips.MovingShip.call(this, pos, vel, rotation_vel, COLOR);
  };

  inherits(Ship, root.MovingShips.MovingShip);

  Ship.prototype.power = function(impulse) {
    if (Math.abs(this.vel[0]) < this.MAX_SPEED || Math.abs(this.vel[0] + impulse[0]) < this.MAX_SPEED){
      this.vel[0] += impulse[0];  
    }
    
    if (Math.abs(this.vel[1]) < this.MAX_SPEED || Math.abs(this.vel[1] + impulse[1]) < this.MAX_SPEED){
      this.vel[1] += impulse[1];  
    }
  }

  Ship.prototype.slowDown = function(){
    Math.abs(this.vel[0]) < .02 ? this.vel[0] = 0 : this.vel[0] *= .75;
    Math.abs(this.vel[1]) < .02 ? this.vel[1] = 0 : this.vel[1] *= .75;
  }

  Ship.prototype.slowingDown = function(rotation_increment){
    return (Math.abs(this.rotation_increment + rotation_increment) < Math.abs(this.rotation_increment))
  }

  Ship.prototype.turn = function(rotation_increment){
    if(Math.abs(this.rotation_increment) < .3 || this.slowingDown(rotation_increment)){
      this.rotation_increment+=rotation_increment;      
    }

    this.angle += rotation_increment;
    this.angle %= (2*Math.PI);
    var angle = this.angle;
    if(this.rotation_vel >= 2*Math.PI){
      this.rotation_vel = 0;
    }
    else if(this.rotation_vel <= -2*Math.PI){
      this.rotation_vel = 0;
    }
    else{
      this.rotation_vel += rotation_increment;     
    }
    this.update_corners(angle);
   // this.angle += rotation_increment;
  }

  Ship.prototype.rotate = function(rotation_vel){
    var angle = this.angle;
    this.angle += rotation_vel;
    this.angle %= (2*Math.PI);
    this.update_corners(angle);
  }

  Ship.prototype.update_corners = function(angle){
    // degrees in radians of initial degree
    var init_degree = (Math.PI * Math.sqrt(500))/180;
    // 0.400848 is the angle in radians between the vertical line from the top to bottom of the ship and the line from the top top bottom left
    this.left_collision_spot = [this.pos[0] + this.left_corner*Math.cos(angle+init_degree)*-1, this.pos[1] + this.left_corner*Math.sin(angle+init_degree)*-1];
    this.right_collision_spot = [this.pos[0] + this.right_corner*Math.cos(angle-init_degree), this.pos[1] + this.right_corner*Math.sin(angle-init_degree)];
    this.top_collision_spot = [];
  }

  var Bullet = Ship.Bullet = function(pos, vel){
    this.pos = pos;
    this.vel = vel;
    this.lifespan = 1000;
    var COLOR = "#00EE33";
    var RADIUS = 5;
    MovingObjects.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  }

  inherits(Bullet, root.MovingObjects.MovingObject);

  Ship.prototype.direction = function() {
    return ([Math.cos(this.angle), Math.sin(this.angle)*-1]);
  }

  Ship.prototype.fireBullet = function(){
    if (this.vel != 0){
      return new Bullet(this.pos.slice(), [-1*this.direction()[0]*this.GUN_SPEED, this.direction()[1]*this.GUN_SPEED]);
    }
  }
})(this);

//TODO: DRY out the moving objects subclasses
