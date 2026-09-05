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
colorSchema: light
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

<p class="muted">
takanorip — Kanmu, inc. Design Manager
</p>

---

<p class="kicker">WHO</p>

# takanorip ／ 大木 尊紀

<div class="cols">
<div class="card">
<h3>Kanmu, inc.</h3>
<p>デザインマネージャー。デザインと実装のあいだを行き来している。</p>
</div>
<div class="card">
<h3>好きなもの</h3>
<p>フォント、デザインシステム、アクセシビリティ。</p>
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

# 重い。ずれる。<br><span class="marker">目の敵にされやすい。</span>

---
layout: statement
---

<p class="kicker">でも</p>

# 技術的にもデザイン的にも<br><span class="marker">とっても面白い</span>

---

<p class="kicker">TODAY</p>

# 今日は両面から見る

<div class="cols">
<div class="card">
<h3>技術</h3>
<p>配信の仕組み、CLS、バリアブル、CSS Fonts Level 4、W3Cで検討中の転送方式。</p>
</div>
<div class="card">
<h3>デザイン</h3>
<p>書体を選べることの価値、選び方、UDフォントの誤解、著作権。</p>
</div>
</div>

---
layout: section
---

<p class="chap">00</p>

# 書体を「選べる」ようになるまで

<p class="muted">ウェブフォントの話をする前に、印刷の歴史を少しだけ。</p>

---

<p class="kicker">01 — 活版印刷</p>

# 書体は、金属の在庫だった

<p>
活字は物理的な駒。棚にある分しか組めず、種類を増やすこと自体が投資でした。
<span class="marker">文字の形を決めることは、制作の根幹</span>だったのです。
</p>

---

<p class="kicker">02 — 写植</p>

# 書体指定が、デザイン行為になる

<p>
写研、モリサワ。日本語グラフィックで選択肢が一気に増えます。
石井明朝やゴナのように、<span class="marker">どの書体を指定するかがデザインそのもの</span>になりました。
</p>

---

<p class="kicker">03 — DTP</p>

# フォントがソフトウェアになる

<p>
画面上で選び、組んで、出力する。
書体は棚の在庫ではなく、コピーできるファイルになりました。
</p>

---

<p class="kicker">04 — 初期のWeb</p>

# 印刷では当たり前だった選択が、<br>できなかった

<div class="cols">
<div class="card">
<h3>指定できたもの</h3>
<p>MSPゴシック、メイリオ、ヒラギノ。手元にある書体から「近いもの」を並べるだけ。</p>
</div>
<div class="card">
<h3>起きていたこと</h3>
<p>OSが違えば別人のサイト。デザイナーの意図は、いつも環境に負けていました。</p>
</div>
</div>

---
layout: accent
---

<p class="kicker">05 — ウェブフォント</p>

# 選択できること自体が、<br><span class="marker">デザインの回復</span>である

---

<p class="kicker">VALUE</p>

# 書体は、紙・余白・色と同じ設計変数

<p>
トーン、ブランド、情報階層、読みやすさ。そのすべてに書体が効きます。
Webは文字が主のメディアなので、影響はむしろ印刷より大きい。
</p>

<p class="note">
「なんとなくゴシック」で済ませるのは、写植以前の制約に自分から戻ることと同じです。
</p>

---

<p class="kicker">USER BENEFIT</p>

# ユーザーにも便益がある

<div class="cols-3">
<div class="card">
<h3>読みやすさ</h3>
<p>字面・ウェイト・サイズの設計が、読了と理解を助ける。</p>
</div>
<div class="card">
<h3>一貫した体験</h3>
<p>OSを問わず同じ書体が出る。環境差による「別人のサイト」感が減る。</p>
</div>
<div class="card">
<h3>信頼と印象</h3>
<p>内容と書体のトーンが一致すると、情報そのものが信頼されやすい。</p>
</div>
</div>

<p class="note">
※ 読みやすい骨格は負担を下げうる。ただし「UDフォントなら万人に読みやすい」ではありません。後半で否定します。
</p>

---
layout: key
---

# 見過ごされがちだが、<br>選べることには<span class="marker">価値がある</span>。

<p class="muted">だから、技術とデザインの両方を見ます。</p>

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

<p>
サーバー上のフォントデータを、ユーザーのブラウザが取得して描画する仕組みです。
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
<p>ラテンは数百字。日本語は数千から数万グリフ。ファイルがそのまま大きくなる。</p>
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

<p class="note">
2026年、新規で TTF や WOFF を配る理由はほぼありません。WOFF2 が前提です。
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

<p class="note">
静的サブセットと、閲覧文字だけを返すダイナミックサブセット。日本語では後者がよく効きます。
</p>

