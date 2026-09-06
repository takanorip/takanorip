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
layout: cover
---

<div class="cover-row">
<div>

# 今さら理解する<br>ウェブフォント<span class="hl">2026</span>

<p class="muted">takanorip — Kanmu, inc. Design Manager</p>
</div>

<CoverGlyph />
</div>

---

# takanorip ／ 大木 尊紀

<p>Kanmu でデザインマネージャーをしています。フォントとデザインシステムのあいだで、実装と見た目の両方を見ています。</p>

<div class="cols">
<div class="card">
<h3>Kanmu, inc.</h3>
<p>プロダクトの見た目と、それを支える仕組みの両方を見ている。ウェブフォントは、その交差点になりやすい。</p>
</div>
<div class="card">
<h3>好きなもの</h3>
<p>フォント、デザインシステム。書体が画面の印象を決めることと、それが配信やライセンスと結びつくところが好き。</p>
</div>
</div>

---
layout: statement
---

# みなさん、<br>ウェブフォント<br>使ってますか？

<p class="muted">Google Fonts を1行貼る、セルフホストする、使わないと決める。どれも「使っている／使っていない」の話です。</p>

---
layout: key
---

# 重い。ずれる。<br><span class="marker">目の敵にされやすい。</span>

<p class="muted">日本語はファイルが大きく、フォールバックとの寸法差が出やすい。パフォーマンスの話になると、まず疑われる側に回ります。</p>

---
layout: statement
---

# 技術的にもデザイン的にも<br><span class="marker">とっても面白い</span>

<p class="muted">配信と表示の仕組みを知ると、書体を選ぶ判断も変わる。逆も同じです。</p>

---

# 今日は両面から見る

<p>ウェブフォントは、ネットワークの問題だけでも、見た目の問題だけでもない。両方を同じ時間で見ます。</p>

<div class="cols">
<div class="card">
<h3>技術</h3>
<p>どう届けるか、どうずらさないか。WOFF2、サブセット、CLS、バリアブル、CSS Fonts Level 4、Incremental Font Transfer。</p>
</div>
<div class="card">
<h3>デザイン</h3>
<p>どの系統を何本持つか。UDフォントの誤解、書体とファイルの著作権、使ってよい経路。</p>
</div>
</div>

---
layout: section
---

<p class="chap">00</p>

# 書体を「選べる」ようになるまで

<p class="muted">印刷では当たり前だった選択が、Webでは長くできませんでした。</p>

---

# 書体は、金属の在庫だった

<p>活字は棚にある分だけ使える。新しい形が欲しければ、金属を彫るか、その棚を増やすしかなかった。<span class="marker">形を決めること自体が制作</span>で、指定の自由度は低かった。</p>

<p class="note">本文用、見出し用、記号。持っている範囲で組むのが普通だった。</p>

---

# 書体指定が、デザイン行為になる

<p>写植とデジタル写植の時代に、写研やモリサワの書体見本が現場の共通言語になる。棚の在庫ではなく、<span class="marker">どの書体を指定するかがデザイン</span>になった。</p>

<p class="note">紙面のトーンは、本文書体の選択でかなり決まる。</p>

---

# フォントがソフトウェアになる

<p>書体は在庫ではなく、ファイルになった。アウトラインをコピーでき、サイズも自由に変えられる。制作の制約は「持っている金属」から「持っているライセンス」に移る。</p>

<p class="note">TrueType と OpenType が、デスクトップの標準になる。</p>

---

# 印刷では当たり前だった選択が、<br>できなかった

<p>Webの初期は、ユーザーのOSに入っている書体だけが使えた。デザイナーが選んだ書体ではなく、環境が選んだ書体で読まれる。</p>

<div class="cols">
<div class="card">
<h3>指定できたもの</h3>
<p>MSPゴシック、メイリオ、ヒラギノ、Arial。いわゆるウェブセーフと、各OSの標準ゴシック。</p>
</div>
<div class="card">
<h3>起きていたこと</h3>
<p>Windows と macOS で字面も字幅も違う。同じサイトなのに、別人の組版に見える。</p>
</div>
</div>

