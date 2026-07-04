---
theme: slidev-theme-tahta
title: AIスロップなデザインを避けるためのデザイン戦略
author: takanorip
info: |
  Kanmu, inc. Design Manager
  https://takanorip.com
themeConfig:
  variant: press
layout: cover
kicker: DESIGN STRATEGY · 2026
subtitle: takanorip — Kanmu, inc. Design Manager
---

---
layout: lead
kicker: 今日の問い
title: AIで作ったのに、なぜ<em>全部同じ</em>に見えるのか？
subtitle: そして——意図的に違うデザインを組織で再現するには？
---

---
layout: agenda
title: アジェンダ
items:
  - { topic: AIスロップとは, desc: 症状の特定 }
  - { topic: なぜ起きるのか, desc: 分布収束という構造 }
  - { topic: なぜ問題なのか, desc: ビジネスとブランドへの影響 }
  - { topic: デザイン戦略, desc: 回避のためのフレームワーク }
  - { topic: 実践ワークフロー, desc: チームで回す方法 }
  - { topic: チェックリスト, desc: 出荷前の確認と次の一手 }
---

---
layout: section
index: "01"
kicker: Part one
title: AIスロップとは
---

---
layout: define
kicker: 定義
term: AI Slop（AIスロップ）
definition: AI生成コンテンツが統計的な<span class="accent2">「平均」</span>に収束し、個性・文脈・意図が失われた見分けのつかない出力
points:
  - デザイン領域では「AI Blue」とも呼ばれる
  - 壊れているわけではない — 動くし、出荷もできる
  - ただ、何も言っていない
---

---
layout: reference
kicker: 指紋
title: 複数が<em>同時に</em>出現したら、ほぼ確実にスロップ
groups:
  - title: ビジュアル
    items:
      - { term: 色, desc: 紫〜インディゴのグラデーション、暗いヒーロー＋グロー }
      - { term: タイポ, desc: Inter / Roboto / system-ui 一本勝負 }
      - { term: 装飾, desc: ガラスモーフィズム、過剰な角丸、グラデ文字 }
  - title: 構造・コピー
    items:
      - { term: レイアウト, desc: ヒーロー → 3カラム機能カード → CTA }
      - { term: アイコン, desc: 絵文字行、Lucide/Heroicons の並び }
      - { term: コピー, desc: 「革新的」「次世代」「シームレスな体験」 }
---

---
layout: columns
title: 見分け方
kicker: 目 vs 計測
columns:
  - title: 目視で見る「クラスター」
    items:
      - 指紋がセットで出るか
      - 1つだけなら問題ない
  - title: 計測で確認する「品質」
    items:
      - CTAコントラスト比 4.5:1 以上
      - タイプスケールの一貫性
      - レンダリング結果の検証
---

---
layout: statement
kicker: 原則
title: スタイルシートを信じるな。ユーザーが見る<em>画面</em>を検証する。
---

---
layout: section
index: "02"
kicker: Part two
title: なぜ起きるのか
---

---
layout: define
kicker: 構造的原因
term: 分布収束（Distributional Convergence）
definition: LLMは訓練データの<span class="accent2">最頻パターン</span>に収束する
points:
  - 「プロフェッショナルなLPを作って」→ 統計的平均
  - Inter + 紫グラデ + 3カード
  - 1つのプロンプトが3つの仕事を同時にやっている
---

---
layout: vs
title: 1プロンプトが担う3つの仕事
left:
  title: 同時にやろうとする
  items:
    - ① テイストの決定
    - ② 選択肢の探索
    - ③ 仕様の確定
right:
  title: 結果
  items:
    - AIは最初の推測を返す
    - 探索がスキップされる
    - 平均値がそのまま出荷される
---

---
layout: panels
kicker: さらに悪化
title: 3つの要因
panels:
  - { icon: "lucide:layers", title: Model Collapse, items: ["AI出力が再学習データに", "分布の裾が消える"] }
  - { icon: "lucide:ban", title: Anti-Slopのパラドックス, items: ["全員が同じ禁止リスト", "それ自体が次のスロップに"] }
  - { icon: "lucide:share-2", title: 参照の伝播, items: ["Linear Magic Blue", "Tailwind UI デフォルト"] }
---

---
layout: section
index: "03"
kicker: Part three
title: なぜ問題なのか
---

---
layout: columns
title: 3つの視点
columns:
  - title: ユーザー
    items:
      - 「どこかで見た」感 → 信頼低下
      - ブランドを覚えられない
  - title: ビジネス
    items:
      - 差別化できない → CVR・LTV
      - 修正コスト → 品質負債
  - title: デザイン組織
    items:
      - 判断が後付け修正に退化
      - DSがAI平均のラッパーに
---

---
layout: compare
kicker: 罠
title: 「速い」≠「良い」
columns: [項目, 速くできること, 失われやすいこと]
rows:
  - { metric: レイアウト, before: 生成, after: ブランド固有性 }
  - { metric: 実装, before: コンポーネント, after: 情報設計 }
  - { metric: コピー, before: 下書き, after: Voiceとトーン }
  - { metric: 量産, before: バリエーション, after: 選択と却下 }
