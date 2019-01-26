function SetGameOverScreen(game) {
  this.game = game;

  this.imgR = new Image();
  this.imgR.src = "./img/gameOver.png";

  this.imgG = new Image();
  this.imgG.src = "./img/gameOverIdiot.png";

  this.w = 480;
  this.h = 435;

  this.x = this.game.canvas.width / 2 - this.w / 2;
  this.y = 50;
}

SetGameOverScreen.prototype.draw = function() {
  this.game.ctx.drawImage(this.imgR, this.x, this.y, this.w, this.h);
  this.game.ctx.drawImage(this.imgG, this.x, this.h * 1.2);
};