---
layout: accent
---

# 選択できること自体が、<br><span class="marker">デザインの回復</span>である

<p class="muted">ウェブフォントは、印刷で当たり前だった「書体を指定する」を、画面に戻す技術です。</p>

---

# 書体は、紙・余白・色と同じ設計変数

<p>トーン、階層、読みやすさは、書体で大きく変わる。Webは画面の大半が文字なので、色や余白より影響が大きいことすらある。</p>

<p class="note">本文がシステムゴシックのままだと、ブランドの声が環境に依存する。</p>

---

# ユーザーにも便益がある

<p>見た目のためだけではない。読めること、迷わないこと、信頼できることも、書体の仕事です。</p>

<div class="cols-3">
<div class="card">
<h3>読みやすさ</h3>
<p>字面・ウェイト・サイズを、媒体に合わせて固定できる。OS標準のまま放置しない。</p>
</div>
<div class="card">
<h3>一貫した体験</h3>
<p>Windows でも macOS でも iOS でも、同じ字面で読める。画面ごとの「別人感」が減る。</p>
</div>
<div class="card">
<h3>信頼と印象</h3>
<p>内容のトーンと字面が一致する。硬い話を丸ゴシックだけで組まなくてよくなる。</p>
</div>
</div>

---
layout: key
---

# 見過ごされがちだが、<br>選べることには<span class="marker">価値がある</span>。

<p class="muted">重い・ずれるの対策は必要です。それでも、選べない状態に戻す理由にはならない。</p>

---

# 今日の道筋

<p>配信から入って、ずれ、選び方、新しい形式へ進みます。持ち帰りは最後に3点です。</p>

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

<p class="muted">ファイルをどう小さくし、どう分割し、どう届けるか。</p>

---

# ウェブフォントとは

<p>CSS で家族名を宣言し、ブラウザがそのファイルを取りにいき、字形を描く。見た目の話の前に、ネットワークの往復がある。</p>

<div class="flow">
<span class="box">@font-face</span>
<span class="arrow">→</span>
<span class="box">リクエスト</span>
<span class="arrow">→</span>
<span class="box">ダウンロード</span>
<span class="arrow">→</span>
<span class="box">描画</span>
</div>

<p class="note">このどこかが重いと、見えない・張り替わる・ずれる、のいずれかになる。</p>

---

# 最初は、配る形式が割れていた

<p>2000年代後半、ウェブフォントを配りたくても、ブラウザとフォント会社で条件が揃わなかった。</p>

<div class="cols-3">
<div class="card">
<h3>EOT</h3>
<p>Microsoft の Embedded OpenType。IE では先行したが、他ブラウザに広がらず、業界標準にはならなかった。</p>
</div>
<div class="card">
<h3>TTF / OTF</h3>
<p>デスクトップと同じファイルをそのまま配ると、保存してインストールしやすい。フォント会社が嫌った。</p>
</div>
<div class="card">
<h3>求めていたもの</h3>
<p>新しいアウトライン形式ではなく、既存フォントの Web 用の包み。圧縮できて、用途が分かるもの。</p>
</div>
</div>

---

# WOFF は、2012年の合意

<p>Web Open Font Format は、ブラウザ実装者とフォント会社の接点として設計された。中身は新しい字形ではなく、すでにある sfnt のコンテナです。</p>

<div class="cols-3">
<div class="card">
<h3>2009</h3>
<p>Mozilla の Jonathan Kew らが草案を公開。Opera や Typekit も関わり、実装と配信の両方から押した。</p>
</div>
<div class="card">
<h3>2012</h3>
<p>W3C Recommendation。主要ブラウザが揃え、配る形式が一つに見えるようになった。</p>
</div>
<div class="card">
<h3>中身</h3>
<p>TrueType / OpenType を gzip で包む。ライセンスや製作者をメタデータとして付けられる。</p>
</div>
</div>