---

<p class="kicker">HOW TO SHIP</p>

# 届ける経路は、だいたい3つ

<div class="cols-3">
<div class="card">
<h3>配信サービス</h3>
<p>Google Fonts、Adobe Fonts、FONTPLUS、TypeSquare。ライセンスとサブセットを任せられる。</p>
</div>
<div class="card">
<h3>ノーコードツール</h3>
<p>サイトツール側がフォントを抱える。手早いが、制御はどうしても薄くなる。</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>キャッシュもサブセットも自分で設計できる。ただしウェブ用に許諾されたファイルだけ。</p>
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
<p>Flash of Invisible Text。フォント待ちで文字が消える。読めない時間が生まれる。</p>
</div>
<div class="card">
<h3>FOUT</h3>
<p>Flash of Unstyled Text。先にフォールバックが出て、後から張り替わる。</p>
</div>
</div>

<p class="note">
張り替えのとき、幅と高さが違うと <span class="marker">CLS（レイアウトシフト）</span>になります。
</p>

---

<p class="kicker">DISPLAY</p>

# font-display で待ち方を決める

| 値 | 見えるまで | 向く場面 |
|---|---|---|
| `swap` | すぐフォールバック | 本文。読めない時間を作らない |
| `optional` | 間に合わなければ使わない | ブランドより安定を取る |
| `fallback` | 短い待ちのあと swap | 見出しと本文のあいだ |
| `block` | 隠して待つ | ほぼ使わない |

---

<p class="kicker">METRICS</p>

# ずれるのは、字形ではなく寸法

<p>
ascent / descent / 平均字幅が違うと、行の高さや折り返しが変わります。
<span class="marker">size-adjust と metric override</span> で、寸法のほうを寄せます。
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

<p class="kicker">LIVE</p>

# 寸法を寄せると、重なりが変わる

<SizeAdjustCompare />

---

<p class="kicker">PRELOAD</p>

# クリティカルな1本は、先に取りにいく

```html
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin>
```

<p class="note">
全部を preload しないこと。LCP に効く書体、最初の画面に必要な1〜2ファイルだけに絞ります。
</p>

---
layout: statement
---

<p class="kicker">POINT</p>

# 重い・ずれるは<br><span class="marker">設計で止められる</span>

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
<p>硬い、現代的、UI向き。情報量が多い画面に強い。</p>
</div>
<div class="card">
<h3>明朝</h3>
<p>繊細で編集的。長文と、落ち着いた信頼の演出に。</p>
</div>
<div class="card">
<h3>ディスプレイ</h3>
<p>強い個性。短い見出し専用で、本文には使わない。</p>
</div>
</div>

<p class="note">
どの印象を足したいかを先に決める。フォント名から入らないこと。
</p>

---

<p class="kicker">BUDGET</p>

# サイトで使う系統は、最大2つ

<p>
本文と見出し。それ以上に増やすと、読み込みも世界観も散ります。
飾りのための3本目は、だいたい要りません。
</p>

---
layout: key
---

<p class="kicker">UD FONT</p>

# UDフォント＝<br>誰にとっても読みやすいフォント

<p class="muted">……と、思われがちです。</p>

---
layout: accent
---

# それは、違う。

---

<p class="kicker">WHAT UD IS</p>

# 特定の読みにくさを想定した設計

<p>
弱視、加齢、類似字形の混同（6 / 8 / 0、シ / ツ、ー / 一）。
<span class="marker">その条件下での読みやすさ</span>を狙った書体であって、「全人類に最適」という意味ではありません。
</p>

---

<p class="kicker">CONTEXT</p>

# 読みやすさは、人・サイズ・媒体で変わる

<p>
ある人に開いて見やすい形が、別の人には緩く、遅く感じることがあります。
名前の「ユニバーサル」を、全員に読みやすい保証だと読まないこと。
</p>

---
layout: statement
---

<p class="kicker">UD</p>

# 万人向けの<br>正解書体ではない

---

<p class="kicker">COPYRIGHT</p>

# フォントには、著作権がある

<p>
ライセンスの話は、注意書き1行では終わりません。
ここだけは、数枚使って確認します。
</p>

---

<p class="kicker">TWO LAYERS</p>

# 書体と、フォントは別物

<div class="cols">
<div class="card">
<h3>書体（デザイン）</h3>
<p>日本では、字形のデザインそれ自体は著作物になりにくいとされる。</p>
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

# ウェブフォントは改変と再配布が前提

