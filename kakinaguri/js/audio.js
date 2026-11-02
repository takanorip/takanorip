/* Paper sounds, synthesized. Nothing is fetched. */
const PaperAudio = (() => {
  let ctx = null;
  let master = null;
  let lastScratch = 0;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.4;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function noise(duration) {
    const ac = ensure();
    if (!ac) return null;
    const frames = Math.max(1, Math.floor(ac.sampleRate * duration));
    const buffer = ac.createBuffer(1, frames, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function play(buffer, freq, q, gain, duration, sweepTo) {
    const ac = ensure();
    if (!ac || !buffer) return;
    const src = ac.createBufferSource();
    src.buffer = buffer;
    const filter = ac.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = q;
    const amp = ac.createGain();
    const now = ac.currentTime;
    filter.frequency.setValueAtTime(Math.max(40, freq), now);
    if (sweepTo) {
      filter.frequency.exponentialRampToValueAtTime(Math.max(40, sweepTo), now + duration);
    }
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), now + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    src.connect(filter);
    filter.connect(amp);
    amp.connect(master);
    src.start(now);
    src.stop(now + duration + 0.02);
  }

  return {
    unlock() {
      ensure();
    },
    scratch() {
      const now = performance.now();
      if (now - lastScratch < 80) return;
      lastScratch = now;
      play(noise(0.035), 3000, 0.7, 0.03, 0.035);
    },
    ripTick() {
      const dur = 0.055;
      play(noise(dur), 1600 + Math.random() * 900, 1.05, 0.07, dur);
    },
    rip() {
      const dur = 0.5;
      play(noise(dur), 2100, 0.5, 0.18, dur, 380);
    },
    crumple() {
      const dur = 0.05 + Math.random() * 0.045;
      play(noise(dur), 650 + Math.random() * 1700, 0.65, 0.11, dur);
    },
    crumpleBurst() {
      for (let i = 0; i < 7; i++) setTimeout(() => this.crumple(), i * 42);
    },
    settle() {
      play(noise(0.08), 460, 0.55, 0.035, 0.08);
    },
  };
})();
