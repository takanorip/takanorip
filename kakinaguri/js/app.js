/* 書き殴り
   紙に書いて、破くか、丸める。
   文字はこのタブのメモリにだけあり、送信も保存もしない。
*/
(() => {
  "use strict";

  const PAPER = "#f4efe6";
  const INK = "#1b212b";
  const PENCIL = "#7a6f61";
  const BACK = "#e5ddd0";
  const HAND = '"Zen Kurenaido", "Yu Kyokasho", "Yu Mincho", "Hiragino Mincho ProN", serif';
  const MESH_COLS = 8;
  const MESH_ROWS = 11;
  const CHAR_CAP = 4000;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const world = document.getElementById("world");
  const canvas = document.getElementById("sheet");
  const ctx = canvas.getContext("2d");
  const ink = document.getElementById("ink");
  const tearBtn = document.getElementById("tear");
  const crumpleBtn = document.getElementById("crumple");
  const after = document.getElementById("after");
  const againBtn = document.getElementById("again");
  const live = document.getElementById("live");

  let vw = 800;
  let vh = 600;
  let dpr = 1;
  let paperW = 400;
  let paperH = 540;
  let fontSize = 22;
  let lineHeight = 33;
  let marginX = 44;
  let marginY = 48;

  let paperLayer = null;
  let pctx = null;
  let grain = null;
  let mesh = null;
  const widthCache = new Map();

  let chars = [];
  let strokes = [];
  let history = [];
  let compText = "";
  let composing = false;
  let skipInput = "";

  let sheet = "boot";
  let arrival = 0;
  let sheetAlpha = 1;
  let caretOn = true;
  let caret = { x: 48, y: 70, size: 22 };

  let tearPts = [];
  let pullX = 0;
  let pullY = 0;
  let tearOpen = 0;
  let crumpleT = 0;
  let pieces = [];
  let fallAge = 0;
  let balls = [];
  let gesture = null;
  let anim = null;
  let hotEar = null;
  let paperDirty = true;
  let rafId = 0;
  let lastNow = 0;
  let ripMark = 0;

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }
  function easeOut(u) {
    return 1 - (1 - u) ** 3;
  }
  function easeInOut(u) {
    return u < 0.5 ? 4 * u * u * u : 1 - (-2 * u + 2) ** 3 / 2;
  }
  function smooth(u) {
    const t = clamp(u, 0, 1);
    return t * t * (3 - 2 * t);
  }

  function safeBands() {
    const narrow = vw < 640;
    return {
      top: narrow ? 92 : 64,
      bottom: narrow ? 132 : 100,
      side: 36,
    };
  }

  function computePaperSize() {
    const band = safeBands();
    const maxH = Math.max(260, Math.min(vh - band.top - band.bottom, 740));
    const maxW = Math.max(220, Math.min(vw - band.side - 36, 460));
    let h = maxH;
    let w = h / 1.36;
    if (w > maxW) {
      w = maxW;
      h = w * 1.36;
    }
    return { w: Math.round(w), h: Math.round(h) };
  }

  function origin() {
    const band = safeBands();
    let y = Math.round((vh - paperH) / 2 + 4);
    if (y < band.top) y = band.top;
    const maxY = vh - band.bottom - paperH;
    if (maxY >= band.top && y > maxY) y = maxY;
    return { x: Math.round((vw - paperW) / 2), y };
  }

  function eventPoint(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function insidePaper(p) {
    const o = origin();
    return p.x >= o.x && p.x <= o.x + paperW && p.y >= o.y && p.y <= o.y + paperH;
  }

  function toPaper(e) {
    const p = eventPoint(e);
    const o = origin();
    return { x: p.x - o.x, y: p.y - o.y };
  }

  function pilePos(i) {
    if (vw < 720) return { x: vw - 26, y: 86 + i * 26 };
    const col = i % 3;
    const row = Math.floor(i / 3);
    return { x: vw - 48 - col * 30, y: vh - 46 - row * 16 };
  }

  function layoutViewport() {
    const vv = window.visualViewport;
    vw = Math.round(vv ? vv.width : window.innerWidth);
    vh = Math.round(vv ? vv.height : window.innerHeight);
    const ox = vv ? vv.offsetLeft : 0;
    const oy = vv ? vv.offsetTop : 0;
    world.style.width = vw + "px";
    world.style.height = vh + "px";
    world.style.transform = `translate(${ox}px, ${oy}px)`;

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(vw * dpr));
    canvas.height = Math.max(1, Math.round(vh * dpr));
    canvas.style.width = vw + "px";
    canvas.style.height = vh + "px";

    const size = computePaperSize();
    const changed = size.w !== paperW || size.h !== paperH;
    paperW = size.w;
    paperH = size.h;
    fontSize = Math.max(17, Math.round(paperW * 0.048));
    lineHeight = Math.round(fontSize * 1.5);
    marginX = Math.round(paperW * 0.11);
    marginY = Math.round(paperH * 0.09);
    ink.style.fontSize = fontSize + "px";

    if (!paperLayer || changed || paperLayer.width !== Math.round(paperW * dpr)) {
      allocPaper();
      layoutText();
      paperDirty = true;
    }
    balls.forEach((b, i) => {
      const p = pilePos(i);
      b.tx = p.x;
      b.ty = p.y;
      if (b.mode === "free" && !b.held && Math.hypot(b.vx, b.vy) < 8) {
        b.x = p.x;
        b.y = p.y;
      }
    });
    placeEars();
    requestDraw();
  }

  function allocPaper() {
    paperLayer = document.createElement("canvas");
    paperLayer.width = Math.max(1, Math.round(paperW * dpr));
    paperLayer.height = Math.max(1, Math.round(paperH * dpr));
    pctx = paperLayer.getContext("2d");
    widthCache.clear();
    makeGrain();
    buildMesh();
  }

  function makeGrain() {
    grain = document.createElement("canvas");
    grain.width = paperLayer.width;
    grain.height = paperLayer.height;
    const g = grain.getContext("2d");
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(paperW * paperH * 0.016);
    for (let i = 0; i < count; i++) {
      const x = Math.random() * paperW;
      const y = Math.random() * paperH;
      const len = 1.4 + Math.random() * 5.5;
      const a = (Math.random() - 0.5) * 0.7;
      g.strokeStyle = Math.random() < 0.6 ? "rgba(112, 86, 54, 0.05)" : "rgba(255,255,255,0.17)";
      g.lineWidth = 0.7;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
      g.stroke();
    }
  }

  function buildMesh() {
    const rest = [];
    const crush = [];
    const cx = paperW / 2;
    const cy = paperH * 0.52;
    const radius = Math.min(paperW, paperH) * 0.15;
    for (let j = 0; j <= MESH_ROWS; j++) {
      for (let i = 0; i <= MESH_COLS; i++) {
        const x = (paperW / MESH_COLS) * i;
        const y = (paperH / MESH_ROWS) * j;
        rest.push({ x, y });
        const u = i / MESH_COLS - 0.5;
        const v = j / MESH_ROWS - 0.5;
        const ang = Math.atan2(v, u) + u * 2.6;
        const dist = Math.hypot(u, v);
        const r = radius * (0.28 + Math.pow(dist * 1.4, 0.7));
        const jitter = ((i * 17 + j * 9) % 7) - 3;
        crush.push({
          x: cx + Math.cos(ang) * r + jitter,
          y: cy + Math.sin(ang) * r * 0.9 + jitter * 0.35,
        });
      }
    }
    mesh = { rest, crush };
  }

  function measure(ch, size) {
    const key = size + "\n" + ch;
    const cached = widthCache.get(key);
    if (cached != null) return cached;
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pctx.font = `${size}px ${HAND}`;
    const w = pctx.measureText(ch).width || size;
    widthCache.set(key, w);
    return w;
  }

  function measureString(str, size) {
    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pctx.font = `${size}px ${HAND}`;
    return pctx.measureText(str).width;
  }

  function layoutText() {
    const size = fontSize;
    let x = marginX;
    let y = marginY + size;
    let overflow = false;
    for (const c of chars) {
      if (c.ch === "\n") {
        c.x = x;
        c.y = y;
        c.size = size;
        c.rot = 0;
        x = marginX;
        y += lineHeight;
        if (y > paperH - marginY) overflow = true;
        continue;
      }
      if (!overflow && x > marginX && x + measure(c.ch, size) > paperW - marginX) {
        x = marginX;
        y += lineHeight;
        if (y > paperH - marginY) overflow = true;
      }
      if (overflow) {
        const j = c.seed;
        c.size = size * (0.7 + j * 0.4);
        c.x = marginX + j * (paperW - marginX * 2 - c.size);
        c.y = paperH * 0.58 + ((j * 13.7) % 1) * paperH * 0.32;
        c.rot = (j - 0.5) * 0.85;
      } else {
        c.size = size;
        c.x = x;
        c.y = y + (c.seed - 0.5) * 1.6;
        c.rot = (c.seed - 0.5) * 0.055;
        x += measure(c.ch, size) * (0.98 + c.seed * 0.05);
      }
    }
    if (overflow) {
      caret.x = paperW * 0.62;
      caret.y = paperH * 0.84;
    } else {
      caret.x = Math.min(x, paperW - marginX);
      caret.y = y;
    }
    caret.size = size;
  }

  function renderPaper() {
    if (!pctx) return;
    const g = pctx;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, paperW, paperH);
    g.fillStyle = PAPER;
    g.fillRect(0, 0, paperW, paperH);
    if (grain) g.drawImage(grain, 0, 0, paperW, paperH);
    g.strokeStyle = "rgba(88, 68, 46, 0.16)";
    g.lineWidth = 1;
    g.strokeRect(0.5, 0.5, paperW - 1, paperH - 1);

    g.lineCap = "round";
    g.lineJoin = "round";
    g.strokeStyle = INK;
    g.fillStyle = INK;
    for (const s of strokes) {
      const pts = s.points;
      if (!pts.length) continue;
      if (pts.length === 1) {
        g.beginPath();
        g.arc(pts[0].x, pts[0].y, pts[0].w / 2, 0, Math.PI * 2);
        g.fill();
        continue;
      }
      for (let i = 1; i < pts.length; i++) {
        g.beginPath();
        g.moveTo(pts[i - 1].x, pts[i - 1].y);
        g.lineTo(pts[i].x, pts[i].y);
        g.lineWidth = pts[i].w;
        g.stroke();
      }
    }

    g.textBaseline = "alphabetic";
    g.fillStyle = INK;
    for (const c of chars) {
      if (c.ch === "\n" || c.x == null) continue;
      g.save();
      g.translate(c.x, c.y);
      g.rotate(c.rot || 0);
      g.font = `${c.size}px ${HAND}`;
      g.fillText(c.ch, 0, 0);
      g.restore();
    }

    if (!chars.length && !strokes.length) {
      g.fillStyle = PENCIL;
      g.font = `${Math.max(18, fontSize)}px ${HAND}`;
      g.textBaseline = "alphabetic";
      g.fillText("思ってることを、ここに。", marginX, marginY + fontSize);
    }
    paperDirty = false;
  }

  function destroyTextModel() {
    chars = [];
    strokes = [];
    history = [];
    compText = "";
    composing = false;
    skipInput = "";
    ink.value = "";
  }

  function commitText(str) {
    if (sheet !== "live") return;
    let n = 0;
    for (const ch of Array.from(str)) {
      if (ch === "\r") continue;
      if (chars.length >= CHAR_CAP) break;
      chars.push({ ch, seed: Math.random() });
      history.push("char");
      n += 1;
    }
    if (!n) return;
    layoutText();
    paperDirty = true;
    PaperAudio.scratch();
    requestDraw();
  }

  function backspace() {
    if (!chars.length || sheet !== "live") return;
    chars.pop();
    const idx = history.lastIndexOf("char");
    if (idx >= 0) history.splice(idx, 1);
    layoutText();
    paperDirty = true;
    requestDraw();
  }

  function undo() {
    if (sheet !== "live") return;
    const h = history.pop();
    if (!h) return;
    if (h === "char") chars.pop();
    else if (h === "stroke") strokes.pop();
    layoutText();
    paperDirty = true;
    requestDraw();
  }

  function showEars() {
    tearBtn.hidden = false;
    crumpleBtn.hidden = false;
    tearBtn.style.opacity = "";
    crumpleBtn.style.opacity = "";
    crumpleBtn.style.transform = "";
    placeEars();
  }

  function hideEars() {
    tearBtn.hidden = true;
    crumpleBtn.hidden = true;
  }

  function tabGeom() {
    const o = origin();
    return {
      tear: { x: o.x + paperW - 12 + pullX, y: o.y + paperH * 0.4 + pullY, w: 44, h: 92 },
      crumple: { x: o.x + paperW * 0.5 - 54, y: o.y + paperH - 10, w: 108, h: 44 },
    };
  }

  function placeEars() {
    const g = tabGeom();
    if (!tearBtn.hidden) {
      tearBtn.style.left = `${g.tear.x}px`;
      tearBtn.style.top = `${g.tear.y}px`;
    }
    if (!crumpleBtn.hidden) {
      crumpleBtn.style.left = `${g.crumple.x}px`;
      crumpleBtn.style.top = `${g.crumple.y}px`;
    }
  }

  function drawTab(x, y, w, h, label, joined, hot) {
    ctx.save();
    ctx.fillStyle = PAPER;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "rgba(88, 68, 46, 0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (joined !== "left") {
      ctx.moveTo(x + 0.5, y);
      ctx.lineTo(x + 0.5, y + h);
    }
    if (joined !== "right") {
      ctx.moveTo(x + w - 0.5, y);
      ctx.lineTo(x + w - 0.5, y + h);
    }
    if (joined !== "top") {
      ctx.moveTo(x, y + 0.5);
      ctx.lineTo(x + w, y + 0.5);
    }
    if (joined !== "bottom") {
      ctx.moveTo(x, y + h - 0.5);
      ctx.lineTo(x + w, y + h - 0.5);
    }
    ctx.stroke();
    ctx.fillStyle = hot ? INK : "#4d4339";
    ctx.font = '500 13px "Shippori Mincho", "Yu Mincho", serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (h > w) {
      ctx.fillText(label[0], x + w / 2, y + h * 0.4);
      ctx.fillText(label[1], x + w / 2, y + h * 0.62);
    } else {
      ctx.fillText(label, x + w / 2, y + h / 2 + 0.5);
    }
    ctx.restore();
  }

  function drawRestingTabs() {
    const g = tabGeom();
    if (!crumpleBtn.hidden) drawTab(g.crumple.x, g.crumple.y, g.crumple.w, g.crumple.h, "丸める", "top", hotEar === "crumple");
    if (!tearBtn.hidden) drawTab(g.tear.x, g.tear.y, g.tear.w, g.tear.h, "破く", "left", hotEar === "tear");
  }

  function showAftermath() {
    after.hidden = false;
    live.textContent = "なくなった。";
  }

  function hideAftermath() {
    after.hidden = true;
  }

  function makeTear() {
    const pts = [];
    let x = paperW * (0.56 + Math.random() * 0.1);
    for (let y = 0; y <= paperH; y += 8) {
      x += (Math.random() - 0.48) * 15;
      x = clamp(x, paperW * 0.36, paperW * 0.8);
      pts.push({ x, y: Math.min(y, paperH) });
    }
    if (pts[pts.length - 1].y !== paperH) pts.push({ x, y: paperH });
    return pts;
  }

  function startTween(duration, onFrame, onEnd) {
    const t0 = performance.now();
    anim = {
      step(now) {
        const u = clamp((now - t0) / duration, 0, 1);
        onFrame(u);
        if (u >= 1) {
          onEnd();
          return false;
        }
        return true;
      },
    };
    requestDraw();
  }

  function fadeDestroy(opts) {
    hideEars();
    ink.blur();
    gesture = null;
    sheet = "fading";
    if (opts.sound === "rip") PaperAudio.rip();
    if (opts.sound === "crumple") PaperAudio.crumpleBurst();
    startTween(180, (u) => {
      sheetAlpha = 1 - u;
    }, () => {
      sheetAlpha = 1;
      destroyTextModel();
      paperDirty = true;
      sheet = "gone";
      if (opts.ball) parkBall(true);
      showAftermath();
    });
  }

  function autoTear() {
    if (reduceMotion) {
      fadeDestroy({ sound: "rip" });
      return;
    }
    sheet = "tearing";
    hideEars();
    ripMark = 0;
    startTween(740, (u) => {
      const e = easeInOut(u);
      tearOpen = e;
      pullX = e * Math.min(130, paperW * 0.3);
      pullY = e * 18;
      if (e - ripMark > 0.14) {
        PaperAudio.ripTick();
        ripMark = e;
      }
    }, () => {
      beginFall(560, -36);
    });
  }

  function springTear() {
    const fromX = pullX;
    const fromY = pullY;
    const fromO = tearOpen;
    startTween(240, (u) => {
      const k = 1 - easeOut(u);
      pullX = fromX * k;
      pullY = fromY * k;
      tearOpen = fromO * k;
      placeEars();
    }, () => {
      pullX = 0;
      pullY = 0;
      tearOpen = 0;
      sheet = "live";
      showEars();
    });
  }

  function rasterHalf(side) {
    const c = document.createElement("canvas");
    c.width = paperLayer.width;
    c.height = paperLayer.height;
    const g = c.getContext("2d");
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.beginPath();
    if (side === "left") {
      g.moveTo(0, 0);
      tearPts.forEach((p) => g.lineTo(p.x, p.y));
      g.lineTo(0, paperH);
    } else {
      g.moveTo(paperW, 0);
      g.lineTo(paperW, paperH);
      for (let i = tearPts.length - 1; i >= 0; i--) g.lineTo(tearPts[i].x, tearPts[i].y);
    }
    g.closePath();
    g.clip();
    g.drawImage(paperLayer, 0, 0, paperW, paperH);
    g.beginPath();
    tearPts.forEach((p, i) => (i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y)));
    g.strokeStyle = "rgba(255, 252, 246, 0.9)";
    g.lineWidth = 1.6;
    g.stroke();
    return c;
  }

  function rasterBack(front) {
    const c = document.createElement("canvas");
    c.width = front.width;
    c.height = front.height;
    const g = c.getContext("2d");
    g.fillStyle = BACK;
    g.fillRect(0, 0, c.width, c.height);
    g.globalCompositeOperation = "destination-in";
    g.drawImage(front, 0, 0);
    return c;
  }

  function beginFall(vx, vy) {
    if (paperDirty) renderPaper();
    const left = rasterHalf("left");
    const right = rasterHalf("right");
    const o = origin();
    const w = paperW;
    const h = paperH;
    pieces = [
      {
        front: left,
        back: rasterBack(left),
        x: o.x,
        y: o.y,
        w,
        h,
        vx: Math.min(-30, vx * 0.12 - 80),
        vy: -50,
        vr: -0.55,
        rot: 0,
        flip: 0,
      },
      {
        front: right,
        back: rasterBack(right),
        x: o.x + pullX,
        y: o.y + pullY,
        w,
        h,
        vx: clamp(vx, 180, 980),
        vy: clamp(vy, -260, 40),
        vr: 1.25,
        rot: pullX * 0.001,
        flip: 0,
      },
    ];
    fallAge = 0;
    sheet = "falling";
    gesture = null;
    hideEars();
    ink.blur();
    PaperAudio.rip();
    destroyTextModel();
    paperDirty = true;
  }

  function autoCrumple() {
    if (reduceMotion) {
      fadeDestroy({ ball: true, sound: "crumple" });
      return;
    }
    sheet = "crumpling";
    hideEars();
    const from = crumpleT;
    let mark = from;
    startTween(Math.max(280, (1 - from) * 980), (u) => {
      crumpleT = from + (1 - from) * easeInOut(u);
      if (crumpleT - mark > 0.1) {
        PaperAudio.crumple();
        mark = crumpleT;
      }
    }, () => {
      crumpleT = 1;
      commitCrumple();
    });
  }

  function springCrumple() {
    const from = crumpleT;
    startTween(260, (u) => {
      crumpleT = from * (1 - easeOut(u));
      crumpleBtn.style.opacity = String(1 - crumpleT);
    }, () => {
      crumpleT = 0;
      sheet = "live";
      showEars();
    });
  }

  function parkBall(instant) {
    const o = origin();
    const i = balls.filter((b) => b.mode !== "fade").length;
    const target = pilePos(Math.min(i, 2));
    const startR = Math.min(paperW, paperH) * 0.15;
    const b = {
      x: o.x + paperW / 2,
      y: o.y + paperH * 0.52,
      tx: target.x,
      ty: target.y,
      r: instant ? (vw < 720 ? 12 : 16) : startR,
      tr: vw < 720 ? 12 : 16,
      rot: 0.4,
      vx: 0,
      vy: 0,
      mode: instant ? "free" : "park",
      alpha: 1,
      held: false,
    };
    if (instant) {
      b.x = target.x;
      b.y = target.y;
    }
    balls.push(b);
    const resting = balls.filter((item) => item.mode !== "fade");
    if (resting.length > 3) resting[0].mode = "fade";
  }

  function commitCrumple() {
    hideEars();
    ink.blur();
    gesture = null;
    PaperAudio.crumpleBurst();
    sheet = "gone";
    parkBall(false);
    destroyTextModel();
    paperDirty = true;
    showAftermath();
  }

  function newSheet() {
    hideAftermath();
    live.textContent = "";
    destroyTextModel();
    makeGrain();
    pullX = 0;
    pullY = 0;
    tearOpen = 0;
    crumpleT = 0;
    layoutText();
    paperDirty = true;
    if (reduceMotion) {
      arrival = 1;
      sheet = "live";
      showEars();
      ink.focus();
      requestDraw();
      return;
    }
    arrival = 0;
    sheet = "arriving";
    hideEars();
    startTween(460, (u) => {
      arrival = easeOut(u);
    }, () => {
      arrival = 1;
      sheet = "live";
      showEars();
      PaperAudio.settle();
      ink.focus();
    });
  }

  function affine(s0, s1, s2, d0, d1, d2) {
    const denom = s0.x * (s1.y - s2.y) + s1.x * (s2.y - s0.y) + s2.x * (s0.y - s1.y);
    if (Math.abs(denom) < 1e-4) return null;
    return {
      a: (d0.x * (s1.y - s2.y) + d1.x * (s2.y - s0.y) + d2.x * (s0.y - s1.y)) / denom,
      b: (d0.y * (s1.y - s2.y) + d1.y * (s2.y - s0.y) + d2.y * (s0.y - s1.y)) / denom,
      c: (d0.x * (s2.x - s1.x) + d1.x * (s0.x - s2.x) + d2.x * (s1.x - s0.x)) / denom,
      d: (d0.y * (s2.x - s1.x) + d1.y * (s0.x - s2.x) + d2.y * (s1.x - s0.x)) / denom,
      e: (d0.x * (s1.x * s2.y - s2.x * s1.y) + d1.x * (s2.x * s0.y - s0.x * s2.y) + d2.x * (s0.x * s1.y - s1.x * s0.y)) / denom,
      f: (d0.y * (s1.x * s2.y - s2.x * s1.y) + d1.y * (s2.x * s0.y - s0.x * s2.y) + d2.y * (s0.x * s1.y - s1.x * s0.y)) / denom,
    };
  }

  function grow(p, c, amt) {
    const dx = p.x - c.x;
    const dy = p.y - c.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: p.x + (dx / len) * amt, y: p.y + (dy / len) * amt };
  }

  function drawTri(s0, s1, s2, d0, d1, d2) {
    const c = {
      x: (d0.x + d1.x + d2.x) / 3,
      y: (d0.y + d1.y + d2.y) / 3,
    };
    const area = Math.abs((d1.x - d0.x) * (d2.y - d0.y) - (d2.x - d0.x) * (d1.y - d0.y));
    if (area < 8) return;
    const e0 = grow(d0, c, 0.8);
    const e1 = grow(d1, c, 0.8);
    const e2 = grow(d2, c, 0.8);
    const m = affine(s0, s1, s2, e0, e1, e2);
    if (!m) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(e0.x, e0.y);
    ctx.lineTo(e1.x, e1.y);
    ctx.lineTo(e2.x, e2.y);
    ctx.closePath();
    ctx.clip();
    ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
    ctx.drawImage(paperLayer, 0, 0, paperW, paperH);
    ctx.restore();
  }

  function drawMesh(t) {
    const e = smooth(Math.max(t, 0.001));
    const cols = MESH_COLS;
    const rows = MESH_ROWS;
    const pts = mesh.rest.map((p, i) => ({
      x: p.x + (mesh.crush[i].x - p.x) * e,
      y: p.y + (mesh.crush[i].y - p.y) * e,
    }));
    const id = (i, j) => j * (cols + 1) + i;
    const src = (i, j) => ({ x: (paperW / cols) * i, y: (paperH / rows) * j });
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const d00 = pts[id(i, j)];
        const d10 = pts[id(i + 1, j)];
        const d01 = pts[id(i, j + 1)];
        const d11 = pts[id(i + 1, j + 1)];
        drawTri(src(i, j), src(i + 1, j), src(i, j + 1), d00, d10, d01);
        drawTri(src(i + 1, j), src(i + 1, j + 1), src(i, j + 1), d10, d11, d01);
      }
    }
  }

  function paintBall(x, y, r, rot, alpha) {
    if (r < 2 || alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(62, 44, 28, 0.16)";
    ctx.beginPath();
    ctx.ellipse(1, r * 0.8, r * 0.66, Math.max(2, r * 0.18), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#eadfcf";
    ctx.fillRect(-r, -r, r * 2, r * 2);
    ctx.fillStyle = "#f6f1e6";
    ctx.beginPath();
    ctx.arc(-r * 0.26, -r * 0.3, r * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(150, 114, 78, 0.32)";
    ctx.beginPath();
    ctx.ellipse(r * 0.18, r * 0.22, r * 0.62, r * 0.36, -0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(102, 74, 46, 0.42)";
    ctx.lineWidth = Math.max(0.7, r * 0.04);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const creases = [
      [-0.75, -0.28, -0.15, 0.12, 0.2, 0.62],
      [0.5, -0.72, 0.05, -0.12, -0.42, 0.18],
      [-0.1, -0.88, 0.28, -0.2, 0.55, 0.22],
      [-0.72, 0.22, -0.05, 0.4, 0.48, 0.08],
      [0.02, 0.12, 0.32, 0.48, 0.08, 0.86],
    ];
    for (const [a, b, c, d, e, f] of creases) {
      ctx.beginPath();
      ctx.moveTo(a * r, b * r);
      ctx.quadraticCurveTo(c * r, d * r, e * r, f * r);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawShadow(x, y, w, h, alpha) {
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.fillStyle = "rgba(62, 44, 28, 0.15)";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h - 1, w * 0.36, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawFlat(alpha) {
    const o = origin();
    drawShadow(o.x, o.y, paperW, paperH, alpha);
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.drawImage(paperLayer, o.x, o.y, paperW, paperH);
    drawRestingTabs();
    ctx.restore();
  }

  function drawSplit() {
    const o = origin();
    if (tearOpen < 0.012) {
      drawFlat(1);
      return;
    }
    drawShadow(o.x, o.y, paperW, paperH, 1);
    drawShadow(o.x + pullX, o.y + pullY, paperW, paperH, 0.8);

    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    tearPts.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(0, paperH);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(paperLayer, 0, 0, paperW, paperH);
    ctx.restore();

    ctx.save();
    ctx.translate(o.x + pullX, o.y + pullY);
    ctx.translate(paperW * 0.7, paperH * 0.5);
    ctx.rotate(clamp(pullX, 0, 400) * 0.0007);
    ctx.translate(-paperW * 0.7, -paperH * 0.5);
    ctx.save();
    ctx.beginPath();
    tearPts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.lineTo(paperW, paperH);
    ctx.lineTo(paperW, 0);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(paperLayer, 0, 0, paperW, paperH);
    ctx.restore();
    if (!tearBtn.hidden) {
      drawTab(paperW - 12, paperH * 0.4, 44, 92, "破く", "left", hotEar === "tear");
    }
    ctx.restore();
  }

  function drawPiece(p) {
    const facing = Math.cos(p.flip);
    ctx.save();
    ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
    ctx.rotate(p.rot);
    ctx.scale(Math.max(0.035, Math.abs(facing)), 1);
    const img = facing >= 0 ? p.front : p.back;
    ctx.drawImage(img, -p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }

  function drawCrumple() {
    const o = origin();
    const t = crumpleT;
    if (t < 0.015) {
      drawFlat(1);
      return;
    }
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.translate(paperW / 2, paperH / 2);
    ctx.rotate(t * 0.05);
    ctx.translate(-paperW / 2, -paperH / 2);
    const meshA = 1 - smooth(clamp((t - 0.66) / 0.3, 0, 1));
    if (meshA > 0.03 && mesh) {
      ctx.save();
      ctx.globalAlpha *= meshA;
      drawMesh(t);
      ctx.restore();
    }
    const ballA = smooth(clamp((t - 0.48) / 0.34, 0, 1));
    if (ballA > 0.02) {
      const r = Math.min(paperW, paperH) * (0.2 - t * 0.05);
      paintBall(paperW / 2, paperH * 0.52, r, t * 0.4, ballA);
    }
    ctx.restore();
  }

  function drawBalls() {
    for (const b of balls) paintBall(b.x, b.y, b.r, b.rot, b.alpha);
  }

  function drawOverlay() {
    if (sheet !== "live" && sheet !== "arriving") {
      ink.style.left = "-200px";
      return;
    }
    const o = origin();
    ctx.save();
    ctx.translate(o.x, o.y);
    ctx.beginPath();
    ctx.rect(0, 0, paperW, paperH);
    ctx.clip();
    let extra = 0;
    if (compText) {
      ctx.fillStyle = "rgba(27, 33, 43, 0.55)";
      ctx.font = `${caret.size}px ${HAND}`;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(compText, caret.x, caret.y);
      extra = measureString(compText, caret.size);
    }
    if (caretOn && document.activeElement === ink && sheet === "live") {
      ctx.fillStyle = INK;
      ctx.fillRect(caret.x + extra, caret.y - caret.size + 3, 1.2, caret.size);
    }
    ctx.restore();
    ink.style.left = `${o.x + caret.x + extra}px`;
    ink.style.top = `${o.y + caret.y - caret.size}px`;
  }

  function draw() {
    if (paperDirty) renderPaper();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);
    ctx.imageSmoothingEnabled = true;
    const sheetOnTop = sheet === "live" || sheet === "arriving" || sheet === "fading" || sheet === "tearing" || sheet === "crumpling";
    if (sheetOnTop) drawBalls();
    if (sheet === "live" || sheet === "arriving") drawFlat(arrival);
    else if (sheet === "fading") drawFlat(sheetAlpha);
    else if (sheet === "tearing") drawSplit();
    else if (sheet === "falling") pieces.forEach(drawPiece);
    else if (sheet === "crumpling") drawCrumple();
    if (!sheetOnTop) drawBalls();
    drawOverlay();
    document.body.dataset.sheet = sheet;
  }

  function updateBalls(dt) {
    let more = false;
    for (const b of balls) {
      if (b.mode === "fade") {
        b.alpha -= dt * 1.5;
        more = true;
        continue;
      }
      if (b.mode === "park") {
        b.x += (b.tx - b.x) * Math.min(1, dt * 3);
        b.y += (b.ty - b.y) * Math.min(1, dt * 3);
        b.r += (b.tr - b.r) * Math.min(1, dt * 3.2);
        b.rot += dt * 0.8;
        if (Math.hypot(b.tx - b.x, b.ty - b.y) < 0.8) {
          b.mode = "free";
          b.x = b.tx;
          b.y = b.ty;
          b.r = b.tr;
          PaperAudio.settle();
        }
        more = true;
        continue;
      }
      if (b.held) {
        more = true;
        continue;
      }
      const speed = Math.hypot(b.vx, b.vy);
      if (speed > 8) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.vx * dt * 0.012;
        const drag = Math.pow(0.16, dt);
        b.vx *= drag;
        b.vy *= drag;
        if (speed < 220) {
          if (b.x < b.r) { b.x = b.r; b.vx = 0; }
          if (b.x > vw - b.r) { b.x = vw - b.r; b.vx = 0; }
          if (b.y < b.r) { b.y = b.r; b.vy = 0; }
          if (b.y > vh - b.r) { b.y = vh - b.r; b.vy = 0; }
        }
        more = true;
      } else {
        b.vx = 0;
        b.vy = 0;
      }
      if (b.x < -50 || b.x > vw + 50 || b.y < -50 || b.y > vh + 50) b.alpha = 0;
    }
    const before = balls.length;
    balls = balls.filter((b) => b.alpha > 0.02);
    return more || balls.length !== before;
  }

  function update(dt, now) {
    let more = false;
    if (gesture && gesture.type === "crumple" && sheet === "crumpling") {
      const held = (now - gesture.t0) / 1000;
      const pulled = Math.max(0, gesture.y0 - gesture.y) / (paperH * 0.42);
      const next = clamp(Math.max(held / 0.95, pulled), 0, 1);
      if (next - gesture.mark > 0.08) {
        PaperAudio.crumple();
        gesture.mark = next;
      }
      crumpleT = next;
      crumpleBtn.style.opacity = String(1 - next);
      crumpleBtn.style.transform = `translateY(${-next * 16}px)`;
      if (next >= 1) {
        gesture = null;
        commitCrumple();
      }
      more = true;
    }
    if (anim) {
      const current = anim;
      const cont = current.step(now);
      if (anim === current && !cont) anim = null;
      if (anim) more = true;
    }
    if (sheet === "falling") {
      fallAge += dt;
      for (const p of pieces) {
        p.vy += 2000 * dt;
        p.vx *= Math.pow(0.62, dt);
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += dt * 2.5;
      }
      pieces = pieces.filter((p) => p.y < vh + p.h * 0.35);
      if (!pieces.length || fallAge > 3.4) {
        pieces = [];
        sheet = "gone";
        showAftermath();
      } else {
        more = true;
      }
    }
    if (updateBalls(dt)) more = true;
    return more;
  }

  function requestDraw() {
    if (rafId) return;
    rafId = requestAnimationFrame(tick);
  }

  function tick(now) {
    rafId = 0;
    if (!lastNow) lastNow = now;
    const dt = Math.min(0.034, (now - lastNow) / 1000);
    lastNow = now;
    const more = update(dt, now);
    draw();
    if (more) requestDraw();
  }

  function finishStroke(g) {
    const stroke = g.stroke;
    const pts = stroke.points;
    let length = 0;
    for (let i = 1; i < pts.length; i++) {
      length += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    }
    if (!g.moved || length < 2.5) {
      strokes.pop();
      paperDirty = true;
      requestDraw();
      return;
    }
    history.push("stroke");
    if (strokes.length > 420) strokes.splice(0, strokes.length - 420);
    paperDirty = true;
    requestDraw();
  }

  function endPointer(e) {
    if (!gesture || e.pointerId !== gesture.id) return;
    const g = gesture;
    gesture = null;
    if (g.type === "ink") {
      finishStroke(g);
      return;
    }
    if (g.type === "ball") {
      g.ball.held = false;
      g.ball.vx = clamp(g.vx, -1600, 1600);
      g.ball.vy = clamp(g.vy, -1600, 1600);
      requestDraw();
      return;
    }
    const tap = !g.moved && performance.now() - g.t0 < 280;
    if (g.type === "tear") {
      if (tap) autoTear();
      else if (tearOpen >= 0.58) beginFall(g.vx || 480, g.vy || -20);
      else springTear();
      return;
    }
    if (g.type === "crumple") {
      if (tap || crumpleT >= 0.62) autoCrumple();
      else springCrumple();
    }
  }

  function onPointerMove(e) {
    if (!gesture || e.pointerId !== gesture.id) {
      if (e.target === canvas) {
        const p = eventPoint(e);
        const ball = ballAt(p.x, p.y);
        if (ball && (sheet === "gone" || !insidePaper(p))) canvas.style.cursor = "grab";
        else if ((sheet === "live" || sheet === "arriving") && insidePaper(p)) canvas.style.cursor = "crosshair";
        else canvas.style.cursor = "default";
      }
      return;
    }
    const g = gesture;
    const now = performance.now();
    const dt = Math.max(0.016, (now - g.lt) / 1000);
    g.vx = (e.clientX - g.lx) / dt;
    g.vy = (e.clientY - g.ly) / dt;
    g.lx = e.clientX;
    g.ly = e.clientY;
    g.lt = now;
    if (Math.hypot(e.clientX - g.x0, e.clientY - g.y0) > 6) g.moved = true;

    if (g.type === "ink") {
      const local = toPaper(e);
      const pts = g.stroke.points;
      const prev = pts[pts.length - 1];
      const dist = Math.hypot(local.x - prev.x, local.y - prev.y);
      if (dist < 0.8) return;
      const pressure = e.pressure > 0 && e.pressure < 1 ? e.pressure : null;
      const w = pressure != null ? 0.7 + pressure * 2.6 : clamp(2.5 - dist * 0.12, 0.7, 2.6);
      pts.push({ x: local.x, y: local.y, w });
      if (pts.length % 3 === 0) PaperAudio.scratch();
      paperDirty = true;
      requestDraw();
      return;
    }
    if (g.type === "ball") {
      const p = eventPoint(e);
      const prev = eventPoint({ clientX: g.x, clientY: g.y, target: canvas });
      g.ball.x += p.x - prev.x;
      g.ball.y += p.y - prev.y;
      g.x = e.clientX;
      g.y = e.clientY;
      requestDraw();
      return;
    }
    if (g.type === "tear") {
      const dx = e.clientX - g.x0;
      const dy = e.clientY - g.y0;
      pullX = clamp(dx, -12, paperW * 0.72);
      pullY = clamp(dy, -40, paperH * 0.4);
      const open = clamp(Math.max(dx, 0) / (paperW * 0.4) + Math.max(dy, 0) / (paperH * 0.85), 0, 1);
      if (open - tearOpen > 0.07) PaperAudio.ripTick();
      tearOpen = open;
      crumpleBtn.hidden = open > 0.04;
      placeEars();
      requestDraw();
      return;
    }
    if (g.type === "crumple") {
      g.y = e.clientY;
      requestDraw();
    }
  }

  function ballAt(x, y) {
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (b.alpha < 0.4) continue;
      if (Math.hypot(x - b.x, y - b.y) <= b.r + 8) return b;
    }
    return null;
  }

  function armGesture(type, e) {
    const now = performance.now();
    gesture = {
      type,
      id: e.pointerId,
      x0: e.clientX,
      y0: e.clientY,
      x: e.clientX,
      y: e.clientY,
      t0: now,
      lt: now,
      lx: e.clientX,
      ly: e.clientY,
      vx: 0,
      vy: 0,
      moved: false,
      mark: 0,
    };
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    PaperAudio.unlock();
    const p = eventPoint(e);
    if (sheet === "live" && insidePaper(p)) {
      e.preventDefault();
      ink.focus();
      canvas.setPointerCapture(e.pointerId);
      const local = toPaper(e);
      const stroke = { points: [{ x: local.x, y: local.y, w: 1.5 }] };
      strokes.push(stroke);
      armGesture("ink", e);
      gesture.stroke = stroke;
      return;
    }
    const b = ballAt(p.x, p.y);
    if (b && b.mode !== "fade" && !(sheet === "live" && insidePaper(p))) {
      e.preventDefault();
      b.held = true;
      b.mode = "free";
      b.vx = 0;
      b.vy = 0;
      canvas.setPointerCapture(e.pointerId);
      armGesture("ball", e);
      gesture.ball = b;
      requestDraw();
    }
  });

  canvas.addEventListener("contextmenu", (e) => e.preventDefault());

  function earDown(type, e) {
    if (e.button !== 0 || sheet !== "live") return;
    e.preventDefault();
    e.stopPropagation();
    PaperAudio.unlock();
    e.currentTarget.setPointerCapture(e.pointerId);
    if (type === "tear") {
      tearPts = makeTear();
      pullX = 0;
      pullY = 0;
      tearOpen = 0;
      sheet = "tearing";
    } else {
      crumpleT = 0;
      sheet = "crumpling";
      tearBtn.hidden = true;
    }
    armGesture(type, e);
    requestDraw();
  }

  tearBtn.addEventListener("pointerdown", (e) => earDown("tear", e));
  crumpleBtn.addEventListener("pointerdown", (e) => earDown("crumple", e));
  tearBtn.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (sheet !== "live") return;
    PaperAudio.unlock();
    tearPts = makeTear();
    pullX = 0;
    pullY = 0;
    tearOpen = 0;
    autoTear();
  });
  crumpleBtn.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (sheet !== "live") return;
    PaperAudio.unlock();
    crumpleT = 0;
    autoCrumple();
  });

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", endPointer);
  window.addEventListener("pointercancel", endPointer);

  ink.addEventListener("compositionstart", () => {
    composing = true;
    compText = "";
  });
  ink.addEventListener("compositionupdate", (e) => {
    compText = e.data || "";
    requestDraw();
  });
  ink.addEventListener("compositionend", (e) => {
    composing = false;
    compText = "";
    const data = e.data || "";
    if (data) {
      commitText(data);
      skipInput = data;
      ink.value = "";
    }
    requestDraw();
  });
  ink.addEventListener("input", () => {
    if (composing) return;
    const value = ink.value;
    if (!value) {
      skipInput = "";
      return;
    }
    if (skipInput && value === skipInput) {
      skipInput = "";
      ink.value = "";
      return;
    }
    skipInput = "";
    commitText(value);
    ink.value = "";
  });
  ink.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
      e.preventDefault();
      undo();
      return;
    }
    if (e.key === "Backspace" && !composing) {
      e.preventDefault();
      backspace();
    }
  });
  ink.addEventListener("focus", () => {
    caretOn = true;
    requestDraw();
  });
  ink.addEventListener("blur", () => {
    caretOn = false;
    requestDraw();
  });

  window.addEventListener("keydown", (e) => {
    if (e.target === tearBtn || e.target === crumpleBtn || e.target === againBtn) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (sheet !== "live") return;
    if (e.key.length === 1 || e.key === "Backspace" || e.key === "Enter") {
      PaperAudio.unlock();
      ink.focus();
    }
  });

  function watchEar(btn, name) {
    btn.addEventListener("pointerenter", () => {
      hotEar = name;
      requestDraw();
    });
    btn.addEventListener("pointerleave", () => {
      if (hotEar === name) hotEar = null;
      requestDraw();
    });
  }
  watchEar(tearBtn, "tear");
  watchEar(crumpleBtn, "crumple");

  againBtn.addEventListener("click", () => {
    PaperAudio.unlock();
    newSheet();
  });

  window.addEventListener("resize", layoutViewport);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", layoutViewport);
    window.visualViewport.addEventListener("scroll", layoutViewport);
  }

  setInterval(() => {
    if (document.hidden) return;
    if (sheet !== "live") return;
    if (document.activeElement !== ink) return;
    caretOn = !caretOn;
    requestDraw();
  }, 530);

  function boot() {
    layoutViewport();
    const show = () => {
      widthCache.clear();
      layoutText();
      paperDirty = true;
      document.body.classList.add("ready");
      if (reduceMotion) {
        arrival = 1;
        sheet = "live";
        showEars();
        requestDraw();
        return;
      }
      arrival = 0;
      sheet = "arriving";
      startTween(560, (u) => {
        arrival = easeOut(u);
      }, () => {
        arrival = 1;
        sheet = "live";
        showEars();
      });
    };
    if (document.fonts && document.fonts.ready) {
      let opened = false;
      const open = () => {
        if (opened) return;
        opened = true;
        show();
      };
      document.fonts.ready.then(open);
      setTimeout(open, 1800);
    } else {
      show();
    }
  }

  boot();
})();
