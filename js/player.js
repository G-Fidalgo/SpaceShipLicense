function Player(game) {
  this.game = game;

  this.img = new Image();
  // this.img.src = "../img/player.png"
  this.img.src = "./img/player.png";

  this.dx = this.game.dx;

  this.lifes = 6;

  this.playerpsoition = {
    x: this.game.canvas.width * 0.1,
    y: this.game.canvas.height * 0.5 - 90,

    w: 180,
    h: 180
  };

  this.playerBullets = [];
}

Player.prototype.drawPlayer = function() {
  this.game.ctx.drawImage(
    this.img,
    this.playerpsoition.x,
    this.playerpsoition.y,
    this.playerpsoition.w,
    this.playerpsoition.h
  );

  this.game.ctx.font = "40px Prueba";
  this.game.ctx.fillStyle = "#FFFFFF";
  this.game.ctx.fillText(
    `Your Lifes: ${this.lifes}`,
    this.game.canvas.width - 300,
    60
  );

  this.game.ctx.font = "40px Prueba";
  this.game.ctx.lineWidth = 2;
  this.game.ctx.strokeStyle = "#FF7F50";
  this.game.ctx.strokeText(
    `Your Lifes: ${this.lifes}`,
    this.game.canvas.width - 300,
    60
  );

  this.playerBullets = this.playerBullets.filter(
    function(bullet) {
      return bullet.x < this.game.canvas.width;
    }.bind(this)
  );

  this.playerBullets.forEach(function(bullet) {
    bullet.playerBulletDraw();
    bullet.playerBulletMove();
  });
};
