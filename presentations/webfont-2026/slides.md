---
theme: default
title: 今さら理解するウェブフォント2026
info: |
  フロントエンドカンファレンス関西2026
  takanorip / Kanmu, inc. Design Manager
drawings:
  persist: false
transition: none
mdc: true
highlighter: shiki
colorSchema: light
canvasWidth: 980
fonts:
  sans: LINE Seed JP
  weights: '400,700,800'
---

<!--
layout: cover
-->

# 今さら理解する<br>ウェブフォント<span class="hl">2026</span>

<p class="muted">
takanorip — Kanmu, inc. Design Manager
</p>

---

# takanorip ／ 大木 尊紀

<div class="cols">
<div class="card">
<h3>Kanmu, inc.</h3>
<p>デザインマネージャー</p>
</div>
<div class="card">
<h3>好きなもの</h3>
<p>フォント、デザインシステム</p>
</div>
</div>

---
layout: statement
---

# みなさん、<br>ウェブフォント<br>使ってますか？

---
layout: key
---

# 重い。ずれる。<br><span class="marker">目の敵にされやすい。</span>

---
layout: statement
---

# 技術的にもデザイン的にも<br><span class="marker">とっても面白い</span>

---

# 今日は両面から見る

<div class="cols">
<div class="card">
<h3>技術</h3>
<p>配信、CLS、バリアブル、Fonts 4、IFT</p>
</div>
<div class="card">
<h3>デザイン</h3>
<p>選び方、UDの誤解、著作権</p>
</div>
</div>

---
layout: section
---

<p class="chap">00</p>

# 書体を「選べる」ようになるまで

---

# 書体は、金属の在庫だった

<p>
活字は棚にある分だけ。<span class="marker">形を決めること自体が制作</span>だった。
</p>

---

# 書体指定が、デザイン行為になる

<p>
写研、モリサワ。<span class="marker">どの書体を指定するかがデザイン</span>になった。
</p>

---

# フォントがソフトウェアになる

<p>
書体は在庫ではなく、ファイルになった。
</p>

---

# 印刷では当たり前だった選択が、<br>できなかった

<div class="cols">
<div class="card">
<h3>指定できたもの</h3>
<p>MSPゴシック、メイリオ、ヒラギノ</p>
</div>
<div class="card">
<h3>起きていたこと</h3>
<p>OSが違えば、別人のサイト</p>
</div>
</div>

---
layout: accent
---

# 選択できること自体が、<br><span class="marker">デザインの回復</span>である

---

# 書体は、紙・余白・色と同じ設計変数

<p>
トーン、階層、読みやすさ。Webは文字が主なので、影響は大きい。
</p>

---

# ユーザーにも便益がある

<div class="cols-3">
<div class="card">
<h3>読みやすさ</h3>
<p>字面・ウェイト・サイズ</p>
</div>
<div class="card">
<h3>一貫した体験</h3>
<p>OSを問わず同じ書体</p>
</div>
<div class="card">
<h3>信頼と印象</h3>
<p>内容とトーンが一致する</p>
</div>
</div>

---
layout: key
---

# 見過ごされがちだが、<br>選べることには<span class="marker">価値がある</span>。

---

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

# ウェブフォントとは

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

# 日本語が重い、理由は単純

<div class="cols">
<div class="card">
<h3>文字数が多い</h3>
<p>数千〜数万グリフ</p>
</div>
<div class="card">
<h3>グリフが複雑</h3>
<p>画数が多く、データ量も増える</p>
</div>
</div>

---

# まず WOFF2 で圧縮する

```css
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap;
}
```

<p class="note">新規で TTF / WOFF を配る理由は、ほぼない。</p>

---

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

<p class="note">日本語では、ダイナミックサブセットがよく効く。</p>

---

# 届ける経路は、だいたい3つ

<div class="cols-3">
<div class="card">
<h3>配信サービス</h3>
<p>Google Fonts / Adobe Fonts / FONTPLUS</p>
</div>
<div class="card">
<h3>ノーコード</h3>
<p>手早い。制御は薄い</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>許諾されたファイルだけ</p>
</div>
</div>

---
layout: section
---

<p class="chap">02</p>

# CLSを回避する

---

# 見えないか、張り替わるか

<div class="cols">
<div class="card">
<h3>FOIT</h3>
<p>待ち時間、文字が見えない</p>
</div>
<div class="card">
<h3>FOUT</h3>
<p>先に出て、後から張り替わる</p>
</div>
</div>

<p class="note">寸法が違うと <span class="marker">CLS</span> になる。</p>

---

# font-display で待ち方を決める

| 値 | 見えるまで | 向く場面 |
|---|---|---|
| `swap` | すぐフォールバック | 本文 |
| `optional` | 間に合わなければ使わない | 安定優先 |
| `fallback` | 短い待ちのあと swap | 見出しと本文のあいだ |
| `block` | 隠して待つ | ほぼ使わない |

---

# ずれるのは、字形ではなく寸法

