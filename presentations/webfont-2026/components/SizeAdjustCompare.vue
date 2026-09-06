<script setup>
const sample = 'ウェブフォント2026'
</script>

<template>
  <div class="cmp">
    <div class="col">
      <p class="label">size-adjust なし</p>
      <div class="stage figure">
        <span class="fallback">{{ sample }}</span>
        <span class="web">{{ sample }}</span>
      </div>
      <p class="cap">メトリクス差がそのままズレになる</p>
    </div>
    <div class="col">
      <p class="label">size-adjust: 92%</p>
      <div class="stage figure">
        <span class="fallback">{{ sample }}</span>
        <span class="web adjusted">{{ sample }}</span>
      </div>
      <p class="cap">フォールバックに幅を寄せて CLS を抑える</p>
    </div>
  </div>
</template>

<style scoped>
.cmp {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 26px;
  margin-top: 4px;
}

.label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #000;
  margin: 0 0 12px;
}

.stage {
  position: relative;
  height: 92px;
  padding: 0;
  overflow: hidden;
}

.stage span {
  position: absolute;
  left: 22px;
  top: 26px;
  font-size: 32px;
  line-height: 120%;
  white-space: nowrap;
}

.fallback {
  font-family: Georgia, 'Times New Roman', serif;
  color: rgba(253, 196, 0, 0.95);
}

.web {
  font-family: 'LINE Seed JP', sans-serif;
  font-weight: 800;
  color: #000;
}

.web.adjusted {
  font-size: calc(32px * 0.92);
}

.cap {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 170%;
  color: #000;
}
</style>
