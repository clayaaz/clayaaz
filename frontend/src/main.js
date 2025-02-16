import './style.css'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
    star.position.set(x, y, z);

    scene.add(star); // Store reference
}
function addBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
    const box = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
    box.position.set(x, y, z);

    scene.add(box)
}

Array(1000).fill().forEach(addStar);
Array(1000).fill().forEach(addBox);

camera.position.setZ(-1);

// Smooth scrolling variables
let targetPosition = new THREE.Vector3(0, 0, 50);
let scrollSpeed = 0.05;

// Function to update camera target based on scroll
function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    targetPosition.z = 50 + t * -0.1;
    targetPosition.y = t * 0.01;
}

// Mouse movement variables
let mouseX = 0;
let mouseY = 0;
let targetMouse = new THREE.Vector2(0, 0);
let mouseSpeed = 0.05;

// Update mouse target smoothly
document.addEventListener('mousemove', function (e) {
    targetMouse.x = (e.clientX - window.innerWidth / 2) / 100;
    targetMouse.y = (e.clientY - window.innerHeight / 2) / 100;
});

document.body.onscroll = moveCamera;

// Animation loop with smooth camera transitions
function animate() {
    requestAnimationFrame(animate);

    // Smoothly interpolate camera position towards targetPosition
    camera.position.lerp(targetPosition, scrollSpeed);

    // Smoothly interpolate camera position based on mouse movement
    camera.position.x += (targetMouse.x - camera.position.x) * mouseSpeed;
    camera.position.y += (-targetMouse.y - camera.position.y) * mouseSpeed;


    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
}
animate();
