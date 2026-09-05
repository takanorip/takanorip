---
theme: default
title: 今さら理解するウェブフォント2026
info: |
  フロントエンドカンファレンス関西2026
  takanorip / Kanmu, inc. Design Manager
drawings:
  persist: false
transition: fade-out
mdc: true
colorSchema: dark
canvasWidth: 980
fonts:
  sans: LINE Seed JP
  weights: '400,700,800'
---

<!--
layout: cover
-->

<p class="kicker">FRONTEND CONFERENCE KANSAI 2026</p>

# 今さら理解する<br>ウェブフォント<span class="hl">2026</span>

<p class="muted" style="margin-top: 28px;">
takanorip — Kanmu, inc. Design Manager
</p>

---

<p class="kicker">WHO</p>

# takanorip<br><span class="muted" style="font-size: 0.45em; font-weight: 700;">大木 尊紀</span>

<div class="cols" style="margin-top: 36px;">
<div>
<p style="margin: 0; font-size: 0.85em; font-weight: 700;">Kanmu, inc.</p>
<p class="muted">デザインマネージャー</p>
</div>
<div>
<p style="margin: 0; font-size: 0.85em; font-weight: 700;">デザインと実装のあいだ</p>
<p class="muted">フォントとデザインシステムが好き</p>
</div>
</div>

---
layout: statement
---


<p class="kicker">QUESTION</p>

# みなさん、<br>ウェブフォント<br>使ってますか？

---
layout: key
---


<p class="kicker">よくある評判</p>

# 重い。<br>ずれる。<br>目の敵。

---
layout: statement
---


<p class="kicker">でも</p>

# 技術的にも<br>デザイン的にも<br><span class="hl">とっても面白い</span>

---

<p class="kicker">TODAY</p>

# 今日は両面から見る

<div class="cols">
<div class="card">
<h3>技術</h3>
<p>配信の仕組み、CLS、バリアブル、CSS Fonts 4、W3Cの新しい転送</p>
</div>
<div class="card">
<h3>デザイン</h3>
<p>書体を選べることの価値、選び方、UDの誤解、著作権</p>
</div>
</div>

---

<p class="kicker">HISTORY</p>

# 書体を「選べる」ように<br>なるまでの道

<p class="muted" style="margin-top: 24px;">
ウェブフォントの話をする前に、印刷の歴史を少しだけ。
</p>

---

<p class="kicker">01 — 活版印刷</p>

# 書体は、金属の在庫だった

<p style="margin-top: 28px; max-width: 16em;">
活字は物理的な駒。種類は少なく、取り替えること自体が工数。
文字の形を決めることは、制作の根幹だった。
</p>

---

<p class="kicker">02 — 写植</p>

# 書体指定が、<br>デザイン行為になる

<p style="margin-top: 28px; max-width: 18em;">
写研、モリサワ。日本語グラフィックで選択肢が一気に増える。
石井明朝やゴナのように、どの書体を指定するかがデザインそのものになった。
</p>

---

<p class="kicker">03 — DTP</p>

# フォントが<br>ソフトウェアになる

<p style="margin-top: 28px; max-width: 16em;">
画面上で選び、組んで、出力する。
書体は在庫ではなく、ファイルになった。
</p>

---

<p class="kicker">04 — 初期のWeb</p>

# 印刷では当たり前だった<br>選択が、できなかった

<div class="cols">
<div class="card">
<h3>指定できるもの</h3>
<p>MSPゴシック、メイリオ、ヒラギノ。<br>「近いもの」を並べるだけ。</p>
</div>
<div class="card">
<h3>起きていたこと</h3>
<p>OSが違えば別人のサイト。<br>デザイナーの意図は環境に負ける。</p>
</div>
</div>

---
layout: accent
---


<p class="kicker">05 — ウェブフォント</p>

# 選択できること自体が、<br>デザインの回復である

---

<p class="kicker">VALUE</p>

# 書体は、紙・余白・色と<br>同じ設計変数

<p style="margin-top: 28px; max-width: 18em;">
トーン、ブランド、情報階層、読みやすさは書体で決まる。
「なんとなくゴシック」は、写植以前の制約に戻ることと同じ。
</p>

