function Chronometer(game) {
  this.game = game;

  this.w = 210;
  this.h = 70;

  this.x = this.game.canvas.width / 2 - this.w / 2;
  this.y = 20;

  this.seconds = this.game.chronometerSeconds;
  this.minutes = this.chronometerMinutes;

  this.chronometerBackground = new Image();
  this.chronometerBackground.src = "./img/chronometerBackground.png";

  this.seconds = 0;
  this.minutes = 0;
}

Chronometer.prototype.draw = function(minutes, seconds) {
  this.game.ctx.drawImage(this.chronometerBackground, this.x, this.y);
  this.game.ctx.font = "32px Prueba";
  this.game.ctx.fillStyle = "#000000";
  this.game.ctx.fillText(":", this.game.canvas.width / 2, 65);

  if (seconds < 10) {
    this.game.ctx.font = "30px Prueba";
    this.game.ctx.fillStyle = "#000000";
    this.game.ctx.fillText("0" + seconds, this.game.canvas.width / 2 + 35, 68);
  } else {
    this.game.ctx.font = "30px Prueba";
    this.game.ctx.fillStyle = "#000000";
    this.game.ctx.fillText(seconds, this.game.canvas.width / 2 + 35, 68);
  }

  if (minutes === 0) {
    this.game.ctx.font = "32px Prueba";
    this.game.ctx.fillStyle = "#000000";
    this.game.ctx.fillText("00", this.game.canvas.width / 2 - 60, 68);
  } else if (minutes > 0 && minutes < 10) {
    this.game.ctx.font = "32px Prueba";
    this.game.ctx.fillStyle = "#000000";
    this.game.ctx.fillText("0" + minutes, this.game.canvas.width / 2 - 60, 68);
  } else {
    this.game.ctx.font = "32px Prueba";
    this.game.ctx.fillStyle = "#000000";
    this.game.ctx.fillText(minutes, this.game.canvas.width / 2 - 60, 68);
  }
};
