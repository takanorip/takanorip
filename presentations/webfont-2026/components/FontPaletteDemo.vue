<script setup>
import { ref } from 'vue'

const palettes = [
  { id: 'base', label: 'default' },
  { id: 'brand', label: 'brand' },
  { id: 'ink', label: 'ink' },
]

const current = ref('brand')
</script>

<template>
  <div class="pal figure">
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
  </div>
  <p class="note">Nabla（COLRv1）— <code>font-palette</code> と <code>@font-palette-values</code></p>
</template>

<style scoped>
@font-palette-values --brand {
  font-family: Nabla;
  override-colors:
    0 #fdc400,
    1 #0064ca,
    2 #001319;
}

@font-palette-values --ink {
  font-family: Nabla;
  override-colors:
    0 #001319,
    1 #0064ca,
    2 #7d8f96;
}

.pal-sample {
  font-family: Nabla, 'LINE Seed JP', sans-serif;
  font-size: 92px;
  line-height: 1.1;
  margin: 0 0 20px;
  letter-spacing: 0.04em;
}

.pal-sample.brand {
  font-palette: --brand;
}

.pal-sample.ink {
  font-palette: --ink;
}

.pal-btns {
  display: flex;
  gap: 8px;
}

.pal-btns button {
  background: #fff;
  color: #4a5f67;
  border: 1px solid #dfe4e6;
  border-radius: 999px;
  padding: 7px 18px;
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
  cursor: pointer;
}

.pal-btns button.on {
  background: #0064ca;
  border-color: #0064ca;
  color: #fff;
}
</style>