---
layout: statement
---


<p class="kicker">WEB</p>

# Webは<br>文字が主のメディア

<p class="muted" style="margin-top: 20px; font-size: 0.42em; font-weight: 400;">
サイトもアプリも、印象の大半は文字が作る。
</p>

---

<p class="kicker">USER BENEFIT</p>

# ユーザーにも便益がある

<div class="cols-3">
<div class="card">
<h3>読みやすさ</h3>
<p>字面・ウェイト・サイズが読了と理解を助ける</p>
</div>
<div class="card">
<h3>一貫した体験</h3>
<p>OSを問わず同じ書体。別人のサイト感を減らす</p>
</div>
<div class="card">
<h3>信頼と印象</h3>
<p>トーンと書体が一致すると、情報の信頼性につながる</p>
</div>
</div>

<p class="muted" style="margin-top: 28px;">
読みやすい骨格は負担を下げうる。ただし「UDなら万人に読みやすい」ではない。後で否定する。
</p>

---
layout: key
---


# 見過ごされがちだが、<br>選べることには価値がある。

<p style="margin-top: 24px; font-size: 0.42em; font-weight: 700; opacity: 0.9;">
だから技術とデザインの両方を見る。
</p>

---

<p class="kicker">AGENDA</p>

# 今日の道筋

<ol class="agenda-list">
<li><span class="n">01</span>配信の仕組み</li>
<li><span class="n">02</span>CLSを回避する</li>
<li><span class="n">03</span>フォントの選び方</li>
<li><span class="n">04</span>バリアブルフォント</li>
<li><span class="n">05</span>CSS Fonts Level 4</li>
<li><span class="n">06</span>W3Cで検討中の仕組み</li>
</ol>

---
layout: section
---


<p class="chap">01</p>

# 配信の仕組み

---

<p class="kicker">WHAT</p>

# ウェブフォントとは

<p style="margin-top: 20px; max-width: 18em;">
サーバー上のフォントデータを、ユーザーのブラウザが取得して描画する仕組み。
</p>

<div class="flow">
<span class="box">@font-face</span>
<span class="arrow">→</span>
<span class="box">リクエスト</span>
<span class="arrow">→</span>
<span class="box">ダウンロード</span>
<span class="arrow">→</span>
<span class="box">描画</span>
</div>

---

<p class="kicker">JP</p>

# 日本語が重い、理由は単純

<div class="cols">
<div class="card">
<h3>文字数が多い</h3>
<p>ラテンは数百。日本語は数千〜数万グリフ。ファイルがそのまま大きい。</p>
</div>
<div class="card">
<h3>グリフが複雑</h3>
<p>画数が多く、アウトラインのデータ量も増える。圧縮しても限界がある。</p>
</div>
</div>

---

<p class="kicker">FORMAT</p>

# まず WOFF2 で圧縮する

```css
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap;
}
```

<p class="muted" style="margin-top: 20px;">
2026年、新規で TTF や WOFF を配る理由はほぼない。WOFF2 が前提。
</p>

---

<p class="kicker">SUBSET</p>

# 使わない文字は、送らない

```css
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF;
}
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display-jp.woff2') format('woff2');
  unicode-range: U+3000-9FFF;
}
```

<p class="muted" style="margin-top: 16px;">
静的サブセットと、閲覧文字だけを返すダイナミックサブセット。日本語では後者が効く。
</p>

---

<p class="kicker">HOW TO SHIP</p>

# 届ける経路は、だいたい3つ

<div class="cols-3">
<div class="card">
<h3>配信サービス</h3>
<p>Google Fonts、Adobe Fonts、FONTPLUS、TypeSquare。ライセンスとサブセットを任せる。</p>
</div>
<div class="card">
<h3>ノーコード</h3>
<p>サイトツール側がフォントを抱える。手早いが、制御は薄い。</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>キャッシュもサブセットも自分で設計できる。許諾されたファイルだけ。</p>
</div>
</div>

---
layout: section
---


<p class="chap">02</p>

# CLSを回避する

---

<p class="kicker">TWO FAILURES</p>

