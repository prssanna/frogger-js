

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.speed = randomIntFromInterval(100,200);
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 505) {
        this.x+=this.speed*dt;
    }
    else {
        this.x=-90;
        if(player.score==10) {
            this.speed = randomIntFromInterval(130,250);
        }
        else if(player.score==15) {
            this.speed = randomIntFromInterval(150,300);
        }
        else {
            this.speed = randomIntFromInterval(100,200);
        }
    }


    if(player.x-40<this.x && this.x<player.x+40 && player.y-40<this.y && this.y<player.y+40) {
        player.score=0;
        document.getElementById("score").innerHTML = player.score;
        player.reset();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite='images/char-cat-girl.png';
    this.x = 200;
    this.y = 380;
    this.score=0;

};

Player.prototype.update = function(dt) {
    if(this.y==-10) {
        this.score+=1;
        document.getElementById("score").innerHTML = this.score;

        this.reset()
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

    if(key=='up' && this.y>-10) {
        this.y-=30;
    }
    else if(key=='down' && this.y<410) {
        this.y+=30;
    }
    else if(key=='right' && this.x<410) {
        this.x+=30;
    }
    else if(key=='left' && this.x>-10) {
        this.x-=30;
    }
};

Player.prototype.reset = function() {
    this.x=200 ;
    this.y=380;
};



// Now instantiate your objects.
var a = new Enemy(-10, 65);
var b = new Enemy(-50, 145);
var c = new Enemy(-100, 225);
var d = new Enemy(-200, 65);
var e = new Enemy(-400, 145);
var f = new Enemy(-800, 225);
allEnemies = [a, b, c, d, e, f];
var player = new Player();
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
