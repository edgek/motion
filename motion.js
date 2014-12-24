"use strict";

/*
Vector: An object to describe a two dimensional vector, something that has both 
magnitude and direction.  
*/

var Vector = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.normalize = function () {
    var mag = this.mag();
    this.x /= mag;
    this.y /= mag;
};

Vector.prototype.add = function (vectorObj) {
    this.x += vectorObj.x;
    this.y += vectorObj.y; 
};

Vector.prototype.sub = function (vectorObj) {
    this.x -= vectorObj.x;
    this.y -= vectorObj.y;
};

Vector.prototype.mag = function () {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

Vector.prototype.mult = function (n) {
    this.x *= n;
    this.y *= n;
};

Vector.prototype.div = function (n) {
    this.x /= n;
    this.y /= n;
};


/*
Entity: An object that describes the motion of an object through 2D space.

It is composed of vector objects that define its position, velocity, and 
acceleration. External forces, represented by vectors, can be applied to alter 
its movement.
*/

var Entity = function (obj) {
    this.position = new Vector(obj.x, obj.y);
    this.velocity = new Vector(obj.vx, obj.vy);
    this.acceleration = new Vector(0, 0);
    this.mass = obj.mass;
};

Entity.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
};

Entity.prototype.applyForce = function (vectorObj) {
    this.acceleration.add(vectorObj);
};

