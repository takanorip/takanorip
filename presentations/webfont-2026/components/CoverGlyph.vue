<script setup>
const layers = 22
</script>

<template>
  <div class="stage" aria-hidden="true">
    <div class="cluster">
      <span
        v-for="i in layers"
        :key="`ja-${i}`"
        class="g ja"
        :class="{ front: i === 1 }"
        :style="{ '--i': i - 1, '--t': (i - 1) / (layers - 1) }"
      >あ</span>
      <span
        v-for="i in layers"
        :key="`en-${i}`"
        class="g en"
        :class="{ front: i === 1 }"
        :style="{ '--i': i - 1, '--t': (i - 1) / (layers - 1) }"
      >A</span>
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
  transform: rotateX(16deg) rotateY(-30deg);
  transform-style: preserve-3d;
}

.g {
  position: absolute;
  font-family: 'LINE Seed JP', sans-serif;
  font-weight: 800;
  line-height: 100%;
  -webkit-text-stroke: 22px currentColor;
  paint-order: stroke fill;
  filter: drop-shadow(0 0 6px currentColor);
  transform:
    translateZ(calc(var(--i) * -4px))
    scale(calc(1.08 - var(--t) * 0.08));
  user-select: none;
  pointer-events: none;
}

.ja {
  left: 0;
  top: 24px;
  font-size: 250px;
  color: color-mix(in srgb, #0064ca 100%, #001319 calc(var(--t) * 55%));
}

.ja.front {
  color: #2d8ef0;
  text-shadow: 10px 14px 0 rgba(255, 255, 255, 0.22);
  filter: drop-shadow(0 0 8px rgba(0, 100, 202, 0.35));
}

.en {
  left: 178px;
  top: 72px;
  font-size: 190px;
  color: color-mix(in srgb, #fdc400 100%, #7a5200 calc(var(--t) * 55%));
}

.en.front {
  color: #ffe06a;
  text-shadow: 10px 14px 0 rgba(255, 255, 255, 0.28);
  filter: drop-shadow(0 0 8px rgba(253, 196, 0, 0.4));
}
</style>
