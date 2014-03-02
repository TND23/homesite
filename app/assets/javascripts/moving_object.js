(function(root){
  var MovingObjects = root.MovingObjects = (root.MovingObject || {});

 var MovingObject = MovingObjects.MovingObject = function(pos, vel, radius, color, points){
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
  if(points){
    this.points = points;
  }
}

MovingObject.prototype.move = function(delta){
  this.pos[0] += this.vel[0] * delta;
  this.pos[1] += this.vel[1] * delta;
}

MovingObject.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.stroke();
  ctx.fill();
}

MovingObject.prototype.relocate = function(){
  if(this.pos[0] < 0){
      this.pos[0] += 800;
    }
    if(this.pos[0] > 800){
      this.pos[0] -= 800;
    }
     if(this.pos[1] >600){
      this.pos[1] -= 600;
    }
    if(this.pos[1] < 0){
      this.pos[1] += 600;
    }
}

  MovingObject.prototype.isCollidedWith = function(otherObject){
    var distance = Math.sqrt(
      Math.pow(this.pos[0] - otherObject.pos[0],2) + Math.pow(this.pos[1] - otherObject.pos[1], 2)
    );
    return (otherObject.radius + this.radius > distance);
  } 
})(this);

// TODO: make bullets have a lifespan DONE
// TODO: create new kinds of moving_object