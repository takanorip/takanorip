<script setup>
const layers = 16
</script>

<template>
  <div class="stage" aria-hidden="true">
    <div class="cluster">
      <div class="block ja">
        <i
          v-for="i in layers"
          :key="`ja-${i}`"
          class="slab"
          :class="{ front: i === 1 }"
          :style="{ '--i': i - 1 }"
        />
        <span class="glyph">あ</span>
      </div>
      <div class="block en">
        <i
          v-for="i in layers"
          :key="`en-${i}`"
          class="slab"
          :class="{ front: i === 1 }"
          :style="{ '--i': i - 1 }"
        />
        <span class="glyph">A</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stage {
  width: 430px;
  height: 340px;
  perspective: 1200px;
  flex-shrink: 0;
  margin-right: -16px;
}

.cluster {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotateX(18deg) rotateY(-34deg);
  transform-style: preserve-3d;
}

.block {
  position: absolute;
  transform-style: preserve-3d;
}

.block.ja {
  left: 8px;
  top: 28px;
  width: 236px;
  height: 248px;
}

.block.en {
  left: 196px;
  top: 72px;
  width: 188px;
  height: 200px;
}

.slab {
  position: absolute;
  inset: 0;
  border-radius: 36px;
  transform: translateZ(calc(var(--i) * -6px));
}

.ja .slab {
  background: #00356c;
}

.ja .slab.front {
  background: #0064ca;
}

.en .slab {
  background: #c29400;
}

.en .slab.front {
  background: #fdc400;
}

.glyph {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'LINE Seed JP', sans-serif;
  font-weight: 800;
  line-height: 100%;
  color: #fff;
  transform: translateZ(2px);
  user-select: none;
  pointer-events: none;
}

.ja .glyph {
  font-size: 168px;
}

.en .glyph {
  font-size: 140px;
  color: #001319;
}
</style>
