function PortalGun(game, x, y) {
  this.game = game;

  this.img = new Image();
  this.img.src = "./img/PortalGun.png";

  //meter posición relativa a la posición del RICK Eliminado

  this.x = x;
  this.y = y;

  this.w = 40;
  this.h = this.w;

  this.dx = this.game.dx;
}

PortalGun.prototype.drawPortalGun = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};

PortalGun.prototype.movePortalGun = function() {
  this.x -= this.dx;
};
