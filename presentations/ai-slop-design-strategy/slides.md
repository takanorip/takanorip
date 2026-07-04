---
marp: true
theme: ai-slop-escape
paginate: true
size: 16:9
footer: 'AIスロップを避けるデザイン戦略 | takanorip'
style: |
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  section {
    font-family: 'IBM Plex Sans JP', sans-serif;
    background: #f7f4ef;
    color: #1a1814;
    padding: 56px 72px;
    font-size: 28px;
    line-height: 1.55;
  }

  section.lead {
    background: #1a1814;
    color: #f7f4ef;
    justify-content: center;
  }

  section.lead h1 {
    font-family: 'Instrument Serif', serif;
    font-size: 2.4em;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-bottom: 0.3em;
  }

  section.lead p {
    font-size: 0.85em;
    opacity: 0.75;
  }

  section.invert {
    background: #1a1814;
    color: #f7f4ef;
  }

  section.accent {
    background: #c45c26;
    color: #f7f4ef;
  }

  h1, h2, h3 {
    font-family: 'Instrument Serif', serif;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  h2 {
    font-size: 1.55em;
    margin-bottom: 0.6em;
    border-bottom: 2px solid #c45c26;
    padding-bottom: 0.15em;
    display: inline-block;
  }

  section.invert h2,
  section.lead h2,
  section.accent h2 {
    border-bottom-color: rgba(247, 244, 239, 0.4);
  }

  h3 {
    font-size: 1.1em;
    margin-top: 0.8em;
    color: #c45c26;
  }

  section.invert h3,
  section.lead h3,
  section.accent h3 {
    color: #e8a87c;
  }

  strong {
    color: #c45c26;
    font-weight: 700;
  }

  section.invert strong,
  section.lead strong,
  section.accent strong {
    color: #e8a87c;
  }

  em {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
  }

  blockquote {
    border-left: 4px solid #c45c26;
    padding: 0.2em 0 0.2em 1em;
    margin: 0.8em 0;
    font-size: 0.92em;
    background: rgba(196, 92, 38, 0.06);
  }

  section.invert blockquote,
  section.lead blockquote {
    background: rgba(247, 244, 239, 0.06);
    border-left-color: #e8a87c;
  }

  code {
    font-family: 'IBM Plex Mono', monospace;
    background: rgba(26, 24, 20, 0.08);
    padding: 0.1em 0.35em;
    border-radius: 3px;
    font-size: 0.82em;
  }

  section.invert code,
  section.lead code {
    background: rgba(247, 244, 239, 0.12);
  }

  ul, ol {
    margin: 0.4em 0;
  }

  li {
    margin: 0.35em 0;
  }

  li::marker {
    color: #c45c26;
  }

  table {
    font-size: 0.72em;
    border-collapse: collapse;
    width: 100%;
    margin-top: 0.5em;
  }

  th {
    background: #1a1814;
    color: #f7f4ef;
    padding: 0.5em 0.8em;
    text-align: left;
    font-weight: 500;
  }

  td {
    padding: 0.45em 0.8em;
    border-bottom: 1px solid rgba(26, 24, 20, 0.12);
  }

  .cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    font-size: 0.82em;
  }

  .tag {
    display: inline-block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65em;
    background: #1a1814;
    color: #f7f4ef;
    padding: 0.2em 0.6em;
    margin-right: 0.4em;
    letter-spacing: 0.04em;
  }

  section.lead .tag {
    background: #c45c26;
  }

  .small {
    font-size: 0.75em;
    opacity: 0.8;
  }

  .highlight-box {
    background: #1a1814;
    color: #f7f4ef;
    padding: 1em 1.2em;
    font-size: 0.88em;
    margin-top: 0.8em;
  }

  footer {
    font-size: 0.45em;
    opacity: 0.5;
  }
---

<!-- _class: lead -->

<span class="tag">DESIGN STRATEGY</span>

# AIスロップなデザインを<br/>避けるためのデザイン戦略

**takanorip** — Kanmu, inc. Design Manager  
2026

---

<!-- _class: lead -->

## 今日の問い

> 「AIで作ったのに、<br/>なぜ全部同じに見えるのか？」

そして——

> 「**意図的に**違うデザインを<br/>組織で再現するには？」

---

## アジェンダ

1. **AIスロップとは何か** — 症状の特定
2. **なぜ起きるのか** — 分布収束という構造
3. **なぜ問題なのか** — ビジネスとブランドへの影響
4. **デザイン戦略のフレームワーク** — 回避のための設計
5. **実践ワークフロー** — チームで回す方法
6. **チェックリストと次の一手**