<p class="note">WOFF はフォント形式というより、配るための包み。アウトラインの規格を置き換えたわけではない。</p>

---

# 日本語が重い、理由は単純

<p>ラテン1言語なら数百グリフで足りることが多い。日本語は漢字があり、同じ圧縮をしても桁が違う。</p>

<div class="cols">
<div class="card">
<h3>文字数が多い</h3>
<p>ひらがな・カタカナ・英数に加え、常用漢字だけでも数千。フォントによっては1万を超える。ファイルサイズはほぼグリフ数に比例する。</p>
</div>
<div class="card">
<h3>グリフが複雑</h3>
<p>画数が多い字は、アウトラインの点も多い。1字あたりのバイト数がラテンより大きく、圧縮しても残りやすい。</p>
</div>
</div>

---

# まず WOFF2 で圧縮する

<p>WOFF の後継が WOFF2。2018年に Recommendation になり、圧縮に Brotli を使う。同じアウトラインでも、WOFF よりだいたい3割小さい。</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap;
}
```

<p class="note">新規で TTF や WOFF 1 を配る理由は、ほぼない。古いブラウザ向けに WOFF を残すなら、WOFF2 を先に書く。</p>

---

# 使わない文字は、送らない

<p><code>unicode-range</code> を分けると、ページに出ていない文字のファイルは取りにいかない。ラテンと日本語を別ファイルにするだけでも、英字だけの画面は軽くなる。</p>

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

<p class="note">日本語では、使う漢字だけを都度入れるダイナミックサブセットもよく効く。Google Fonts の CJK は、これを極端に細かくやる。</p>

---

# Google Fonts は、頻度で切る

<p>2018年、日本語対応を始めるとき、数百万ページの文字頻度を見てスライスを決めた。よく使う字は少なく、あとは長い尻尾になる。</p>

<div class="cols-3">
<div class="card">
<h3>実測</h3>
<p>どのページも、高頻度の字が大半で、低頻度の字が数個混ざる。全部入りを前提にしなくてよい、という形。</p>
</div>
<div class="card">
<h3>日本語</h3>
<p>頻出3000字を20スライスに分け、残りはコードポイント順で切る。1ファイルに全部を入れない。</p>
</div>
<div class="card">
<h3>効果</h3>
<p>公開値では、全体を送るよりだいたい8割減。韓国語でも、同様の切り方で前回案より3割以上減った。</p>
</div>
</div>

<p class="note">数字は2018年当時の公開値。スライスの数はあとからさらに細かくなっている。</p>

---

# ブラウザが、必要なスライスだけ取る

<p>ページの文字を見て、当たった <code>unicode-range</code> のファイルだけ取りにいく。切り方を細かくできるのは、小さいファイルを同時に取れるようになったからだ。</p>

<div class="cols-3">
<div class="card">
<h3>unicode-range</h3>
<p>CSS に書かれた範囲と、画面の文字を照合する。範囲に含まれないスライスは、リクエスト自体が発生しない。</p>
</div>
<div class="card">
<h3>WOFF2</h3>
<p>スライス1本を小さくする。細かく切っても、1本あたりの転送が膨らみにくい。</p>
</div>
<div class="card">
<h3>HTTP/2</h3>
<p>HTTP/1.1 だと細かいファイルは待ち行列になる。HTTP/2 なら同時に取れるので、切るほど遅くなる、が起きにくい。</p>
</div>
</div>

<p class="note">fonts.googleapis.com が返す CSS が目次になる。中には大量の @font-face があり、実体は fonts.gstatic.com の小さな WOFF2。</p>

---

# 届ける経路は、だいたい3つ

<p>どこからファイルを取るかで、許諾、キャッシュ、制御の細かさが変わる。見た目が同じでも、運用の責任は違う。</p>

<div class="cols-3">
<div class="card">
<h3>配信サービス</h3>
<p>Google Fonts、Adobe Fonts、FONTPLUS など。スライスやキャッシュを先方が持つ。手早いが、ドメインと落ち方は相手次第。</p>
</div>
<div class="card">
<h3>ノーコード</h3>
<p>サイトビルダーのフォントメニュー。導入は速い。どのファイルが来るか、いつ切れるかは見えにくい。</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>許諾されたファイルだけを、自分のオリジンから配る。制御は厚い。サブセットと更新は自分の仕事。</p>
</div>
</div>

---
layout: section
---

<p class="chap">02</p>

# CLSを回避する

<p class="muted">見えない時間より、張り替わったあとの寸法差のほうが、レイアウトを壊す。</p>

---

# 見えないか、張り替わるか

<p>ウェブフォントが間に合わないとき、ブラウザは隠すか、先に別の字で出すか、どちらかになる。どちらも、寸法が違うとページが跳ねる。</p>

<div class="cols">
<div class="card">
<h3>FOIT</h3>
<p>Flash of Invisible Text。待ち時間、文字が見えない。ブロックが長いと、本文が穴になる。</p>
</div>
<div class="card">
<h3>FOUT</h3>
<p>Flash of Unstyled Text。先にフォールバックが出て、後から本命に張り替わる。読めてはいるが、字幅が違うと行が折り返し直る。</p>
</div>
</div>

<p class="note">見栄えの問題に見えて、計測上は <span class="marker">CLS</span> になる。Core Web Vitals でも、フォントはよく原因に挙がる。</p>

---

# font-display で待ち方を決める

<p>隠す時間と、張り替える判断を、CSS で先に決めておく。本文と見出しで、値を分けてよい。</p>

| 値 | 見えるまで | 向く場面 |
|---|---|---|
| `swap` | すぐフォールバック。来たら張り替える | 本文。読めない時間を作らない |
| `optional` | 短い待ちのあと、間に合わなければそのページでは使わない | 安定優先。再訪でキャッシュが効く |
| `fallback` | `optional` より待ちが長く、そのあと swap | 見出しと本文のあいだ |
| `block` | 隠して待つ。FOIT を長くする | ロゴ1語など、ほぼ使わない |

<p class="note">初期値に近い動きは block 寄り。何も書かないと、見えない時間が増えやすい。</p>

---

# ずれるのは、字形ではなく寸法

<p>張り替えても、字幅・アセント・ディセントが近ければ行は動かない。<span class="marker">size-adjust</span> と override で、フォールバック側の寸法を本命に寄せる。</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('/fonts/display.woff2') format('woff2');
  size-adjust: 92%;
  ascent-override: 90%;
  descent-override: 22%;
}
```

