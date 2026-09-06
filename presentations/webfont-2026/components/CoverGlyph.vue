<template>
  <div class="stage" aria-hidden="true">
    <svg class="mark" viewBox="0 0 420 340" fill="none">
      <defs>
        <linearGradient id="ja-body" x1="40" y1="20" x2="200" y2="300">
          <stop offset="0%" stop-color="#c5e4ff" />
          <stop offset="28%" stop-color="#4ea6f5" />
          <stop offset="62%" stop-color="#0064ca" />
          <stop offset="100%" stop-color="#00325f" />
        </linearGradient>
        <linearGradient id="en-body" x1="230" y1="40" x2="400" y2="300">
          <stop offset="0%" stop-color="#fff4b0" />
          <stop offset="28%" stop-color="#ffd84a" />
          <stop offset="62%" stop-color="#fdc400" />
          <stop offset="100%" stop-color="#8a5d00" />
        </linearGradient>
        <radialGradient id="ja-shine" cx="32%" cy="22%" r="38%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.9" />
          <stop offset="42%" stop-color="#fff" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="en-shine" cx="34%" cy="20%" r="36%">
          <stop offset="0%" stop-color="#fff" stop-opacity="0.95" />
          <stop offset="40%" stop-color="#fff" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="10" dy="18" stdDeviation="10" flood-color="#001319" flood-opacity="0.18" />
        </filter>
      </defs>

      <g filter="url(#soft)" class="tilt">
        <g class="ja">
          <path
            class="tube"
            d="M36 78 C72 52 168 52 204 78"
            stroke="url(#ja-body)"
          />
          <path
            class="tube"
            d="M78 72 C58 128 70 188 108 232 C132 256 126 210 112 188"
            stroke="url(#ja-body)"
          />
          <path
            class="tube"
            d="M86 118 C150 108 198 128 204 198 C206 236 176 252 154 228"
            stroke="url(#ja-body)"
          />
          <ellipse cx="78" cy="86" rx="34" ry="22" fill="url(#ja-shine)" transform="rotate(-18 78 86)" />
        </g>

        <g class="en">
          <path
            class="tube"
            d="M262 236 L312 72 L362 236"
            stroke="url(#en-body)"
          />
          <path
            class="tube bar"
            d="M286 168 H338"
            stroke="url(#en-body)"
          />
          <ellipse cx="308" cy="96" rx="28" ry="18" fill="url(#en-shine)" transform="rotate(-16 308 96)" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.stage {
  width: 430px;
  height: 340px;
  flex-shrink: 0;
  margin-right: -16px;
}

.mark {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.tilt {
  transform-box: fill-box;
  transform-origin: center;
  transform: perspective(700px) rotateX(14deg) rotateY(-18deg);
}

.tube {
  fill: none;
  stroke-width: 54;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.bar {
  stroke-width: 46;
}
</style>
