<script setup>
import { ref } from 'vue'

const wght = ref(400)
const opsz = ref(48)
</script>

<template>
  <div class="vf">
    <p
      class="vf-jp"
      :style="{ fontWeight: wght }"
    >
      今さら理解するウェブフォント
    </p>
    <p
      class="vf-en"
      :style="{ fontVariationSettings: `'wght' ${wght}, 'opsz' ${opsz}` }"
    >
      Optical size is a real axis
    </p>
    <div class="vf-controls">
      <label>
        <span>wght {{ wght }}</span>
        <input v-model.number="wght" type="range" min="100" max="900" step="10" />
      </label>
      <label>
        <span>opsz {{ opsz }}</span>
        <input v-model.number="opsz" type="range" min="8" max="144" step="1" />
      </label>
    </div>
    <p class="vf-caption">上: Noto Sans JP Variable（wght） / 下: Roboto Flex（wght + opsz）</p>
  </div>
</template>

<style scoped>
.vf {
  margin-top: 4px;
}

.vf-jp {
  font-family: 'Noto Sans JP', 'LINE Seed JP', sans-serif;
  font-size: 44px;
  line-height: 1.25;
  letter-spacing: -0.04em;
  margin: 0 0 4px;
}

.vf-en {
  font-family: 'Roboto Flex', sans-serif;
  font-optical-sizing: none;
  font-size: 40px;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin: 0 0 22px;
  color: #fdc400;
}

.vf-controls {
  display: grid;
  gap: 12px;
}

.vf-controls label {
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  font-weight: 700;
  color: #fdc400;
}

.vf-controls input {
  width: 100%;
  accent-color: #0064ca;
}

.vf-caption {
  margin: 16px 0 0;
  font-size: 14px;
  color: rgba(230, 238, 242, 0.58);
}
</style>