<p class="note">値は実測で決める。同じ「ゴシック」でも、メイリオと Noto では幅が違う。</p>

---

# 寸法を寄せると、重なりが変わる

<p>下は、調整前と調整後の重なりです。字形を揃えるのではなく、メトリクスを揃える。</p>

<SizeAdjustCompare />

---

# クリティカルな1本は、先に取りにいく

<p>最初の画面に必ず出る見出しや本文の1本だけ、preload する。全部先読みすると、かえって帯域を奪う。</p>

```html
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin>
```

<p class="note"><code>crossorigin</code> が無いと、preload が効かず二重取得になる。アイコンや装飾面まで preload しない。</p>

---
layout: statement
---

# 重い・ずれるは<br><span class="marker">設計で止められる</span>

<p class="muted">圧縮、分割、待ち方、寸法。どれも「書体をやめる」以外の手段です。</p>

---
layout: section
---

<p class="chap">03</p>

# フォントの選び方

<p class="muted">系統、本数、UDの意味、著作権。見た目の好みだけでは決まらない。</p>

---

# 書体は、印象の設計である

<p>ゴシックか明朝か、本文か見出しかで、同じ文章でも受け取り方が変わる。先に系統を決めて、そのあと個別のファミリーを探す。</p>

<div class="cols-3">
<div class="card">
<h3>ゴシック</h3>
<p>線が均一で、UIや本文に向きやすい。硬い印象にも、中性的な印象にもできる。Webではいちばん使いやすい。</p>
</div>
<div class="card">
<h3>明朝</h3>
<p>ウロコがあり、編集的で繊細。本文に使うと密度が出る。画面ではサイズとウェイトを落とさないと、潰れて見える。</p>
</div>
<div class="card">
<h3>ディスプレイ</h3>
<p>見出し専用の形。本文に使うと読めない。1語、1行のために持つ。</p>
</div>
</div>

