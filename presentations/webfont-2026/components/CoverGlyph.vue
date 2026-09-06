<script setup>
const layers = 26
</script>

<template>
  <div class="stage" aria-hidden="true">
    <div class="cluster">
      <span
        v-for="i in layers"
        :key="`ja-${i}`"
        class="g ja"
        :style="{ '--i': i - 1, '--t': (i - 1) / (layers - 1) }"
      >あ</span>
      <span class="g ja face">あ</span>
      <span class="g ja shine">あ</span>

      <span
        v-for="i in layers"
        :key="`en-${i}`"
        class="g en"
        :style="{ '--i': i - 1, '--t': (i - 1) / (layers - 1) }"
      >A</span>
      <span class="g en face">A</span>
      <span class="g en shine">A</span>
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
  -webkit-text-stroke: 34px currentColor;
  paint-order: stroke fill;
  user-select: none;
  pointer-events: none;
}

.ja,
.en {
  transform:
    translateZ(calc(var(--i) * -5px))
    scale(calc(1.18 - var(--t) * 0.16));
  filter: drop-shadow(0 0 10px currentColor);
}

.ja {
  left: 0;
  top: 24px;
  font-size: 250px;
  color: color-mix(in srgb, #0064ca 100%, #001018 calc(var(--t) * 70%));
}

.en {
  left: 178px;
  top: 72px;
  font-size: 190px;
  color: color-mix(in srgb, #fdc400 100%, #5c3a00 calc(var(--t) * 70%));
}

.face {
  -webkit-text-stroke: 34px transparent;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: none;
  transform: translateZ(4px) scale(1.18);
}

.ja.face {
  background-image: linear-gradient(
    152deg,
    #e7f3ff 0%,
    #7ec2ff 22%,
    #1a86ee 48%,
    #0064ca 72%,
    #003d7a 100%
  );
}

.en.face {
  background-image: linear-gradient(
    152deg,
    #fff6c4 0%,
    #ffe56a 22%,
    #fdc400 50%,
    #e0a800 74%,
    #9a6f00 100%
  );
}

.shine {
  -webkit-text-stroke: 0;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  filter: none;
  mix-blend-mode: screen;
  transform: translateZ(8px) scale(1.18);
}

.ja.shine {
  background-image: linear-gradient(
    132deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.35) 18%,
    transparent 36%
  );
}

.en.shine {
  background-image: linear-gradient(
    132deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.4) 16%,
    transparent 34%
  );
}
</style>
