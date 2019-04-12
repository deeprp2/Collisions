let ballsArr = [];  //array to hold the circle object

function setup() {
    createCanvas(640, 320);

    var numOfBalls = Math.floor(Math.random() * (10 - 2 + 1) ) + 2;   //generates a random # of circles
    let var1 = 0;
    let var2 = 0;

    for (let i = 0; i < numOfBalls; i++) {
        var1 = Math.floor(Math.random() * (600 - 26 + 1) ) + 26;    //x position of a circle
        var2 = Math.floor(Math.random() * (150 - 30 + 1) ) + 30;    //y position of a circle
        ballsArr[i] = new objectBall(var1, var2, 1, 1, 15);         //store a new object in the array
    }
}


function draw() {
    background(150);

    for (let i = 0; i < ballsArr.length; i++) {
        ballsArr[i].display();                                    //display the circle on the canvas
        for (let j = i; j < ballsArr.length; j++) {              //check for intersection
            if ((j !== i) && (ballsArr[i].intersects(ballsArr[j])) && (ballsArr[i].r === 15) && (ballsArr[j].r === 15)) {
                ballsArr[i].mergeBalls(ballsArr[j], i, j);
            }
        }
    }
}


class objectBall {
    constructor(x, y, xspeed, yspeed, r) {
        this.x = x;
        this.y = y;
        this.xspeed = xspeed;                //speed in the x-dir
        this.yspeed = yspeed;                //speed in the y-dir
        this.r = r;                          //radius of the circle
        this.col = color(255);               //color of the circle
    }

    move() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        if (this.x > width - this.r || this.x < this.r) {
            this.xspeed = -this.xspeed;
            // this.x += Math.floor(random(-1, 1));
        }
        if (this.y > height - this.r || this.y < this.r) {
            this.yspeed = -this.yspeed;
            //this.y += Math.floor(random());
        }
    }

    show() {
        fill(this.col);
        ellipse(this.x, this.y, (this.r * 2), (this.r * 2));
    }

    intersects(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return d < this.r + other.r;
    }

    display() {
        this.move();
        this.show();
    }

    mergeBalls(ball2, index1, index2) {
        let xVelocity = (1/2) * (this.xspeed + ball2.xspeed);
        let yVelocity = (1/2) * (this.yspeed + ball2.yspeed);

        let ball3 = new objectBall(this.x, this.y, 2, 2, 18);
        ballsArr.splice(index1, 1, ball3);
        ballsArr.splice(index2, 1);
        ball3.changeColor();
    }

    changeColor() {
        this.col = color(255, 0, 0);        //changes the color to red
    }
}