# 見えないか、張り替わるか

<div class="cols">
<div class="card">
<h3>FOIT</h3>
<p>Flash of Invisible Text。フォント待ちで文字が消える。読めない時間。</p>
</div>
<div class="card">
<h3>FOUT</h3>
<p>Flash of Unstyled Text。先にフォールバックが出て、後から張り替わる。</p>
</div>
</div>

<p style="margin-top: 28px;">
張り替えのとき、幅と高さが違うと <strong>CLS</strong> になる。
</p>

---

<p class="kicker">DISPLAY</p>

# `font-display` で待ち方を決める

| 値 | 見えるまで | 向く場面 |
|---|---|---|
| `swap` | すぐフォールバック | 本文。読めない時間を作らない |
| `optional` | 間に合わなければ使わない | ブランドより安定 |
| `fallback` | 短い待ちのあと swap | 見出しと本文のあいだ |
| `block` | 隠して待つ | ほぼ使わない |

---

<p class="kicker">METRICS</p>

# ずれるのは、字形ではなく寸法

<p style="margin-top: 16px; max-width: 20em;">
ascent / descent / 平均字幅が違うと、行の高さや折り返しが変わる。
`size-adjust` と metric override で、フォールバック側の寸法を寄せる。
</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display.woff2') format('woff2');
  size-adjust: 92%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

---

<p class="kicker">LIVE</p>

# 寸法を寄せると、重なりが変わる

<SizeAdjustCompare />

---

<p class="kicker">PRELOAD</p>

# クリティカルな1本は、先に取りにいく

```html
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin>
```

<p class="muted" style="margin-top: 20px;">
全部 preload しない。LCP に効く書体、最初の画面に必要な1〜2ファイルだけ。
</p>

---
layout: statement
---


<p class="kicker">POINT</p>

# 重い・ずれるは<br><span class="hl">設計で止められる</span>

---
layout: section
---


<p class="chap">03</p>

# フォントの選び方

---

<p class="kicker">IMPRESSION</p>

# 書体は、印象の設計である

<div class="cols-3">
<div class="card">
<h3>ゴシック</h3>
<p>硬い、現代、UI向き</p>
</div>
<div class="card">
<h3>明朝</h3>
<p>繊細、編集、信頼</p>
</div>
<div class="card">
<h3>ディスプレイ</h3>
<p>強い、短い見出し専用</p>
</div>
</div>

<p class="muted" style="margin-top: 28px;">
どの印象を足すかを先に決める。フォントから入らない。
</p>

---

<p class="kicker">BUDGET</p>

# サイトで使う系統は、最大2つ

<p style="margin-top: 20px; max-width: 18em;">
本文と見出し。それ以上は、読み込みも世界観も散る。
飾りのための3本目は、だいたい要らない。
</p>

---
layout: key
---


<p class="kicker">UD FONT</p>

# UDフォント =<br>誰にとっても<br>読みやすいフォント

<p style="margin-top: 20px; font-size: 0.4em; font-weight: 700;">
と思われがち。
</p>

---
layout: accent
---


# それは、違う。

---

<p class="kicker">WHAT UD IS</p>

# 特定の読みにくさを<br>想定した設計

<p style="margin-top: 24px; max-width: 20em;">
弱視、加齢、類似字形の混同（6 / 8 / 0、シ / ツ、ー / 一）。
その条件下での読みやすさを狙った書体であって、「全人類に最適」ではない。
</p>

---

<p class="kicker">CONTEXT</p>

# 読みやすさは、<br>人・サイズ・媒体で変わる

<p style="margin-top: 24px; max-width: 20em;">
ある人に開いて見やすい形が、別の人には緩く、遅く感じることがある。
名前の「ユニバーサル」を、全員に読みやすい保証だと読まない。
</p>

---
layout: statement
---


<p class="kicker">UD</p>

# 万人向けの<br>正解書体ではない

---

<p class="kicker">COPYRIGHT</p>

# フォントには、著作権がある

<p class="muted" style="margin-top: 20px;">
ライセンスは注意書き1行では終わらない。
</p>

---

<p class="kicker">TWO LAYERS</p>