<p>
<span class="marker">size-adjust</span> で、フォールバックの寸法を寄せる。
</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display.woff2') format('woff2');
  size-adjust: 92%;
  ascent-override: 90%;
  descent-override: 22%;
}
```

---

# 寸法を寄せると、重なりが変わる

<SizeAdjustCompare />

---

# クリティカルな1本は、先に取りにいく

```html
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin>
```

<p class="note">全部 preload しない。最初の1〜2本だけ。</p>

---
layout: statement
---

# 重い・ずれるは<br><span class="marker">設計で止められる</span>

---
layout: section
---

<p class="chap">03</p>

# フォントの選び方

---

# 書体は、印象の設計である

<div class="cols-3">
<div class="card">
<h3>ゴシック</h3>
<p>硬い、UI向き</p>
</div>
<div class="card">
<h3>明朝</h3>
<p>繊細、編集的</p>
</div>
<div class="card">
<h3>ディスプレイ</h3>
<p>見出し専用</p>
</div>
</div>

---

# サイトで使う系統は、最大2つ

<p>
本文と見出し。3本目は、だいたい要らない。
</p>

---
layout: key
---

# UDフォント＝<br>誰にとっても読みやすいフォント

<p class="muted">……と思われがち。</p>

---
layout: accent
---

# それは、違う。

---

# 特定の読みにくさを想定した設計

<p>
弱視、加齢、類似字形の混同。<span class="marker">その条件向け</span>であって、万人向けではない。
</p>

---

# 読みやすさは、人・サイズ・媒体で変わる

<p>
「ユニバーサル」を、全員に読みやすい保証だと読まない。
</p>

---
layout: statement
---

# 万人向けの<br>正解書体ではない

---

# フォントには、著作権がある

---

# 書体と、フォントは別物

<div class="cols">
<div class="card">
<h3>書体（デザイン）</h3>
<p>字形は著作物になりにくい</p>
</div>
<div class="card">
<h3>フォント（プログラム）</h3>
<p>ファイルは著作物。許諾が要る</p>
</div>
</div>

---
layout: statement
---

# デスクトップライセンス<br>≠ ウェブライセンス

---

# ウェブフォントは改変と再配布が前提

<div class="cols">
<div class="card">
<h3>サブセット化 = 改変</h3>
<p>禁じられていれば、削れない</p>
</div>
<div class="card">
<h3>サーバー配信 = 再配布</h3>
<p>表示することと、配ることは別</p>
</div>
</div>

<p class="note">買ったフォントを <code>@font-face</code> するのは、だいたいアウト。</p>

---

# 安全な経路だけを使う

<div class="cols-3">
<div class="card">
<h3>配信サービス</h3>
<p>Google Fonts / Adobe Fonts など</p>
</div>
<div class="card">
<h3>明示された許諾</h3>
<p>OFL、またはウェブ利用の契約</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>ウェブ用に許諾されたファイル</p>
</div>
</div>

---

# よくある事故

1. **OS同梱フォント**をサーバーに上げる
2. **印刷用パッケージ**をWebに流用する
3. 画像に焼くことと、**ファイルを配ること**を混同する

---

# 使う／使わない

<div class="cols">
<div class="card">
<h3>使う</h3>
<p>ブランドを固定したい。OS差を消したい</p>
</div>
<div class="card">
<h3>使わない</h3>
<p>システムUIで足りる。許諾が取れない</p>
</div>
</div>

---
layout: section
---

<p class="chap">04</p>

# バリアブルフォント

---

# 1ファイルで、複数の声

<p>
3ウェイトを配る代わりに、軸を1本持たせる。
</p>

---

# よく使う軸

<div class="cols-3">
<div class="card">
<h3>wght</h3>
<p>ウェイト。100–900</p>
</div>
<div class="card">
<h3>wdth</h3>
<p>字幅</p>
</div>
<div class="card">
<h3>opsz</h3>
<p>オプティカルサイズ</p>
</div>
</div>

---

# 動かして見る

<VariableAxisDemo />

---

# 日本語は、まだ慎重でいい

<p>
本文は静的1ウェイト、見出しだけバリアブル、でもいい。
</p>

---
layout: section
---

<p class="chap">05</p>

# CSS Fonts Level 4

---

# フォントを、もっと細かく制御する

<div class="cols">
<div class="card">
<h3>見た目</h3>
<p><code>font-palette</code><br><code>font-optical-sizing</code><br><code>font-variation-settings</code></p>
</div>
<div class="card">
<h3>配り方</h3>
<p><code>tech()</code> / <code>format()</code><br><code>font-synthesis-*</code></p>
</div>
</div>

---

# 色付きフォントの色を、CSSで持ち替える

<FontPaletteDemo />

---

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

---

# 対応してないブラウザには、配らない

```css
@font-face {
  font-family: 'Display JP';
  src: url('display.woff2') format('woff2');
  src: url('display-colr.otf') format(opentype) tech(color-COLRv1);
}
```

---

# 偽の太字・斜体を、黙らせる

```css
body {
  font-synthesis-weight: none;
  font-synthesis-style: none;
}
```

---
layout: section
---

<p class="chap">06</p>

# W3Cで検討中の仕組み

---

# Incremental Font Transfer

<p>
最初は必要なグリフだけ送り、あとから足す。
</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('display.woff2') format('woff2');
  src: url('display-ift.otf') format(opentype) tech(incremental);
}
```

---

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

# 日本語の「全部入り」を<br><span class="marker">前提にしなくてよくなる</span>

---
layout: section
---

<p class="chap">07</p>

# 持ち帰り

---
layout: statement
---

# 重い・ずれるは<br><span class="marker">設計で止められる</span>

---
layout: statement
---

# 書体は<br><span class="marker">印象の設計</span>である

---
layout: statement
---

# <span class="marker">2026年の道具</span>を使う

---
layout: accent
---

# ウェブフォントについて詳しくなって、<br>フロントエンド開発を<span class="marker">もっと楽しみましょう</span>。

---
layout: cover
---

# ありがとうございました

<p class="muted">
takanorip — Kanmu, inc. Design Manager
</p>