---

---
layout: section
index: "04"
kicker: Part four
title: デザイン戦略のフレームワーク
---

---
layout: bigtype
kicker: 核心原則
title: 美学を先に選ぶな。<em>戦略</em>を先に決めろ。
subtitle: 何のための、誰のための、どんな印象を与えるのかを言語化する
---

---
layout: steps
kicker: Strategy → Design
title: 4段階
steps:
  - { title: 戦略, desc: 何を作るか / 誰に / 形容詞, icon: "lucide:compass" }
  - { title: 方向性, desc: 複数の美学を探索・比較, icon: "lucide:git-branch" }
  - { title: 仕様, desc: トークン・ルールに落とす, icon: "lucide:file-text" }
  - { title: 実装, desc: 仕様に沿って生成, icon: "lucide:code" }
---

---
layout: default
kicker: ① 戦略
title: 最低限決める5項目
---

<v-clicks>

- **プロダクトの本質** — 何を解決するか（1文）
- **オーディエンス** — 誰が、どんな文脈で使うか
- **ブランド形容詞** — 3〜5語（例：精密・静か・信頼）
- **避ける形容詞** — 3〜5語（例：派手・汎用的）
- **参照の軸** — 美学の系譜（サイト名ではない）

</v-clicks>

<!-- 「モダンでクリーン」は禁止ワード。全員の平均値と一致する。 -->

---
layout: vs
kicker: ② 方向性
title: 探索を省略しない
left:
  title: Before（スロップルート）
  items:
    - プロンプト1発
    - 最初の出力を採用
    - 実装
right:
  title: After（戦略ルート）
  items:
    - 戦略ブリーフ
    - 3〜5方向を並列生成
    - 比較・選択 → 仕様化 → 実装
---

---
layout: reference
kicker: 方向性探索
title: 美学の系譜を選ぶ
items:
  - { term: A · スイスエディトリアル, desc: B2B SaaS、データ重視 }
  - { term: B · 90年代DevTools, desc: DevTools、CLI系 }
  - { term: C · 日本の町案内, desc: ローカルサービス }
  - { term: D · 美術館キャプション, desc: コンテンツ・メディア }
  - { term: E · 工業製品の銘板, desc: ハードウェア、インフラ }
---

---
layout: code
kicker: ③ 仕様
title: DESIGN.md を正とする
---

```markdown
# Design Spec

## Brand Essence
精密で、落ち着いていて、道具として信頼できる

## Typography
- Display: [具体フォント名]
- Body: [具体フォント名]

## Color
- Primary: #______
- Surface: #______

## Avoid
- Inter, purple gradients, 3-column hero grids
```

---
layout: feature
kicker: 仕様
title: 含めるべき7要素
features:
  - { icon: "lucide:sparkles", title: Brand Essence, desc: 形容詞と禁止形容詞 }
  - { icon: "lucide:type", title: Typography, desc: フォント・スケール }
  - { icon: "lucide:palette", title: Color, desc: 具体HEX、グラデ方針 }
  - { icon: "lucide:layout-grid", title: Layout, desc: グリッド、余白ルール }
  - { icon: "lucide:component", title: Components, desc: ボタン、カード等 }
  - { icon: "lucide:play", title: Motion, desc: イージング、duration }
  - { icon: "lucide:shield-ban", title: Avoid List, desc: 明示的な禁止事項 }
---

---
layout: code
kicker: ④ 実装
title: 制約付き生成
---

```txt
Goal:        何を作るか
Layout:      情報の優先順位と構造
Content:     実際のテキスト・データ
Constraints: DESIGN.md + Avoid List
References:  美学の系譜
```

---
layout: steps
kicker: 検証
title: 生成後の4ステップ
steps:
  - { title: スクリーンショット確認, icon: "lucide:scan-eye" }
  - { title: コントラスト・階層・タイポ計測, icon: "lucide:gauge" }
  - { title: 指紋チェックリスト照合, icon: "lucide:list-checks" }
  - { title: 人間による最終判断, icon: "lucide:user-check" }
---

---
layout: section
index: "05"
kicker: Part five
title: 実践ワークフロー
---

---
layout: steps
kicker: Artifact Chain
title: 推奨ワークフロー
steps:
  - { title: Brief, desc: 戦略, icon: "lucide:file-pen" }
  - { title: Directions, desc: 3〜5案, icon: "lucide:git-branch" }
  - { title: Selection, desc: 選択・理由の記録, icon: "lucide:check-circle" }
  - { title: DESIGN.md, desc: 仕様, icon: "lucide:file-text" }
  - { title: Implementation, desc: AI + 人間, icon: "lucide:code" }
  - { title: Audit, desc: 指紋チェック + 計測, icon: "lucide:search" }
  - { title: Ship, icon: "lucide:rocket" }
---

---
layout: panels
kicker: 役割分担
title: 3つの役割
panels:
  - { icon: "lucide:palette", title: デザイナー, items: ["戦略ブリーフ", "方向性探索", "DESIGN.md", "最終Audit"] }
  - { icon: "lucide:terminal", title: エンジニア, items: ["DESIGN.md反映", "制約適用", "a11y検証自動化"] }
  - { icon: "lucide:users", title: PM / ディレクター, items: ["平均でOK圧力を防ぐ", "探索時間確保", "判断エスカレーション"] }
