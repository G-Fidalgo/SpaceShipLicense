function Enemie0Bullets(game, x, y) {
  this.game = game;

  this.x = x;
  this.y = y;

  this.w = 37;
  this.h = 9;

  this.vx = 15;

  this.img = new Image();
  this.img.src = "./img/laserRed07.png";
}

Enemie0Bullets.prototype.enemie0DrawBullet = function(a, b) {
  this.game.ctx.drawImage(this.img, a, b);
};

Enemie0Bullets.prototype.enemie0MoveBullet = function() {
  this.x -= this.vx;
};