---

# サイトで使う系統は、最大2つ

<p>本文と見出し。これで階層は作れる。3本目は「たまたま気に入った」ことが多く、ダウンロードとライセンスだけが増える。</p>

<p class="note">欧文と和文を組むなら、系統を揃える。ゴシック本文に、関係ないディスプレイ欧文を足さない。</p>

---
layout: key
---

# UDフォント＝<br>誰にとっても読みやすいフォント

<p class="muted">……と思われがち。名前の「ユニバーサル」が、保証のように読まれます。</p>

---
layout: accent
---

# それは、違う。

<p class="muted">特定の読みにくさに応える設計であって、全員への最適解ではない。</p>

---

# 特定の読みにくさを想定した設計

<p>弱視、加齢によるかすみ、<code>0</code> と <code>O</code>、<code>6</code> と <code>b</code> のような類似字形の混同。<span class="marker">その条件向け</span>に、字面を開き、形を差別化する。万人向けの中庸ではない。</p>

<p class="note">条件が違う読者には、かえって緩く見えたり、個性が強すぎたりする。</p>

---

# 読みやすさは、人・サイズ・媒体で変わる

<p>同じ書体でも、14px の本文と 72px の見出しでは、必要な字面が違う。紙と、スマホの屋外と、デスクトップのIDEでも違う。「ユニバーサル」を、全員に読みやすい保証だと読まない。</p>

<p class="note">本文サイズ、行長、コントラストを先に決めてから、書体を当たる。</p>

---
layout: statement
---

# 万人向けの<br>正解書体ではない

<p class="muted">UDを使うな、ではない。何に効く書体かを言えることが、選ぶ側の仕事です。</p>

---

# フォントには、著作権がある

<p>画面に出ているから使ってよい、にはならない。配る行為と、表示する行為は、契約上は別物です。</p>

---

# 書体と、フォントは別物

<p>日本では、字形のデザイン単体は著作物になりにくい一方、フォントファイルはプログラムとして保護される、と整理されることが多い。</p>

<div class="cols">
<div class="card">
<h3>書体（デザイン）</h3>
<p>字の形そのもの。似たゴシックがいくつもある。形を真似たからといって、すぐ著作権侵害になるわけではない、とされる。</p>
</div>
<div class="card">
<h3>フォント（プログラム）</h3>
<p>アウトラインとヒントとテーブルが入ったファイル。複製してサーバーに置く行為は、著作権の対象になる。</p>
</div>
</div>

<p class="note">最終判断は契約書と、必要なら専門家。スライドは現場の見取り図です。</p>

---
layout: statement
---

# デスクトップライセンス<br>≠ ウェブライセンス

<p class="muted">Illustrator で使ってよいことと、WOFF2 を配信してよいことは、別の許諾です。</p>

---

# ウェブフォントは改変と再配布が前提

<p>サブセットも、自前サーバーからの配信も、デスクトップ利用の延長ではない。契約書の「改変」「再配布」「Web埋め込み」を見る。</p>

<div class="cols">
<div class="card">
<h3>サブセット化 = 改変</h3>
<p>使わないグリフを削ることは、ファイルの改変にあたる。禁じられていれば、軽くするために切れない。</p>
</div>
<div class="card">
<h3>サーバー配信 = 再配布</h3>
<p>ブラウザにファイルを渡すことは、画面に表示することとは別の行為。インストールしてよい、だけでは足りない。</p>
</div>
</div>

<p class="note">買ったデスクトップフォントを <code>@font-face</code> するのは、だいたいアウト。例外は、ウェブ利用が明示された商品だけ。</p>

