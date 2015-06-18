'use strict';

angular.module('aiProject')
  .controller('NavbarCtrl', function ($scope) {


    function Icosahedron(scale,velocityX,velocityY) {

      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.width = 400;
      this.height = 400;
      this.t0 = Date.now();
      console.log(this.width);
      var projection = d3.geo.orthographic()
        .scale(this.height/scale)
        .translate([this.width/2, this.height/2])
        .center([0, 0]);

      this.projection = projection;

      this.svg = d3.select("nav").append("svg")
        .attr("class", "isoco1")
        .attr("width", this.width)
        .attr("height", this.height);


      this.face = this.svg.selectAll("path")
        .data(icosahedronFaces)
        .enter()
        .append("path").attr("class", "isoco")
        .each(function(d) { d.polygon = d3.geom.polygon(d.map(projection)); });

      function icosahedronFaces(slide) {
        var slide = slide || 180;
        var faces = [],
          y = Math.atan2(1, 2) * slide / Math.PI;
        for (var x = 0; x < 360; x += 72) {
          faces.push(
            [[x +  0, -90], [x +  0,  -y], [x + 72,  -y]],
            [[x + 36,   y], [x + 72,  -y], [x +  0,  -y]],
            [[x + 36,   y], [x +  0,  -y], [x - 36,   y]],
            [[x + 36,   y], [x - 36,   y], [x - 36,  90]]
          );
        }
        return faces;
      };

    };

    Icosahedron.prototype.redraw = function() {
      var time = Date.now() - this.t0;
      var projection = this.projection;

      this.projection.rotate([time * this.velocityX, time * this.velocityY]);
      this.face
        .each(function(d) { d.forEach(function(p, i) { d.polygon[i] = projection(p); }); })
        .style("display", function(d) { return d.polygon.area() > 0 ? null : "none"; })
        .attr("d", function(d) { return "M" + d.polygon.join("L") + "Z"; })
    };

    function init() {
      d3.selectAll("svg").remove();

      var i1 = new Icosahedron(3,.014,.01);
      var i2 = new Icosahedron(3.5,.02,-.02);
      var i3 = new Icosahedron(4,-.01,.014);
      var i4 = new Icosahedron(4.5,.01,.012);
      var i5 = new Icosahedron(5,-.01,-.011);

      d3.timer(function() {
        i1.redraw();
        i2.redraw();
        i3.redraw();
        i4.redraw();
        i5.redraw();
      });

    };

    window.onresize = function(event) { init(); };

    init();


  });