---

---
layout: vs
kicker: プロンプト設計
title: Avoid List の書き方
left:
  title: ❌ 弱い禁止
  items:
    - 「かっこよく、モダンに」
    - 抽象的な指示
    - 平均値と一致
right:
  title: ✅ 強い禁止
  items:
    - Font: Inter, Roboto 禁止
    - Color: purple/indigo gradients 禁止
    - Layout: hero + 3 cards 禁止
---

---
layout: reference
kicker: 実践
title: スロップ回避の12テクニック（1/2）
items:
  - { term: "1", desc: フォントを最初に決める — 最も効果が高い }
  - { term: "2", desc: グラデーションは意味を持たせる }
  - { term: "3", desc: 写真・スクショは「実物」を使う }
  - { term: "4", desc: 余白を恐れない }
  - { term: "5", desc: 角丸・影は1箇所だけ }
  - { term: "6", desc: アイコンセットを意図的に選ぶ }
---

---
layout: reference
kicker: 実践
title: スロップ回避の12テクニック（2/2）
items:
  - { term: "7", desc: コピーを人間が書き直す }
  - { term: "8", desc: ダーク/ライトを文脈で選ぶ }
  - { term: "9", desc: モーションは1アクション1意図 }
  - { term: "10", desc: 業界別ルールを持つ }
  - { term: "11", desc: DESIGN.md をリポジトリの正とする }
  - { term: "12", desc: 出荷前に指紋チェックリストを回す }
---

---
layout: compare
kicker: 組織戦略
title: Design System の再定義
columns: [従来, AI時代]
rows:
  - { metric: カタログ, before: コンポーネント, after: 判断のカタログ }
  - { metric: トークン, before: 色とフォントの辞書, after: 選択理由つき }
  - { metric: 役割, before: デザイナーが作る, after: 制約を設計する }
  - { metric: 一貫性, before: 同じ見た目, after: 同じ判断基準 }
---

---
layout: feature
kicker: ケーススタディ
title: 脱スロップの共通パターン
features:
  - { icon: "lucide:type", title: タイポグラフィ, desc: カスタムまたは選び抜いた字体 }
  - { icon: "lucide:droplet", title: 1色, desc: グラデーション頼みではない }
  - { icon: "lucide:image", title: 実物, desc: プロダクトスクショ、抽象イラストではない }
  - { icon: "lucide:maximize", title: 余白, desc: 意図的な情報密度 }
  - { icon: "lucide:play", title: モーション, desc: 控えめだが意味がある }
---

---
layout: statement
kicker: 重要
title: 色やフォントを<em>借りる</em>のではなく、「判断を先にした」プロセスを借りる。
---

---
layout: section
index: "06"
kicker: Part six
title: 指紋チェックリスト
---

---
layout: reference
kicker: 出荷前 · 5分
title: 指紋チェックリスト
items:
  - { term: タイポ, desc: Inter / Roboto / system-ui が主フォントでないか }
  - { term: 色, desc: 紫〜インディゴのグラデーションが主役でないか }
  - { term: レイアウト, desc: ヒーロー → 3等分カード → CTA のみか }
  - { term: 装飾, desc: ガラスカード + グロー影が並んでいないか }
  - { term: アイコン, desc: 絵文字が機能アイコン代わりでないか }
  - { term: a11y, desc: CTAコントラスト比 4.5:1 を満たすか }
  - { term: コピー, desc: 「革新的」「次世代」で埋まっていないか }
  - { term: 仕様, desc: DESIGN.md との整合が取れているか }
  - { term: 最終, desc: 「どこかで見た」と言われないか }
---

---
layout: panels
kicker: まとめ
title: 3つの行動
panels:
  - { icon: "lucide:compass", title: 戦略を先に, items: ["形容詞で縛る", "禁止形容詞も定義"] }
  - { icon: "lucide:git-branch", title: 探索を省略しない, items: ["1発生成を承認しない", "3〜5方向を比較"] }
  - { icon: "lucide:file-check", title: 仕様を正とする, items: ["DESIGN.md", "Auditを工程に"] }
---

---
layout: bigtype
kicker: 最後に
title: AIは<em>平均</em>を出す装置。デザイナーは<em>選択</em>する存在。
subtitle: 速さと個性は両立できる — プロセスを設計しない限り、両立しない。
---

---
layout: end
title: ありがとうございました
subtitle: 質問・ディスカッション
contact: takanorip.com
---

---
layout: reference
kicker: 付録
title: 参考リソース
items:
  - { term: Anthropic, desc: Prompting for frontend aesthetics }
  - { term: Anthropic, desc: frontend-design Skill }
  - { term: OpenAI, desc: Designing delightful frontends }
  - { term: Superdesign, desc: Why AI Design Looks Generic }
  - { term: Zenn, desc: AIスロップから脱出する }
  - { term: tahta, desc: tahta.cagdas.io — 本資料のテーマ }
---