---

# 安全な経路だけを使う

<p>迷ったら、経路を先に決める。気に入った字面から逆算して、あとで許諾を探すと事故る。</p>

<div class="cols-3">
<div class="card">
<h3>配信サービス</h3>
<p>Google Fonts、Adobe Fonts など。利用条件がページに書いてある。その経路のまま使う。</p>
</div>
<div class="card">
<h3>明示された許諾</h3>
<p>OFL のようなオープンなライセンスか、ウェブ利用が書いてある契約。サブセットの可否も本文を読む。</p>
</div>
<div class="card">
<h3>セルフホスト</h3>
<p>ウェブ配信用に渡されたファイルだけを置く。デスクトップ用の同梱 TTF をリネームして上げない。</p>
</div>
</div>

---

# よくある事故

<p>意図より、経路の取り違えで起きる。</p>

1. **OS同梱フォント**をサーバーに上げる（ヒラギノ、游ゴシック、Segoe）
2. **印刷用パッケージ**をWebに流用する（DTPで買った1ライセンス）
3. 画像に焼くことと、**ファイルを配ること**を混同する（ロゴ画像はよくて、WOFF2 は別契約）

---

# 使う／使わない

<p>ウェブフォントは既定ではない。固定したい理由があるときだけ使う。</p>

<div class="cols">
<div class="card">
<h3>使う</h3>
<p>ブランドの字面を固定したい。OS差を消したい。本文の読みやすさを、自分で設計したい。</p>
</div>
<div class="card">
<h3>使わない</h3>
<p>システムUIのままが速い。許諾が取れない。装飾が1画面だけで、画像で足りる。</p>
</div>
</div>

---
layout: section
---

<p class="chap">04</p>

# バリアブルフォント

<p class="muted">複数ウェイトを別ファイルで配る代わりに、1本の軸で中間を出す。</p>

---

# 1ファイルで、複数の声

<p>Regular / Medium / Bold を3本配ると、その分リクエストもキャッシュも増える。バリアブルは、軸の範囲を1ファイルに入れる。見出しの 750 と本文の 450 を、同じファイルから出せる。</p>

<p class="note">軸が少ないファミリーなら、3ウェイト静的より小さくなることが多い。軸が多く、使わない範囲まで入っていると、逆に重い。</p>

---

# よく使う軸

<p>よく触るのはこの3つ。ファミリーによって、持っている軸は違う。</p>

<div class="cols-3">
<div class="card">
<h3>wght</h3>
<p>ウェイト。だいたい 100–900。見出しだけ太くする、本文を少し落とす、が1ファイルでできる。</p>
</div>
<div class="card">
<h3>wdth</h3>
<p>字幅。狭い画面で少し詰める、見出しを拡げる。トラッキングの代わりにはならないが、行長の調整に使える。</p>
</div>
<div class="card">
<h3>opsz</h3>
<p>オプティカルサイズ。小さい文字は字面を開き、大きい文字はコントラストを上げる。印刷の大小2種に近い。</p>
</div>
</div>

---

<VariableAxisDemo />

---

# 日本語は、まだ慎重でいい

<p>日本語のバリアブルは、ファイルが大きく、対応ファミリーもまだ少ない。本文は静的1ウェイト、見出しだけバリアブル、でもよい。全部を軸に乗せなくていい。</p>

<p class="note">可変であること自体が目的ではない。リクエスト数と、見た目の段階が足りるかで決める。</p>

---
layout: section
---

<p class="chap">05</p>

# CSS Fonts Level 4

<p class="muted">見た目の制御と、配る相手を選ぶ制御が、同じ仕様の中にある。</p>

---

# フォントを、もっと細かく制御する

<p>Level 4 は、色と軸と合成を CSS 側で触れるようにする。ブラウザが知らない形式は、そもそも取りにいかせない、もここに入る。</p>

