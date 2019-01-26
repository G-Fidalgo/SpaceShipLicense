function PlayerBullet(game, x, y) {
  this.game = game;

  this.x = x + 180;
  this.y = y + 90;

  this.w = 40;
  this.h = 20;

  this.vx = 10;

  this.img = new Image();
  this.img.src = "./img/spaceMissiles_007.png";
}

PlayerBullet.prototype.playerBulletDraw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, 40, 20);
};

PlayerBullet.prototype.playerBulletMove = function() {
  this.x += this.vx;
};
