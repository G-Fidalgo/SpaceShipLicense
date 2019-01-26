function SetWinnerScreen(game) {
  this.game = game;

  this.imgG = new Image();
  this.imgG.src = "./img/winner.png";

  this.w = 700;
  this.h = 700;

  this.x = this.game.canvas.width / 2 - 350;
  this.y = this.game.canvas.height / 2 - 300;
}

SetWinnerScreen.prototype.draw = function() {
  this.game.drawAll();
  this.game.ctx.drawImage(this.imgG, this.x, this.y, this.w, this.h);
};
