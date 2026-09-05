<script setup>
import { ref } from 'vue'

const palettes = [
  { id: 'base', label: 'default' },
  { id: 'brand', label: 'brand' },
  { id: 'night', label: 'night' },
]

const current = ref('brand')
</script>

<template>
  <div class="pal">
    <p class="pal-sample" :class="current">FONT</p>
    <div class="pal-btns">
      <button
        v-for="p in palettes"
        :key="p.id"
        type="button"
        :class="{ on: current === p.id }"
        @click="current = p.id"
      >
        {{ p.label }}
      </button>
    </div>
    <p class="pal-caption">Nabla（COLRv1）— <code>font-palette</code> と <code>@font-palette-values</code></p>
  </div>
</template>

<style scoped>
@font-palette-values --brand {
  font-family: Nabla;
  override-colors:
    0 #fdc400,
    1 #0064ca,
    2 #001319;
}

@font-palette-values --night {
  font-family: Nabla;
  override-colors:
    0 #e6eef2,
    1 #0064ca,
    2 #001319;
}

.pal-sample {
  font-family: Nabla, 'LINE Seed JP', sans-serif;
  font-size: 108px;
  line-height: 1;
  margin: 8px 0 24px;
  letter-spacing: 0.04em;
}

.pal-sample.brand {
  font-palette: --brand;
}

.pal-sample.night {
  font-palette: --night;
}

.pal-btns {
  display: flex;
  gap: 10px;
}

.pal-btns button {
  background: transparent;
  color: #e6eef2;
  border: 1px solid rgba(230, 238, 242, 0.22);
  border-radius: 999px;
  padding: 6px 16px;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.pal-btns button.on {
  background: #0064ca;
  border-color: #0064ca;
  color: #e6eef2;
}

.pal-caption {
  margin: 18px 0 0;
  font-size: 14px;
  color: rgba(230, 238, 242, 0.58);
}

.pal-caption code {
  font-size: 13px;
}
</style>
