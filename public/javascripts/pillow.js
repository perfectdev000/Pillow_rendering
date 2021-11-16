// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js'; 
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js'; 
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js'; 
import Stats from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/libs/stats.module.js';
import { GUI } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/libs/dat.gui.module.js';

var scene, camera, renderer
var pillow_model;
var light;
var time =0;
var newPosition = new THREE.Vector3();
var gui = new GUI();

function create_scene() {  
  scene = new THREE.Scene();
  // scene.background = new THREE.Color('skyblue'); 
}
function create_camera() {  
  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set(100, 100, 100);  
  // camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.lookAt(scene.position);
}
function create_renderer() {  
  renderer = new THREE.WebGLRenderer({antialias:true,alpha: true });
  renderer.setClearColor( 0xffffff, 0.4 );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('webgl').appendChild(renderer.domElement);
}
function create_axes() {
  let axesHelper = new THREE.AxesHelper( 100 );
  scene.add( axesHelper );
}
function create_light() {
  light = new THREE.PointLight( 0xffffff, 1, 200, 1 );  
  light.castShadow = true; // default false
  light.position.set(0, 0, 150);
  scene.add(light);  
}
function import_model(url) {  
  let loader = new GLTFLoader();
  loader.load(url, function(model_gltf){
    pillow_model = model_gltf.scene.children[0];
    pillow_model.scale.set(0.5,0.5,0.5);    
    // pillow_model.add(camera);
    scene.add(model_gltf.scene);
    // pillow_model.position.set(0, 0, 0);
  }, undefined, function ( error ) {
    console.error( error );
  });
  loader.remove;
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}
function init() {
   
  create_scene();
  create_camera();
  create_renderer();
  create_axes(); 
  create_light();
  
  // var params = {};
  // params.color = [255, 255, 255];  
  // var update = function () {
  //   var colorObj = new THREE.Color( params.color );
  //   var hex = colorObj.getHexString();
  // };
  // gui.addColor(params, 'color').onChange(update);
  
  window.addEventListener('resize', onWindowResize);
  
  var cameral_control = new OrbitControls(camera, renderer.domElement);
  cameral_control.addEventListener('change', renderer);

  import_model('/models/pillow1/scene.gltf');  
  animate();
}

function animate() {
	requestAnimationFrame( animate );  
  time += 0.01;
  
  newPosition.x = Math.cos( time );
  newPosition.y = 0;
  newPosition.z = Math.sin( time ); 
  
  
  pillow_model.position.copy( newPosition );
  pillow_model.lookAt( newPosition );
    
  
	renderer.render(scene, camera);  
}

init();