//import library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js"
//allow foe the camera to move along the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js"
//allowing import gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js"

//create a threejs scene 
const scene = new THREE.Scene();
//cmarea with position angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//3d object in globle variable
let object;

//orbitcontrol let move the camrea arround the scene
let controls

//which object to render
let objToRender = 'robot';



//loader for the gltf file
const loader = new GLTFLoader()

//load the file
loader.load(
    `modles/${objToRender}/scene.gltf`,

    function (gltf) {
        //if the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        //while it iis loading - log in to the progres
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        //any error? log it 
        console.error(error);
    }
);

//initialozong a new renderer & ste size
const renderer = new THREE.WebGLRenderer({ alpha: true });  //alpha - true = transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//add renderer to the dom
document.getElementById("container3D").appendChild(renderer.domElement);

//how far the camera
camera.position.z = objToRender === "dino" ? 25 : 500;


//add lights
const topLight = new THREE.DirectionalLight(0xffffff, 1); //color, intensity
topLight.position.set(500, 500, 500); //top,left,ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.ambiantLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

//render the scene
function animate () {
    requestAnimationFrame(animate);
    //we could add some code to update the scene, automatic movement

    //make move
    if (object && objToRender === "robot") {
        //adjustments - move
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
}

//add a listner to the window so we can resize the window and camera 
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//start the render
animate();
