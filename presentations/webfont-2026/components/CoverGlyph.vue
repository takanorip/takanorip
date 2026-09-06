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
  width: 560px;
  height: 500px;
  perspective: 1200px;
  flex-shrink: 0;
  margin-right: -40px;
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
  transform: translateZ(calc(var(--i) * -6px));
  user-select: none;
  pointer-events: none;
}

.ja {
  left: 0;
  top: 28px;
  font-size: 310px;
  color: #00356c;
}

.ja.front {
  color: #0064ca;
}

.en {
  left: 220px;
  top: 88px;
  font-size: 236px;
  color: #c29400;
}

.en.front {
  color: #fdc400;
}
</style>
