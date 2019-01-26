function PortalGunFiller(game) {
  this.game = game;

  this.x = this.game.canvas.width * 0.08;
  this.y = this.game.canvas.height * 0.08;

  this.img = new Image();
  this.img.src = "./img/PortalGun.png";
}

PortalGunFiller.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, 20, 45, 55);

  //Texto nº de pistolas recogidas Relleno + Borde
  this.game.ctx.font = "40px Prueba";
  this.game.ctx.fillStyle = "#FFFFFF";
  this.game.ctx.fillText(`${this.game.portalGunCounter}`, this.x + 70, this.y);

  this.game.ctx.font = "40px Prueba";
  this.game.ctx.lineWidth = 2;
  this.game.ctx.strokeStyle = "#FF7F50";
  this.game.ctx.strokeText(
    `${this.game.portalGunCounter}`,
    this.x + 70,
    this.y
  );

  // Barra separadora de nºque tienes y nºObjetivo + Objetivo

  this.game.ctx.font = "40px Prueba";
  this.game.ctx.fillStyle = "#FFFFFF";
  this.game.ctx.fillText(
    `/ ${this.game.portalGunGoal}`,
    this.x + 110,
    this.y * 1.08
  );

  this.game.ctx.font = "40px Prueba";
  this.game.ctx.lineWidth = 2;
  this.game.ctx.strokeStyle = "#FF7F50";
  this.game.ctx.strokeText(
    `/ ${this.game.portalGunGoal}`,
    this.x + 110,
    this.y * 1.08
  );
};
