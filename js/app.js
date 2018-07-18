// the starting position of the player
let tileHeight = 83,
tileWidth = 101,
canvasWidth = tileWidth * 5,
canvasHeight = tileHeight * 6,
playerStartX = (canvasWidth / 2) - (tileWidth / 2),
playerStartY = tileHeight * 5 - 10
enemyStartX = (canvasWidth / 10) - (tileWidth / 2),
enemyStartY = tileHeight * 5 - 270;

// Enemies our player must avoid
class Enemy {
  constructor() {
    this.sprite = 'images/enemy-bug.png';
    //placing the enemy offscreen  
    this.x = -100;
    // creating a random number to set the speed
    this.speed = 100 + Math.floor(Math.random() * 475);
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  update(dt) {
    this.x += this.speed * dt;
    if (this.x > 550) {
      this.x = -100;
    }
    // if the player touches the enemy
    if (isCollide(player.x, player.y, this.x, this.y)) {
      player.reset(); //resets the player to starting position
    }
    Enemy.prototype.handleInput = function () {};
  }
}
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function isCollide(ax, ay, bx, by) {
  if (
    ax + 18 < bx + 99 &&
    ax + 84 > bx &&
    by + 77 < ay + 139 &&
    by + 70 > ay
  ) {
    return true;
  }
}

class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    // places the character on the center
    this.x = playerStartX;
    this.y = playerStartY;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(dt) {
    switch (dt) {
      case 'up':
        if (this.y > 0) {
          this.y -= tileHeight;
        }
        break;
      case 'down':
        if (this.y > tileHeight - 11 && this.y < (canvasHeight - tileHeight * 2)) {
          this.y += tileHeight;
        }
        break;
      case 'left':
        if (this.x > 0) {
          this.x -= tileWidth;
        }
        break;
      case 'right':
        if (this.x < canvasWidth - tileWidth) {
          this.x += tileWidth;
        }
        break;
      case 'enter':
        this.reset();
    }
    if (this.y < 0) {
      setTimeout(() => {
        alert(`CONGRATULATIONS!! YOU OUTSMARTED THE BUGS!!`);
        this.x = 202;
        this.y = 405;
      }, 1000);
    };
  }
  update(dt) {}
  reset() {
    //positions player on first row, middle of screen
    this.x = playerStartX;
    this.y = playerStartY;
  }
}

//instantiates objects
// places all enemy objects in an array called allEnemies
// places the player object in a variable called player

let bug1 = new Enemy();
let bug2 = new Enemy();
let bug3 = new Enemy();
let allEnemies = [bug1, bug2, bug3, ];

for (let i = 0; i < allEnemies.length; i++) {
  allEnemies[i].y = ((tileHeight) * (i + 1) - 20);
}

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});