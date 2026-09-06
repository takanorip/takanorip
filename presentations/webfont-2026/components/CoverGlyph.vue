<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const root = ref(null)

let renderer
let scene
let frame

function tube(points, radius, material) {
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.15)
  const geometry = new THREE.TubeGeometry(curve, 96, radius, 28, false)
  const mesh = new THREE.Mesh(geometry, material)
  const cap = new THREE.SphereGeometry(radius, 28, 20)
  const start = new THREE.Mesh(cap, material)
  const end = new THREE.Mesh(cap, material)
  start.position.copy(points[0])
  end.position.copy(points[points.length - 1])
  const group = new THREE.Group()
  group.add(mesh, start, end)
  return group
}

function buildLetters(material, radius) {
  const letters = new THREE.Group()

  const a = new THREE.Group()
  a.add(
    tube([
      new THREE.Vector3(-1.55, 0.95, 0.05),
      new THREE.Vector3(-0.35, 1.22, 0.18),
      new THREE.Vector3(0.95, 0.92, 0),
    ], radius, material),
    tube([
      new THREE.Vector3(-0.85, 1.0, 0.08),
      new THREE.Vector3(-1.15, 0.15, 0.22),
      new THREE.Vector3(-0.7, -0.85, 0.05),
      new THREE.Vector3(-0.15, -1.25, 0),
    ], radius, material),
    tube([
      new THREE.Vector3(-0.55, 0.35, 0.16),
      new THREE.Vector3(0.45, 0.28, 0.28),
      new THREE.Vector3(1.05, -0.45, 0.1),
      new THREE.Vector3(0.55, -1.2, 0),
    ], radius, material),
  )
  a.position.set(-0.55, 0, 0)

  const A = new THREE.Group()
  A.add(
    tube([
      new THREE.Vector3(-0.85, -1.25, 0),
      new THREE.Vector3(0.05, 1.28, 0.18),
    ], radius, material),
    tube([
      new THREE.Vector3(0.05, 1.28, 0.18),
      new THREE.Vector3(0.95, -1.25, 0),
    ], radius, material),
    tube([
      new THREE.Vector3(-0.48, 0.08, 0.2),
      new THREE.Vector3(0.58, 0.08, 0.2),
    ], radius * 0.95, material),
  )
  A.position.set(1.15, -0.05, 0.15)

  letters.add(a, A)
  letters.rotation.set(-0.18, 0.42, -0.12)
  return letters
}

function paint(el) {
  const width = el.clientWidth
  const height = el.clientHeight

  scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 40)
  camera.position.set(0.15, 0.35, 8.2)
  camera.lookAt(0.15, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height, false)
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(renderer.domElement)

  const material = new THREE.MeshStandardMaterial({
    color: 0xffe8e2,
    roughness: 0.82,
    metalness: 0,
    envMapIntensity: 0.4,
  })

  scene.add(buildLetters(material, 0.4))

  scene.add(new THREE.AmbientLight(0xffffff, 0.55))
  scene.add(new THREE.HemisphereLight(0xffffff, 0xff6a4a, 0.7))

  const key = new THREE.DirectionalLight(0xffffff, 1.35)
  key.position.set(-3.2, 4.2, 3.6)
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xff8fa3, 0.55)
  fill.position.set(3.4, -1.2, 2.2)
  scene.add(fill)

  const rim = new THREE.DirectionalLight(0xffd0c4, 0.35)
  rim.position.set(0.4, 1.4, -3.2)
  scene.add(rim)

  renderer.render(scene, camera)
}

onMounted(() => {
  if (root.value)
    paint(root.value)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  if (renderer) {
    renderer.dispose()
    renderer.domElement.remove()
  }
  scene?.traverse((obj) => {
    if (obj.geometry)
      obj.geometry.dispose()
    if (obj.material)
      obj.material.dispose()
  })
})
</script>

<template>
  <div ref="root" class="stage" aria-hidden="true" />
</template>

<style scoped>
.stage {
  position: relative;
  width: 480px;
  height: 380px;
  flex-shrink: 0;
  margin-right: -28px;
}

.stage :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.stage::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.22;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
}
</style>
