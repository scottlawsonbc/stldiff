
var THREE = require('three');

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

const canvas = document.getElementById("stlview")
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const scene = new THREE.Scene();
const loader = new STLLoader();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
const controls = new OrbitControls(camera, renderer.domElement);

function initLight() {
    const ambientLight = new THREE.AmbientLight(0xb2b2b2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = 2;
    directionalLight.position.normalize();
    scene.add(directionalLight);
}

function initPlane() {
    var geometry = new THREE.PlaneGeometry(400, 400, 20, 20);
    var material = new THREE.MeshBasicMaterial({ color: 0x01425f, wireframe: true });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
}

function loadSTL(path, color, wireframe) {
    const material = new THREE.MeshToonMaterial({
        color: color,
        wireframe: wireframe,
        transparent: true,
        opacity: 0.95
    });
    loader.load(path, function (geometry) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.geometry.computeBoundingSphere();
        scene.add(mesh);
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

camera.position.set(0, -200, 400);
initPlane();
initLight();

loadSTL('./added.stl', 0x28a745, false)
loadSTL('./removed.stl', 0xdc3545, false)
loadSTL('./unchanged.stl', 0x6c757d, true)

animate();
