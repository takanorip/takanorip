<script setup>
import { ref } from 'vue'

const wght = ref(400)
const opsz = ref(48)
</script>

<template>
  <div class="vf figure">
    <p class="vf-jp" :style="{ fontWeight: wght }">今さら理解するウェブフォント</p>
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
  </div>
  <p class="note">上: Noto Sans JP Variable（wght） / 下: Roboto Flex（wght + opsz）</p>
</template>

<style scoped>
.vf {
  margin-top: 64px;
}

.vf-jp {
  font-family: 'Noto Sans JP', 'LINE Seed JP', sans-serif;
  font-size: 40px;
  line-height: 140%;
  margin: 0;
  color: #000;
}

.vf-en {
  font-family: 'Roboto Flex', sans-serif;
  font-optical-sizing: none;
  font-size: 34px;
  line-height: 130%;
  margin: 0 0 22px;
  color: #000;
}

.vf-controls {
  display: grid;
  gap: 12px;
  max-width: 30em;
}

.vf-controls label {
  display: grid;
  grid-template-columns: 118px 1fr;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #000;
}

.vf-controls input {
  width: 100%;
  accent-color: #000;
}
</style>
