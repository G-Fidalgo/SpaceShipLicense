var Game = {
  canvas: undefined,
  width: undefined,
  height: undefined,
  ctx: undefined,
  fps: 60,
  dx: 3,
  player: undefined,
  framesCounter: 0,
  chronometerSeconds: 0,
  chronometerMinutes: 0,
  keys: {
    TOP_KEY: 38,
    DOWN_KEY: 40,
    LEFT_KEY: 37,
    RIGHT_KEY: 39,
    SPACE_KEY: 32
  },

  listenersState: {
    movePlayerUp: false,
    movePlayerDown: false,
    movePlayerLeft: false,
    movePlayerRight: false
  },

  playerShootState: false,

  playerShoot: {
    bullet: undefined
  },

  enemies0Counter: 0,

  enemies0: [],
  setGameOver: undefined,
  finished: false,

  winner: false,

  playerBullets: [],

  enemiesBullets: [],

  portalGunArr: [],

  portalGunCounter: 0,

  portalGunGoal: 6,

  portalGunfiller: undefined,

  enemieShootRate: 0,

  enemieShoot: {
    bullet: undefined
  },

  init: function(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.fps = 60;
    this.portalGunfiller = new PortalGunFiller(this);
    this.chronometer = new Chronometer(
      this,
      this.chronometerSeconds,
      this.chronometerMinutes
    );

    this.reset();
    this.setListeners();

    this.interval = setInterval(
      function() {
        this.clear();

        this.framesCounter++;

        if (this.framesCounter % 60 === 0) {
          this.chronometerSeconds++;
        }

        if (this.chronometerSeconds === 60) {
          this.chronometerMinutes++;
        }

        if (this.chronometerSeconds === 60) {
          this.chronometerSeconds = 0;
        }

        if (this.framesCounter % 260 === 0) {
          this.generateEnemy0();
        }

        if (this.framesCounter % 80 === 0) {
          this.generateEnemy0Bullet();
        }

        if (this.isColision()) {
          this.gameOver();
        }

        this.shootReceived();

        if (this.player.lifes <= 0) {
          this.gameOver();
        }

        var a = this.enemieKilled();

        if (a != undefined) {
          audioArr = [1, 2, 3, 4, 5, 6];

          var audioEnemyKilled = new Audio(
            `./audio/EnemieAudio/${Math.floor(Math.random() * (6)) + 1}.mp3`
          );
          this.portalGunArr.push(new PortalGun(this, a.x, a.y));
          audioEnemyKilled.play();
        }

        var b = this.portalGunCollected();

        if (b != undefined) {
          this.portalGunCounter++;
        }

        if (this.listenersState.movePlayerUp === true) {
          this.player.playerpsoition.y -= 10;
          if (this.player.playerpsoition.y < -100) {
            this.player.playerpsoition.y = this.canvas.height;
          }
        }
        if (this.listenersState.movePlayerDown === true) {
          this.player.playerpsoition.y += 10;
          if (this.player.playerpsoition.y > this.canvas.height) {
            this.player.playerpsoition.y = -100;
          }
        }
        if (this.listenersState.movePlayerLeft === true) {
          this.player.playerpsoition.x -= 10;
        }
        if (this.listenersState.movePlayerRight === true) {
          this.player.playerpsoition.x += 10;
        }

        if (this.portalGunCounter === this.portalGunGoal) {
          this.winnerM();
        }

        if (!this.winner) {
          this.moveAll();
          this.drawAll();
        }
        this.enemiesBullets.forEach(function(bullet) {
          bullet.enemie0MoveBullet();
          bullet.enemie0DrawBullet(bullet.x, bullet.y);
        });
      }.bind(this),
      1000 / this.fps
    );
  },

  reset: function() {
    this.background = new Background(this);
    this.player = new Player(this);
    this.setGameOver = new SetGameOverScreen(this);
    this.setWinner = new SetWinnerScreen(this);
    this.framescounter = 0;
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  generateEnemy0: function() {
    this.enemies0.push(new Enemie0(this));
  },

  generateEnemy0Bullet: function() {
    this.enemies0.forEach(
      function(enemie) {
        this.enemiesBullets.push(new Enemie0Bullets(this, enemie.x, enemie.y));
      }.bind(this)
    );
  },

  drawAll: function() {
    this.background.draw();
    this.player.drawPlayer();
    this.enemies0.forEach(function(enemie) {
      enemie.drawEnemy0();
    });
    this.portalGunArr.forEach(function(portalGun) {
      portalGun.drawPortalGun();
    });

    if (this.finished === true) {
      this.setGameOver.draw();
    }

    this.portalGunfiller.draw();
    this.chronometer.draw(this.chronometerMinutes, this.chronometerSeconds);
  },

  setListeners: function() {
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case this.keys.TOP_KEY:
          this.listenersState.movePlayerUp = true;
          break;
        case this.keys.DOWN_KEY:
          this.listenersState.movePlayerDown = true;
          break;
        case this.keys.LEFT_KEY:
          this.listenersState.movePlayerLeft = true;
          break;
        case this.keys.RIGHT_KEY:
          this.listenersState.movePlayerRight = true;
          break;
        case this.keys.SPACE_KEY:
          this.player.playerBullets.push(
            new PlayerBullet(
              this,
              this.player.playerpsoition.x,
              this.player.playerpsoition.y
            )
          );
          break;
      }
    }.bind(this);

    document.onkeyup = function(e) {
      switch (e.keyCode) {
        case this.keys.TOP_KEY:
          this.listenersState.movePlayerUp = false;
          break;
        case this.keys.DOWN_KEY:
          this.listenersState.movePlayerDown = false;
          break;
        case this.keys.LEFT_KEY:
          this.listenersState.movePlayerLeft = false;
          break;
        case this.keys.RIGHT_KEY:
          this.listenersState.movePlayerRight = false;
          break;
        case this.keys.SPACE_KEY:
          this.playerShootState = false;
          break;
      }
    }.bind(this);
  },

  moveAll: function() {
    this.background.move();
    this.enemies0.forEach(function(enemie) {
      enemie.moveEnemy0();
    });
    this.portalGunArr.forEach(function(portalGun) {
      portalGun.movePortalGun();
    });
  },

  isColision: function() {
    var colision = false;
    this.enemies0.forEach(
      function(enemie) {
        if (detectColliton(this.player.playerpsoition, enemie)) {
          colision = true;
        }
      }.bind(this)
    );

    if (
      this.player.playerpsoition.x >
      this.canvas.width - this.player.playerpsoition.w + 50
    ) {
      colision = true;
    }
    if (this.player.playerpsoition.x < -90) {
      colision = true;
    }

    return colision;
  },

  enemieKilled: function() {
    var enemyAndBulletCollition = undefined;
    this.player.playerBullets.some(
      function(bullet, index1) {
        this.enemies0.some(
          function(enemie, index2) {
            if (detectColliton(bullet, enemie)) {
              enemyAndBulletCollition = enemie;
              this.enemies0.splice(index2, 1);
              this.player.playerBullets.splice(index1, 1);
            }
          }.bind(this)
        );
      }.bind(this)
    );

    return enemyAndBulletCollition;
  },

  shootReceived: function() {
    this.enemiesBullets.some(
      function(bullet, index) {
        if (detectColliton(this.player.playerpsoition, bullet)) {
          this.enemiesBullets.splice(index, 1);
          this.player.lifes--;
        }
      }.bind(this)
    );
  },

  portalGunCollected: function() {
    var portalGunCollection = undefined;
    this.portalGunArr.some(
      function(portalGunX, index) {
        if (detectColliton(this.player.playerpsoition, portalGunX)) {
          portalGunCollection = portalGunX;
          this.portalGunArr.splice(index, 1);
        }
      }.bind(this)
    );
    return portalGunCollection;
  },

  winnerM: function() {
    this.winnerStop();
    this.setWinner.draw();
    var winnerAudio = new Audio("./audio/winner.mp3");
    winnerAudio.play();
  },

  winnerStop: function() {
    clearInterval(this.interval);
    this.winner = true;
    this.setWinner.draw();
  },

  stop: function() {
    clearInterval(this.interval);
    this.finished = true;
  },

  gameOver: function() {
    this.setGameOver.draw();
    this.stop();
    var looserAudio = new Audio("./audio/looser.mp3");
    looserAudio.play();
  }
};