---

<!-- _class: invert -->

## 1. AIスロップとは

**AI Slop** — AI生成コンテンツが統計的な「平均」に収束し、  
個性・文脈・意図が失われた**見分けのつかない出力**

デザイン領域では **「AI Blue」** とも呼ばれる

> 壊れているわけではない。  
> 動くし、レスポンシブで、出荷もできる。  
> **ただ、何も言っていない。**

---

## AIスロップの「指紋」

複数が**同時に**出現したら、ほぼ確実にスロップ

| カテゴリ | 典型的なパターン |
|---------|----------------|
| **色** | 紫〜インディゴのグラデーション、暗いヒーロー＋グロー |
| **タイポ** | Inter / Roboto / system-ui 一本勝負 |
| **レイアウト** | ヒーロー → 3カラム機能カード → CTA |
| **装飾** | ガラスモーフィズム、過剰な角丸（16px+）、グラデ文字 |
| **アイコン** | ✨🚀🔒 の絵文字行、Lucide/Heroicons の並び |
| **コピー** | 「革新的」「次世代」「シームレスな体験」 |

---

## 見分け方：目 vs 計測

### 目視で見る「クラスター」
上記の指紋が**セット**で出るか

### 計測で確認する「品質」
- CTAのコントラスト比（WCAG 4.5:1 以上）
- タイプスケールの一貫性
- 実際にレンダリングされた値（CSSトークン ≠ 画面）

> **スタイルシートを信じるなふりをしない。**  
> 最終的にユーザーが見る画面を検証する。

---

<!-- _class: accent -->

## 2. なぜ起きるのか

### 分布収束（Distributional Convergence）

LLMは訓練データの**最頻パターン**に収束する

```
「プロフェッショナルなLPを作って」
        ↓
  学習データの統計的平均
        ↓
  Inter + 紫グラデ + 3カード
```

**1つのプロンプトが3つの仕事を同時にやっている**のが根本原因

---

## 1プロンプトが担う3つの仕事

<div class="cols">

<div>

### ① テイストの決定
「どんな雰囲気か」

### ② 選択肢の探索
「他にどんな方向性があるか」

### ③ 仕様の確定
「トークン・コンポーネント・ルール」

</div>

<div>

### 結果

3つを同時にやると、  
AIは**最初の推測**を返す

→ 探索がスキップされる  
→ 平均値がそのまま出荷される

</div>

</div>

---

## さらに悪化する3つの要因

1. **Model Collapse**  
   AI出力が再学習データに入る → 分布の裾が消える → 個性が出にくい

2. **Anti-Slopのパラドックス**  
   全員が同じ「禁止リスト」を使う → それ自体が次のスロップになる

3. **参照の伝播**  
   Linear の Magic Blue、Tailwind UI のデフォルトが「正解」として再生産される

---

<!-- _class: invert -->

## 3. なぜ問題なのか

### ユーザー視点
- 「どこかで見た」感 → **信頼の低下**
- ブランドを覚えられない → **想起率の消失**

### ビジネス視点
- 差別化できない → **CVR・LTVへの間接的ダメージ**
- 修正コストの増大 → 「AIで速くなったはず」が**品質負債**に

### デザイン組織視点
- デザイナーの判断が**後付けの修正**に退化
- Design System の意味が「AIの平均を包むラッパー」になる

---

## 「速い」≠「良い」の罠

<div class="highlight-box">

**AIスロップは、速度の代償として「意味」を失っている**

| 速くできること | 失われやすいこと |
|--------------|----------------|
| レイアウト生成 | ブランドの固有性 |
| コンポーネント実装 | 文脈に即した情報設計 |
| コピーの下書き | 声（Voice）とトーン |
| バリエーション量産 | 意図的な選択と却下 |

</div>

---

## 4. デザイン戦略のフレームワーク

### 核心原則

> **美学を先に選ぶな。戦略を先に決めろ。**

AIに「かっこいいデザイン」を頼む前に、  
**何のための、誰のための、どんな印象を与える**のかを言語化する

---

## Strategy → Design の4段階

```
① 戦略（Strategy）
   何を作るか / 誰に / どんな形容詞で
   
② 方向性（Direction）
   複数の異なる美学を探索・比較
   
③ 仕様（Spec）
   選んだ方向をトークン・ルールに落とす
   
④ 実装（Code）
   仕様に沿って生成・実装
```