# 書体と、フォントは別物

<div class="cols">
<div class="card">
<h3>書体（デザイン）</h3>
<p>日本では字形のデザイン自体は、著作物になりにくい。</p>
</div>
<div class="card">
<h3>フォント（プログラム）</h3>
<p>ファイルは著作物。コピー・改変・再配布には許諾が要る。</p>
</div>
</div>

---
layout: statement
---


<p class="kicker">LICENSE</p>

# デスクトップライセンス<br>≠ ウェブライセンス

---

<p class="kicker">WHY WEB IS SPECIAL</p>

# ウェブフォントは<br>改変と再配布が前提

<div class="cols">
<div class="card">
<h3>サブセット化</h3>
<p>改変。EULA が改変を禁じていれば、自分で削れない。</p>
</div>
<div class="card">
<h3>サーバー配信</h3>
<p>再配布。画面に「表示する」ことと、ファイルを「配る」ことは別行為。</p>
</div>
</div>

<p style="margin-top: 28px; font-size: 0.85em;">
買ったフォント、マシンに入っているフォントを <code>@font-face</code> するのは、多くの場合アウト。
</p>

---

<p class="kicker">SAFE PATH</p>

# 安全な経路だけを使う

<div class="cols-3">
<div class="card">
<h3>配信サービス</h3>
<p>Google Fonts / Adobe Fonts / FONTPLUS / TypeSquare</p>
</div>
<div class="card">
<h3>明示された許諾</h3>
<p>OFL や、ウェブ利用が書いてある商用契約</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>ウェブ用に許諾されたファイルだけを置く</p>
</div>
</div>

---

<p class="kicker">ACCIDENTS</p>

# よくある事故

1. **OS同梱フォント**をサーバーに上げる
2. **印刷用パッケージ**をWebに流用する
3. 画像に埋め込むことと、**ファイルを配信すること**を混同する

<p class="muted" style="margin-top: 24px;">
「画面に出せる」と「ファイルを配ってよい」は、同じではない。
</p>

---

<p class="kicker">WHEN</p>

# 使う／使わない

<div class="cols">
<div class="card">
<h3>使った方がいい</h3>
<p>ブランドの声を固定したい。OS差を消したい。本文の可読性を設計したい。</p>
</div>
<div class="card">
<h3>使わなくていい</h3>
<p>システムUIで足りる。通信を一点も増やせない。許諾が取れない。</p>
</div>
</div>

---
layout: section
---


<p class="chap">04</p>

# バリアブルフォント

---

<p class="kicker">ONE FILE</p>

# 1ファイルで、複数の声

<p style="margin-top: 20px; max-width: 18em;">
Regular / Medium / Bold を3本配る代わりに、軸を1本持たせる。
日本語でも、ウェイトのファイル数を減らせる。
</p>

---

<p class="kicker">AXES</p>

# よく使う軸

<div class="cols-3">
<div class="card">
<h3>wght</h3>
<p>ウェイト。100から900まで連続。</p>
</div>
<div class="card">
<h3>wdth</h3>
<p>字幅。狭いUIと、ゆったりした見出し。</p>
</div>
<div class="card">
<h3>opsz</h3>
<p>オプティカルサイズ。小さい文字ほど骨格を開く。</p>
</div>
</div>

---

<p class="kicker">LIVE</p>

# 動かして見る

<VariableAxisDemo />

---

<p class="kicker">JP + VF</p>

# 日本語は、まだ慎重でいい

<p style="margin-top: 20px; max-width: 20em;">
対応ファミリーは増えた。でも、全グリフのバリアブルは重いことがある。
本文を静的1ウェイト、見出しだけバリアブル、という分け方も設計。
</p>

---
layout: section
---


<p class="chap">05</p>

# CSS Fonts Level 4

---

<p class="kicker">LEVEL 4</p>

# フォントを、もっと細かく制御する

<div class="cols">
<div>
- `font-palette`
- `font-optical-sizing`
- `font-variation-settings`
</div>
<div>
- `font-tech()` / `format()`
- `font-synthesis-*`
- OpenType の feature
</div>
</div>

