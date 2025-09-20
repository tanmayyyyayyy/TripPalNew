import React from 'react';
import * as THREE from 'three';
import Grid1Background from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.16/build/backgrounds/grid1.cdn.min.js'

// Example: create a scene
const Threejs = new THREE.Scene(
    
    React.useEffect(() => {
    
    const button1 = document.getElementById('colors-btn')


    button1.addEventListener('click', () => {
    bg.grid.setColors([0xffffff * Math.random(), 0xffffff * Math.random(), 0xffffff * Math.random()])
    bg.grid.light1.color.set(0xffffff * Math.random())
    bg.grid.light1.intensity = 500 + Math.random() * 1000
    bg.grid.light2.color.set(0xffffff * Math.random())
    bg.grid.light2.intensity = 250 + Math.random() * 250
    })

    return () => {
        <div id="app">
        <canvas id="webgl-canvas"></canvas>
        <div class="hero">
        <h1>Hexagonal</h1>
        <h2>Grid</h2>
    </div>
    <div class="buttons">
        <button type="button" id="colors-btn">
        Random colors
        </button>
    </div>
    </div>
    }

    }

));

export default Threejs;

 