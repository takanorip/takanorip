<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { parse } from 'opentype.js'
import * as THREE from 'three'

const FONT_URL = '/fonts/cover-glyphs.ttf'
const FONT_SIZE = 100

const root = ref(null)

let renderer
let scene
let camera
let frame
let resizeObserver

function pathToShapePath(path) {
  const shapePath = new THREE.ShapePath()
  for (const cmd of path.commands) {
    switch (cmd.type) {
      case 'M':
        shapePath.moveTo(cmd.x, -cmd.y)
        break
      case 'L':
        shapePath.lineTo(cmd.x, -cmd.y)
        break
      case 'C':
        shapePath.bezierCurveTo(cmd.x1, -cmd.y1, cmd.x2, -cmd.y2, cmd.x, -cmd.y)
        break
      case 'Q':
        shapePath.quadraticCurveTo(cmd.x1, -cmd.y1, cmd.x, -cmd.y)
        break
      case 'Z':
        shapePath.currentPath?.closePath()
        break
    }
  }
  return shapePath
}

function shapesFromGlyph(font, char) {
  const path = font.getPath(char, 0, 0, FONT_SIZE)
  // OpenType は Y-up。反転後は時計回りが外形になる
  const shapes = pathToShapePath(path).toShapes(false)
  enlargeHoles(shapes)
  return shapes
}

function enlargeHoles(shapes) {
  const target = 24
  const maxScale = 1.85
  for (const shape of shapes) {
    for (const hole of shape.holes) {
      const pts = hole.getPoints()
      if (pts.length < 3)
        continue
      let minX = Infinity
      let minY = Infinity
      let maxX = -Infinity
      let maxY = -Infinity
      let cx = 0
      let cy = 0
      for (const p of pts) {
        cx += p.x
        cy += p.y
        minX = Math.min(minX, p.x)
        minY = Math.min(minY, p.y)
        maxX = Math.max(maxX, p.x)
        maxY = Math.max(maxY, p.y)
      }
      cx /= pts.length
      cy /= pts.length
      const minDim = Math.min(maxX - minX, maxY - minY)
      const floor = minDim > 14 ? 1.62 : 1.28
      const scale = Math.min(maxScale, Math.max(floor, target / minDim))
      const origin = new THREE.Vector2(cx, cy)
      for (const curve of hole.curves) {
        for (const key of Object.keys(curve)) {
          const v = curve[key]
          if (v && v.isVector2)
            v.sub(origin).multiplyScalar(scale).add(origin)
        }
      }
    }
  }
}

function meshFromGlyph(font, char, material) {
  const shapes = shapesFromGlyph(font, char)
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 11,
    bevelEnabled: true,
    bevelThickness: 2.6,
    bevelSize: 1.1,
    bevelSegments: 3,
    curveSegments: 10,
  })
  geometry.center()
  return new THREE.Mesh(geometry, material)
}

function layoutPair(left, right, gap = 18) {
  left.geometry.computeBoundingBox()
  right.geometry.computeBoundingBox()
  const leftWidth = left.geometry.boundingBox.max.x - left.geometry.boundingBox.min.x
  const rightWidth = right.geometry.boundingBox.max.x - right.geometry.boundingBox.min.x
  left.position.x = -(leftWidth / 2 + gap / 2)
  right.position.x = rightWidth / 2 + gap / 2
}

function fitGroup(group, target = 3.35) {
  const box = new THREE.Box3().setFromObject(group)
  const size = box.getSize(new THREE.Vector3())
  group.scale.setScalar(target / Math.max(size.x, size.y))
  const centered = new THREE.Box3().setFromObject(group)
  const center = centered.getCenter(new THREE.Vector3())
  group.position.sub(center)
}

async function loadFont() {
  const response = await fetch(FONT_URL)
  const buffer = await response.arrayBuffer()
  return parse(buffer)
}

async function paint(el) {
  const width = el.clientWidth
  const height = el.clientHeight
  if (!width || !height)
    return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 40)
  camera.position.set(0, 0.08, 7.2)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height, false)
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  el.appendChild(renderer.domElement)

  const blue = new THREE.MeshPhysicalMaterial({
    color: 0x0064ca,
    roughness: 0.38,
    metalness: 0.04,
    clearcoat: 0.42,
    clearcoatRoughness: 0.28,
  })
  const black = new THREE.MeshPhysicalMaterial({
    color: 0x001319,
    roughness: 0.36,
    metalness: 0.08,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
  })

  const font = await loadFont()
  const hiragana = meshFromGlyph(font, 'あ', blue)
  const latin = meshFromGlyph(font, 'A', black)
  layoutPair(hiragana, latin)

  const letters = new THREE.Group()
  letters.add(hiragana, latin)
  fitGroup(letters)
  letters.rotation.set(-0.05, 0.08, -0.02)
  scene.add(letters)

  scene.add(new THREE.AmbientLight(0xffffff, 0.88))
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8c0c8, 0.62))

  const key = new THREE.DirectionalLight(0xffffff, 1.15)
  key.position.set(-3.2, 4.2, 3.6)
  scene.add(key)

  const front = new THREE.DirectionalLight(0xffffff, 0.55)
  front.position.set(0.2, 0.4, 6)
  scene.add(front)

  const fill = new THREE.DirectionalLight(0x0064ca, 0.22)
  fill.position.set(3.4, -1.2, 2.2)
  scene.add(fill)

  const rim = new THREE.DirectionalLight(0xd7e4f2, 0.38)
  rim.position.set(0.4, 1.4, -3.2)
  scene.add(rim)

  const clock = new THREE.Clock()
  const tick = () => {
    frame = requestAnimationFrame(tick)
    const t = clock.getElapsedTime()
    letters.rotation.y = 0.08 + Math.sin(t * 0.34) * 0.03
    letters.rotation.x = -0.05 + Math.sin(t * 0.26) * 0.02
    renderer.render(scene, camera)
  }
  tick()
  el.dataset.ready = 'true'
}

onMounted(() => {
  requestAnimationFrame(async () => {
    if (!root.value)
      return
    try {
      await paint(root.value)
    }
    catch (error) {
      console.error('[CoverGlyph] failed to build 3D glyphs', error)
    }
  })

  resizeObserver = new ResizeObserver(() => {
    if (!renderer || !camera || !root.value)
      return
    const width = root.value.clientWidth
    const height = root.value.clientHeight
    if (!width || !height)
      return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  })
  if (root.value)
    resizeObserver.observe(root.value)
})

onUnmounted(() => {
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
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
</style>
