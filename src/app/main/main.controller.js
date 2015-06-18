'use strict';

angular.module('aiProject')
  .controller('MainCtrl', function ($scope, $location, $interval) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth / 4, window.innerHeight / 4);
    document.body.querySelector('.three-container').appendChild( renderer.domElement );
    document.body.querySelector('canvas').style.margin = "0 auto";
    document.body.querySelector('canvas').style.display = "block";
    console.log();

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var render = function () {
      requestAnimationFrame( render );

      cube.rotation.x += 0.1;
      cube.rotation.y += 0.1;

      renderer.render(scene, camera);
    };

    window.onresize = function(event) { render(); }

    render();
    //
    var onVivusReady = function(_vivus){
      _vivus
        .start()
        .catch(function(err) {
          console.log("Vivus ERROR : " + err.message);
        })
        .then(function(){
          _vivus.rewind();
        })
        .then(function(){
          //do other stuff
        });
    };

    var test = new Vivus('test', {type: 'delayed', duration: 500, animTimingFunction: Vivus.EASE, file: '/assets/svg/my-name-is-jane.svg', onReady: onVivusReady}, null);

      var dr = true;

    $interval(function(){
      test.play(dr === true ? -1 : 1);
      dr = !dr;
    }, 10000);

  });
