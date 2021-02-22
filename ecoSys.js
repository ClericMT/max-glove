autowatch = 1;

var mySketch = new JitterObject("jit.gl.sketch", "ecoSys");
mySketch.line_width = 3;

var windowRatio = 1;

function setRatio(r) {
    windowRatio = r;
}

function mousePosition(x, y, windowX, windowY) {
    var x = (x/windowX * 2 - 1)*windowRatio;
    var y = (y/windowY * 2 - 1)*-1;
    mouse = new Vector(x, y, 0)
}

function Vector(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.add = function(s) {
        if (s instanceof Vector) {
            this.x += s.x;
            this.y += s.y;
            this.z += s.z;
        } else {
            this.x += s;
            this.y += s;
            this.z += s;
        }
    }

    this.addNew = function(s) {
        if (s instanceof Vector) {
            var x = this.x += s.x;
            var y = this.y += s.y;
            var z = this.z += s.z;
        } else {
            var x = this.x += s;
            var y = this.y += s;
            var z = this.z += s;
        }
        return new Vector(x, y, z);
    }

    this.mult = function(s) {
        if (s instanceof Vector) {
            this.x *= s.x;
            this.y *= s.y;
            this.z *= s.z;
        } else {
            this.x *= s;
            this.y *= s;
            this.z *= s;
        }
    }

    this.multNew = function(s) {
        if (s instanceof Vector) {
            var x = this.x *= s.x;
            var y = this.y *= s.y;
            var z = this.z *= s.z;
        } else {
            var x = this.x *= s;
            var y = this.y *= s;
            var z = this.z *= s;
        }
        return new Vector(x, y, z);
    }

    this.sub = function(s) {
        if (s instanceof Vector) {
            this.x -= s.x;
            this.y -= s.y;
            this.z -= s.z;
        } else {
            this.x -= s;
            this.y -= s;
            this.z -= s;
        }
    }

    this.subNew = function(s) {
        if (s instanceof Vector) {
            var x = this.x -= s.x;
            var y = this.y -= s.y;
            var z = this.z -= s.z;
        } else {
            var x = this.x -= s;
            var y = this.y -= s;
            var z = this.z -= s;
        }
        return new Vector(x, y, z);
    }

    this.div = function(s) {
        if (s instanceof Vector) {
            this.x /= s.x;
            this.y /= s.y;
            this.z /= s.z;
        } else {
            this.x /= s;
            this.y /= s;
            this.z /= s;
        }
    }

    this.divNew = function(s) {
        if (s instanceof Vector) {
            var x = this.x /= s.x;
            var y = this.y /= s.y;
            var z = this.z /= s.z;
        } else {
            var x = this.x /= s;
            var y = this.y /= s;
            var z = this.z /= s;
        }
        return new Vector(x, y, z);
    }

    this.mag = function(s) {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    this.asArray = function(){
        return [this.x, this.y, this.z];
    }

    this.print = function() {
        post(this.x, this.y, this.z);
        post();
    }
}

//-----------------------------------------------------------------------------

function Creature() {
    var randomX = Math.random() * 2 - 1;
    var randomY = Math.random() * 2 - 1;

    this.position = new Vector(randomX, randomY, 0);
    this.size = 0.02;
    this.color = [0, 0.8, 1, 1];  // R G B A;
    this.maxSpeed = 0.03;
    
    this.velocity = new Vector(0.01, 0.01, 0);

    this.update = function() {
        this.position.add(this.velocity);
        this.checkBorders();
    }

    this.display = function() {
        mySketch.moveto(this.position.asArray());
        mySketch.glcolor(this.color);
        mySketch.circle(this.size);
        for (var i=0; i<creatures.length; i++) {
            mySketch.moveto(mouse.asArray());
            mySketch.lineto(this.position.asArray())
        }
    }

    this.checkBorders = function() {
        if((this.position.x-this.size) < -windowRatio || (this.position.x+this.size) > windowRatio) {
            this.position.x -= this.position.x*0.01;
            this.velocity.x *= -1.0;
        }
        if((this.position.y-this.size) < -1 || (this.position.y+this.size) > 1) {
            this.position.y -= this.position.y*0.01;
            this.velocity.y *= -1.0;
        }
    }
}


//-----------------------------------------------------------------------------

// Setup of the ecosystem
var creature = [];
var mouse; 

function setup() {
    creatures = [];

    for (var i=0; i<10; i++) {
        creatures.push(new Creature());
    }
}

setup();

function draw() {
    mySketch.reset();
    for (var i=0; i<creatures.length; i++) {
        creatures[i].update(); 
        creatures[i].display();
    }
}


