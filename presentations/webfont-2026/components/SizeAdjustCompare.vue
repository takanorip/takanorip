<script setup>
const sample = 'ウェブフォント2026'
</script>

<template>
  <div class="cmp">
    <div class="col">
      <p class="label">size-adjust なし</p>
      <div class="stage">
        <span class="fallback">{{ sample }}</span>
        <span class="web">{{ sample }}</span>
      </div>
      <p class="cap">メトリクス差がそのままズレになる</p>
    </div>
    <div class="col">
      <p class="label">size-adjust: 92%</p>
      <div class="stage">
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
  gap: 28px;
  margin-top: 12px;
}

.label {
  font-size: 14px;
  font-weight: 700;
  color: #fdc400;
  margin: 0 0 12px;
}

.stage {
  position: relative;
  height: 88px;
  background: rgba(230, 238, 242, 0.04);
  border: 1px solid rgba(230, 238, 242, 0.12);
  border-radius: 8px;
  overflow: hidden;
}

.stage span {
  position: absolute;
  left: 20px;
  top: 22px;
  font-size: 36px;
  line-height: 1.2;
  white-space: nowrap;
}

.fallback {
  font-family: Georgia, 'Times New Roman', serif;
  color: rgba(253, 196, 0, 0.55);
}

.web {
  font-family: 'LINE Seed JP', sans-serif;
  font-weight: 800;
  color: #e6eef2;
}

.web.adjusted {
  font-size: calc(36px * 0.92);
}

.cap {
  margin: 12px 0 0;
  font-size: 14px;
  color: rgba(230, 238, 242, 0.58);
}
</style>
