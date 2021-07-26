import Bullet from "./Bullet";

function Player(props) {
  let p = props;

  // Login stuff
  this.username = p.username;
  this.email = p.email;

  // Player info
  this.healthMax = p.healthMax;
  this.health = p.health;
  this.damage = p.damage;
  this.x = p.x;
  this.y = p.y;
  this.width = p.width;
  this.height = p.height;
  this.speed = p.speed;
  this.score = p.score;
  this.bulletList = p.bulletList;
  this.ammoLeft = p.ammoLeft;
  this.attacking = p.attacking;
  this.reloading = p.reloading;
  this.direction = { right: false, left: false, up: false, down: false };
  this.lastFacingDirection = "down";
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

  // Multiplayer stuff
  this.id = Math.floor(Math.random() * 1000000);
  this.keys = p.keys;
  this.needsToReload = p.needsToReload;

  // Drawing info
  this.ctx = p.ctx;
  this.sx = p.sx;
  this.sy = p.sy;
  this.playerSprite = new Image();
  this.playerSprite.onload = function () {};
  this.playerSprite.src = "/Male1.png";

  this.resetClippingX = function () {
    if (
      this.sx >= 128 ||
      (this.direction.up == false &&
        this.direction.down == false &&
        this.direction.right == false &&
        this.direction.left == false)
    ) {
      this.sx = 0;
    }
  };

  this.movePlayerUp = function () {
    if (this.direction.up) {
      this.sy = 144;
      this.sx += this.width;
      this.y -= this.speed;
      this.direction.down = false;
    }
  };

  this.movePlayerLeft = function () {
    if (this.direction.left) {
      this.sy = 48;
      this.sx += this.width;
      this.x -= this.speed;
      this.direction.right = false;
    }
  };

  this.movePlayerDown = function () {
    if (this.direction.down) {
      this.sy = 0;
      this.sx += this.width;
      this.y += this.speed;
      this.direction.up = false;
    }
  };

  this.movePlayerRight = function () {
    if (this.direction.right) {
      this.sy = 96;
      this.sx += this.width;
      this.x += this.speed;
      this.direction.left = false;
    }
  };

  this.shoot = function () {
    if (this.attacking) {
      let newBullet = new Bullet({
        ctx: this.ctx,
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
        width: 5,
        height: 5,
        speed: 15,
        direction: this.lastFacingDirection,
        owner: this.id,
      });

      this.bulletList.push(newBullet);
    }
  };

  this.drawAllBullets = function () {
    for (let i in this.bulletList) {
      let bullet = this.bulletList[i];
      bullet.drawBullet();
    }
  };

  this.manageBulletListLength = function () {
    if (this.bulletList.length >= 100) {
      this.bulletList.shift();
    }
  };

  this.updatePlayerInformation = function () {
    this.movePlayerUp();
    this.movePlayerLeft();
    this.movePlayerDown();
    this.movePlayerRight();
    this.resetClippingX();
    this.manageBulletListLength();
    this.shoot();
    this.drawAllBullets();
  };

  this.drawPlayer = function () {
    this.ctx.drawImage(
      this.playerSprite,
      this.sx,
      this.sy,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.updatePlayerInformation();
  };
}

export default Player;
