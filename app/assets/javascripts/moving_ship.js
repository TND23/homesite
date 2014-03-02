(function(root){

	var MovingShips = root.MovingShips = (root.MovingShip || {});
	var MovingShip = MovingShips.MovingShip = function(pos, vel, rotation_vel, color){
  		this.pos = pos;
  		this.vel = vel;
      this.rotation_vel = rotation_vel;
  		this.color = color;
	}

	MovingShip.prototype.draw = function(ctx){
  		ctx.fillStyle = this.color;
      ctx.translate(this.pos[0],this.pos[1]);
      this.rotation_vel += (1*this.rotation_increment);
      ctx.rotate(this.rotation_vel);

      ctx.translate(this.pos[0]*-1,this.pos[1]*-1);
      ctx.beginPath(); 
   		ctx.lineTo(this.pos[0] + 10, this.pos[1] + 20); // bottom right
   		ctx.lineTo(this.pos[0] +0, this.pos[1] +20); // bottom middle
   		ctx.lineTo(this.pos[0] -10, this.pos[1] +20); // bottom left
      ctx.lineTo(this.pos[0] -5, this.pos[1] +10); // left middle
   		ctx.lineTo(this.pos[0], this.pos[1]); // top
      ctx.lineTo(this.pos[0] +5, this.pos[1] +10); // right middle
      ctx.lineTo(this.pos[0] + 10, this.pos[1] + 20); // bottom right
   		ctx.stroke();      
   		ctx.closePath();
  		ctx.fill();	
	}

	MovingShip.prototype.move = function(delta){
  	 this.pos[0] += this.vel[0] * delta;
 		 this.pos[1] += this.vel[1] * delta;
	}

  MovingShip.prototype.relocate = function(){
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

	MovingShip.prototype.isCollidedWith = function(otherObject){

      if (Math.sqrt(Math.pow(this.left_collision_spot[0] - otherObject.pos[0],2) + Math.pow(this.left_collision_spot[1] - otherObject.pos[1],2)) < otherObject.radius){
        return true;
      }
      if (Math.sqrt(Math.pow(this.right_collision_spot[0] - otherObject.pos[0],2) + Math.pow(this.right_collision_spot[1] - otherObject.pos[1],2)) < otherObject.radius){
        return true;
      }
      if (Math.sqrt(Math.pow(this.pos[0] - otherObject.pos[0],2) + Math.pow(this.pos[1] - otherObject.pos[1],2)) < otherObject.radius){
        return true;
      }
	}
})(this);

// TODO: add cool flames for acceleration
// TODO: reset position on losing a life COMPLETE
// TODO: add invincibility when losing a life