<div class="cols">
<div class="card">
<h3>見た目</h3>
<p><code>font-palette</code> で色付きフォントの色を差し替える。<code>font-optical-sizing</code> と <code>font-variation-settings</code> で軸を触る。</p>
</div>
<div class="card">
<h3>配り方</h3>
<p><code>tech()</code> と <code>format()</code> で、対応する形式だけを渡す。<code>font-synthesis-*</code> で、偽の太字・斜体を止める。</p>
</div>
</div>

---

# 色付きフォントの色を、CSSで持ち替える

<p>Nabla は COLRv1 の色付きフォント。<code>font-palette</code> で、アウトラインを変えずに色だけを差し替える。画像を書き直さなくてよい。</p>

<div class="cols">
<div>
<p>パレットは CSS で定義できる。ブランド色への寄せも、ダークモードも、同じファイルで足りる。</p>
</div>
<div>
<FontPaletteDemo />
</div>
</div>

---

# 軸は、プロパティで触る

<p>見出しとキャプションで、同じファミリーの違う地点を指定する。サイズに応じた字面は <code>opsz</code>、太さは <code>wght</code>。</p>

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

<p><code>tech()</code> を付けると、その技術を知らないブラウザは、その <code>src</code> を無視する。色付きや IFT のファイルを、未対応環境に送らなくてよい。</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('display.woff2') format('woff2');
  src: url('display-colr.otf') format(opentype) tech(color-COLRv1);
}
```

<p class="note">新しい <code>src</code> をあとに書く。読めるブラウザだけが、2本目を選ぶ。</p>

---

# 偽の太字・斜体を、黙らせる

<p>ウェイトが無いのに <code>bold</code> すると、ブラウザが線を太らせる。字間が潰れ、日本語では特に汚い。持っていないスタイルは、合成しないと明示する。</p>

```css
body {
  font-synthesis-weight: none;
  font-synthesis-style: none;
}
```

<p class="note">本当に太いファイルか、バリアブルの軸があるときだけ、太く見える。</p>

---
layout: section
---

<p class="chap">06</p>

# W3Cで検討中の仕組み

<p class="muted">スライスを人手で切る先に、必要なグリフだけを足していく配信がある。</p>

---

# Incremental Font Transfer

<p>最初は、そのページに必要なグリフだけを送る。あとから見た字は、差分で足す。Google Fonts の静的スライスより、ページごとの無駄が少ない。</p>

```css
@font-face {
  font-family: 'Display JP';
  src: url('display.woff2') format('woff2');
  src: url('display-ift.otf') format(opentype) tech(incremental);
}
```

<p class="note">まだ勧告として固まりきっていない。WOFF2 を残しつつ、対応ブラウザだけ IFT に切り替えられる書き方にしておく。</p>

---

# 対応の有無で、ファイルを分ける

<p><code>@when font-tech()</code> は、その技術が使えるときだけ規則を適用する。使えない環境には、今まで通り WOFF2 を渡す。</p>

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

<p class="muted">常用漢字を最初から全部送る必要がなくなる。頻度スライスの、次の段階です。</p>

---
layout: section
---

<p class="chap">07</p>

# 持ち帰り

<p class="muted">30分で持ち帰るのは、この3点です。</p>

---
layout: statement
---

# 重い・ずれるは<br><span class="marker">設計で止められる</span>

<p class="muted">WOFF2、分割、font-display、size-adjust。書体を捨てる前に、配り方を疑う。</p>

---
layout: statement
---

# 書体は<br><span class="marker">印象の設計</span>である

<p class="muted">系統と本数を決め、UDの意味を取り違えず、許諾のある経路だけを使う。</p>

---
layout: statement
---

# <span class="marker">2026年の道具</span>を使う

<p class="muted">バリアブル、palette、tech()、IFT。全部を今日入れなくていい。知っていると、次の判断が速い。</p>

---
layout: accent
---

# ウェブフォントについて詳しくなって、<br>フロントエンド開発を<span class="marker">もっと楽しみましょう</span>。

---
layout: cover
---

# ありがとうございました

<p class="muted">takanorip — Kanmu, inc. Design Manager</p>