<div class="cols">
<div class="card">
<h3>サブセット化 = 改変</h3>
<p>EULA が改変を禁じていれば、自分で削ることはできない。</p>
</div>
<div class="card">
<h3>サーバー配信 = 再配布</h3>
<p>画面に「表示する」ことと、ファイルを「配る」ことは別の行為。</p>
</div>
</div>

<p class="note">
買ったフォント、マシンに入っているフォントを <code>@font-face</code> で配るのは、多くの場合アウトです。
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
<p>OFL、またはウェブ利用が書いてある商用契約</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>ウェブ用に許諾されたファイルだけを置く</p>
</div>
</div>

---

<p class="kicker">ACCIDENTS</p>

# よくある事故

1. **OS同梱フォント**をそのままサーバーに上げる
2. **印刷用パッケージ**をWebに流用する
3. 画像に焼き込むことと、**ファイルを配信すること**を混同する

<p class="note">
「画面に出せる」と「ファイルを配ってよい」は、まったく別の話です。
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

<p>
Regular / Medium / Bold を3本配る代わりに、軸を1本持たせます。
日本語でも、ウェイトごとのファイル数を減らせます。
</p>

---

<p class="kicker">AXES</p>

# よく使う軸

<div class="cols-3">
<div class="card">
<h3>wght</h3>
<p>ウェイト。100から900まで連続で動かせる。</p>
</div>
<div class="card">
<h3>wdth</h3>
<p>字幅。狭いUIと、ゆったりした見出しを1本でまかなう。</p>
</div>
<div class="card">
<h3>opsz</h3>
<p>オプティカルサイズ。小さい文字ほど骨格を開いて読みやすくする。</p>
</div>
</div>

---

<p class="kicker">LIVE</p>

# 動かして見る

<VariableAxisDemo />

---

<p class="kicker">JP + VF</p>

# 日本語は、まだ慎重でいい

<p>
対応ファミリーは増えました。でも、全グリフ入りのバリアブルは重いことがあります。
本文は静的1ウェイト、見出しだけバリアブル。そういう分け方も設計のうちです。
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
<div class="card">
<h3>見た目を触る</h3>
<p><code>font-palette</code><br><code>font-optical-sizing</code><br><code>font-variation-settings</code></p>
</div>
<div class="card">
<h3>配り方を分ける</h3>
<p><code>tech()</code> / <code>format()</code><br><code>font-synthesis-*</code><br>OpenType feature</p>
</div>
</div>

<p class="note">
仕様は Working Draft（2026）。ただし主要ブラウザで、すでに使えるものが多くあります。
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

<p class="note">
同じファミリーでも、見出しと注釈で骨格を変えてよいのです。
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

<p class="note">
<code>format()</code> と <code>tech()</code> で、色・バリエーション・IFT を条件分岐できます。
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

<p class="note">
ブラウザに勝手に傾けさせるより、持っていないウェイトは持っていないと明示するほうが安全です。
</p>

---
layout: section
---

<p class="chap">06</p>

# W3Cで検討中の仕組み

---

<p class="kicker">IFT</p>

# Incremental Font Transfer

<p>
最初は必要なグリフだけ送り、あとからパッチで足していく方式です。
<code>unicode-range</code> より細かく、ページをまたいで増やせます。
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

# 日本語の「全部入り」を<br><span class="marker">前提にしなくてよくなる</span>

<p class="muted">
ウェブフォントが目の敵にされる最大の理由——日本語の初期転送——に、仕様の側から穴が開きつつあります。
</p>

---
layout: section
---

<p class="chap">07</p>

# 持ち帰り

---
layout: statement
---

<p class="kicker">TAKEAWAY 01</p>

# 重い・ずれるは<br><span class="marker">設計で止められる</span>

<p class="muted">配信と描画を分けて考える。ウェブフォントは目の敵ではなく、制御対象です。</p>

---
layout: statement
---

<p class="kicker">TAKEAWAY 02</p>

# 書体は<br><span class="marker">印象の設計</span>である

<p class="muted">好みだけで選ばない。可読性・著作権・本数まで含めて決めます。</p>

---
layout: statement
---

<p class="kicker">TAKEAWAY 03</p>

# <span class="marker">2026年の道具</span>を使う

<p class="muted">バリアブル、CSS Fonts Level 4、Incremental Font Transfer。基礎の延長に最新があります。</p>

---
layout: accent
---

# ウェブフォントについて詳しくなって、<br>フロントエンド開発を<span class="marker">もっと楽しみましょう</span>。

---
layout: cover
---

<p class="kicker">THANK YOU</p>

# ありがとうございました

<p class="muted">
takanorip — Kanmu, inc. Design Manager<br>
フロントエンドカンファレンス関西2026
</p>
