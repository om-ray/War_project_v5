let Bullet = function (props) {
  let p = props;

  this.ctx = p.ctx;

  this.x = p.x;
  this.y = p.y;
  this.width = p.width;
  this.height = p.height;
  this.speed = p.speed;
  this.direction = p.direction;
  this.owner = p.owner;
  this.collisionBox = {
    x: {
      x: this.x,
      xMax: this.x + this.width,
    },
    y: {
      y: this.y,
      yMax: this.y + this.height,
    },
  };

  this.moveBulletUp = function () {
    if (this.direction == "up") {
      this.y -= this.speed;
    }
  };

  this.moveBulletLeft = function () {
    if (this.direction == "left") {
      this.x -= this.speed;
    }
  };

  this.moveBulletDown = function () {
    if (this.direction == "down") {
      this.y += this.speed;
    }
  };

  this.moveBulletRight = function () {
    if (this.direction == "right") {
      this.x += this.speed;
    }
  };

  this.updateBulletInfo = function () {
    this.moveBulletUp();
    this.moveBulletLeft();
    this.moveBulletDown();
    this.moveBulletRight();
  };

  this.drawBullet = function () {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.updateBulletInfo();
  };
};

export default Bullet;
