var scene = document.getElementById('scene');
var mainTl = new TimelineMax();
var replayBtn = document.querySelector('#replay');

// Goreground shapes
var foregroundGrass = scene.querySelectorAll('#foreground-grass path');
var rightTriangles = scene.querySelectorAll('#right-triangles path');
var foregroundShapes = scene.getElementById('foreground-shapes').childNodes;

// Trees
var leftTree = scene.getElementById('left-tree');
var leftTreeTrunk = leftTree.querySelector('#left-tree-trunk');
var leftTreeBorder = leftTree.querySelector('#left-tree-border');
var leftTreeLeaves = leftTree.querySelectorAll('#left-tree-leaves path');

var rightTree = scene.getElementById('right-tree');
var rightTreeTrunk = rightTree.querySelector('#right-tree-trunk');
var rightTreeBorder = rightTree.querySelector('#right-tree-border');
var rightTreeLeaves = rightTree.querySelectorAll('#right-tree-leaves path');

var topTree = scene.getElementById('top-tree');
var topTreeTrunk = topTree.querySelector('#top-tree-trunk');
var topTreeBorder = topTree.querySelector('#top-tree-border');
var topTreeLeaves = topTree.querySelectorAll('#top-tree-leaves path');

// Cloud, Rain & water
var water = scene.querySelectorAll('#water path');
var rain = scene.querySelector('#rain').childNodes;
var cloud = scene.querySelector('#cloud');

// Sun
var sun = scene.querySelector('#sun');
var sunEyes = sun.querySelector('#sun-eyes');

// Bear
var bear = scene.querySelector('#bear');
var leaf = scene.querySelector('#leaf');
var bearMembers = bear.childNodes;

// Timelines
var foregroundGrassTl = new TimelineMax({repeat: -1, yoyo: true});
var leftTreeLeavesTl = new TimelineMax({repeat: -1, yoyo: true, paused: true});
var rightTreeLeavesTl = new TimelineMax({repeat: -1, yoyo: true, paused: true});
var topTreeLeavesTl = new TimelineMax({repeat: -1, yoyo: true});
var rightTrianglesTl = new TimelineMax({repeat: -1, yoyo: true, paused: true});
var foregroundShapesTl = new TimelineMax({repeat: -1, yoyo: true, paused: true});
var waterTl = new TimelineMax({repeat: -1, yoyo: true, paused: true});
var rainTl = new TimelineMax({repeat: -1, paused: true});

// Main animation timeline
mainTl
  .staggerFrom(rightTriangles, 0.3, {opacity:0, y: '100%', ease: Back.easeOut}, 0.1, 0)
  .staggerFrom(foregroundShapes, 0.1, {opacity: 0, y: '50%', scale: 0, ease: Sine.easeOut}, 0.05, 0)
  .addCallback(rightTrianglesLoop, '+=0')
  .addCallback(foregroundShapesLoop, '+=0')

  .from(sun, 0.6, {opacity: 0, scale:0, ease: Back.easeOut}, 1.5)
  .from(sunEyes, 0.4, {opacity: 0, y: '30%', ease: Back.easeOut}, '+=0.1')
  .from(cloud, 0.7, {opacity: 0, scale: 0, y: '30%', ease: Back.easeOut}, '-=0.1')
  .from(water, 0.7, {opacity: 0, scale: 0, y: '30%', ease: Back.easeOut}, '-=0.1')
  .addCallback(waterLoop, '+=0')
  .addCallback(rainLoop, '+=0')

  .from(rightTreeTrunk, 0.4, {opacity: 0, transformOrigin: '50% 50%', scale:0, ease: Sine.easeOut}, 1.4)
  .staggerFrom(rightTreeLeaves, 0.1, {scale: 0, ease: Sine.easeOut}, 0.05, 1.6)
  .from(rightTreeBorder, 0.2, {opacity: 0, y: '10%', scale: 0, ease: Sine.easeOut}, 1.7)
  .addCallback(rightTreeLeavesLoop, '+=0')

  .from(leftTreeTrunk, 0.4, {opacity: 0, transformOrigin: '50% 50%', scale:0, ease: Sine.easeOut}, 2)
  .staggerFrom(leftTreeLeaves, 0.1, {scale: 0, ease: Sine.easeOut}, 0.05, 2.3)
  .from(leftTreeBorder, 0.2, {opacity: 0, y: '10%', scale: 0, ease: Sine.easeOut}, 2.4)
  .addCallback(leftTreeLeavesLoop, '+=0')

  .from(topTreeTrunk, 0.3, {opacity: 0, transformOrigin: '50% 50%', scale:0, ease: Sine.easeOut}, 2.3)
  .staggerFrom(topTreeLeaves, 0.1, {scale: 0, ease: Sine.easeOut}, 0.05, 2.6)
  .from(topTreeBorder, 0.4, {opacity: 0, y: '10%', scale: 0, ease: Sine.easeOut}, 2.7)
  .addCallback(topTreeLeavesLoop, '+=0')

  .staggerFrom(bearMembers, 0.4, {scale: 0, transformOrigin: '50% 50%', ease: Back.easeOut}, 0.1, 2.3)
  .from(leaf, 0.3, {scale: 0, transformOrigin: '50% 50%', ease: Back.easeOut}, '-=0.3')
  .addCallback(moovingArms, '+=0')


// Loops
foregroundGrassTl.fromTo(foregroundGrass, 2, {scale: 1}, {scale: 1.1, rotation: '25deg'});
leftTreeLeavesTl.staggerTo(leftTreeLeaves, 1, {rotation: '45deg', ease: Sine.easeOut}, 0.07);
rightTreeLeavesTl.staggerTo(rightTreeLeaves, 1.5, { rotation: '40deg', ease: Cubic.easeOut}, 0.05);
rightTrianglesTl.staggerTo(rightTriangles, 1, { rotation: '10deg', ease: Cubic.easeOut}, 0.1)
foregroundShapesTl.staggerTo(foregroundShapes, 1.5, { scale: '0.9', ease: Sine.easeOut}, 0.1);
waterTl.staggerTo(water, 1.5, {x: '5%', ease: Sine.easeOut});
rainTl.staggerFromTo(rain, 4, {opacity:0}, {opacity: 0.4, y: '100%', ease: Sine.easeOut}, 0.1, 0.4);

// Replay binding event
replayBtn.addEventListener('click', replay, false);

// Loop callback from mainTl
function leftTreeLeavesLoop() {
  leftTreeLeavesTl.play();
}

function rightTreeLeavesLoop() {
  rightTreeLeavesTl.play();
}

function topTreeLeavesLoop() {
  topTreeLeavesTl.staggerFrom(topTreeLeaves, 1, { scale: '0.2', ease: Cubic.easeOut}, 0.03);
}

function rightTrianglesLoop() {
  rightTrianglesTl.play();
}

function foregroundShapesLoop() {
  foregroundShapesTl.play();
}

function waterLoop() {
  waterTl.play();
}

function rainLoop() {
  rainTl.play();
}

function moovingArms() {

  bear.classList.add('moving-arm');
  leaf.classList.add('moving-leaf');
}

function replay() {
  bear.classList.remove('moving-arm');
  leaf.classList.remove('moving-leaf');
  mainTl.seek(0);
  rainTl.seek(0);
  topTreeLeavesLoop.seek(0);
}