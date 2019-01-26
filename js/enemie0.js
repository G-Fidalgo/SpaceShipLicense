function Enemie0(game) {
  this.game = game;

  var images = ["enemie0", "enemie1", "enemie2"];

  this.img = new Image();
  this.img.src = `./img/${
    images[Math.floor(Math.random() * images.length)]
  }.png`;

  this.w = 80;
  this.h = this.w;

  this.dx = this.game.dx;

  this.x = this.game.canvas.width;
  this.y = Math.floor(Math.random() * (this.game.canvas.height - this.w));
}

Enemie0.prototype.drawEnemy0 = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};

Enemie0.prototype.moveEnemy0 = function() {
  this.x -= this.dx;
};