**③を飛ばすと、毎回①からやり直しになる**

---

## ① 戦略：言葉で縛る

### 最低限決める5項目

1. **プロダクトの本質** — 何を解決するか（1文）
2. **オーディエンス** — 誰が、どんな文脈で使うか
3. **ブランド形容詞** — 3〜5語（例：*精密・静か・信頼*）
4. **避ける形容詞** — 3〜5語（例：*派手・汎用的・遊び心過多*）
5. **参照の軸** — 業界・文化・媒体（サイト名ではなく**美学の系譜**）

> 「モダンでクリーン」は**禁止ワード**。  
> 全員の平均値と一致する。

---

## ② 方向性：探索を省略しない

### Before（スロップルート）
```
プロンプト1発 → 最初の出力を採用 → 実装
```

### After（戦略ルート）
```
戦略ブリーフ → 3〜5方向を並列生成 → 比較・選択 → 仕様化 → 実装
```

**選択肢を見ずに決めたデザインは、AIの推測を承認しただけ**

---

## 方向性探索の具体例

| 方向 | 美学の系譜 | 向いている文脈 |
|-----|-----------|--------------|
| A | スイスのエディトリアル | B2B SaaS、データ重視 |
| B | 1990年代の開発者ツール | DevTools、CLI系 |
| C | 日本の町案内・看板 | ローカルサービス |
| D | 美術館のキャプション | コンテンツ・メディア |
| E | 工業製品の銘板 | ハードウェア、インフラ |

**2つの系譜をリミックス**するのも有効  
（例：「スイスエディトリアル × 90年代DevTools」）

---

## ③ 仕様：DESIGN.md を正とする

### プロジェクトルートに置く1ファイル

```markdown
# Design Spec

## Brand Essence
精密で、落ち着いていて、道具として信頼できる

## Typography
- Display: [具体フォント名]
- Body: [具体フォント名]
- Scale: 14 / 16 / 20 / 28 / 40

## Color
- Primary: #______
- Surface: #______
- Accent: #______

## Layout Rules
- Max width: 1120px
- Grid: 12 columns
- Spacing unit: 4px

## Components
- Button: [variant定義]
- Card: border only, no shadow stack

## Avoid
- Inter, purple gradients, 3-column hero grids
```

---

## 仕様に含めるべき7要素

1. **Brand Essence** — 形容詞と禁止形容詞
2. **Typography** — フォント名・スケール・ウェイト
3. **Color** — 具体HEX、グラデーション方針
4. **Spacing & Layout** — グリッド、最大幅、余白ルール
5. **Components** — ボタン、カード、フォームのバリアント
6. **Motion** — イージング、duration、使う場面
7. **Avoid List** — 明示的な禁止事項

> **トークンは「数」ではなく「判断の結晶」**

---

## ④ 実装：制約付き生成

### AIへの指示構造

```
Goal:     何を作るか
Layout:   情報の優先順位と構造
Content:  実際のテキスト・データ
Constraints: DESIGN.md + Avoid List
References: 美学の系譜（サイトの丸パクリではない）
```

### 生成後の検証ステップを必ず入れる
1. レンダリング結果のスクリーンショット確認
2. コントラスト・階層・タイポの計測
3. 「指紋チェックリスト」との照合
4. 人間による最終判断

---

<!-- _class: invert -->

## 5. 実践ワークフロー

### 推奨：Artifact Chain

```
Brief（戦略）
  ↓
Directions（3〜5案）
  ↓
Selection（選択・理由の記録）
  ↓
DESIGN.md（仕様）
  ↓
Implementation（AI + 人間）
  ↓
Audit（指紋チェック + 計測）
  ↓
Ship
```

**各段階のアウトプットをファイルとして残す**  
→ 次のプロジェクトへの資産になる

---

## チーム向け：3つの役割分担

<div class="cols">

<div>

### デザイナー
- 戦略ブリーフの作成
- 方向性の探索・選択
- DESIGN.md の策定
- 最終Auditと判断

</div>

<div>

### エンジニア
- DESIGN.md をコードに反映
- AI生成コードの制約適用
- 計測・a11y検証の自動化

### PM / ディレクター
- 「平均でOK」の圧力を防ぐ
- 探索フェーズの時間確保
- ブランド判断のエスカレーション

</div>

</div>

---

## プロンプト設計：Avoid List の書き方

### ❌ 弱い禁止
```
「かっこよく、モダンに」
```