<p class="muted" style="margin-top: 28px;">
仕様は Working Draft（2026）。主要ブラウザは、使えるものがすでに多い。
</p>

---

<p class="kicker">PALETTE</p>

# 色付きフォントの色を、CSSで持ち替える

<FontPaletteDemo />

---

<p class="kicker">OPTICAL + VARIATION</p>

# 軸は、プロパティで触る

```css
h1 {
  font-optical-sizing: auto;
  font-variation-settings: 'wght' 750, 'opsz' 72;
}

small {
  font-optical-sizing: auto;
  font-variation-settings: 'wght' 500, 'opsz' 14;
}
```

<p class="muted" style="margin-top: 16px;">
同じファミリーでも、見出しと注釈で骨格を変えてよい。
</p>

---

<p class="kicker">TECH</p>

# 対応してないブラウザには、配らない

```css
@font-face {
  font-family: 'Display JP';
  src: url('display.woff2') format('woff2');
  src: url('display-colr.otf') format(opentype) tech(color-COLRv1);
}
```

<p class="muted" style="margin-top: 16px;">
`format()` と `tech()` で、色・バリエーション・IFT を条件分岐できる。
</p>

---

<p class="kicker">SYNTHESIS</p>

# 偽の太字・斜体を、黙らせる

```css
body {
  font-synthesis-weight: none;
  font-synthesis-style: none;
}
```

<p class="muted" style="margin-top: 20px;">
ブラウザが勝手に傾けるより、持っていないウェイトは持っていない、と明示する。
</p>

---
layout: section
---


<p class="chap">06</p>

# W3Cの新しい仕組み

---

<p class="kicker">IFT</p>

# Incremental Font Transfer

<p style="margin-top: 16px; max-width: 22em;">
最初は必要なグリフだけ送り、あとからパッチで足す。
`unicode-range` より細かく、ページをまたいで増えていける。
</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('display.woff2') format('woff2');
  src: url('display-ift.otf') format(opentype) tech(incremental);
}
```

---

<p class="kicker">SUPPORT</p>

# 対応の有無で、ファイルを分ける

```css
@when font-tech(incremental) {
  @font-face {
    font-family: 'Display JP';
    src: url('display-ift.otf');
  }
}
@else {
  @font-face {
    font-family: 'Display JP';
    src: url('display.woff2') format('woff2');
  }
}
```

---
layout: key
---


<p class="kicker">WHY IT MATTERS</p>

# 日本語の「全部入り」を<br>前提にしなくてよくなる

<p style="margin-top: 24px; max-width: 20em; font-size: 0.85em;">
数千グリフを最初から配る必要が薄れる。
ウェブフォントが目の敵にされる最大の理由——日本語の初期転送——に、仕様側から穴が開きつつある。
</p>

---
layout: section
---


<p class="chap">07</p>

# 持ち帰り

---
layout: statement
---


<p class="kicker">01</p>

# 重い・ずれるは<br><span class="hl">設計で止められる</span>

<p class="muted" style="margin-top: 20px; font-size: 0.38em; font-weight: 400;">
配信と描画を分けて考える。ウェブフォントは制御対象。
</p>

---
layout: statement
---


<p class="kicker">02</p>

# 書体は<br><span class="hl">印象の設計</span>である

<p class="muted" style="margin-top: 20px; font-size: 0.38em; font-weight: 400;">
好みだけで選ばない。可読性・著作権・本数まで含めて決める。
</p>

---
layout: statement
---


<p class="kicker">03</p>

# <span class="hl">2026年の道具</span>を使う

<p class="muted" style="margin-top: 20px; font-size: 0.38em; font-weight: 400;">
バリアブル、CSS Fonts Level 4、Incremental Font Transfer。
</p>

---
layout: accent
---


# ウェブフォントについて<br>詳しくなって、<br>フロントエンドを<br>もっと楽しもう。

---
layout: cover
---

<p class="kicker">THANK YOU</p>

# ありがとうございました

<p style="margin-top: 28px; font-weight: 700;">
takanorip
</p>
<p class="muted">
Kanmu, inc. Design Manager<br>
フロントエンドカンファレンス関西2026
</p>
