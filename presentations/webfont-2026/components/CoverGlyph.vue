<template>
  <div class="stage" aria-hidden="true">
    <svg class="mark" viewBox="0 0 460 380" fill="none">
      <defs>
        <path
          id="ja-form"
          d="M42 92 C92 48 188 48 238 96
             M78 86 C52 150 64 228 118 286
             M92 142 C168 118 236 148 246 228 C250 276 206 298 176 262"
        />
        <path
          id="en-form"
          d="M268 292 L332 64 L396 292
             M298 196 H366"
        />

        <filter id="grain" x="-10%" y="-10%" width="120%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0.18 0" result="g" />
          <feBlend in="SourceGraphic" in2="g" mode="multiply" />
        </filter>
      </defs>

      <g class="pile" filter="url(#grain)">
        <g class="letter ja">
          <use href="#ja-form" class="tube deep" />
          <use href="#ja-form" class="tube body" />
          <use href="#ja-form" class="tube mid" />
          <use href="#ja-form" class="tube hi" />
        </g>
        <g class="letter en">
          <use href="#en-form" class="tube deep" />
          <use href="#en-form" class="tube body" />
          <use href="#en-form" class="tube mid" />
          <use href="#en-form" class="tube hi" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.stage {
  width: 460px;
  height: 360px;
  flex-shrink: 0;
  margin-right: -24px;
}

.mark {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.pile {
  transform-box: fill-box;
  transform-origin: center;
  transform: rotate(-8deg);
}

.tube {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.ja .deep,
.en .deep {
  stroke-width: 86;
}

.ja .body,
.en .body {
  stroke-width: 78;
}

.ja .mid,
.en .mid {
  stroke-width: 46;
}

.ja .hi,
.en .hi {
  stroke-width: 18;
}

.ja .deep { stroke: #00325f; }
.ja .body { stroke: #0064ca; transform: translate(-3px, -5px); }
.ja .mid { stroke: #7ec4ff; transform: translate(-8px, -11px); }
.ja .hi { stroke: #f3f9ff; transform: translate(-12px, -16px); }

.en .deep { stroke: #7a5200; }
.en .body { stroke: #fdc400; transform: translate(-3px, -5px); }
.en .mid { stroke: #ffe56a; transform: translate(-8px, -11px); }
.en .hi { stroke: #fffceb; transform: translate(-12px, -16px); }
</style>