### ✅ 強い禁止
```
Avoid:
- Font: Inter, Roboto, Arial, system-ui as primary
- Color: purple/indigo/violet gradients
- Layout: hero + 3 equal feature cards + CTA
- Decoration: glassmorphism, gradient text, glow shadows
- Icons: emoji as feature icons, Lucide defaults
- Motion: bounce easing, animate everything
```

**禁止は「固定リスト」ではなく、収束メカニズムへの対抗として更新する**

---

## スロップ回避の12の実践テクニック

1. **フォントを最初に決める** — 最も効果が高い差別化
2. **グラデーションを使うなら意味を持たせる** — 装飾グラデは禁止
3. **写真・スクショは「実物」を使う** — ストック写真は即バレ
4. **余白を恐れない** — AIは詰めがち
5. **角丸・影は1箇所だけ** — border + shadow の二重装飾を避ける
6. **アイコンセットを意図的に選ぶ** — デフォルトLucideをそのまま使わない
7. **コピーを人間が書き直す** — AI文体は平均値
8. **ダーク/ライトを文脈で選ぶ** — 暗いヒーローはデフォルトではない
9. **モーションは1アクション1意図** — 全部動かさない
10. **業界別ルールを持つ** — SaaS / EC / メディアで同じにしない
11. **DESIGN.md をリポジトリの正とする**
12. **出荷前に指紋チェックリストを回す**

---

## 組織戦略：Design System の再定義

### 従来の          →  AI時代

| 従来 | AI時代 |
|-----|--------|
| コンポーネントカタログ | **判断のカタログ** |
| 色とフォントの辞書 | **選択理由つきのトークン** |
| デザイナーが作る | **デザイナーが制約を設計する** |
| 一貫性 = 同じ見た目 | 一貫性 = **同じ判断基準** |

> Design System は「AIの平均を包むラッパー」ではなく、  
> **「AIが迷わないための判断基準書」** であるべき

---

## ケーススタディ：脱スロップの構造

### 共通パターン（Linear / Stripe / Vercel 等）

- **カスタムまたは選び抜いたタイポグラフィ**
- **ブランド固有の1色**（グラデーション頼みではない）
- **実プロダクトのスクショ**（抽象イラストではない）
- **意図的な余白と情報密度**
- **控えめだが意味のあるモーション**

### 重要：表面をコピーしない

> 彼らの**色やフォント**を借りるのではなく、  
> **「判断を先にした」というプロセス**を借りる

---

<!-- _class: accent -->

## 6. 指紋チェックリスト

出荷前に5分で回す

- [ ] Inter / Roboto / system-ui が主フォントになっていないか
- [ ] 紫〜インディゴのグラデーションが主役になっていないか
- [ ] ヒーロー → 3等分カード → CTA のみの構成か
- [ ] ガラスカード + グロー影が並んでいないか
- [ ] 絵文字が機能アイコン代わりになっていないか
- [ ] CTAのコントラスト比 4.5:1 を満たしているか
- [ ] コピーが「革新的」「次世代」で埋まっていないか
- [ ] DESIGN.md との整合が取れているか
- [ ] **「どこかで見た」と言われないか**（最終人間判断）

---

## まとめ

### AIスロップは「ツールの問題」ではない

> **使い手の思考の深さが、結果の質を決める**

### 3つの行動

1. **戦略を先に** — 形容詞と禁止形容詞で縛る
2. **探索を省略しない** — 1発生成を承認しない
3. **仕様を正とする** — DESIGN.md + Audit を工程に組み込む

---

<!-- _class: lead -->

## 最後に

> AIは**平均を出す装置**  
> デザイナーは**選択する存在**

**速さと個性は両立できる。**  
ただし、**プロセスを設計しない限り、両立しない。**

---

<!-- _class: lead -->

# ありがとうございました

**takanorip**  
Kanmu, inc. Design Manager  
https://takanorip.com

質問・ディスカッション

---

<!-- _class: invert -->

## 付録：参考リソース

| リソース | 内容 |
|---------|------|
| Anthropic *Prompting for frontend aesthetics* | 公式のanti-slopプロンプト集 |
| Anthropic *frontend-design* Skill | 強制差別化スキル |
| OpenAI *Designing delightful frontends* | 制約付きUI生成ガイド |
| Superdesign *Why AI Design Looks Generic* | Artifact Chain ワークフロー |
| Zenn: AIスロップから脱出する | 日本語の実践解説 |

### キーワード
`distributional convergence` / `DESIGN.md` / `artifact chain` / `AI Blue`
