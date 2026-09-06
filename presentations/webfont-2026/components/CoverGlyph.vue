<script setup>
const layers = 16
</script>

<template>
  <div class="stage" aria-hidden="true">
    <div class="cluster">
      <span
        v-for="i in layers"
        :key="`ja-${i}`"
        class="g ja"
        :class="{ front: i === 1 }"
        :style="{ '--i': i - 1 }"
      >あ</span>
      <span
        v-for="i in layers"
        :key="`en-${i}`"
        class="g en"
        :class="{ front: i === 1 }"
        :style="{ '--i': i - 1 }"
      >A</span>
    </div>
  </div>
</template>

<style scoped>
.stage {
  width: 400px;
  height: 360px;
  perspective: 1100px;
  flex-shrink: 0;
}

.cluster {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotateX(18deg) rotateY(-34deg);
  transform-style: preserve-3d;
}

.g {
  position: absolute;
  font-family: 'LINE Seed JP', sans-serif;
  font-weight: 800;
  line-height: 100%;
  transform: translateZ(calc(var(--i) * -5px));
  user-select: none;
  pointer-events: none;
}

.ja {
  left: 8px;
  top: 48px;
  font-size: 220px;
  color: #00356c;
}

.ja.front {
  color: #0064ca;
}

.en {
  left: 168px;
  top: 92px;
  font-size: 168px;
  color: #c29400;
}

.en.front {
  color: #fdc400;
}
</style>
