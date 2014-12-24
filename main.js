"use strict";

(function () {
    var svgWidth = 500,
        svgHeight = 300,
        objArray = [],
        svg, Circle;

    // Create SVG element
    svg = d3.select("body").append("svg");
    svg.attr({width: svgWidth, height: svgHeight});
    svg.style({border: "1px solid black"});


    /*
    Circle: This program's visual representation of motion.
    
    Usage example: new Circle({entity: e, svg: svg, radius: r, fill: fill});
    Where: "e" is an instance of an Entity object, which defines motion, "svg" 
    is the containing SVG element, "r" is the radius of the circle, and "fill" 
    is the color of the circle. 
    */

    Circle = function (obj) {
        this.entity = obj.entity;
        this.svg = obj.svg;
        this.r = obj.radius;
        this.fill = obj.fill;
        this.element = this.svg.append("circle").attr({
            fill: this.fill, 
            r: this.r,
            cx: this.entity.position.x,
            cy: this.entity.position.y
        });
    };

    // Animate the circle.
    Circle.prototype.update = function () {
        var that = this,
            svgWidth = that.svg.attr("width"),
            svgHeight = that.svg.attr("height");

        repeat();
        function repeat() {
            that.element.transition()
                .attr({cx: that.entity.position.x, cy: that.entity.position.y})
                .duration(200)
                .ease("linear")
                .each("end", repeat);
               
            that.entity.update();
            that.checkEdges(svgWidth, svgHeight);    
        }    
    };

    // Make sure circle stays within bounds of the SVG element.
    Circle.prototype.checkEdges = function checkEdges(width, height) {
        var e = this.entity;
        if (e.position.x - this.r < 0 || e.position.x + this.r > width) {
            e.velocity.x *= -1;
        }
        if (e.position.y - this.r < 0 || e.position.y + this.r > height) {
            e.velocity.y *= -1;
        } 
    };


    /*
    // Make circles attracted to mouse.
    svg.on("mousemove", function () {
        //console.log(d3.mouse(this)[0]);
        var x = d3.mouse(this)[0],
            y = d3.mouse(this)[1],
            v = new Vector(x, y),
            i;

        for (i = 0; i < objArray.length; i++) {
            objArray[i].entity.applyForce(v);
        }
    });
    */


    function draw() {
        for (var i = 0; i < objArray.length; i++) {
            objArray[i].update();
        }
    }

    // Add circle based on form inputs.
    // TODO: Add form validation checking.
    function buttonAdd() {
        var px = Number(d3.select("#px").property("value")),
            py = Number(d3.select("#py").property("value")),
            vx = Number(d3.select("#vx").property("value")),
            vy = Number(d3.select("#vy").property("value")),
            mass = Number(d3.select("#mass").property("value")),
            r = Number(d3.select("#r").property("value")),
            fill = d3.select("#fill").property("value"),
            e, c;

        e = new Entity({mass: mass, x: px, y: py, vx: vx, vy: vy});
        c = new Circle({entity: e, svg: svg, radius: r, fill: fill});
        objArray.push(c);
        draw();
    }

    // Events
    d3.select("#button-add").on("click", buttonAdd);
    d3.select("#button-start").on("click", draw);
    d3.select("#button-stop").on("click", function () {
        d3.selectAll("circle").transition()
            .duration(0);
    });
    
})()